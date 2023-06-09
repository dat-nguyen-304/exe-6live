import { Package } from '@/types';
import Image from 'next/image';
import React from 'react';

interface TransferInfoProps {
    bank: string,
    selectedPackage: Package
}

const TransferInfo: React.FC<TransferInfoProps> = ({ bank, selectedPackage }) => {
    return (
        <>
            <p className='text-xl font-semibold mb-4 mt-16'>Thông tin chuyển khoản</p>
            <div className="flex gap-8 bg-gradient-to-b from-green-50 to-white shadow-lg border-green-500 border-2 p-8 w-[80%] mx-auto rounded-lg">
                <div className="">
                    <Image src="/images/qr-code.png" width={ 200 } height={ 200 } alt='' />
                </div>
                <div className="flex-[1]">
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-md'>Ngân hàng</p>
                        <p className='text-md font-semibold'>{ bank.toUpperCase() }</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-md'>Số tài khoản</p>
                        <p className='text-md font-semibold'>1234567890</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-md'>Tên chủ tài khoản</p>
                        <p className='text-md font-semibold'>CTY CO PHAN 6LIVE</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-md'>Nội dung chuyển khoản</p>
                        <p className='text-md font-semibold'>6LIVE1234567890</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-md'>Số tiền cần chuyển</p>
                        <p className='text-md font-semibold'>{ selectedPackage.price.toLocaleString("vi-VN") } đ</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TransferInfo