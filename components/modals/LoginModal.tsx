import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import "@/config/firebase";
import axios, { AxiosRequestConfig } from "axios";


import useRegisterModal from "../../hooks/useRegisterModal";
import useLoginModal from "../../hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useUser from "@/hooks/useUser";
import { User, Kol } from "@/types";
import useKol from "@/hooks/useKol";
import useCompany from "@/hooks/useCompany";

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

        const res = await axios.get(`/api/accounts?email=${user.user.email}`);
        const loginedUser = res.data;
        if (res.data.err === 1) {
            toast.error("Tài khoản chưa đăng ký");
        } else {
            console.log("LOGINED USER ", loginedUser);
            myUser.onChangeUser(loginedUser as User);
            if (loginedUser.role === 'kol')
                myKol.onChangeKol(loginedUser.kol);
            else myComapny.onChangeCompany(loginedUser.company);
            localStorage.setItem("6live_email", loginedUser.email);
            loginModal.onClose();
        }
    }

    const onSubmit = () => { };

    // const onSubmit: SubmitHandler<FieldValues> =
    //     (data) => {
    //         setIsLoading(true);

    //         signIn('credentials', {
    //             ...data,
    //             redirect: false,
    //         })
    //             .then((callback) => {
    //                 setIsLoading(false);

    //                 if (callback?.ok) {
    //                     toast.success('Logged in');
    //                     router.refresh();
    //                     loginModal.onClose();
    //                 }

    //                 if (callback?.error) {
    //                     toast.error(callback.error);
    //                 }
    //             });
    //     }

    const onToggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome back"
                subtitle="Login to your account!"
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
                label="Password"
                type="password"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
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
            title="Login"
            actionLabel="Continue"
            onClose={ loginModal.onClose }
            onSubmit={ handleSubmit(onSubmit) }
            body={ bodyContent }
            footer={ footerContent }
        />
    );
}

export default LoginModal;