import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import ListingCard from '@/components/listings/ListingCard'
import Navbar from '@/components/navbar/Navbar';
import RegisterModal from '@/components/modals/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';
import LoginModal from '@/components/modals/LoginModal';
import RentModal from '@/components/modals/RentModal';
import Layout from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const currentUser = {
    id: '1',
    email: 'abc@gmail.com',
    password: '123456',
    name: 'Nguyễn Văn A',
    avatar: '/images/logo.png'
}

export const KOLs = [
    {
        id: '1',
        name: 'Trấn Thành',
        age: 40,
        location: 'TP. Hồ Chí Minh',
        price: 200000000,
        gender: 'male'
    }
]

export default function Home() {
    return (
        <>
            <Layout>
                <Container>
                    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid:cols-6 gap-8">
                        { KOLs.map((kol: any) => (
                            <ListingCard
                                key={ kol.id }
                                currentUser={ currentUser }
                                data={ kol }
                            />
                        )) }
                    </div>
                </Container>
            </Layout>
        </>
    )
}
