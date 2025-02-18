import React, { memo, ReactNode } from 'react';
import classNames from 'classnames';

interface TextProps {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'primary' | 'secondary' | 'error' | 'default';
    weight?: 'light' | 'normal' | 'medium' | 'bold';
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

const Text: React.FC<TextProps> = ({
    children,
    size = 'md',
    color = 'default',
    weight = 'normal',
    className,
    as: Element = 'p',
}) => {
    const textClasses = classNames(
        {
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
            'text-xl': size === 'xl',

            'text-gray-900': color === 'default',
            'text-blue-500': color === 'primary',
            'text-gray-500': color === 'secondary',
            'text-red-500': color === 'error',

            'font-light': weight === 'light',
            'font-normal': weight === 'normal',
            'font-medium': weight === 'medium',
            'font-bold': weight === 'bold',
        },
        className
    );

    return <Element className={textClasses}>{children}</Element>;
};

export default memo(Text);
