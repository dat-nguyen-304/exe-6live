import { KOL, User } from "@/types/index";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

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
        <div className="col-span-1 cursor-pointer group border-2 rounded-xl overflow-hidden"
            onClick={ () => router.push(`/kols/${data.id}`) }
        >
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt="Listing"
                        src="https://yt3.googleusercontent.com/ytc/AGIKgqPnGjkhAi0wRgcuhFbY7gtC_fTIhZONLCuGRO-K2Q=s900-c-k-c0x00ffffff-no-rj"
                        className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            listingId={ data.id }
                            currentUser={ currentUser }
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg flex justify-between items-baseline p-2">
                    <div>
                        Trấn Thành
                    </div>
                    <div className="font-light text-sm">
                        TP. Hồ Chí Minh
                    </div>
                </div>
                <div className="font-light text-neutral-500 p-2">
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
                <div className="flex flex-row items-center gap-1 p-2">
                    <div className="font-semibold">
                        200.000.000
                    </div>
                </div>
                { onAction && actionLabel && (
                    <Button
                        disabled={ disabled }
                        small
                        label={ actionLabel }
                        onClick={ handleCancel }
                    />
                ) }
            </div>
        </div>
    )
}

export default ListingCard