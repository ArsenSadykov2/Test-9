import React from "react";
import { useLocation } from "react-router-dom";
import { ItemFormMutation } from "../../types";
import dayjs from "dayjs";

interface ItemsProps {
    items: ItemFormMutation[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}

const ItemsCategory: React.FC<ItemsProps> = ({ items, onDelete, onEdit }) => {
    const location = useLocation();
    const now = new Date();
    const createdAt = now.toISOString();

    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, ItemFormMutation[]>);

    return (
        <div className="d-flex flex-column gap-3 w-100">
            {Object.keys(groupedItems).map((category) => (
                <div key={category} className="card shadow-sm w-100 mb-4">
                    <div className="card-header bg-light">
                        <h5 className="card-title mb-0">
                            <i className="bi bi-folder me-2"></i>
                            Category: <strong>{category}</strong>
                        </h5>
                    </div>
                    <div className="card-body">
                        {groupedItems[category].map((item) => (
                            <div key={item.id} className="mb-3 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        {item.type === "Expense" && (
                                            <h6 className="card-subtitle text-danger mb-2">
                                                <i className="bi bi-arrow-down-circle me-2"></i>
                                                Type: {item.type}
                                            </h6>
                                        )}
                                        {item.type === "Income" && (
                                            <h6 className="card-subtitle text-success mb-2">
                                                <i className="bi bi-arrow-up-circle me-2"></i>
                                                Type:  {item.type}
                                            </h6>
                                        )}
                                        <p className="card-text mb-1">
                                            Цена:{" "}
                                            {item.type === "Expense" ? (
                                                <span className="text-danger">{item.price} Сом</span>
                                            ) : (
                                                <span className="text-success">{item.price} Сом</span>
                                            )}
                                        </p>
                                        <p className="card-text">
                                            <small className="text-muted">
                                                <i className="bi bi-calendar me-2"></i>
                                                {dayjs(createdAt).format("DD.MM.YYYY HH:mm:ss")}
                                            </small>
                                        </p>
                                    </div>
                                    {location.pathname === "/categories" && (
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => onDelete(item.id)}
                                            >
                                                <i className="bi bi-trash me-2"></i> Удалить
                                            </button>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => onEdit(item.id)}
                                            >
                                                <i className="bi bi-pencil me-2"></i> Редактировать
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ItemsCategory;