import Layout from '@/components/Header';
import PaymentRoot from '@/components/packages/PaymentRoot';
import { UserRole } from '@/types';


import React from 'react';

const Packages: React.FC = () => {
    return (
        <Layout roles={ [UserRole.company, UserRole.kol] }>
            <PaymentRoot />
        </Layout>
    )
}

export default Packages;
