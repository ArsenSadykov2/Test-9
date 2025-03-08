import { NavLink } from "react-router-dom";

interface ToolBarProps {
    onAddClick: () => void;
}

const ToolBar: React.FC<ToolBarProps> = ({ onAddClick }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Finance Tracker</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to='/categories' className="nav-link">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={onAddClick}
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Add
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ToolBar;