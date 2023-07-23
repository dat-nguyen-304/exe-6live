import useUser from "@/hooks/useUser";
import Link from "next/link";
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

    // const selected = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded sm:bg-transparent sm:text-blue-700 sm:p-0 sm:dark:text-blue-500";
    // const nonSelected = "block py-2 pl-3 pr-4 text-gray-900 rounded sm:hover:text-blue-700 sm:p-0 sm:dark:hover:text-blue-500 dark:text-white dark:hover:bg-green-100 dark:hover:text-white dark:border-gray-700";
    const selected = "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded sm:bg-transparent sm:text-blue-700 sm:p-0 dark:text-white sm:dark:text-blue-500";
    const nonSelected = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-green-100 sm:hover:bg-transparent sm:border-0 sm:hover:text-blue-700 sm:p-0 dark:text-white sm:dark:hover:text-blue-500 dark:hover:bg-green-700 dark:hover:text-white sm:dark:hover:bg-transparent";
    return (
        // <div className="bg-green-100">
        //     <ul className="text-[1rem] flex  p-4 sm:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-green-100 sm:flex-row sm:space-x-8 sm:mt-0 sm:border-0 dark:bg-green-100 sm:dark:bg-green-100">
        //         {
        //             menu.map((item, index) => (
        //                 <li key={ index } className={ path === item.path ? selected : nonSelected }>
        //                     <Link href={ item.path }>
        //                         { item.name }
        //                     </Link>
        //                 </li>
        //             ))
        //         }
        //     </ul>
        // </div>
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
                                className={ path === item.path ? "bg-green-500" : "" }
                            >
                                <p>
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