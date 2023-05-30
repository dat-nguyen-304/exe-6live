import Image from 'next/image'
import React from 'react';
import { BsBuildings } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiOutlineClockCircle } from "react-icons/ai";

const PostCard = () => {
    return (
        <div className='flex bg-green-50 hover:border-[#00b14f] shadow-lg shadow-green-200 border-2 border-[#f2fbf6] rounded-lg cursor-pointer'>
            <div className='p-4 rounded-lg'>
                <Image src="https://cdn-new.topcv.vn/unsafe/200x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-giai-tri-va-the-thao-dien-tu-viet-nam-60c02e5e581c5.jpg"
                    alt="img"
                    width={ 100 }
                    height={ 100 }
                    className='p-2 border-[#ccc] border-2 w-[100px] h-[100px] object-contain rounded-lg'
                />
            </div>
            <div className='ml-4 my-2 flex-[1]'>
                <h3 className='font-bold text-lg text-[#333] hover:text-[#00b14f] hover:cursor-pointer'>
                    Livestream sản phẩm ABC mới nhất
                </h3>
                <div className='flex gap-2 my-2'>
                    <BsBuildings size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-sm'>Ngân hàng thương mại cổ phần ABCXYZ</span>
                </div>
                <div className='flex gap-2 my-2'>
                    <GoLocation size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-sm'>Hồ Chí Minh</span>
                </div>
                <div className='flex gap-2 my-2'>
                    <AiOutlineClockCircle size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-sm'>Còn 26 ngày để ứng tuyển</span>
                </div>
                <div className='flex justify-between text-sm items-center pr-12'>
                    <div className='text-sm border-2 px-2 py-1 rounded-xl text-[#666]'>Mỹ phẫm</div>
                    <div className='text-[#00b14f] font-bold bg-[#e5f7ed] px-2 py-1 rounded-lg'>Thỏa thuận</div>
                    <div className='text-sm font-semibold text-[#74777a]'>Cập nhật 2 giờ trước</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard