import { Campaign, Company } from '@/types';
import Image from 'next/image'
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { AiOutlineClockCircle, AiOutlineHeart } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import { locations as locats, genders as gends, industries } from '@/utils/variables';
import Loading from '../Loading';
import { format } from 'date-fns';
import { Gender } from '@/types';
import { Location } from '@/types';

interface CampaignDetailProps {
    campaign: Campaign,
    company: Company
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign, company }) => {
    const industry = useMemo(() => {
        return industries.filter(ind => ind.value === campaign?.industry)[0].label;
    }, [campaign?.industry]);

    const salary = useMemo(() => {
        return (!campaign?.minSalary && !campaign?.maxSalary) ?
            'Thỏa thuận'
            :
            `${campaign.minSalary.toLocaleString('vi-VN')} - ${campaign.maxSalary.toLocaleString('vi-VN')}`;
    }, [campaign?.minSalary, campaign?.maxSalary]);

    const age = useMemo(() => {
        return (!campaign?.minAge && !campaign?.maxAge) ? 'Tất cả độ tuổi' : `${campaign.minAge} - ${campaign.maxAge}`;
    }, [campaign?.minAge, campaign?.maxAge]);

    const genders = () => {
        const result = gends.reduce((res, gend) => {
            if (campaign.genders.includes(gend.value as Gender))
                return res = `${res} - ${gend.label}`;
            else return res;

        }, "");
        return result.slice(2);
    }

    const locations = () => {
        const result = locats.reduce((res, location) => {
            if (campaign.locations.includes(location.value as Location))
                return res = `${res} - ${location.label}`;
            else return res;
        }, "");
        return result.slice(2);
    }

    const platforms = () => {
        const result = campaign.platforms.reduce((res, platform) => {
            return `${res} - ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
        }, "");
        return result.slice(2);
    }

    return (
        <>
            <div className="flex p-8 rounded-xl justify-between border-2 bg-white shadow-lg">
                <div className='flex flex-[1] gap-8 items-center'>
                    <Image src={ campaign.image ? campaign.image : "https://res.cloudinary.com/dngl8ihk7/image/upload/v1686058298/jfrql1oot1iyatc63ctz.jpg" }
                        alt="img"
                        width={ 100 }
                        height={ 100 }
                        className='p-2 border-[#ccc] border-2 w-[100px] h-[100px] object-contain rounded-lg'
                    />
                    <div>
                        <h3 className='text-[#00b14f] text-xl font-bold'>{ campaign?.title }</h3>
                        <Link href={ `/companies/${company.id}` } className='cursor-pointer text-[#333] my-2 font-semibold text-sm'>{ company?.name }</Link>
                        <div className='flex gap-2 mt-4'>
                            <AiOutlineClockCircle size={ 20 } />
                            <span className='text-[#6f7882] font-semibold text-sm'>Hạn nộp hồ sơ: { format(new Date(campaign.expiredDate), 'dd/MM/yyy') }</span>
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
                <div className='grid grid-cols-4 text-sm gap-4 p-4'>
                    <div>
                        <span className='font-semibold'>Ngành sản phẩm: </span> { industry }
                    </div>
                    <div>
                        <span className='font-semibold'>Giới tính: </span> { genders() }
                    </div>
                    <div>
                        <span className='font-semibold'>Độ tuổi: </span> { age }
                    </div>
                    <div>
                        <span className='font-semibold'>Mức lương: </span> { salary }
                    </div>
                    <div className='col-span-2'>
                        <span className='font-semibold'>Văn phòng tại: </span> { locations() }
                    </div>
                    <div className='col-span-2'>
                        <span className='font-semibold'>Nền tảng yêu cầu: </span> { platforms() }
                    </div>
                </div>
                <div>
                    <p className='my-4 font-bold text-md'>- Mô tả công việc:</p>
                    <p>{ campaign.description }</p>
                </div>
                <div className="">
                    <p className='my-4 font-bold text-md'>- Quyền lợi:</p>
                    <p>{ campaign.benefit }</p>
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
        </>
    )
}

export default CampaignDetail;