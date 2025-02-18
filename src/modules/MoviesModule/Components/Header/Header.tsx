import { Logo } from '../../../../components';
import NavHeader, { NavItem } from './NavHeader';
import { memo, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItemProps } from '../../../../ui-elments/components/Dropdown/DropdownItem';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../store';
import { userActions } from '../../../AuthModule/slices/UserSlice/userSlice';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/16/solid';
import { Button, Dropdown } from '../../../../ui-elments/components';

interface HeaderProps {
    navItems: NavItem[];
    isAuthenticated?: boolean;
    userName: string;
}

const Header = ({
    navItems,
    isAuthenticated = false,
    userName,
}: HeaderProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const dropdownItems = useMemo<DropdownItemProps[]>(() => {
        return [
            {
                id: '0',
                label: userName,
                isBold: true,
            },
            {
                id: '1',
                label: 'Sign out',
                onClick: handleLogout,
            },
        ];
    }, [handleLogout, userName]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="flex justify-between gap-2 w-full h-20 bg-slate-900 px-8 items-center">
            <Logo />
            <div className="hidden md:flex gap-4 h-full items-center">
                <NavHeader navItems={navItems} />
            </div>
            {!isAuthenticated && (
                <Link to="/login">
                    <Button size="small" color="secondary" label="Login" />
                </Link>
            )}
            {isAuthenticated && (
                <Dropdown label="KV" isRounded items={dropdownItems} />
            )}

            <div className="md:hidden mt-2">
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <XMarkIcon className="size-8 text-white" />
                    ) : (
                        <Bars3Icon className="size-8 text-white" />
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="absolute top-16 right-0 w-full bg-slate-900 shadow-md md:hidden z-50">
                    <nav className="flex flex-col  p-4 space-y-2">
                        {navItems.map((item) => (
                            <Link
                                to={item.path}
                                className="text-white hover:text-gray-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
};

export default memo(Header);
