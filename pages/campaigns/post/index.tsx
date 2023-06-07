import Container from '@/components/Container';
import Layout from '@/components/Header';
import PostCampaign from '@/components/campaigns/PostCampaign';
import React from 'react';

const index = () => {
    return (
        <Layout>
            <Container>
                <PostCampaign />
            </Container>
        </Layout>
    )
}

export default index;