import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Campaign, Company, Location } from '@/types';
import axios from 'axios';
import { platforms as platfs, locations as locats, genders as gends, industries } from '@/utils/variables';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { useRouter } from 'next/router';


interface CampaignCardProps {
    campaign: Campaign
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
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
        return (!campaign.minSalary && !campaign.maxSalary) ? 'Thỏa thuận' : `${campaign.minSalary} - ${campaign.maxSalary}`
    }, [campaign.minSalary, campaign.maxSalary]);

    const leftDate = () => {
        const days = differenceInDays(new Date(campaign.expiredDate), new Date());
        return (days < 1) ? "Đã hết hạn ứng tuyển" : `Còn ${days} ngày để ứng tuyển`;
    }

    const updatedDate = () => {
        const days = differenceInDays(new Date(), new Date(campaign.updatedDate));
        if (days === 0) {
            const hours = differenceInHours(new Date(), new Date(campaign.updatedDate));
            if (hours === 0) {
                const minutes = differenceInMinutes(new Date(), new Date(campaign.updatedDate));
                return `Cập nhật ${minutes} phút trước`
            }
            return `Cập nhật ${hours} giờ trước`;
        } else return `Cập nhật ${days} ngày trước`
    }

    return (
        <div className='flex bg-green-50 hover:border-[#00b14f] shadow-lg shadow-green-200 border-2 border-[#f2fbf6] rounded-lg cursor-pointer'
            onClick={ () => router.push(`/campaigns/${campaign.id}`) }
        >
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
                    { campaign.title }
                </h3>
                <div className='flex gap-2 my-2'>
                    <BsBuildings size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-sm'>{ company?.name }</span>
                </div>
                <div className='flex gap-2 my-2'>
                    <GoLocation size={ 20 } />
                    { locats.map((locat, index) => (
                        (
                            locat.value !== 'all' && campaign.locations.includes(locat.value as Location) && (
                                <span key={ locat.value } className='text-[#6f7882] font-semibold text-sm'>
                                    { locat.label }
                                </span>
                            )
                        )
                    )) }

                </div>
                <div className='flex gap-2 my-2'>
                    <AiOutlineClockCircle size={ 20 } />
                    <span className='text-[#6f7882] font-semibold text-sm'>{ leftDate() } </span>
                </div>
                <div className='flex justify-between text-sm items-center pr-12'>
                    <div className='text-sm border-2 px-2 py-1 rounded-xl text-[#666]'>
                        { industry }
                    </div>
                    <div className='text-[#00b14f] font-bold bg-[#e5f7ed] px-2 py-1 rounded-lg'>{ salary }</div>
                    <div className='text-sm font-semibold text-[#74777a]'>{ updatedDate() }</div>
                </div>
            </div>
        </div>
    )
}

export default CampaignCard;