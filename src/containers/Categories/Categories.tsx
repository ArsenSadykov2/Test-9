import React, { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import { ItemForm } from "../../types";
import ToolBar from "../../components/ToolBar/ToolBar.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ItemsCategory from "../../components/ItemsCategory/ItemsCategory.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../components/app/store.ts";
import { fetchTransactions, setEditingItem} from "../Home/Slices.ts";
import {deleteCategories, fetchCategories, saveCategories} from "./categoriesSlices.ts";

const Categories: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, editingItem } = useSelector((state: RootState) => state.transactions);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        await dispatch(saveCategories(newTransaction));
        setIsModalOpen(false);
        dispatch(fetchCategories());
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteCategories(id));
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
        setEditingItem(null);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <ToolBar onAddClick={handleAddClick} />
            <div className="container">
                {loading ? <Loader /> : (
                    <ItemsCategory items={items} onDelete={handleDelete} onEdit={handleEdit} />
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

export default Categories;