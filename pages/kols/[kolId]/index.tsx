import KolClient from "@/components/kols/KolClient";
import Layout from '@/components/Header';
import axios from "axios";
import { Kol, UserRole } from "@/types";
import Loading from "@/components/Loading";
import Container from "@/components/Container";

interface KolDetailPageProps {
    kol: Kol | null;
}

const KolDetailPage: React.FC<KolDetailPageProps> = ({ kol }) => {

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

export const getStaticPaths = async () => {
    return {
        paths: ['/kols/647ced1d8bc83eeb50465855'],
        fallback: true
    }
}

export const getStaticProps = async ({ params }: { params: { kolId: string } }) => {
    const res = await axios.get(`${process.env.API}/api/kols/${params.kolId}`);
    if (!res.data) return {
        notFound: true,
    };

    return {
        props: {
            kol: res.data
        },
        revalidate: 60
    }
}

export default KolDetailPage;