import Container from '@/components/Container';
import Layout from '@/components/Header';
import Loading from '@/components/Loading';
import CampaignDetail from '@/components/campaigns/CampaignDetail';
import { Campaign, Company, UserRole } from '@/types';
import axios from 'axios';
interface CampaignDetailPageProps {
    campaign: Campaign & {
        company: Company
    }
}

const CampaignDetailPage: React.FC<CampaignDetailPageProps> = ({ campaign }) => {
    if (!campaign) return <></>;
    const company = campaign.company;

    return (
        <Layout roles={ [UserRole.kol, UserRole.company, "guest"] }>
            <div className='bg-[#f0f0f0]'>
                <Container>
                    <div className='mt-[-40px] mb-[-80px] py-4 sm:py-8 lg:py-[40px] px-0 sm:px-12 lg:px-[120px]'>
                        {
                            (company !== null && campaign !== null) ?
                                <CampaignDetail company={ company } campaign={ campaign } />
                                :
                                <Loading />
                        }
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export const getStaticPaths = async () => {
    return {
        paths: ['/campaigns/6480862be29b3719eeb78f8f'],
        fallback: true
    }
}

export const getStaticProps = async ({ params }: { params: { campaignId: string } }) => {
    const res = await axios.get(`${process.env.API}/api/campaigns/${params.campaignId}`);
    if (!res.data) return {
        notFound: true,
    };

    return {
        props: {
            campaign: res.data
        },
        revalidate: 60
    }
}

export default CampaignDetailPage;