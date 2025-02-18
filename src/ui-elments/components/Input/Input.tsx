import classNames from 'classnames';
import React, { memo, useState } from 'react';
import './Input.tailwind.css';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            name,
            placeholder = '',
            label,
            errorMessage,
            className,
            type = 'text',
            ...restProps
        },
        ref
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const togglePasswordVisibility = () => {
            if (ref && typeof ref === 'object' && ref.current) {
                ref.current.type = isPasswordVisible ? 'password' : 'text';
            }
            setIsPasswordVisible((prev) => !prev);
        };

        const inputClasses = classNames(
            'input',
            {
                'input--normal': !errorMessage,
                'input--error': errorMessage,
            },
            className
        );

        const labelClasses = classNames(
            'label',
            {
                'label--normal': !errorMessage,
                'label--error': errorMessage,
            },
            className
        );

        const errorClasses = classNames('errorMessage');

        return (
            <div className="relative w-full">
                <label htmlFor={name} className={labelClasses}>
                    {label}
                </label>
                <div className="relative">
                    <input
                        ref={ref}
                        name={name}
                        placeholder={placeholder}
                        className={inputClasses}
                        type={
                            type === 'password' && isPasswordVisible
                                ? 'text'
                                : type
                        }
                        {...restProps}
                    />
                    {type === 'password' && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="input-password absolute top-[10px] right-2"
                        >
                            {isPasswordVisible ? (
                                <EyeSlashIcon className="h-5 w-5" />
                            ) : (
                                <EyeIcon className="h-5 w-5" />
                            )}
                        </button>
                    )}
                </div>
                {errorMessage && (
                    <span className={errorClasses}>{errorMessage}</span>
                )}
            </div>
        );
    }
);

export default memo(Input);
