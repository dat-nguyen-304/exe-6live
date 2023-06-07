import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Container from '@/components/Container';
import ListingCard from '@/components/kols/ListingCard';
import Layout from '@/components/Header';
import { Kol } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const KolList: React.FC = () => {
    const [kols, setKols] = useState<Kol[]>([]);
    useEffect(() => {
        const getKols = async () => {
            const res = await axios.get("/api/kols");
            setKols(res.data);
        }
        getKols();
    }, [])
    return (
        <>
            <Layout>
                <Container>
                    <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {
                            kols.map((kol: Kol) => (
                                <ListingCard
                                    key={ kol.id }
                                    kol={ kol }
                                />
                            ))
                        }
                    </div>
                </Container>
            </Layout>
        </>
    )
}


export default KolList;
