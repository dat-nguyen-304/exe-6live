import Container from '@/components/Container';
import Layout from '@/components/Header';
import CompanyProfile from '@/components/profile/CompanyProfile';
import KolProfile from '@/components/profile/KolProfile';
import useUser from '@/hooks/useUser';
import React from 'react';

export default function Profile() {
    const myUser = useUser();

    return (
        <Layout roles={ ["kol", "campaign"] }>
            <Container>
                {
                    (myUser.user?.role === "kol") ?
                        <KolProfile />
                        :
                        <CompanyProfile />
                }
            </Container>
        </Layout>
    )
}