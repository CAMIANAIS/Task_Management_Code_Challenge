import { Outlet } from 'react-router-dom'
import { ApplicationSideBar } from '../ApplicationSidebar/ApplicationSidebar'
import { TopNavigationBar } from '../TopNavigationBar/TopNavigationBar'
import style from './Layout.module.css'
import { SearchProvider } from '../SearchContext/SearchContext'

export function Layout() {
    return (
        <SearchProvider>
            <div className={style.layout__container}>
                <ApplicationSideBar />
                <div className={style.layout__right__section}>
                    <TopNavigationBar />
                    <div className={style.layout__content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </SearchProvider>
    )
}