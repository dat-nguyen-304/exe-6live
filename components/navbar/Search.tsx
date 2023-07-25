import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navbar } from 'flowbite-react';

const Search = () => {
    const myUser = useUser();
    const router = useRouter();
    const path = router.pathname;

    let menu = [];
    const [role, setRole] = useState('guest');

    useEffect(() => {
        if (myUser.user) {
            setRole(myUser.user.role);
        } else setRole("guest");
    }, [myUser.user]);

    if (role === "company") menu = [
        {
            name: "Trang chủ",
            path: "/"
        },
        {
            name: "Kols",
            path: "/kols"
        }, {
            name: "Đăng chiến dịch mới",
            path: "/campaigns/post"
        }, {
            name: "Chiến dịch của tôi",
            path: "/campaigns/my-campaigns"
        }, {
            name: "Đăng ký gói",
            path: "/payment"
        }
    ];
    else if (role === "kol") menu = [
        {
            name: "Trang chủ",
            path: "/"
        },
        {
            name: "Chiến dịch",
            path: "/campaigns"
        }, {
            name: "Đăng ký gói",
            path: "/payment"
        }
    ];
    else menu = [
        {
            name: "Trang chủ",
            path: "/"
        },
        {
            name: "Kols",
            path: "/kols"
        },
        {
            name: "Chiến dịch",
            path: "/campaigns"
        }
    ];

    return (
        <div className="flex-1 md:flex-none">
            <Navbar
                fluid
                rounded
                className="!bg-green-100"
            >
                <Navbar.Toggle />
                <Navbar.Collapse>
                    {
                        menu.map((item, index) => (
                            <Navbar.Link key={ index }
                                active={ path === item.path ? true : false }
                                href={ item.path }
                                className={ path === item.path ? "bg-green-200 !text-green-500" : "" }
                            >
                                <p className="text-sm md:text-base">
                                    { item.name }
                                </p>
                            </Navbar.Link>
                        ))
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default Search