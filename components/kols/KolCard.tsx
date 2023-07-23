import { Industry, Kol } from "@/types/index";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { industries } from "@/utils/variables";
import { locations } from "@/utils/variables";
import { platforms as platfs } from '@/utils/variables';

interface KolCardProps {
    kol: Kol;
    id: string
}

const KolCard: React.FC<KolCardProps> = ({ kol, id }) => {
    const router = useRouter();

    return (
        <div key={ id } className="col-span-1 cursor-pointer group border-2 border-green-200 shadow-xl rounded-xl overflow-hidden"
            onClick={ () => router.push(`/kols/${kol.id}`) }
        >
            <div className="flex flex-col w-full !h-full">
                <div className="w-full relative overflow-hidden rounded-xl">
                    <Image
                        height={ 200 }
                        width={ 200 }
                        alt="Listing"
                        src={ kol.image }
                        quality={ 100 }
                        className="object-cover w-full h-[220px] rounded-xl group-hover:scale-110 transition"
                    />
                </div>
                <div className="flex-[1]">
                    <div className="font-semibold text-lg flex justify-between items-baseline p-4">
                        <div className="text-green-700">
                            { kol.name }
                        </div>
                        <div className="font-light text-sm">
                            { locations.map((location) => (
                                (location.value === kol.location) && (
                                    <span key={ location.value }>{ location.label }</span>
                                )
                            )) }
                        </div>
                    </div>
                    <div className="mx-[-2px] flex gap-2 font-light text-neutral-500 px-4">
                        { industries.map((industry) => (
                            (kol.industries as Industry[])?.includes(industry.value as Industry) && (
                                <div key={ industry.value } className="inline-block border-green-400 py-1 px-2 rounded-xl text-[#333] text-[0.82rem] border-2 border-gray">
                                    { industry.label }
                                </div>
                            )
                        )) }
                    </div>
                    <div className="flex flex-row items-center gap-1 p-4 justify-between">
                        <div className="font-semibold text-green-800">
                            <span>{ kol.salary && new Intl.NumberFormat('vi-VN').format(parseInt(kol.salary)) }</span>
                        </div>
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                            { platfs.map((platf: any) => (
                                platf.icon && kol?.platforms?.includes(platf.value) &&
                                <platf.icon key={ platf.value } size={ 16 } />
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KolCard