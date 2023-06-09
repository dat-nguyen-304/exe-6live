import Container from '@/components/Container';
import KolCard from '@/components/kols/KolCard';
import Layout from '@/components/Header';
import { Kol } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

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
        <Layout>
            <Container>
                {
                    kols.length === 0 ? <Loading />
                        :
                        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {
                                kols.map((kol: Kol) => (
                                    <KolCard
                                        key={ kol.id }
                                        kol={ kol }
                                    />
                                ))
                            }
                        </div>
                }

            </Container>
        </Layout>
    )
}


export default KolList;
