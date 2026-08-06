import { createContext, useContext, useState } from "react";
import style from './NotificationContext.module.css'
const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null)
    const showToast = (msg, status = 'success') => {
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

export function useToast() {
    return useContext(NotificationContext)
}