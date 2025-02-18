import classNames from 'classnames';
import './Button.tailwind.css';
import { memo } from 'react';
import { LoaderIcon } from './LoaderIcon';

type ButtonColor = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'small' | 'medium';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: ButtonColor;
    size?: ButtonSize;
    label: string;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    isLoading?: boolean;
    isFullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    color = 'primary',
    size = 'medium',
    label,
    className,
    iconLeft,
    iconRight,
    isLoading = false,
    disabled,
    isFullWidth = false,
    ...restProps
}) => {
    const buttonClasses = classNames(
        'button',
        {
            [`button-color--${color}`]: true,
            [`button-size--${size}`]: true,
            'w-fit': !isFullWidth,
            'cursor-not-allowed !opacity-50': disabled,
        },
        className
    );

    return (
        <button
            className={buttonClasses}
            disabled={isLoading || disabled}
            {...restProps}
        >
            {isLoading && <LoaderIcon />}
            {iconLeft}
            {label}
            {iconRight}
        </button>
    );
};

export default memo(Button);
