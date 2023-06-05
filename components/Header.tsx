import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';
import Footer from './Footer';
import Head from 'next/head';
import { User } from '@/types';
import useUser from '@/hooks/useUser';
import useKol from '@/hooks/useKol';
import useCompany from '@/hooks/useCompany';


export interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const myUser = useUser();
    const myKol = useKol();
    const myCompany = useCompany();
    let currentUser = null;
    if (myUser.user?.role === 'kol') currentUser = myKol.kol;
    else currentUser = myCompany.company;

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>6LIVE</title>
            </Head>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <RentModal />
            <Navbar currentUser={ currentUser } />
            <div className="pb-20 pt-28">
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout