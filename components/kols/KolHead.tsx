import Image from "next/image";
import { Industry, Kol } from "@/types";
import { platforms as platfs, genders, industries, locations } from "@/utils/variables";
import useUser from "@/hooks/useUser";

interface ListingHeadProps {
    id: string;
    currentKol: Kol
}

const ListingHead: React.FC<ListingHeadProps> = ({ id, currentKol }) => {
    const myUser = useUser();
    const role = myUser.user?.role;

    return (
        <div className="flex-[1] px-8">
            <div className="relative">
                <div className="lg:flex">
                    <Image
                        src={ currentKol?.image as string }
                        width={ 200 }
                        height={ 200 }
                        className="object-cover rounded-lg mx-auto lg:mx-0"
                        alt="Image"
                    />
                    <div className="mt-4 lg:mt-0 lg:ml-8">
                        <div className="text-md font-light">
                            <span className='font-bold text-md'>Tên: </span>
                            <span className="font-normal text-[#333]">{ currentKol?.name }</span>
                        </div>
                        <div className="text-md font-light mt-2">
                            {
                                locations.map(location => (
                                    location.value === currentKol?.location && (
                                        <span key={ location.value }>
                                            <span className='font-bold text-md'>Địa chỉ: </span>
                                            <span className="ml-2 font-normal text-[#333]">{ location.label }</span>
                                        </span>
                                    )
                                ))
                            }
                        </div>
                        <div className="text-md font-light mt-2">
                            <span className='font-bold text-md'>Mức lương tham khảo: </span>
                            <span className="font-normal text-[#333]">
                                { currentKol?.salary && new Intl.NumberFormat('vi-VN').format(parseInt(currentKol.salary)) } VNĐ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-4" />

            <div className="sm:flex flex-row items-center gap-16 font-light my-4">
                <div className="py-1 sm:py-0">
                    <span className='font-bold text-md'>Giới tính: </span>
                    {
                        genders.map(gender => (
                            gender.value === currentKol?.gender && gender.label
                        ))
                    }
                </div>
                <div className="py-1 sm:py-0">
                    <span className='font-bold text-md'>Tuổi: </span>
                    { currentKol?.age }
                </div>
                <div className="py-1 sm:py-0">
                    <span className='font-bold text-md'>Trạng thái: </span>
                    { currentKol?.status ?
                        <span className="text-green-400">Đang tìm việc</span> :
                        <span className="text-rose-400">Đang tắt</span>
                    }

                </div>
            </div>
            {
                (role as string !== "guest") &&
                <>
                    <hr />
                    <div className="flex flex-row items-center gap-4 font-light my-4">
                        <div>
                            <span className='font-bold text-md'>SĐT: </span>
                            { currentKol?.phone }
                        </div>
                        <div>
                            <span className='font-bold text-md'>Email: </span>
                            { currentKol?.email }
                        </div>
                    </div></>
            }

            <hr />
            <div className="my-4 font-light">
                <span className='font-bold text-md mr-4'>Trạng thái: </span>
                { industries.map((industry) => (
                    (currentKol?.industries as Industry[]).includes(industry.value as Industry) && (
                        <div key={ industry.value } className="inline-block py-1 px-2 rounded-xl text-sm border-2 border-gray">
                            { industry.label }
                        </div>
                    )
                )) }
            </div>
            <hr />

            <div className="flex items-center mt-4">
                <span className="font-bold text-md mr-4 md:mr-[200px]">Cách kênh tham gia:</span>
                <div className="flex gap-4 items-center">
                    {
                        (!currentKol.platforms || currentKol.platforms.length === 0) ?
                            <span>Chưa đăng ký</span>
                            :
                            platfs.map((plaf: any) => (
                                currentKol?.platforms?.includes(plaf.value) &&
                                <plaf.icon key={ plaf.value } size={ 20 } color="#999" />
                            ))
                    }
                </div>
            </div>
        </div>

    );
}

export default ListingHead;