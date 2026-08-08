import styles from './GridCreateButtons.module.css'
export type ViewMode = 'LIST' | 'GRID'
interface ModalGridCreateProps {
    currentView: ViewMode
    onViewChange: (view: ViewMode) => void;
    onCreate: () => void;
}

export function ModalGridCreateButtons({ onViewChange, onCreate, currentView }: ModalGridCreateProps) {
    const handleViewChange = (view: ViewMode) => {
        onViewChange(view);
    }
    const handleCreate = () => {
        onCreate();
    }
    return <div className={styles.ModalOptions__Container} role="group">
        <button
            className={styles.ModalOptions__ViewChange}
            onClick={() => handleViewChange('GRID')}
            aria-label='viewChange'
            aria-pressed={currentView === 'GRID'}
        >
            {(currentView === 'GRID') ? <img src='./buttonsIcons/galleryOrange.svg' alt='viewChange' aria-hidden='true' /> : <img src='./buttonsIcons/galleryWhite.svg' alt='viewChange' aria-hidden='true' />}
        </button>
        <button
            className={styles.ModalOptions__ViewChange}
            onClick={() => handleViewChange('LIST')}
            aria-label='viewChange'
            aria-pressed={currentView === 'LIST'}
        >
            {(currentView === 'LIST') ? <img src='./buttonsIcons/orangeBurguer.svg' alt='viewChange' aria-hidden='true' /> : <img src='./buttonsIcons/whiteBurguer.svg' alt='viewChange' aria-hidden='true' />}
        </button>
        <span></span>
        <button
            className={styles.ModalOptions__Create}
            onClick={handleCreate}
            aria-label='Create task'
        >
            <img src='./buttonsIcons/plus.svg' alt='Create' />
        </button>
    </div>
}