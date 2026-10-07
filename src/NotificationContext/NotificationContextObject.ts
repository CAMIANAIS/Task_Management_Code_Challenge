import { createContext } from "react";
export type NotificationContextType = {
    showToast: (msg: string, status?: string) => void
} | null
export type ToastNotification = { message: string; status: string } | null
export const NotificationContext = createContext<NotificationContextType>(null)