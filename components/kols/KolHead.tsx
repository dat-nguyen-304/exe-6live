import Image from "next/image";
import { Industry, Kol } from "@/types";
import { platforms as platfs } from '@/utils/variables';
import HeartButton from "../HeartButton";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import { genders, industries, locations } from "@/utils/variables";

interface ListingHeadProps {
    id: string;
    currentKol: Kol
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    currentKol
}) => {

    return (
        <div className="flex-[1] px-8">
            <div className="relative">
                <div className="flex">
                    <Image
                        src={ currentKol?.image as string }
                        width={ 200 }
                        height={ 200 }
                        className="object-cover rounded-lg"
                        alt="Image"
                    />
                    <div className="ml-8">
                        <div className="text-md font-light text-neutral-500">
                            Họ và tên: <span className="font-normal text-[#333]">{ currentKol?.name }</span>
                        </div>
                        <div className="text-md font-light text-neutral-500 mt-2">
                            {
                                locations.map(location => (
                                    location.value === currentKol?.location && (
                                        <span key={ location.value }>Địa chỉ:
                                            <span className="ml-2 font-normal text-[#333]">{ location.label }</span>
                                        </span>
                                    )
                                ))
                            }
                        </div>
                        <div className="text-md font-light text-neutral-500 mt-2">
                            Mức lương tham khảo: <span className="font-normal text-[#333]">
                                { currentKol?.salary && new Intl.NumberFormat('vi-VN').format(parseInt(currentKol.salary)) } VNĐ
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute top-5 left-[160px]">
                    <HeartButton
                        kolId={ id }
                        currentKol={ null }
                    />
                </div>
            </div>
            <hr className="mt-4" />

            <div className="flex flex-row items-center gap-16 font-light text-neutral-500 my-4">
                <div>
                    Giới tính: {
                        genders.map(gender => (
                            gender.value === currentKol?.gender && gender.label
                        ))
                    }
                </div>
                <div>
                    Tuổi: { currentKol?.age }
                </div>
                <div>
                    <span className="mr-2">Trạng thái:</span>
                    { currentKol?.status ?
                        <span className="text-green-400">Đang tìm việc</span> :
                        <span className="text-rose-400">Đang tắt</span>
                    }

                </div>
            </div>
            <hr />
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500 my-4">
                <div>
                    SĐT: { currentKol?.phone }
                </div>
                <div>
                    Email: { currentKol?.email }
                </div>
            </div>
            <hr />
            <div className="my-4 font-light text-neutral-500">
                <span className="mr-4">Ngành:</span>
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
                <span className="font-light text-neutral-500 mr-[200px]">Cách kênh tham gia:</span>
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