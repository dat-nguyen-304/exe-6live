import { Campaign, Company } from '@/types';
import Image from 'next/image'
import Link from 'next/link';
import React, { useMemo } from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegPaperPlane } from "react-icons/fa";
import { locations as locats, genders as gends, industries } from '@/utils/variables';
import { format } from 'date-fns';
import { Gender } from '@/types';
import { Location } from '@/types';
import axios from 'axios';
import useKol from '@/hooks/useKol';
import useSuccessModal from '@/hooks/useSuccessModal';
import SuccessModal from '../modals/SuccessModal';
import parse from 'html-react-parser';

interface CampaignDetailProps {
    campaign: Campaign,
    company: Company
}

const CampaignDetail: React.FC<CampaignDetailProps> = ({ campaign, company }) => {
    const myKol = useKol();
    const successModal = useSuccessModal();
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

    const sendEmail = async () => {
        const res = await axios.post("/api/emails", {
            kol: myKol.kol,
            campaign, company
        });
        if (res.data.msg === "success") {
            console.log("YES");
            successModal.onContent("Đã gửi thông tin cho doanh nghiệp");
            successModal.onOpen();
        }
    }

    return (
        <>
            <div className="md:flex p-4 sm:p-8 rounded-xl justify-between border-2 bg-white shadow-lg">
                <div className='sm:flex sm:flex-[1] gap-8 items-center'>
                    <Image
                        src={ campaign.image ? campaign.image : "https://res.cloudinary.com/dngl8ihk7/image/upload/v1686058298/jfrql1oot1iyatc63ctz.jpg" }
                        alt="img"
                        width={ 100 }
                        height={ 100 }
                        className='mx-auto sm:mx-0 p-2 border-[#ccc] border-2 w-[100px] h-[100px] object-contain rounded-lg'
                    />
                    <div className='mt-4 sm:mt-0'>
                        <h3 className='text-[#00b14f] text-lg sm:text-xl font-bold text-center'>
                            { campaign?.title }
                        </h3>
                        <Link
                            href={ `/companies/${company.id}` }
                            className='sm:inline block cursor-pointer text-[#333] my-2 font-semibold text-center text-sm'
                        >
                            { company?.name }
                        </Link>
                        <div className='flex gap-2 mt-2 sm:mt-4 justify-center items-center'>
                            <AiOutlineClockCircle size={ 20 } className='w-[15px] h-[15px] sm:w-[20px] sm:h-[20px]' />
                            <span className='text-[#6f7882] font-semibold text-sm'>
                                Hạn nộp hồ sơ: { format(new Date(campaign.expiredDate), 'dd/MM/yyy') }
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:mr-4 mx-auto items-center md:items-baseline'>
                    {
                        myKol.kol &&
                        <>
                            <button onClick={ sendEmail } className='w-[150px] mt-4 md:mt-0 md:w-auto border-[#00b14f] border-2 bg-[#00b14f] text-white py-2 px-4 rounded-lg text-sm flex items-center'>
                                <FaRegPaperPlane />
                                <span className='ml-4 sm:ml-2 text-xs sm:text-sm'>Ứng tuyển ngay</span>
                            </button>
                            <SuccessModal />
                        </>
                    }

                </div>
            </div>
            <div className="mt-4 bg-white shadow-lg  border-2 py-10 px-4 md:px-8 rounded-xl">
                <p className='font-bold text-md'>- Thông tin chung: </p>
                <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 text-sm gap-4 p-4'>
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
                    <div className='md:col-span-2'>
                        <span className='font-semibold'>Văn phòng tại: </span> { locations() }
                    </div>
                    <div className='md:col-span-2'>
                        <span className='font-semibold'>Nền tảng yêu cầu: </span> { platforms() }
                    </div>
                </div>
                <div>
                    <p className='my-4 font-bold text-md'>- Mô tả công việc:</p>
                    <div>
                        { parse(campaign.description) }
                    </div>
                </div>
                <div className="">
                    <p className='my-4 font-bold text-md'>- Quyền lợi:</p>
                    <div>
                        { parse(campaign.benefit) }
                    </div>
                </div>
                {
                    myKol.kol &&
                    <div className='mt-8 flex'>

                        <button onClick={ sendEmail } className='mr-4 border-[#00b14f] border-2 bg-[#00b14f] text-white py-2 px-4 rounded-lg text-sm flex items-center'>
                            <FaRegPaperPlane />
                            <span className='ml-2'>Ứng tuyển ngay</span>
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default CampaignDetail;