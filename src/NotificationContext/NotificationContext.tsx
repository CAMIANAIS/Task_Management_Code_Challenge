import {  useState } from "react";
import style from './NotificationContext.module.css'
import type{ ToastNotification } from "./NotificationContextObject";
import { NotificationContext } from "./NotificationContextObject";
export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notification, setNotification] = useState<ToastNotification>(null)
    const showToast = (msg: string, status = 'success') => {
        setNotification({ message: msg, status })
        setTimeout(() => setNotification(null), 3000)
    }
    return (
        <NotificationContext.Provider value={{ showToast }}>
            {children}
            {notification && <div className={`${style.toast} ${style[`toast-${notification.status}`]}`}>
                <span className={style.icon}>
                    {notification.status === 'success' ? '✓' : '✕'}
                </span>
                {notification.message}
            </div>}
        </NotificationContext.Provider>
    )
}

