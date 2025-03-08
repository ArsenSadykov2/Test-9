// import React from "react";
// import { useLocation } from "react-router-dom";
// import {Item} from "../../types";
// import dayjs from 'dayjs';
//
// interface DishesProps {
//     items: Item[];
//     onDelete: (id: string) => void;
//     onEdit: (id: string) => void;
// }
//
// const Items: React.FC<DishesProps> = ({ items, onDelete, onEdit }) => {
//     const location = useLocation();
//     const now = new Date();
//     const createdAt = now.toISOString();
//
//     return (
//         <div className="row">
//             {items.map((dish) => (
//                 <div key={dish.id} className="col-md-4 mb-4">
//                     <div className="card h-100">
//                         <div className="card-body">
//                             <h5 className="card-title">{dish.name}</h5>
//                             <p className="card-text">Цена: {dish.price} ₽</p>
//                             <span>{dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
//                             <div className="d-flex gap-2">
//
//                                 {location.pathname === "/" && (
//                                     <>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => onDelete(dish.id)}
//                                         >
//                                             Удалить
//                                         </button>
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => onEdit(dish.id)}
//                                         >
//                                             Редактировать
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default Items;