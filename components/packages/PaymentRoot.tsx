import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Banks from '@/components/packages/Banks';
import PackageList from '@/components/packages/PackageList';
import TransferInfo from '@/components/packages/TransferInfo';
import axios from 'axios';
import { Package } from '@/types';
import Loading from '../Loading';
import useUser from '@/hooks/useUser';
import useSuccessModal from '@/hooks/useSuccessModal';
import SuccessModal from '../modals/SuccessModal';

const PaymentRoot: React.FC = () => {
    const myUser = useUser();
    const [bank, setBank] = useState<string>("tpbank");
    const [premiumPackages, setPremiumPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<number>(0);
    const successModal = useSuccessModal();
    useEffect(() => {
        const getAllPackages = async () => {
            const res = await axios.get(`/api/packages`);
            setPremiumPackages(res.data);
        }
        getAllPackages();
    }, []);

    const handleSubmit = async () => {
        const packageId = premiumPackages[selectedPackage].id;
        const price = premiumPackages[selectedPackage].price;
        const months = premiumPackages[selectedPackage].numberOfMonth;
        const accountId = myUser.user?.id;
        const res = await axios.post("/api/payments", { bank, packageId, accountId, price, months });
        successModal.onContent("Giao dịch thành công");
        successModal.onOpen();
    }

    return (
        <>
            {
                (premiumPackages.length !== 0) ?
                    (<div className='2xl:px-[200px] lg:px-[120px] mt-[-40px]'>
                        <h3 className='text-xl md:text-4xl font-bold text-center pt-[40px]'> Chọn gói Premium của bạn</h3>
                        <h5 className='text-base md:text-lg mt-4 text-center'>Tìm kiếm, kết nối KOL/KOC dễ dàng hơn với 6Live Premium</h5>
                        {
                            myUser.user?.isVip && (new Date(myUser.user?.expiredVipDate as string) >= new Date()) &&
                            <div className='text-green-500 font-semibold text-center mt-8'>
                                Bạn đang là thành viên Premium. Ngày hết hạn là: { format(new Date(myUser.user?.expiredVipDate as string), 'dd/MM/yyy') }
                            </div>
                        }
                        <p className='text-base md:text-xl font-semibold mt-8'>Chọn gói</p>
                        <PackageList
                            premiumPackages={ premiumPackages }
                            selectedPackage={ selectedPackage }
                            setSelectedPackage={ setSelectedPackage }
                        />
                        <Banks setBank={ setBank } bank={ bank } />
                        <TransferInfo bank={ bank } selectedPackage={ premiumPackages[selectedPackage] } />
                        <div className='flex justify-center' onClick={ handleSubmit }>
                            <button className='bg-[#00b14f] text-white px-4 py-2 mt-8 rounded-lg'>Tôi đã thanh toán</button>
                        </div>
                        <SuccessModal />
                    </div >
                    )
                    :
                    <Loading />
            }
        </>
    )
}

export default PaymentRoot;