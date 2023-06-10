import Image from "next/image";
import { Company } from "@/types";
import { platforms as platfs, industries as inds } from '@/utils/variables';
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";
import useUser from "@/hooks/useUser";

interface ListingHeadProps {
    id: string;
    company: Company
}

const ListingHead: React.FC<ListingHeadProps> = ({ id, company }) => {
    const myUser = useUser();
    const role = myUser.user?.role;

    const registeredDate = () => {
        const years = differenceInYears(new Date(), new Date(company.createdAt));
        if (years === 0) {
            const months = differenceInMonths(new Date(), new Date(company.createdAt));
            if (months === 0) {
                const days = differenceInDays(new Date(), new Date(company.createdAt));
                return ` ${days} ngày trước`
            }
            return ` ${months} tháng trước`;
        } else return ` ${years} năm trước`
    }


    return (
        <div className="flex-[1] px-8">
            <div className="relative">
                <div className="flex">
                    <Image
                        src={ company.image ? company.image : "https://res.cloudinary.com/dngl8ihk7/image/upload/v1686058298/jfrql1oot1iyatc63ctz.jpg" }
                        width={ 240 }
                        height={ 240 }
                        className="object-cover p-2 border-2 rounded-full"
                        alt="Image"
                    />
                    <div className="ml-8 mt-8">
                        <div className="text-md font-light">
                            <span className='font-bold text-md'>Tên công ty: </span>
                            <span className="font-normal text-[#333]">{ company.name }</span>
                        </div>
                        <div className="text-md font-light mt-2">
                            <span className='font-bold text-md'>Đã tham gia: </span>
                            <span className="font-normal text-[#333]">{ registeredDate() }</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-4" />
            {
                (role as string !== "guest") &&
                <>
                    <hr />
                    <div className="flex flex-row items-center gap-4 font-light my-4">
                        <div>
                            <span className='font-bold text-md'>SĐT: </span>
                            { company.phone }
                        </div>
                        <div>
                            <span className='font-bold text-md'>Email: </span>
                            { company.email }
                        </div>
                    </div>
                </>
            }

            <hr />
            <div className="font-light my-4">
                <span className='block font-bold text-md'>Các chi nhánh: </span>
                <ul>
                    {
                        company.addresses?.map((address, index) => (
                            address &&
                            <li key={ index } className="text-md ml-4">
                                - { address }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <hr />
            <div className="text-md font-light my-4">
                <span className='font-bold text-md'>Giới thiệu: </span>
                { company.description }
            </div>
            <hr />
            <div className="flex items-center mt-4">
                <span className="font-bold text-md">Cách kênh liên hệ khác:</span>
                { platfs.map((platf: any) => (
                    platf.icon && company.platforms?.includes(platf.value) &&
                    <div key={ platf.value } className="cursor-pointer inline-flex mx-2 gap-4 py-1 px-2 rounded-xl text-sm border-2 border-gray">
                        <div className="flex items-center gap-4"><platf.icon size={ 16 } /> { platf.label }</div>
                    </div>

                )) }
            </div>
        </div >

    );
}

export default ListingHead;