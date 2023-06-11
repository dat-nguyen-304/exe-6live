import Container from '@/components/Container'
import Layout from '@/components/Header'
import HistoryRoot from '@/components/history/HistoryRoot'
import { UserRole } from '@/types'
import React from 'react'

const index = () => {
    return (
        <Layout roles={ [UserRole.kol, UserRole.company] }>
            <Container>
                <HistoryRoot />
            </Container>
        </Layout>
    )
}

export default index