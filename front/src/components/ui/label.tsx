interface LabelProps {
    id: string;
    label: string;
}

export default function Label({ id, label }: LabelProps) {
    return (
        <label className="text-md font-bold" htmlFor={id}>{label}</label>
    );
}
