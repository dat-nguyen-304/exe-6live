;

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiClothes, GiMedicines, GiBarn, GiCheckeredDiamond, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';

import Container from '../Container';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import LocationSelect from '../inputs/LocationSelect';
import GenderSelect from '../inputs/GenderSelect';
import AgeSelect from '../inputs/AgeSelect';
import PriceSelect from '../inputs/PriceSelect';
import IndustrySelect from '../inputs/IndustrySelect';

const Categories = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const pathname = usePathname();
    const isBookingPage = (pathname === '/kols' || pathname === '/posts');

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            industry: {
                label: 'Tất cả ngành',
                icon: null,
                value: 'all'
            },
            location: {
                label: 'Tất cả địa điểm',
                value: 'all'
            },
            ageStart: null,
            ageEnd: null,
            priceStart: null,
            priceEnd: null,
            gender: {
                value: 'all',
                label: 'Tất cả giới tính'
            }
        }
    });

    if (!isBookingPage) {
        return null;
    }

    const location = watch('location');
    const ageStart = watch('ageStart');
    const ageEnd = watch('ageEnd');
    const industry = watch('industry');
    const priceStart = watch('priceStart');
    const priceEnd = watch('priceEnd');
    const gender = watch('gender');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    return (
        <div className="py-4 shadow-lg flex flex-row items-center justify-center">
            <IndustrySelect
                onChange={ (value) => setCustomValue('industry', value) }
                value={ industry }
            />
            <LocationSelect
                onChange={ (value) => setCustomValue('location', value) }
                value={ location }
            />
            <GenderSelect
                onChange={ (value) => setCustomValue('gender', value) }
                value={ gender }
            />
            <AgeSelect
                onChangeStart={ (value) => setCustomValue('ageStart', value) }
                valueStart={ ageStart }
                onChangeEnd={ (value) => setCustomValue('ageEnd', value) }
                valueEnd={ ageEnd }
            />
            <PriceSelect
                onChangeStart={ (value) => setCustomValue('priceStart', value) }
                valueStart={ priceStart }
                onChangeEnd={ (value) => setCustomValue('priceEnd', value) }
                valueEnd={ priceEnd }
            />
        </div>
    );
}

export default Categories;