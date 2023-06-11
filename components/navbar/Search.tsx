import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
            name: "Chiến dịch",
            path: "/campaigns"
        }, {
            name: "Kols",
            path: "/kols"
        }
    ];

    const selected = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";
    const nonSelected = "block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-green-100 dark:hover:text-white dark:border-gray-700";
    return (
        <div className="bg-green-100">
            <ul className="text-[1rem] flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-green-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-green-100 md:dark:bg-green-100">
                {
                    menu.map((item, index) => (
                        <li key={ index } className={ path === item.path ? selected : nonSelected }>
                            <Link href={ item.path }>
                                { item.name }
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Search