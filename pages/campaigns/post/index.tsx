import Container from '@/components/Container';
import Layout from '@/components/Header';
import PostCampaign from '@/components/campaigns/PostCampaign';
import { UserRole } from '@/types';
import React from 'react';

const index = () => {
    return (
        <Layout roles={ [UserRole.company] }>
            <Container>
                <PostCampaign />
            </Container>
        </Layout>
    )
}

export default index;