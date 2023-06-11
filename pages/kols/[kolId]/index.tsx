import KolClient from "@/components/kols/KolClient";
import Layout from '@/components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import axios from "axios";
import { Kol, UserRole } from "@/types";
import Loading from "@/components/Loading";
import Container from "@/components/Container";

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
        <Layout roles={ [UserRole.company, "guest"] }>
            <Container>
                {
                    kol ?
                        <KolClient
                            key={ kol.id as string }
                            id={ kol.id as string }
                            currentKol={ kol }
                        />
                        :
                        <Loading />
                }
            </Container>
        </Layout>
    );
}

export default ListingPage;