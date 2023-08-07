import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { Company, Kol, User, UserRole } from '@/types';
import useUser from '@/hooks/useUser';
import useKol from '@/hooks/useKol';
import useCompany from '@/hooks/useCompany';

interface UserMenuProps {
    currentUser?: Kol | Company | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const toggleOpen = useCallback(() => {
        setIsOpen(value => !value);
    }, []);
    const myUser = useUser();
    const myKol = useKol();
    const myCompany = useCompany();

    const handleLogout = () => {
        myUser.onChangeUser(null);
        if (myUser.user?.role === UserRole.company) {
            myCompany.onChangeCompany(null);
        } else myKol.onChangeKol(null);
        localStorage.removeItem('6live_email');
        localStorage.removeItem('6live_role');
        router.push('/');
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute z-[100] rounded-xl shadow-mdw-[40vw]md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer z-[10]">
                        {currentUser ? (
                            <div className="z-10 bg-slate-50 shadow-lg">
                                <MenuItem
                                    label="Hồ sơ"
                                    onClick={() => {
                                        router.push('/profile');
                                    }}
                                />
                                <hr />
                                <MenuItem
                                    label="Lịch sử giao dịch"
                                    onClick={() => {
                                        router.push('/history');
                                    }}
                                />
                                <hr />
                                <MenuItem
                                    label="Đổi mật khẩu"
                                    onClick={() => {
                                        router.push('/change-password');
                                    }}
                                />
                                <hr />
                                <MenuItem label="Đăng xuất" onClick={handleLogout} />
                            </div>
                        ) : (
                            <>
                                <MenuItem label="Đăng nhập" onClick={loginModal.onOpen} />
                                <MenuItem label="Đăng ký" onClick={registerModal.onOpen} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
