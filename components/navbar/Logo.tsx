'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            onClick={ () => router.push('/') }
            className="hidden md:block cursor-pointer"
            src="https://scontent.fsgn3-1.fna.fbcdn.net/v/t39.30808-6/347818924_975150196838059_8442840371471001402_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=JhZc-MUwpt4AX_2DTnM&_nc_ht=scontent.fsgn3-1.fna&oh=00_AfDfWXHb9L70rw6Cvm9nmMOYcVDegv1ZAUD-TVK7YN4rEA&oe=6472AB99"
            height="40"
            width="40"
            alt="Logo"
        />
    );
}

export default Logo;