import classNames from 'classnames';
import React from 'react';

export interface DropdownItemProps {
    id: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isBold?: boolean;
}

const DropdownItem = ({
    label,
    onClick,
    isBold = false,
    ...restProps
}: DropdownItemProps) => {
    const buttonClasses = classNames(
        'block w-full px-4 py-2 text-left text-sm text-gray-700',
        {
            'hover:bg-gray-200': onClick,
            'cursor-default': !onClick,
            'font-bold': isBold,
        }
    );

    return (
        <div className="py-1" role="none">
            <button
                className={buttonClasses}
                role="menuitem"
                tabIndex={-1}
                onClick={onClick}
                {...restProps}
            >
                {label}
            </button>
        </div>
    );
};

export default DropdownItem;
