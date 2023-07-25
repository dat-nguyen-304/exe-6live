import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Campaign, Company, Location } from '@/types';
import axios from 'axios';
import { locations as locats, industries } from '@/utils/variables';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { useRouter } from 'next/router';
import Link from 'next/link';


interface CampaignCardProps {
    campaign: Campaign,
    modify: boolean,
    setOpenModal?: (value: React.SetStateAction<boolean>) => void,
    setDeleteCampaignId?: (value: React.SetStateAction<string>) => void
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, modify, setOpenModal, setDeleteCampaignId }) => {
    const [company, setCompany] = useState<Company>();
    const router = useRouter();

    useEffect(() => {
        const getCompany = async () => {
            const res = await axios.get(`/api/companies/${campaign.companyId}`);
            setCompany(res.data);
        }
        getCompany();
    }, []);

    const industry = useMemo(() => {
        return industries.filter(ind => ind.value === campaign.industry)[0].label;
    }, [campaign.industry]);

    const salary = useMemo(() => {
        return (!campaign.minSalary && !campaign.maxSalary) ?
            'Thỏa thuận' :
            `${campaign.minSalary.toLocaleString('vi-VN')} - ${campaign.maxSalary.toLocaleString('vi-VN')}`;
    }, [campaign.minSalary, campaign.maxSalary]);

    const leftDate = () => {
        const days = differenceInDays(new Date(campaign.expiredDate), new Date());
        return (days < 1) ? "Đã hết hạn ứng tuyển" : `Còn ${days} ngày để ứng tuyển`;
    }

    const updatedAt = () => {
        const days = differenceInDays(new Date(), new Date(campaign.updatedAt));
        if (days === 0) {
            const hours = differenceInHours(new Date(), new Date(campaign.updatedAt));
            if (hours === 0) {
                const minutes = differenceInMinutes(new Date(), new Date(campaign.updatedAt));
                return `Cập nhật ${minutes} phút trước`
            }
            return `Cập nhật ${hours} giờ trước`;
        } else return `Cập nhật ${days} ngày trước`
    }

    const handleDelete = () => {
        if (setOpenModal && setDeleteCampaignId) {
            setOpenModal(true);
            setDeleteCampaignId(campaign.id as string);
        }
    }

    return (
        <div className='flex bg-green-50 hover:border-[#00b14f] shadow-sm shadow-green-200 border-2 border-[#f2fbf6] rounded-lg'>
            <div className='p-0 sm:p-4 rounded-lg'>
                <Image
                    src={ campaign.image ? campaign.image : "https://res.cloudinary.com/dngl8ihk7/image/upload/v1686058298/jfrql1oot1iyatc63ctz.jpg" }
                    alt="img"
                    width={ 100 }
                    height={ 100 }
                    className='p-2 border-[#ccc] border-2 w-[50px] h-[50px] md:w-[100px] md:h-[100px] object-contain rounded-lg'
                />
            </div>
            <div className=' flex-[1] py-2 px-4'>
                <div className='sm:flex items-center justify-between'>
                    <h3
                        onClick={ () => router.push(`/campaigns/${campaign.id}`) }
                        className='font-bold text-sm md:text-lg lg:text-sm xl:text-lg text-[#333] hover:text-[#00b14f] hover:cursor-pointer'
                    >
                        { campaign.title }
                    </h3>
                    {
                        modify &&
                        <div className='sm:w-[200px] w-fit m-2 sm:m-0 flex ml-auto sm:ml-0'>
                            <button
                                className=' text-yellow-500 w-[64px] h-[30px] sm:h-auto text-xs sm:text-sm sm:w-[100px] border-yellow-500 bg-[#e5f7ed] px-1 sm:px-4 mx-2 py-1 sm:py-2 border-2 rounded-lg'>
                                <Link href={ `/campaigns/my-campaigns/${campaign.id}` }>
                                    Chỉnh sửa
                                </Link>
                            </button>
                            <button onClick={ handleDelete }
                                className=' text-rose-500 w-[48px] sm:w-[60px] h-[30px] sm:h-auto text-xs sm:text-sm border-rose-500 bg-[#e5f7ed] px-1 sm:px-4 mx-2 py-1 sm:py-2 border-2 rounded-lg'
                            >
                                Xóa
                            </button>
                        </div>
                    }
                </div>

                <div className='flex gap-2 my-2'>
                    <BsBuildings size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-xs sm:text-sm'>{ company?.name }</span>
                </div>
                <div className='flex gap-2 my-2'>
                    <GoLocation size={ 20 } />
                    { locats.map(locat => (
                        locat.value !== 'all' && campaign.locations.includes(locat.value as Location) && (
                            <span key={ locat.value } className='text-[#6f7882] font-semibold text-xs sm:text-sm'>
                                { locat.label }
                            </span>
                        )
                    )) }

                </div>
                <div className='flex gap-2 my-2'>
                    <AiOutlineClockCircle size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-xs sm:text-sm'>{ leftDate() } </span>
                </div>
                <div className='flex justify-between text-sm items-center 2xl:pr-12'>
                    <div className='text-xs sm:text-sm border-2 px-2 py-1 rounded-xl text-[#666]'>
                        { industry }
                    </div>
                    <div className='text-[#00b14f] font-bold bg-[#e5f7ed] px-2 py-1 rounded-lg text-xs sm:text-sm'>{ salary }</div>
                    <div className='hidden 2xl:block text-sm font-semibold text-[#74777a]'>{ updatedAt() }</div>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard;