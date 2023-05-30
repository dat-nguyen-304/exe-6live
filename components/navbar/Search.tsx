import Link from "next/link";

const Search = () => {
    return (
        <div className="bg-green-100">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-green-100 md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-green-100 md:dark:bg-green-100">
                <li>
                    <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
                        Trang chủ
                    </Link>
                </li>
                <li>
                    <Link href="/kols" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-green-100 dark:hover:text-white  dark:border-gray-700">
                        Booking
                    </Link>
                </li>
                <li>
                    <Link href="/posts" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-green-100 dark:hover:text-white  dark:border-gray-700">
                        Chiến dịch
                    </Link>
                </li>
                <li>
                    <Link href="/packages" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-green-100 dark:hover:text-white  dark:border-gray-700">
                        Đăng ký gói
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Search