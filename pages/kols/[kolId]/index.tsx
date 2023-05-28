import ListingClient from "./ListingClient";
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

export const KOLs =
{
    id: '1',
    name: 'Trấn Thành',
    age: '40',
    location: 'TP. Hồ Chí Minh',
    price: '200000000',
    gender: 'male'
}


const ListingPage = () => {
    return (
        <Layout>
            <ListingClient
                listing={ KOLs }
                currentUser={ currentUser }
            />
        </Layout>
    );
}

export default ListingPage;