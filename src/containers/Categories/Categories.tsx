import React, { useEffect, useCallback, useState } from "react";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import axiosApi from "../../axiosApi.ts";
import { ItemForm, ItemFormMutation, TransactionAPI } from "../../types";
import ToolBar from "../../components/ToolBar/ToolBar.tsx";
import Loader from "../../components/UI/Loader/Loader.tsx";
import ItemsCategory from "../../components/ItemsCategory/ItemsCategory.tsx";

const Categories: React.FC = () => {
    const [items, setItems] = useState<ItemFormMutation[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState<ItemFormMutation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDishes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosApi<TransactionAPI | null>('/trackers-category.json');
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
            console.error("Ошибка при загрузке данных:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchDishes();
    }, [fetchDishes]);

    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        try {
            if (editingItem) {
                await axiosApi.put(`/trackers-category/${editingItem.id}.json`, newTransaction);
                console.log("Транзакция успешно обновлена:", newTransaction);
            } else {
                await axiosApi.post('/trackers-category.json', newTransaction);
                console.log("Транзакция успешно создана:", newTransaction);
            }
            handleCloseModal();
            await fetchDishes();
        } catch (error) {
            console.error("Ошибка при сохранении транзакции:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axiosApi.delete(`/trackers-category/${id}.json`);
            console.log("Транзакция успешно удалена");
            await fetchDishes();
        } catch (error) {
            console.error("Ошибка при удалении транзакции:", error);
        }
    };

    const handleEdit = (id: string) => {
        const itemToEdit = items.find((item) => item.id === id);
        if (itemToEdit) {
            setEditingItem(itemToEdit);
            setIsModalOpen(true);
        } else {
            console.error("Элемент для редактирования не найден");
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