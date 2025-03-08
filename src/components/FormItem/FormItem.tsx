import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ItemForm } from "../../types";

interface Props {
    onSubmitFormToAddTransaction: (newTransaction: ItemForm) => void;
    editContact: ItemForm | null;
}

const FormItem: React.FC<Props> = ({ onSubmitFormToAddTransaction, editContact }) => {
    const [form, setForm] = useState<ItemForm>({
        type: '',
        category: '',
        price: 0,
    });

    useEffect(() => {
        if (editContact) {
            setForm(editContact);
        } else {
            setForm({ type: '', category: '', price: 0 });
        }
    }, [editContact]);

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setForm(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmitFormToAddTransaction({ ...form });
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Type:
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        value={form.type}
                        onChange={inputChangeHandler}
                        required
                    >
                        <option value="" disabled>Выберите тип</option>
                        <option value="Expense">Expense</option>
                        <option value="Income">Income</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category:
                    </label>
                    <select
                        className="form-select"
                        name="category"
                        value={form.category}
                        onChange={inputChangeHandler}
                        required
                    >
                        <option value="" disabled>Выберите категорию</option>
                        {form.type === 'Expense' && (
                            <>
                                <option value="Food">Food</option>
                                <option value="Drinks">Drinks</option>
                            </>
                        )}
                        {form.type === 'Income' && (
                            <>
                                <option value="Salary">Salary</option>
                                <option value="Profit">Profit</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input
                        required
                        className="form-control"
                        type="number"
                        value={form.price}
                        name="price"
                        onChange={inputChangeHandler}
                    />
                </div>
                <div className="mb-3">
                    <button
                        className="btn btn-primary me-5"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormItem;