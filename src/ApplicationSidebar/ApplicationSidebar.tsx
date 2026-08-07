// ApplicationSidebar.tsx
import { useState } from 'react';
import { navItems } from '../SideBarItem/SidebarData';
import { SideBarItem } from '../SideBarItem/SideBarItem';
import styles from './ApplicationSidebar.module.css';
export function ApplicationSideBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className={styles.container}>
            <img src="sideBarIcons/logo.svg" alt="Logo" className={styles.logo} />
            <nav>
                <ul className={styles.options__sidebar} >
                    {navItems.map((item) => (
                        <SideBarItem
                            key={item.path}
                            icon={item.icon}
                            label={item.label}
                            path={item.path}
                        />
                    ))}
                </ul>
            </nav>

        </div>
    );
}