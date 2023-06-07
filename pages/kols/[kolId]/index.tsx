import KolClient from "@/components/kols/KolClient";
import Layout from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import { Kol } from "@/types";

const ListingPage = () => {
    const router = useRouter();
    const { kolId } = router.query;
    const [kol, setKol] = useState<Kol | null>(null);
    useEffect(() => {
        const getKolDetail = async () => {
            const res = await axios.get(`/api/kols/${kolId}`);
            setKol(res.data);
        }
        getKolDetail();
    }, []);
    return (
        <Layout>
            <KolClient
                key={ kol?.id as string }
                currentKol={ kol }
            />
        </Layout>
    );
}

export default ListingPage;