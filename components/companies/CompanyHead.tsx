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
                        src="https://ysedu.yuanta.com.vn/wp-content/uploads/2022/05/fpt-0.jpg"
                        width={ 300 }
                        height={ 200 }
                        className="object-cover"
                        alt="Image"
                    />
                    <div className="ml-8">
                        <div className="text-md font-light text-neutral-500">
                            Tên công ty: <span className="font-normal text-[#333]">Công ty ABC</span>
                        </div>

                        <div className="text-md font-light text-neutral-500 mt-2">
                            Đã tham gia: <span className="font-normal text-[#333]">2 năm trước</span>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="mt-4" />
            <hr />
            <div className="flex flex-row items-center gap-4 font-light text-neutral-500 my-4">
                <div>
                    SĐT: 0987654321
                </div>
                <div>
                    Email: congtyabc@abc.com
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
            <div className="font-light text-neutral-500 my-4">
                <div>
                    Các chi nhánh
                </div>
                <ul>
                    <li className="text-sm ml-4">
                        Lot E3, D2 street, High-tech park Long Thạnh Mỹ Ward 9 District, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh
                    </li>
                    <li className="text-sm ml-4">
                        Lot E3, D2 street, High-tech park Long Thạnh Mỹ Ward 9 District, Long Thạnh Mỹ, Quận 9, Thành phố Hồ Chí Minh
                    </li>
                </ul>
            </div>
            <hr />
            <div className="text-md font-light text-neutral-500 my-4">
                Giới thiệu: Mô tả: Công ty Cổ phần Viễn thông FPT (tên gọi tắt là FPT Telecom) hiện là một trong những nhà cung cấp dịch vụ Viễn thông và Internet hàng đầu khu vực.

                Thành lập ngày 31/01/1997, khởi nguồn từ Trung tâm Dịch vụ Trực tuyến do 4 thành viên sáng lập cùng sản phẩm mạng Intranet đầu tiên của Việt Nam mang tên “Trí tuệ Việt Nam – TTVN”, sản phẩm được coi là đặt nền móng cho sự phát triển của Internet tại Việt Nam
            </div>
            <hr />
            <div className="flex items-center mt-4">
                <span className="font-light text-neutral-500 mr-[200px]">Cách kênh liên hệ khác:</span>
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