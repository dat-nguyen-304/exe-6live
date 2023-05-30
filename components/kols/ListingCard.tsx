import { KOL, User } from "@/types/index";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingCardProps {
    data: KOL;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: User | null
}

const ListingCard: React.FC<ListingCardProps> = ({
    data, onAction, disabled, actionLabel, actionId = "", currentUser
}) => {
    const router = useRouter();

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) return;
        onAction?.(actionId)
    }

    return (
        <div className="col-span-1 cursor-pointer group border-2 border-green-200 shadow-lg rounded-xl overflow-hidden"
            onClick={ () => router.push(`/kols/${data.id}`) }
        >
            <div className="flex flex-col w-full">
                <div className="w-full relative overflow-hidden rounded-xl">
                    <Image
                        height={ 100 }
                        width={ 200 }
                        alt="Listing"
                        src="/images/hansara.png"
                        className="object-cover w-full rounded-xl group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={ data.id }
                            currentUser={ currentUser }
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg bg-green-50 flex justify-between items-baseline p-4">
                    <div className="text-green-700">
                        HanSara
                    </div>
                    <div className="font-light text-sm">
                        TP. Hồ Chí Minh
                    </div>
                </div>
                <div className="flex gap-1 font-light text-neutral-500 px-4">
                    <div className="inline-block border-green-100 py-1 px-2 rounded-xl text-sm border-2 border-gray">
                        Thức ăn
                    </div>
                    <div className="inline-block border-green-100 py-1 px-2 rounded-xl text-sm border-2 border-gray">
                        Mỹ phẩm
                    </div>
                    <div className="inline-block border-green-100 py-1 px-2 rounded-xl text-sm border-2 border-gray">
                        Trang sức
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1 p-4">
                    <div className="font-semibold text-green-800">
                        200.000.000
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingCard