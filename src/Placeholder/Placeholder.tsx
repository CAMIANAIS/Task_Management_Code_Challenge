import style from './Placeholder.module.css'
type PlaceholderProp = { title: string }

export function Placeholder({ title }: PlaceholderProp) {
    return <h2 className={style.placeholder} style={{ fontSize: 'var(--hd-text-lg)' }}>{title} is coming soon </h2>
}