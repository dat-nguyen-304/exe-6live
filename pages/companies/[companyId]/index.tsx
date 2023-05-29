import CompanyClient from "./CompanyClient";
import Layout from '@/components/Header';

interface IParams {
    listingId?: string;
}

export const currentUser = {
    id: '1',
    email: 'abc@gmail.com',
    password: '123456',
    name: 'Nguyễn Văn A',
    avatar: '/images/logo.png'
}

export const company =
{
    id: '1',
    name: 'Công ty ABC',
    location: ['TP. Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội'],
    description: '',
    img: ''
}


const ListingPage = () => {
    return (
        <Layout>
            <CompanyClient
                company={ company }
                currentUser={ currentUser }
            />
        </Layout>
    );
}

export default ListingPage;