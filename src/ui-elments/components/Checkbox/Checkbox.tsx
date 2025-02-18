import classNames from 'classnames';
import React, { memo } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    checked?: boolean;
}

const Checkbox = ({
    label,
    checked,
    disabled,
    name,
    ...restProps
}: CheckboxProps) => {
    const containerClasses = classNames(
        'flex items-center space-x-2 cursor-pointer select-none'
    );

    const spanClasses = classNames('text-sm', {
        'text-gray-400': disabled,
        'text-gray-800': !disabled,
    });

    const inputClasses = classNames(
        ' rounded border-gray-300 text-slate-600 focus:ring-2 focus:ring-slate-500 transition',
        {
            'opacity-50 cursor-not-allowed': disabled,
        }
    );

    return (
        <div className={containerClasses}>
            <input
                type="checkbox"
                className={inputClasses}
                checked={checked}
                disabled={disabled}
                name={name}
                {...restProps}
            />
            {label && (
                <label htmlFor={name} className={spanClasses}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default memo(Checkbox);
