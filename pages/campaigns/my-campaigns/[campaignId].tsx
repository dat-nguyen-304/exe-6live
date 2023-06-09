import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Container from '@/components/Container';
import Layout from '@/components/Header';
import axios from 'axios';
import { Campaign } from '@/types';
import Loading from '@/components/Loading';
import UpdateCampaign from '@/components/campaigns/UpdateCampaign';

const UpdateCampaignRoot = () => {
    const router = useRouter();
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const { campaignId } = router.query;
    useEffect(() => {
        const getCampaign = async () => {
            try {
                const campaignRes = await axios.get(`/api/campaigns/${campaignId}`);
                setCampaign(campaignRes.data);
            } catch (error) {
                console.log(error);
            }
        }
        if (campaignId) getCampaign();
    }, [campaignId]);

    return (
        <Layout>
            <Container>
                {
                    campaign !== null ?
                        <UpdateCampaign campaign={ campaign } />
                        :
                        <Loading />
                }
            </Container>
        </Layout>
    )
}

export default UpdateCampaignRoot;