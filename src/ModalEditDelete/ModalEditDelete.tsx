import styles from './ModalEditDelete.module.css'

interface ModalOptionsProps {
    onEdit: () => void;
    onDelete: () => void;
    onClose?: () => void
}

export function ModalOptions({ onEdit, onDelete, onClose }: ModalOptionsProps) {
    const handleEdit = () => {
        onEdit();
        onClose?.();
    }
    const handleDelete = () => {
        onDelete();
        onClose?.();
    }
    return <div className={styles.ModalOptions__Container} role="menu">
        <button
            className={styles.ModalOptions__Edit}
            onClick={handleEdit}
            aria-label='Edit task'
        >
            <img src='./dropdownIcons/edit.svg' alt='edit' aria-hidden='true' />
            <span>Edit</span>
        </button>

        <button
            className={styles.ModalOptions__Delete}
            onClick={handleDelete}
            aria-label='Delete task'
        >
            <img src='./dropdownIcons/delete.svg' alt='delete' />
            <span>Delete</span>
        </button>
    </div>
}