
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { User } from "@/types";

interface UserMenuProps {
    currentUser?: User | null
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    // currentUser = null;
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, []);

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>

                <div onClick={ toggleOpen } className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'>
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={ currentUser?.avatar } />
                    </div>
                </div>
            </div>
            { isOpen && (
                <div className="absolute rounded-xl shadow-mdw-[40vw]md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer z-10">
                        { currentUser ? (
                            <div className="z-10 bg-slate-50 shadow-lg">
                                <MenuItem
                                    label="Hồ sơ"
                                    onClick={ () => { router.push("/profile") } }
                                />
                                <hr />
                                <MenuItem
                                    label="Logout"
                                    onClick={ () => { } }
                                />
                            </div>
                        ) : (
                            <>
                                <MenuItem
                                    label="Login"
                                    onClick={ loginModal.onOpen }
                                />
                                <MenuItem
                                    label="Sign up"
                                    onClick={ registerModal.onOpen }
                                />
                            </>
                        ) }
                    </div>
                </div>
            ) }
        </div>
    )
}

export default UserMenu