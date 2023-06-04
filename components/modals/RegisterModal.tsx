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
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const saveRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setRole(e.target.value);
            sessionStorage.setItem("role", e.target.value);
        }
    }

    const signInWithGoogle = () => {
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
                    console.log("RES: ", res);
                    if (res.data.err === 1) {
                        console.log("YES");
                        toast.error("Tài khoản đã tồn tại");
                    }
                });
            });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error("Something went wrong");
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
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
                id="name"
                label="Name"
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
            <div className="flex items-baseline justify-between">
                <h3>Bạn là: </h3>
                <div className="flex items-baseline gap-4">
                    <label htmlFor="kol">KOL/KOC</label>
                    <input name="role" id="kol" value="kol" type="radio" checked={ role === 'kol' }
                        onChange={ (e) => saveRole(e) }
                    />
                </div>
                <div className="flex items-baseline gap-4">
                    <label htmlFor="company">Doanh nghiệp</label>
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
                label="Continue with Google"
                icon={ FcGoogle }
                onClick={ () => signInWithGoogle() }
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
            title="Register"
            actionLabel="Continue"
            onClose={ registerModal.onClose }
            onSubmit={ () => { } }
            body={ bodyContent }
            footer={ footerContent }
        />
    )
}

export default RegisterModal