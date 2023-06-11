import Container from '@/components/Container';
import KolCard from '@/components/kols/KolCard';
import Layout from '@/components/Header';
import { Kol, UserRole } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import KolFilter from '@/components/kols/KolFilter';
import useCompany from '@/hooks/useCompany';

const KolList: React.FC = () => {
    const myCompany = useCompany();
    const [kols, setKols] = useState<Kol[] | null>(null);
    useEffect(() => {
        const getKols = async () => {
            const res = await axios.get("/api/kols");
            setKols(res.data);
        }
        getKols();
    }, [])
    return (
        <Layout roles={ [UserRole.company, "guest"] }>
            {
                myCompany.company ?
                    <KolFilter setKols={ setKols } />
                    :
                    <div className='mt-[-60px]'></div>
            }
            <Container>
                {
                    kols !== null ?
                        kols.length === 0 ? <div className='mt-20'>Không tìm thấy kết quả phù hợp</div>
                            :
                            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                                {
                                    kols.map((kol: Kol) => (
                                        <KolCard
                                            key={ kol.id }
                                            id={ kol.id }
                                            kol={ kol }
                                        />
                                    ))
                                }
                            </div>
                        :
                        <Loading />
                }
            </Container>
        </Layout>
    )
}


export default KolList;
