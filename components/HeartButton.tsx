import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { User } from "@/types";


interface HeartButtonProps {
    listingId: string
    currentUser?: User | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {

    return (
        <div
            onClick={ () => { } }
            className="relative hover:opacity-80 transition cursor-pointer">
            <AiOutlineHeart
                size={ 28 }
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={ 24 }
                // className={ hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70' }
                className="fill-rose-500"
            />
        </div>
    );
}

export default HeartButton;