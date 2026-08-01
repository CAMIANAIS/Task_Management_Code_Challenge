import { Outlet } from 'react-router-dom'
import { ApplicationSideBar } from '../ApplicationSidebar/ApplicationSidebar'
import { TopNavigationBar } from '../TopNavigationBar/TopNavigationBar'
import style from './Layout.module.css'

export function Layout() {
    return (
        <div className={style.layout__container}>
            <ApplicationSideBar />
            <div className={style.layout__right__section}>
                <TopNavigationBar />
                <div className={style.layout__content}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}