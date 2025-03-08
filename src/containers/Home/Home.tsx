import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import Items from "../../components/Items/Items.tsx";
import ToolBar from "../../components/ToolBar/ToolBar.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import {AppDispatch, RootState} from "../../components/app/store.ts";
import {clearEditingItem, deleteTransaction, fetchTransactions, saveTransaction, setEditingItem} from "./Slices.ts";
import {ItemForm} from "../../types";


const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, editingItem } = useSelector((state: RootState) => state.transactions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const total = items.reduce((acc, item) => {
        if (item.type === 'Income') {
            return acc + Number(item.price);
        } else if (item.type === 'Expense') {
            return acc - Number(item.price);
        }
        return acc;
    }, 0);

    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        await dispatch(saveTransaction(newTransaction));
        setIsModalOpen(false);
        dispatch(fetchTransactions());
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteTransaction(id));
        dispatch(fetchTransactions());
    };

    const handleEdit = (id: string) => {
        const itemToEdit = items.find((item) => item.id === id);
        if (itemToEdit) {
            dispatch(setEditingItem(itemToEdit));
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        dispatch(clearEditingItem());
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <ToolBar onAddClick={handleAddClick} />
            <div className="container">
                <h4 className={`text-start ${total >= 0 ? 'text-success' : 'text-danger'} m-3 w-50`}>
                    Общий баланс: {total} Сом
                </h4>
                {loading ? <Loader/> : (
                    <Items items={items} onDelete={handleDelete} onEdit={handleEdit} />
                )}
            </div>
            <Modal show={isModalOpen} onClose={handleCloseModal} title={editingItem ? "Редактировать транзакцию" : "Добавить транзакцию"}>
                <FormItem
                    onSubmitFormToAddTransaction={handleSaveTransaction}
                    editContact={editingItem ? {
                        type: editingItem.type || '',
                        category: editingItem.category,
                        price: editingItem.price
                    } : null}
                />
            </Modal>
        </>
    );
};

export default Home;