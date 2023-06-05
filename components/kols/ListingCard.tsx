import { Industry, Kol, User } from "@/types/index";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { industries } from "../inputs/IndustrySelect";
import { locations } from "../inputs/LocationSelect";

interface ListingCardProps {
    kol: Kol;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({
    kol, onAction, disabled, actionLabel, actionId = ""
}) => {
    const router = useRouter();

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) return;
        onAction?.(actionId)
    }

    return (
        <div className="col-span-1 cursor-pointer group border-2 border-green-200 shadow-lg rounded-xl overflow-hidden"
            onClick={ () => router.push(`/kols/${kol.id}`) }
        >
            <div className="flex flex-col w-full">
                <div className="w-full relative overflow-hidden rounded-xl">
                    <Image
                        height={ 400 }
                        width={ 200 }
                        alt="Listing"
                        src={ kol.image }
                        className="object-cover w-full h-[240px] rounded-xl group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton
                            kolId={ kol.id }
                            currentKol={ kol }
                        />
                    </div>
                </div>
                <div className="font-semibold text-lg bg-green-50 flex justify-between items-baseline p-4">
                    <div className="text-green-700">
                        { kol.name }
                    </div>
                    <div className="font-light text-sm">
                        { locations.map((location) => (
                            (location.value === kol.location) && (
                                <span>{ location.label }</span>
                            )
                        )) }
                    </div>
                </div>
                <div className="flex gap-1 font-light text-neutral-500 px-4">
                    { industries.map((industry) => (
                        (kol.industries as Industry[]).includes(industry.value as Industry) && (
                            <div className="inline-block border-green-100 py-1 px-2 rounded-xl text-sm border-2 border-gray">
                                { industry.label }
                            </div>
                        )
                    )) }
                </div>
                <div className="flex flex-row items-center gap-1 p-4">
                    <div className="font-semibold text-green-800">
                        { kol.salary }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingCard