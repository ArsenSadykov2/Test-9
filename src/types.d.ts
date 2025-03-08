export interface Transaction {
    date: string;
    name: string;
    price: number;
    category: string;
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

export interface ItemFormMutation {
    id: string;
    type?: string;
    category: string;
    price: number;
    date?: string;
    name?: string;
}


export interface TransactionAPI {
    [id: string]: Transaction;
}