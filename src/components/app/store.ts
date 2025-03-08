import { configureStore } from '@reduxjs/toolkit';
import {transactionsReducer} from "../../containers/Home/Slices.ts";
import {categoriesReducer} from "../../containers/Categories/categoriesSlices.ts";


export const store = configureStore({
    reducer: {
        transactions: transactionsReducer,
        categories: categoriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;