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
            <p className='text-base md:text-xl font-semibold mb-4 mt-16'>Thông tin chuyển khoản</p>
            <div className="flex gap-8 bg-gradient-to-b from-green-50 to-white shadow-lg border-green-500 border-2 p-4 sm:p-8 w-[100%] md:w-[80%] mx-auto rounded-lg">

                <div className="flex-[1]">
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-xs sm:text-base'>Ngân hàng</p>
                        <p className='text-xs sm:text-base font-semibold'>{ bank.toUpperCase() }</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-xs sm:text-base'>Số tài khoản</p>
                        <p className='text-xs sm:text-base font-semibold'>1234567890</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-xs sm:text-base'>Tên chủ tài khoản</p>
                        <p className='text-xs sm:text-base font-semibold'>CTY CO PHAN 6LIVE</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-xs sm:text-base'>Nội dung chuyển khoản</p>
                        <p className='text-xs sm:text-base font-semibold'>6LIVE1234567890</p>
                    </div>
                    <div className="flex justify-between my-4">
                        <p className='font-bold text-xs sm:text-base'>Số tiền cần chuyển</p>
                        <p className='text-xs sm:text-base font-semibold'>{ selectedPackage.price.toLocaleString("vi-VN") } đ</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TransferInfo