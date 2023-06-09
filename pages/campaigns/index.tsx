import Container from '@/components/Container';
import Layout from '@/components/Header';
import CampaignCard from '@/components/campaigns/CampaignCard'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Campaign } from '@/types';

export default function Posts() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    useEffect(() => {
        const getCampaigns = async () => {
            const res = await axios.get("/api/campaigns");
            setCampaigns(res.data as Campaign[]);
        }
        getCampaigns();
    }, []);

    return (
        <Layout>
            <Container>
                <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    { campaigns.map((campaign) => (
                        <CampaignCard
                            key={ campaign.id }
                            campaign={ campaign }
                            modify={ false }
                        />
                    )) }
                </div>
            </Container>
        </Layout>
    )
}
