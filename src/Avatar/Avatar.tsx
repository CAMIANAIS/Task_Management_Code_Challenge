import avatar from '/avatar.png'
import styles from './Avatar.module.css'

const samplePhoto = avatar
type typeAvatar = {
    fullName: string
    size: 'sm' | 'md' | 'lg'
    avatar: string
    showName: boolean
}
const dimensionBySize = {
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
}
export function Avatar({ fullName, size, avatar, showName }: typeAvatar) {
    const dimension = dimensionBySize[size]
    const bordeRadius = { borderRadius: "50%" }
    const combined = { ...dimension, ...bordeRadius }
    return <div className={styles.profileInfo__card}>
        <img src={avatar ? avatar : samplePhoto} alt={fullName} style={{ ...combined }}></img>
        {showName ? <p className={styles.profileInfo__text}> {fullName}</p > : ''}
    </div >
}