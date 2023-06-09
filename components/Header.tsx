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
import axios from 'axios';
import { useEffect, useState } from 'react';


export interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    const myUser = useUser();
    const myKol = useKol();
    const myCompany = useCompany();
    // const [currentUser, setCurrentUser] = useState<any>(null);

    // useEffect(() => {
    //     if (myUser.user) {
    //         if (myUser.user.role === 'kol') setCurrentUser(myKol.kol);
    //         else setCurrentUser(myCompany.company);
    //     } else setCurrentUser(null);
    // }, [myUser.user])

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && currentUser === null) {
    //         const email = localStorage.getItem("6live_email");
    //         if (email) {
    //             const getUser = axios.get(`/api/accounts?email=${email}`);
    //             getUser.then(res => {
    //                 const user = res.data;
    //                 myUser.onChangeUser(user as User);
    //                 if (user.role === 'kol') {
    //                     setCurrentUser(user.kol);
    //                     localStorage.setItem("6live_role", "kol");
    //                     myKol.onChangeKol(user.kol);
    //                 }
    //                 else {
    //                     setCurrentUser(user.company);
    //                     localStorage.setItem("6live_role", "company");
    //                     myCompany.onChangeCompany(user.company);
    //                 }
    //             })
    //         }
    //     }
    // }, [])

    let currentUser = null;
    if (myUser.user) {
        if (myUser.user.role === 'kol') currentUser = myKol.kol;
        else currentUser = myCompany.company;
    } else if (typeof window !== 'undefined' && currentUser === null) {
        const email = localStorage.getItem("6live_email");
        if (email) {
            const getUser = axios.get(`/api/accounts?email=${email}`);
            getUser.then(res => {
                const user = res.data;
                myUser.onChangeUser(user as User);
                if (user.role === 'kol') {
                    currentUser = user.kol;
                    localStorage.setItem("6live_role", "kol");
                    myKol.onChangeKol(user.kol);
                }
                else {
                    currentUser = user.company;
                    localStorage.setItem("6live_role", "company");
                    myCompany.onChangeCompany(user.company);
                }
            })
        } else currentUser = null;
    }

    console.log("current user: ", currentUser)

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
            <div className="pb-20 pt-28 min-h-[75vh]">
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout