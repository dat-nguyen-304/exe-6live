'use client';

import dynamic from "next/dynamic";
import { IconType } from "react-icons";


import { User } from "@/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import Heading from "../Heading";

interface ListingInfoProps {

}

const ListingInfo: React.FC = () => {

    return (
        <div className="!flex-1">
            <Heading
                title="Trấn Thành"
                subtitle="TP. Hồ Chí Minh"
            />
            <div
                className="text-xl font-semibold flex flex-row items-center gap-2 my-4">
                <div>Mức lương tham khảo: 200.000.000 VNĐ</div>
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
            <div className="text-lg font-light text-neutral-500 mt-4">
                Mô tả: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
        </div>
    );
}

export default ListingInfo;