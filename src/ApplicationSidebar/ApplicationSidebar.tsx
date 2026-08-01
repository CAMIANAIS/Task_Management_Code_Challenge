// ApplicationSidebar.tsx
import { useState } from 'react';
import { navItems } from '../SideBarItem/SidebarData';
import { SideBarItem } from '../SideBarItem/SideBarItem';

export function ApplicationSideBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="container">
            <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
                <nav className="menu-principal">
                    <ul>
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
        </div>
    );
}