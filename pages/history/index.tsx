import Container from '@/components/Container'
import Layout from '@/components/Header'
import HistoryRoot from '@/components/history/HistoryRoot'
import React from 'react'

const index = () => {
    return (
        <Layout>
            <Container>
                <HistoryRoot />
            </Container>
        </Layout>
    )
}

export default index