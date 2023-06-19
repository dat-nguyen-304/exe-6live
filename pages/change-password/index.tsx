import Container from '@/components/Container'
import Layout from '@/components/Header'
import ChangePassword from '@/components/password/ChangePassword'
import { UserRole } from '@/types'
import React from 'react'

const index = () => {
    return (
        <Layout roles={ [UserRole.company, UserRole.kol] }>
            <Container>
                <div className="flex justify-center items-center">
                    <ChangePassword />
                </div>
            </Container>
        </Layout>
    )
}

export default index