import { KeyboardEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import "@/config/firebase";


import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useUser from "@/hooks/useUser";
import { User } from "@/types";
import useKol from "@/hooks/useKol";
import useCompany from "@/hooks/useCompany";
import axios from "axios";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const myUser = useUser();
    const myKol = useKol();
    const myComapny = useCompany();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const signInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        const res = await axios.post(`/api/accounts`, { email: user.user.email });

        const loginedUser = res.data;
        if (res.data.err === 1) {
            toast.error("Tài khoản chưa đăng ký");
        } else {
            toast.success("Đăng nhập thành công");
            myUser.onChangeUser(loginedUser as User);
            if (loginedUser.role === 'kol') {
                myKol.onChangeKol(loginedUser.kol);
                localStorage.setItem("6live_role", "kol");
            }
            else {
                myComapny.onChangeCompany(loginedUser.company);
                localStorage.setItem("6live_role", "company");
            }
            localStorage.setItem("6live_email", loginedUser.email);
            loginModal.onClose();
            router.push("/");
        }
    }

    const signInWithEmailPassword: SubmitHandler<FieldValues> = async (data) => {
        const res = await axios.post(`/api/accounts`, data);
        const loginedUser = res.data;
        if (res.data.err === 1) {
            toast.error("Sai email hoặc mật khẩu");
        } else {
            toast.success("Đăng nhập thành công");
            myUser.onChangeUser(loginedUser as User);
            if (loginedUser.role === 'kol') {
                myKol.onChangeKol(loginedUser.kol);
                localStorage.setItem("6live_role", "kol");
            }
            else {
                myComapny.onChangeCompany(loginedUser.company);
                localStorage.setItem("6live_role", "company");
            }
            localStorage.setItem("6live_email", loginedUser.email);
            loginModal.onClose();
            router.push("/");
        }
    }

    const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(signInWithEmailPassword)();
        }
    };

    const onToggle = () => {
        loginModal.onClose();
        registerModal.onOpen();
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Chào mừng trở lại"
                subtitle="Đăng nhập!"
            />
            <Input
                id="email"
                label="Email"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <Input
                id="password"
                label="Mật khẩu"
                type="password"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
                onKeyDown={ handlePressEnter }
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Đăng nhập với Google"
                icon={ FcGoogle }
                onClick={ () => signInWithGoogle() }
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <p>Bạn chưa có tài khoản?
                    <span className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={ onToggle }
                    > Tạo tài khoản ngay</span>
                </p>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={ isLoading }
            isOpen={ loginModal.isOpen }
            title="Đăng nhập"
            actionLabel="Đăng nhập"
            onClose={ loginModal.onClose }
            onSubmit={ handleSubmit(signInWithEmailPassword) }
            body={ bodyContent }
            footer={ footerContent }
        />
    );
}

export default LoginModal;