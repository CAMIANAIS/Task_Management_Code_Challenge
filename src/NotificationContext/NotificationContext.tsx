import {  useState } from "react";
import style from './NotificationContext.module.css'
import { NotificationContext, type ToastStatus,type ToastNotification } from "./NotificationContextObject";
export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notification, setNotification] = useState<ToastNotification>(null)
    const showToast = (msg: string, status: ToastStatus = 'success') => {
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
