import { Link, useLocation } from 'react-router-dom';
import './NavHeader.tailwind.css';
import classNames from 'classnames';

export type NavItem = {
    label: string;
    path: string;
};
interface NavHeaderProps {
    navItems: NavItem[];
    subHeader?: boolean;
}
const NavHeader = ({ navItems, subHeader = false }: NavHeaderProps) => {
    const location = useLocation();
    const ulClasses = classNames('flex gap-2  h-full items-center nav', {
        'text-white': !subHeader,
        'text-black text-xs sm:text-sm': subHeader,
    });

    const liActiveClasses = classNames({
        active: !subHeader,
        'active-subheader text-slate-700': subHeader,
    });

    const liClasses = classNames({
        'hover:!bg-gray-700': !subHeader,
        'hover:!bg-gray-200': subHeader,
    });

    const matchPathnames = (path: string) => {
        if (subHeader) {
            return location.pathname === path;
        } else {
            return location.pathname.includes(path);
        }
    };

    return (
        <nav className="h-full">
            <ul className={ulClasses}>
                {navItems.map((item) => {
                    const { label, path } = item;
                    return (
                        <li
                            key={label}
                            className={`${liClasses} ${
                                matchPathnames(path) ? liActiveClasses : ''
                            }`}
                        >
                            <Link
                                to={path}
                                className="size-full flex items-center px-4"
                            >
                                {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default NavHeader;
