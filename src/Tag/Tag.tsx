import style from './Tag.module.css'

export type TaskTag = 'ANDROID' | 'IOS' | 'NODE_JS' | 'RAILS' | 'REACT'
export type TagProps = {
    tag: TaskTag
}
const tagColors: Record<TaskTag, string> = {
    ANDROID: 'var(--color-secondary-4)',
    IOS: 'var(--color-neutral-1)',
    NODE_JS: 'var(--color-tertiary-1)',
    RAILS: 'var(--color-primary-4)',
    REACT: 'var(--color-cuaternary-1)',
}

export function Tag({ tag }: TagProps) {
    return <p className={style.task__item} style={{ color: tagColors[tag], backgroundColor: `color-mix(in srgb, ${tagColors[tag]} 15%, transparent)` }}>{tag}</p>
}
