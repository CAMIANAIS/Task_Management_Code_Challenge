type PlaceholderProp = { title: string }

export function Placeholder({ title }: PlaceholderProp) {
    return <h2 style={{ fontSize: 'var(--hd-text-lg)' }}>{title} is coming soon </h2>
}