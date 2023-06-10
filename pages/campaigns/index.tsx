import Container from '@/components/Container';
import Layout from '@/components/Header';
import CampaignCard from '@/components/campaigns/CampaignCard'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Campaign } from '@/types';
import Loading from '@/components/Loading';
import CampaignFilter from '@/components/campaigns/CampaignFilter';

export default function Posts() {
    const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
    useEffect(() => {
        const getCampaigns = async () => {
            const res = await axios.get("/api/campaigns");
            setCampaigns(res.data as Campaign[]);
        }
        getCampaigns();
    }, []);

    return (
        <Layout>
            <CampaignFilter setCampaigns={ setCampaigns } />
            <Container>
                {
                    campaigns !== null ?
                        campaigns.length === 0 ? <div className='mt-20'>Không tìm thấy kết quả phù hợp</div>
                            :
                            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                { campaigns.map((campaign) => (
                                    <CampaignCard
                                        key={ campaign.id }
                                        campaign={ campaign }
                                        modify={ false }
                                    />
                                )) }
                            </div>
                        :
                        <Loading />
                }

            </Container>
        </Layout>
    )
}
