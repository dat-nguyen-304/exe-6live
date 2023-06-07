import Container from '@/components/Container'
import Layout from '@/components/Header'
import Loading from '@/components/Loading'
import CampaignDetail from '@/components/campaigns/CampaignDetail'
import { Campaign, Company } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CampaignDetailRoot: React.FC = () => {
    const router = useRouter();
    const { campaignId } = router.query;
    console.log("Campaign ID: ", campaignId);

    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const [company, setCompany] = useState<Company | null>(null);
    useEffect(() => {
        const getKolDetail = async () => {
            const campaignRes = await axios.get(`/api/campaigns/${campaignId}`);
            const campaign = campaignRes.data;
            console.log("Campaign: ", campaign);
            const companyRes = await axios.get(`/api/companies/${campaign.companyId}`);
            const company = companyRes.data;
            console.log("Company: ", company);

            setCampaign(campaign);
            setCompany(company);
        }
        if (campaignId)
            getKolDetail();
    }, [campaignId]);

    return (
        <Layout>
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