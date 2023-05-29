import React from 'react';
import styles from '@/styles/Home.module.css'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/kols/ListingCard'
import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';
import Footer from './Footer';

export const currentUser = {
    id: '1',
    email: 'abc@gmail.com',
    password: '123456',
    name: 'Nguyễn Văn A',
    avatar: '/images/logo.png'
}

export interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <Navbar currentUser={ currentUser } />
            <div className="pb-20 pt-28">
                { children }
            </div>
            <Footer />
        </>
    )
}

export default Layout