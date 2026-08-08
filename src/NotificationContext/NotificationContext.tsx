import { createContext, useContext, useState } from "react";
import style from './NotificationContext.module.css'
type NotificationContextType = {
    showToast: (msg: string, status?: string) => void
} | null
type ToastNotification = { message: string; status: string } | null
const NotificationContext = createContext<NotificationContextType>(null)

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

export function useToast() {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useToast must be used within a SearchProvider')
    return context
}