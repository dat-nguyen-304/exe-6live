import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useUser from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useKol from '@/hooks/useKol';
import useCompany from '@/hooks/useCompany';
import { UserRole } from '@/types';

const ChangePassword = () => {
    const myUser = useUser();
    const myKol = useKol();
    const myCompany = useCompany();
    const router = useRouter();
    const {
        register,
        handleSubmit,
    } = useForm<FieldValues>({
        defaultValues: {
            email: myUser.user?.email,
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const handleLogout = () => {
        myUser.onChangeUser(null);
        if (myUser.user?.role === UserRole.company) {
            myCompany.onChangeCompany(null);
        } else myKol.onChangeKol(null);
        localStorage.removeItem("6live_email");
        localStorage.removeItem("6live_role");
        router.push("/");
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const { confirmPassword, ...payload } = data;
        if (payload.newPassword !== confirmPassword) {
            toast.error("Xác nhận mật khẩu mới không khớp");
            return;
        }
        console.log({ ...payload, email: myUser.user?.email });
        try {
            const res = await axios.put("/api/password", { ...payload, email: myUser.user?.email });
            if (res.data.err === 0) {
                toast.success("Cập nhật thành công. Vui lòng đăng nhập lại");
                handleLogout();
            } else if (res.data.err === 1)
                toast.error("Sai mật khẩu cũ")
        } catch (error) {
            toast.error("Vui lòng thử lại sau");
            console.log(error);
        }
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="flex max-w-md flex-col gap-4 w-[800px]">
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="oldPassword"
                        value="Mật khẩu cũ"
                    />
                    <span className='italic text-xs'> (Bỏ qua nếu bạn chưa cập nhật mật khẩu trước đây)</span>
                </div>
                <TextInput
                    id="oldPassword"
                    type="password"
                    { ...register("oldPassword") }
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="newPassword"
                        value="Mật khẩu mới"
                    />
                </div>
                <TextInput
                    id="newPassword"
                    required
                    type="password"
                    { ...register("newPassword") }
                />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label
                        htmlFor="confirmPassword"
                        value="Nhập lại mật khẩu mới"
                    />
                </div>
                <TextInput
                    id="confirmPassword"
                    required
                    type="password"
                    { ...register("confirmPassword") }
                />
            </div>
            <Button type="submit" className='bg-green-500 hover:bg-green-400'>
                Submit
            </Button>
        </form>
    )
}

export default ChangePassword