interface Props {
    error?: null | string | Array<string>
}

export default function FormMessage(props: Props) {
    return props.error ? <p className="text-xs text-red-600 block">{props.error}</p> : null
}
