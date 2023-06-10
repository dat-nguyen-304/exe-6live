import React from 'react'
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { Company, Kol, User } from '../../types/index';

interface NavbarProps {
    currentUser: Kol | Company | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {

    return (
        <div className="fixed w-full z-10 shadow-sm bg-green-100">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
                        <Logo />
                        <Search />
                        <UserMenu currentUser={ currentUser } />
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar