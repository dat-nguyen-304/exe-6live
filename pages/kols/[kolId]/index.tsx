import KolClient from "@/components/kols/KolClient";
import Layout from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import { Kol } from "@/types";
import Loading from "@/components/Loading";

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
    }, [kolId]);
    return (
        <Layout>
            {
                kol ?
                    <KolClient
                        key={ kol.id as string }
                        currentKol={ kol }
                    />
                    :
                    <Loading />
            }

        </Layout>
    );
}

export default ListingPage;