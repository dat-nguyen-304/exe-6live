import Container from '@/components/Container';
import Layout from '@/components/Header';
import CampaignCard from '@/components/campaigns/CampaignCard'
import { useState } from 'react';
import axios from 'axios';
import { Campaign, UserRole } from '@/types';
import Loading from '@/components/Loading';
import CampaignFilter from '@/components/campaigns/CampaignFilter';
import useKol from '@/hooks/useKol';

interface CampaignListProps {
    campaignList: Campaign[]
}

const CampaignList: React.FC<CampaignListProps> = ({ campaignList }) => {
    const myKol = useKol();
    const [campaigns, setCampaigns] = useState<Campaign[]>([...campaignList]);

    return (
        <Layout roles={ [UserRole.kol, "guest"] }>
            {
                myKol.kol ?
                    <CampaignFilter setCampaigns={ setCampaigns } />
                    :
                    <div className='mt-[-60px]'></div>
            }
            <Container>
                {
                    campaigns !== null ?
                        campaigns.length === 0 ? <div className='mt-20'>Không tìm thấy kết quả phù hợp</div>
                            :
                            <div className="pt-8 md:pt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
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

export const getStaticProps = async () => {
    const res = await axios.get(`${process.env.API}/api/campaigns`);
    return {
        props: {
            campaignList: res.data
        },
        revalidate: 60
    }
}

export default CampaignList;
