import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { ItemForm, ItemFormMutation, TransactionAPI } from '../../types';

interface TransactionsState {
    items: ItemFormMutation[];
    loading: boolean;
    editingItem: ItemFormMutation | null;
}

const initialState: TransactionsState = {
    items: [],
    loading: false,
    editingItem: null,
};

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async () => {
        const response = await axiosApi<TransactionAPI | null>('/trackers.json');
        if (!response.data) {
            return [];
        }
        const data = response.data;
        return Object.keys(data).map(key => ({
            ...data[key],
            id: key,
            category: data[key].category || "defaultCategory",
        }));
    }
);

export const saveTransaction = createAsyncThunk(
    'transactions/save',
    async (transaction: ItemForm, { getState }) => {
        const state = getState() as { transactions: TransactionsState };
        const { editingItem } = state.transactions;
        if (editingItem) {
            await axiosApi.put(`/trackers/${editingItem.id}.json`, transaction);
        } else {
            await axiosApi.post('/trackers.json', transaction);
        }
    }
);

export const deleteTransaction = createAsyncThunk(
    'transactions/delete',
    async (id: string) => {
        await axiosApi.delete(`/trackers/${id}.json`);
        return id;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setEditingItem(state, action) {
            state.editingItem = action.payload;
        },
        clearEditingItem(state) {
            state.editingItem = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchTransactions.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(saveTransaction.fulfilled, (state) => {
            state.editingItem = null;
        });
        builder.addCase(deleteTransaction.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        });
    },
});

export const { setEditingItem, clearEditingItem } = transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;