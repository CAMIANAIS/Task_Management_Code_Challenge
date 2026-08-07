import styles from './Avatar.module.css'
import { useState, useEffect } from 'react'
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
    const [imageLoadFailed, setImageLoadFailed] = useState(false);
    const dimension = dimensionBySize[size]
    const bordeRadius = { borderRadius: "50%" }
    const combined = { ...dimension, ...bordeRadius }
    const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
    const initials = nameParts.length === 0
        ? '?'
        : nameParts.length === 1
            ? nameParts[0][0].toUpperCase()
            : (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    useEffect(() => {
        if (!avatar) return
        fetch(avatar)
            .then((res) => {
                if (!res.ok) setImageLoadFailed(true)
            })
            .catch(() => setImageLoadFailed(true))
    }, [avatar])
    return <div className={styles.profileInfo__card}>
        {!avatar || imageLoadFailed ? (<div className={styles.initials} style={{ ...combined }}>
            {initials}
        </div>) :
            (<img src={avatar} alt={fullName} style={{ ...combined }} onLoad={(e) => {
                if (e.currentTarget.naturalWidth === 0) {
                    setImageLoadFailed(true)
                }
            }}></img>
            )}
        {showName ? <p className={styles.profileInfo__text} > {fullName}</p > : ''}
    </div >
}