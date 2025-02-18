import classNames from 'classnames';
import { memo, ReactNode } from 'react';
import './Card.tailwind.css';

interface CardProps {
    children: ReactNode;
    noBorder?: boolean;
    noPadding?: boolean;
    className?: string;
    noShadow?: boolean;
}

const Card = ({
    children,
    noBorder = false,
    noPadding = false,
    noShadow = false,
    className,
}: CardProps) => {
    const cardClasses = classNames(
        'card',
        {
            border: !noBorder,
            'p-4': !noPadding,
            'shadow-md': !noShadow,
        },
        className
    );
    return <div className={cardClasses}>{children}</div>;
};

export default memo(Card);
