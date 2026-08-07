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
                className={({ isActive }) => `${style.nav__link} ${isActive ? style.active : ''}`}
            >
                <img src={icon} alt={label} className="nav-icon" />
                <span className={style.nav__label}>{label}</span>
            </NavLink>
        </li>
    );
}