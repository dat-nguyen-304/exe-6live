import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import Footer from './Footer';
import Head from 'next/head';
import { User, UserRole } from '@/types';
import useUser from '@/hooks/useUser';
import useKol from '@/hooks/useKol';
import useCompany from '@/hooks/useCompany';
import axios from 'axios';
import Error404 from '@/pages/404';
import { useEffect, useState } from 'react';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
export interface LayoutProps {
    children: React.ReactNode,
    roles?: string[]
}

const Layout: React.FC<LayoutProps> = ({ children, roles }) => {
    const myUser = useUser();
    const myKol = useKol();
    const router = useRouter();
    const loginModal = useLoginModal();
    const myCompany = useCompany();
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isUnauthorized, setIsUnauthorized] = useState<boolean>(true);
    const [isRedirect, setIsRedirect] = useState<boolean>(false);

    useEffect(() => {
        if (myUser.user) {
            if (myUser.user.role === 'kol') setCurrentUser(myKol.kol);
            else setCurrentUser(myCompany.company);
        } else setCurrentUser(null);
    }, [myUser.user])

    useEffect(() => {
        if (typeof window !== 'undefined' && currentUser === null) {
            const email = localStorage.getItem("6live_email");
            if (email) {
                const getUser = axios.post(`/api/accounts`, { email });
                getUser.then(res => {
                    const user = res.data;
                    myUser.onChangeUser(user as User);
                    if (user.role === 'kol') {
                        setCurrentUser(user.kol);
                        localStorage.setItem("6live_role", "kol");
                        myKol.onChangeKol(user.kol);
                        if (roles && !roles.includes(UserRole.kol)) {
                            setIsUnauthorized(false);
                        }
                    }
                    else {
                        setCurrentUser(user.company);
                        localStorage.setItem("6live_role", "company");
                        myCompany.onChangeCompany(user.company);
                        if (roles && !roles.includes(UserRole.company)) {
                            setIsUnauthorized(false);

                        }
                    }
                })
            } else {
                if (roles && !roles.includes("guest"))
                    setIsUnauthorized(false);
            }
        }
    }, []);

    if (!isUnauthorized) {
        if (roles && !roles.includes("guest") && currentUser === null) {
            router.push("/");
            loginModal.onOpen();
            setIsUnauthorized(true);
            setIsRedirect(true);
            return null;
        } else
            return <Error404 />
    }
    if (isRedirect) return null;
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
            <Navbar currentUser={ currentUser } />
            <div className="pb-20 pt-28 min-h-[80vh]">
                { children }
            </div>
            <Footer />
        </div>
    )
}

export default Layout;