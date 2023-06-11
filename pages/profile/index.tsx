import Container from '@/components/Container';
import Layout from '@/components/Header';
import CompanyProfile from '@/components/profile/CompanyProfile';
import KolProfile from '@/components/profile/KolProfile';
import useUser from '@/hooks/useUser';
import { UserRole } from '@prisma/client';
import React from 'react';

export default function Profile() {
    const myUser = useUser();

    return (
        <Layout roles={ [UserRole.company, UserRole.kol] }>
            <Container>
                {
                    (myUser.user?.role === UserRole.kol) ?
                        <KolProfile />
                        :
                        <CompanyProfile />
                }
            </Container>
        </Layout>
    )
}