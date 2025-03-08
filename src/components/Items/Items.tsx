import React from "react";
import { useLocation } from "react-router-dom";
import { ItemFormMutation} from "../../types";
import dayjs from 'dayjs';

interface ItemsProps {
    items: ItemFormMutation[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const Items: React.FC<ItemsProps> = ({ items, onDelete, onEdit }) => {
    const location = useLocation();
    const now = new Date();
    const createdAt = now.toISOString();

    return (
        <div className="row">
            {items.map((item) => (
                <div key={item.id} className="col-md-4 mb-4">
                    <div className="card h-100">
                        <div className="card-body">
                            {item.type === 'Expense' && (
                                <h5 className="card-title text-danger">{item.type}</h5>
                            )}
                            {item.type === 'Income' && (
                                <h5 className="card-title text-success">{item.type}</h5>
                            )}
                            <p className="card-text">Category: <strong>{item.category} </strong></p>
                            {item.type === 'Expense' && (
                                <p className="card-title text-danger">{item.price} Сом</p>
                            )}
                            {item.type === 'Income' && (
                                    <p className="card-title text-success">{item.price} Сом</p>
                            )}
                            <span>{dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
                            <div className="d-flex gap-2 mt-4">
                                {location.pathname === "/" && (
                                    <>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => onDelete(item.id)}
                                        >
                                            Удалить
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => onEdit(item.id)}
                                        >
                                            Редактировать
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Items;