import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { Link } from "react-router-dom";

interface FormLoginInputProps {
    id: string;
    label: string;
    placeholder: string;
    type: string;
    link?: {
        href: string;
        anchor: string;
    };
}

export default function FormLoginInput({ id, label, placeholder, type, link }: FormLoginInputProps) {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <Label id={id} label={label} />
                {link && <Link to={link.href} className="text-md text-primary">{link.anchor}</Link>}
            </div>
            <Input
                id={id}
                placeholder={placeholder}
                type={type}
            />
        </div>
    );
}
