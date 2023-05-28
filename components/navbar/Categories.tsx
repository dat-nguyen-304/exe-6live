'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiClothes, GiMedicines, GiBarn, GiCheckeredDiamond, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';


import CategoryBox from "../CategoryBox";
import Container from '../Container';


export const categories = [
    {
        label: 'Thức ăn',
        icon: IoFastFoodOutline,
        description: 'F&B',
    },
    {
        label: 'Quần áo',
        icon: GiClothes,
        description: 'Quần áo',
    },
    {
        label: 'Thuốc men',
        icon: GiMedicines,
        description: 'Thuốc men!'
    },
    {
        label: 'Mỉ phẫm',
        icon: GiCheckeredDiamond,
        description: 'Mỉ phẫm!'
    },
    {
        label: 'Trang sức',
        icon: IoDiamond,
        description: 'Trang sức!'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                { categories.map((item) => (
                    <CategoryBox
                        key={ item.label }
                        label={ item.label }
                        icon={ item.icon }
                        selected={ category === item.label }
                    />
                )) }
            </div>
        </Container>
    );
}

export default Categories;