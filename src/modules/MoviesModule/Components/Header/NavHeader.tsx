import { Link, useLocation } from 'react-router-dom';
import './NavHeader.tailwind.css';
import classNames from 'classnames';

export type NavItem = {
    label: string;
    path: string;
};
interface NavHeaderProps {
    navItems: NavItem[];
}
const NavHeader = ({ navItems }: NavHeaderProps) => {
    const location = useLocation();
    console.log(location);
    const ulClasses = classNames(
        'flex gap-2 h-full items-center nav text-white'
    );

    const liActiveClasses = classNames('active');

    const matchPathnames = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="h-full">
            <ul className={ulClasses}>
                {navItems.map((item) => {
                    const { label, path } = item;
                    return (
                        <li
                            key={label}
                            className={`${
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
