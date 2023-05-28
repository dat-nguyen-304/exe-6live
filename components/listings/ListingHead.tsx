import Image from "next/image";
import { User } from "@/types";

import HeartButton from "../HeartButton";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiTiktok } from "react-icons/si";

interface ListingHeadProps {
    id: string;
    currentUser?: User | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    currentUser
}) => {

    return (
        <div className="flex-[1] px-8">
            <div className="relative">
                <div className="flex">
                    <Image
                        src="https://yt3.googleusercontent.com/ytc/AGIKgqPnGjkhAi0wRgcuhFbY7gtC_fTIhZONLCuGRO-K2Q=s900-c-k-c0x00ffffff-no-rj"
                        width={ 200 }
                        height={ 200 }
                        className="object-cover"
                        alt="Image"
                    />
                    <div className="ml-8">
                        <div className="text-md font-light text-neutral-500">
                            Họ và tên: <span className="font-normal text-[#333]">Trấn Thành</span>
                        </div>
                        <div className="text-md font-light text-neutral-500 mt-2">
                            Địa chỉ: <span className="font-normal text-[#333]">TP. Hồ Chí Minh</span>
                        </div>
                        <div className="text-md font-light text-neutral-500 mt-2">
                            Mức lương tham khảo: <span className="font-normal text-[#333]">200.000.000 VNĐ</span>
                        </div>
                    </div>
                </div>

                <div className="absolute top-5 left-[160px]">
                    <HeartButton
                        listingId={ id }
                        currentUser={ currentUser }
                    />
                </div>
            </div>
            <hr className="mt-4" />

            <div className="flex flex-row items-center gap-4 font-light text-neutral-500 my-4">
                <div>
                    Giới tính: Nam
                </div>
                <div>
                    Tuổi: 40
                </div>
                <div>
                    Trạng thái: <span className="text-green-400">Đang tìm việc</span>
                </div>
            </div>
            <hr />
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500 my-4">
                <div>
                    SĐT: 0987654321
                </div>
                <div>
                    Email: tranthanh@gmail.com
                </div>
            </div>
            <hr />
            <div className="my-4 font-light text-neutral-500">
                <span className="mr-4">Ngành:</span>
                <div className="inline-block py-1 px-2 rounded-xl text-sm border-2 border-gray">
                    Thức ăn
                </div>
                <div className="inline-block py-1 px-2 rounded-xl text-sm border-2 border-gray">
                    Mỹ phẩm
                </div>
                <div className="inline-block py-1 px-2 rounded-xl text-sm border-2 border-gray">
                    Trang sức
                </div>
            </div>
            <hr />

            <div className="flex items-center mt-4">
                <span className="font-light text-neutral-500 mr-[200px]">Cách kênh liên hệ:</span>
                <div className="flex gap-4 items-center">
                    <FaYoutube size={ 28 } color="#71869d" />
                    <FaFacebookSquare size={ 26 } color="#71869d" />
                    <AiFillInstagram size={ 28 } color="#71869d" />
                    <SiTiktok size={ 20 } color="#71869d" />
                </div>
            </div>
        </div>

    );
}

export default ListingHead;