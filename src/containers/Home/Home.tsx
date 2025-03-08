import React, { useEffect, useCallback, useState } from "react";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import axiosApi from "../../axiosApi.ts";
import { ItemForm, ItemFormMutation, TransactionAPI } from "../../types";
import Items from "../../components/Items/Items.tsx";

interface HomeProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const Home: React.FC<HomeProps> = ({ showModal, onCloseModal }) => {
    const [items, setItems] = useState<ItemFormMutation[]>([]);
    const [loading, setLoading] = useState(false);

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

    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        try {
            await axiosApi.post('/trackers.json', newTransaction);
            console.log("Transaction saved successfully");
            onCloseModal();
            await fetchDishes();
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    const handleDelete = (id: string) => {
        console.log("Delete item with id:", id);

    };

    const handleEdit = (id: string) => {
        console.log("Edit item with id:", id);

    };

    return (
        <>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Items items={items} onDelete={handleDelete} onEdit={handleEdit} />
                )}
            </div>
            <Modal show={showModal} onClose={onCloseModal} title="Добавить транзакцию">
                <FormItem
                    onSubmitFormToAddTransaction={(newTransaction) => {
                        handleSaveTransaction(newTransaction);
                    }}
                />
            </Modal>
        </>
    );
};

export default Home;