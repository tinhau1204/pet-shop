type Button = {
    label: string;
    onClick: () => void;
};

export default function Button({ label, onClick }: Button) {
    return (
        <button
            className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm shadow-stone-300  hover:bg-cyan-400"
            onClick={onClick}
        >
            {label}
        </button>
    );
}
