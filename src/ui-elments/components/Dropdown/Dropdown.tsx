import { memo, useEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import DropdownItem, { DropdownItemProps } from './DropdownItem';

interface DropdownProps {
    label: string;
    isRounded?: boolean;
    items: DropdownItemProps[];
}

const Dropdown = ({ label, isRounded = false, items }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const buttonClasses = classNames({
        '!rounded-full !h-[40px] !w-[40px]': isRounded,
    });

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownRef}>
            <div>
                <Button
                    type="button"
                    className={buttonClasses}
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    label={label}
                    onClick={toggleDropdown}
                    color="secondary"
                    size="small"
                    iconRight={
                        !isRounded ? (
                            <svg
                                className="-mr-1 size-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                                data-slot="icon"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        ) : undefined
                    }
                ></Button>
            </div>
            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    {items.map((item) => {
                        return <DropdownItem {...item} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default memo(Dropdown);
