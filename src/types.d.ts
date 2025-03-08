export interface Transaction {
    date: string;
    name: string;
    price: number;
}

export interface Item {
    id: string;
    date: string;
    name: string;
    price: number;
}

export interface ItemForm {
    type: string;
    category: string;
    price: number;
}

export interface TransactionAPI {
    [id: string]: Transaction;
}