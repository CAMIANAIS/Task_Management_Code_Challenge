import { createContext } from "react";
export type NotificationContextType = {
    showToast: (message: string, status?: ToastStatus) => void
} | null
export type ToastStatus = 'success' | 'error' | 'info'
export type ToastNotification = { message: string; status: ToastStatus } | null
export const NotificationContext = createContext<NotificationContextType>(null)
