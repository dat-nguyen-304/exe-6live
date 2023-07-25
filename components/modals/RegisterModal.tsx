import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import "@/config/firebase";


const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState<string>("kol");
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm: ''
        }
    });

    const saveRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setRole(e.target.value);
            sessionStorage.setItem("role", e.target.value);
        }
    }

    const registerWithGoogle = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCred) => {
                const newUser = {
                    email: userCred.user.email,
                    name: userCred.user.displayName,
                    image: userCred.user.photoURL,
                    role
                }

                axios.post("/api/accounts", newUser).then(res => {
                    if (res.data.err === 1) {
                        toast.error("Tài khoản đã tồn tại");
                    } else {
                        toast.success("Đăng ký thành công");
                        onToggle();
                    }
                });
            });
    }

    function isEmailValid(email: string): boolean {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const registerWithEmailPassword: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        const { confirm, ...payload } = data;
        if (!isEmailValid(payload.email)) {
            toast.error("Email không đúng.");
            setIsLoading(false);
            return;
        }
        if (confirm !== payload.password) {
            toast.error("Mật khẩu xác nhận không khớp.");
            setIsLoading(false);
            return;
        }

        const res = await axios.post('/api/accounts', { ...payload, role })
        if (res.data.err === 1) {
            toast.error("Email đã tồn tại");
            setIsLoading(false);
        } else {
            toast.success('Đăng ký thành công!');
            registerModal.onClose();
            loginModal.onOpen();
            setIsLoading(false);
            reset();
        }
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Chào mừng đến với 6Live"
                subtitle="Tạo tài khoản!"
            />
            <Input
                id="email"
                type="email"
                label="Email"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <Input
                id="name"
                label="Tên"
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
            />
            <Input
                id="confirm"
                label="Xác nhận mật khẩu"
                type="password"
                disabled={ isLoading }
                register={ register }
                errors={ errors }
                required
            />
            <div className="flex items-baseline justify-between mt-8">
                <h3>Bạn là: </h3>
                <div className="flex items-baseline gap-4">
                    <label className="cursor-pointer" htmlFor="kol">KOL/KOC</label>
                    <input name="role" id="kol" value="kol" type="radio" checked={ role === 'kol' }
                        onChange={ (e) => saveRole(e) }
                    />
                </div>
                <div className="flex items-baseline gap-4">
                    <label className="cursor-pointer" htmlFor="company">Doanh nghiệp</label>
                    <input name="role" value="company" id="company" type="radio" checked={ role === 'company' }
                        onChange={ (e) => saveRole(e) }
                    />
                </div>
            </div>

        </div>
    );

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Đăng ký với Google"
                icon={ FcGoogle }
                onClick={ () => registerWithGoogle() }
            />
            <div
                className="text-neutral-500 text-center mt-4 font-light">
                <p>Đã có tài khoản
                    <span
                        onClick={ onToggle }
                        className="text-neutral-800 cursor-pointer  hover:underline"
                    > Đăng nhập</span>
                </p>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={ isLoading }
            isOpen={ registerModal.isOpen }
            title="Đăng ký"
            actionLabel="Đăng ký"
            onClose={ registerModal.onClose }
            onSubmit={ handleSubmit(registerWithEmailPassword) }
            body={ bodyContent }
            footer={ footerContent }
        />
    )
}

export default RegisterModal