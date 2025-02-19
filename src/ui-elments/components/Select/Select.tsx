import React from 'react';

interface SelectProps {
    label?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    className?: string;
}

const Select: React.FC<SelectProps> = ({
    label,
    value,
    onChange,
    options,
    className,
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && <label className="text-white font-medium">{label}</label>}
            <select
                value={value}
                onChange={onChange}
                className=" dark_text dark_bg p-2 rounded-md"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
