import Logo from '@/assets/logo.svg'

interface HeaderProps {
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    itemsPosition?: 'start' | 'center' | 'end';
}

export default function Header({ title, imageSrc = Logo, imageAlt = 'Logo', itemsPosition = 'center' }: HeaderProps) {
    return (
        <header className={`flex flex-col gap-6 items-${itemsPosition}`}>
            <img src={imageSrc} alt={imageAlt} width={75} height={75} />
            <h2 className="text-2xl font-bold">{title}</h2>
        </header>
    );
}
