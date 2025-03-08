import React, {useEffect, useCallback, useState} from "react";
import Modal from "../../components/UI/Modal/Modal.tsx";
import FormItem from "../../components/FormItem/FormItem.tsx";
import axiosApi from "../../axiosApi.ts";
import {Item, ItemForm, TransactionAPI} from "../../types";
import Items from "../../components/Items/Items.tsx";


interface HomeProps {
    showModal: boolean;
    onCloseModal: () => void;
}

const Home: React.FC<HomeProps> = ({ showModal, onCloseModal }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    // const fetchDishes = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const response = await axiosApi<TransactionAPI | null>('/trackers.json');
    //         const dishesListObject = response.data;
    //
    //         if (!dishesListObject) {
    //             setItems([]);
    //         } else {
    //             const dishesListArray: Item[] = Object.keys(dishesListObject).map((dishId) => {
    //                 const dish = dishesListObject[dishId];
    //                 return {
    //                     ...dish,
    //                     id: dishId,
    //                 };
    //             });
    //             setItems(dishesListArray);
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     if (location.pathname === '/') {
    //         void fetchDishes();
    //     }
    // }, [fetchDishes, location.pathname]);
    const handleSaveTransaction = async (newTransaction: ItemForm) => {
        try {
            const response = await axiosApi.post('/trackers.json', newTransaction);
            console.log("Transaction saved successfully:", response.data);
            onCloseModal();
        } catch (error) {
            console.error("Error saving transaction:", error);
        }
    };

    return (
        <>
          {/*<div>*/}
          {/*    <Items items={items} onDelete={onCloseModal} onEdit={} />*/}
          {/*</div>*/}
            <Modal show={showModal} onClose={onCloseModal} title="Добавить транзакцию">
                <FormItem
                    onSubmitFormToAddTransaction={(newTransaction) => {
                        handleSaveTransaction(newTransaction);
                    }}
                />
                <div className="mb-3">
                    <button
                        className="btn btn-primary me-5"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Home;