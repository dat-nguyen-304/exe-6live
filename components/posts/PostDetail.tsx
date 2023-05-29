import Image from 'next/image'
import Link from 'next/link';
import React from 'react';
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";

const PostDetail = () => {
    return (
        <div className='mt-[-40px] mb-[-80px]'>
            <div className='py-[40px]'>
                <div className="flex p-8 rounded-xl justify-between border-2 bg-white shadow-lg">
                    <div className='flex flex-[1] gap-8 items-center'>
                        <Image src="https://cdn-new.topcv.vn/unsafe/200x/filters:format(webp)/https://static.topcv.vn/company_logos/cong-ty-co-phan-giai-tri-va-the-thao-dien-tu-viet-nam-60c02e5e581c5.jpg"
                            alt="img"
                            width={ 100 }
                            height={ 100 }
                            className='p-2 border-[#ccc] border-2 w-[100px] h-[100px] object-contain rounded-lg'
                        />
                        <div>
                            <h3 className='text-[#00b14f] text-xl font-bold'>KOL Livestream bán hàng mới nhất</h3>
                            <Link href="/companies/1" className='cursor-pointer text-[#333] my-2 font-semibold text-sm'>Công ty Cổ phần ABCXYZ</Link>
                            <div className='flex gap-2 mt-4'>
                                <AiOutlineClockCircle size={ 20 } />
                                <span className='text-[#6f7882] font-semibold text-sm'>Hạn nộp hồ sơ: 31/12/2023</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col mr-4'>
                        <button className='border-[#00b14f] border-2 bg-[#00b14f] text-white py-2 px-4 rounded-lg text-sm flex items-center'>
                            <FaRegPaperPlane />
                            <span className='ml-2'>Ứng tuyển ngay</span>
                        </button>
                        <button className='border-[#00b14f] border-2 mt-2 justify-center text-[#00b14f] py-2 px-4 rounded-lg text-sm flex items-center'>
                            <AiOutlineHeart size={ 20 } />
                            <span className='ml-2'>Lưu tin</span>
                        </button>
                    </div>
                </div>
                <div className="mt-4 bg-white shadow-lg  border-2 py-10 px-8 rounded-xl">
                    <p className='font-bold text-md'>- Thông tin chung: </p>
                    <div className='flex justify-between text-sm px-8'>
                        <div>Ngành sản phẩm: Mỹ phẩm</div>
                        <div>Giới tính: Nam</div>
                        <div>Độ tuổi: 18 - 25</div>
                        <div>Văn phòng tại: Hồ Chí Minh</div>
                        <div>Mức lương: Thỏa thuận</div>
                    </div>
                    <div>
                        <p className='my-4 font-bold text-md'>- Mô tả công việc:</p>
                        <p>Livestream quảng bá sản phẩm hàng tuần</p>
                    </div>
                    <div className="">
                        <p className='my-4 font-bold text-md'>- Quyền lợi:</p>
                        <p>Trở thành KOL cho công ty ABC</p>
                    </div>
                    <div className='mt-8 flex'>
                        <button className='mr-4 border-[#00b14f] border-2 bg-[#00b14f] text-white py-2 px-4 rounded-lg text-sm flex items-center'>
                            <FaRegPaperPlane />
                            <span className='ml-2'>Ứng tuyển ngay</span>
                        </button>
                        <button className='border-[#00b14f] border-2 justify-center text-[#00b14f] py-2 px-4 rounded-lg text-sm flex items-center'>
                            <AiOutlineHeart size={ 20 } />
                            <span className='ml-2'>Lưu tin</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail