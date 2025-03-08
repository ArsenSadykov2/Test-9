import React, { useEffect, useCallback, useState } from "react";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import axiosApi from "../../axiosApi.ts";
import { ItemForm, ItemFormMutation, TransactionAPI } from "../../types";
import Items from "../../components/Items/Items.tsx";
import ToolBar from "../../components/ToolBar/ToolBar.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";

interface HomeProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const Home: React.FC<HomeProps> = () => {
    const [items, setItems] = useState<ItemFormMutation[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemFormMutation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi<TransactionAPI | null>('/trackers.json');
            const dishesListObject = response.data;

            if (!dishesListObject) {
                setItems([]);
            } else {
                const dishesListArray: ItemFormMutation[] = Object.keys(dishesListObject).map((dishId) => {
                    const dish = dishesListObject[dishId];
                    return {
                        ...dish,
                        id: dishId,
                        category: dish.category || "defaultCategory",
                    };
                });
                setItems(dishesListArray);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchDishes();
    }, [fetchDishes]);

    const total = items.reduce((acc, item) => {
        if (item.type === 'Income') {
            return acc + Number(item.price);
        } else if (item.type === 'Expense') {
            return acc - Number(item.price);
        }
        return acc;
    }, 0);

    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        try {
            if (editingItem) {
                await axiosApi.put(`/trackers/${editingItem.id}.json`, newTransaction);
            } else {
                await axiosApi.post('/trackers.json', newTransaction);
            }
            console.log("Transaction saved successfully");
            handleCloseModal();
            await fetchDishes();
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosApi.delete(`/trackers/${id}.json`);
            console.log("Transaction deleted successfully");
            await fetchDishes();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const handleEdit = (id: string) => {
        const itemToEdit = items.find((item) => item.id === id);
        if (itemToEdit) {
            setEditingItem(itemToEdit);
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