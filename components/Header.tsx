import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';
import Footer from './Footer';
import Head from 'next/head';
import { User } from '@/types';
import getCurrentUser from '@/actions/getCurrentUser';

import { PrismaClient } from '@prisma/client';


export interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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
            <Navbar currentUser={ null } />
            <div className="pb-20 pt-28">
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout