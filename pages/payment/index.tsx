import Container from '@/components/Container';
import Layout from '@/components/Header';
import PaymentRoot from '@/components/packages/PaymentRoot';
import { UserRole } from '@/types';


import React from 'react';

const Packages: React.FC = () => {
    return (
        <Layout roles={ [UserRole.company, UserRole.kol] }>
            <Container>
                <PaymentRoot />
            </Container>
        </Layout>
    )
}

export default Packages;
