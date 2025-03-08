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

export const fetchCategories = createAsyncThunk(
    'transactions/fetchAll',
    async () => {
        const response = await axiosApi<TransactionAPI | null>('/category.json');
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

export const saveCategories = createAsyncThunk(
    'transactions/save',
    async (transaction: ItemForm, { getState }) => {
        const state = getState() as { transactions: TransactionsState };
        const { editingItem } = state.transactions;
        if (editingItem) {
            await axiosApi.put(`/category/${editingItem.id}.json`, transaction);
        } else {
            await axiosApi.post('/category.json', transaction);
        }
    }
);

export const deleteCategories = createAsyncThunk(
    'transactions/delete',
    async (id: string) => {
        await axiosApi.delete(`/category/${id}.json`);
        return id;
    }
);

const categoriesSlice = createSlice({
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
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCategories.rejected, (state) => {
            state.loading = false;
        });
        builder.addCase(saveCategories.fulfilled, (state) => {
            state.editingItem = null;
        });
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        });
    },
});

export const { setEditingItem, clearEditingItem } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;