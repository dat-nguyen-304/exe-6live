import Container from '@/components/Container'
import Layout from '@/components/Header'
import PostDetail from '@/components/posts/PostDetail'
import React from 'react'

const index = () => {
    return (
        <Layout>
            <div className='bg-[#f0f0f0]'>

                <Container>
                    <div className="px-[120px]">
                        <PostDetail />
                    </div>
                </Container>
            </div>

        </Layout>
    )
}

export default index