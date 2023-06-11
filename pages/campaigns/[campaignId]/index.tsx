import Container from '@/components/Container'
import Layout from '@/components/Header'
import Loading from '@/components/Loading'
import CampaignDetail from '@/components/campaigns/CampaignDetail'
import Error404 from '@/pages/404'
import { Campaign, Company, UserRole } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CampaignDetailRoot: React.FC = () => {
    const router = useRouter();
    const [error, setError] = useState(false);
    const { campaignId } = router.query;

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    useEffect(() => {
        const getKolDetail = async () => {
            try {
                const campaignRes = await axios.get(`/api/campaigns/${campaignId}`);
                const campaign = campaignRes.data;
                if (!campaign) return setError(true);
                else {
                    const company = campaign.company;
                    setCampaign(campaign);
                    setCompany(company);
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (campaignId)
            getKolDetail();
    }, [campaignId]);

    if (error) return <Error404 />

    return (
        <Layout roles={ [UserRole.kol, UserRole.company, "guest"] }>
            <div className='bg-[#f0f0f0]'>
                <Container>
                    <div className='mt-[-40px] mb-[-80px] py-[40px] px-[120px]'>
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

export default CampaignDetailRoot;