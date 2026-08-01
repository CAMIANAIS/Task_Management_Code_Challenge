import { NavLink } from 'react-router-dom';
import style from './SideBarItem.module.css';
interface SideBarItemProps {
    icon: string;
    label: string;
    path: string;
}
export function SideBarItem({ icon, label, path }: SideBarItemProps) {
    return (
        <li className={style.nav__item}>
            <NavLink
                to={path}
                className={({ isActive }) => isActive ? 'active' : ''}
            >
                <img src={icon} alt={label} className="nav-icon" />
                <span>{label}</span>
            </NavLink>
        </li>
    );
}