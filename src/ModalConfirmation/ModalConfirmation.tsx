import style from './ModalConfirmation.module.css'

interface ModalOptionsProps {
    onConfirm: () => void;
    onCancel: () => void;
    onClose?: () => void
}

export function ModalConfirmationOptions({ onConfirm: onConfirm, onCancel: onCancel, onClose }: ModalOptionsProps) {
    const handleConfirm = () => {
        onConfirm();
        onClose?.();
    }
    const handleCancel = () => {
        onCancel();
        onClose?.();
    }
    return <div className={style.ModalOptions__Container} role="menu">
        <div className={style.ModalOptions__Info}>
            <h2>Delete Task</h2>
            <span>Are you sure you want to delete this Task?</span>
        </div>
        <div className={style.ModalOptions__Buttons}>
            <button
                className={style.ModalOptions__Confirm}
                onClick={handleConfirm}
                aria-label='Confirm Delete'
            >
                <span>Delete</span>
            </button>

            <button
                className={style.ModalOptions__Cancel}
                onClick={handleCancel}
                aria-label='Cancel Delete'
            >
                <span>Go Back</span>
            </button>
        </div>
    </div>
}