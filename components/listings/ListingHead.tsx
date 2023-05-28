import Image from "next/image";
import { User } from "@/types";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    id: string;
    currentUser?: User | null
}

const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    currentUser
}) => {

    return (
        <div className="!h-[480px] !w-[480px] overflow-hidden rounded-xl relative mr-8">
            <Image
                src="https://yt3.googleusercontent.com/ytc/AGIKgqPnGjkhAi0wRgcuhFbY7gtC_fTIhZONLCuGRO-K2Q=s900-c-k-c0x00ffffff-no-rj"
                fill
                className="object-cover"
                alt="Image"
            />
            <div className="absolute top-5 right-5">
                <HeartButton
                    listingId={ id }
                    currentUser={ currentUser }
                />
            </div>
        </div>

    );
}

export default ListingHead;