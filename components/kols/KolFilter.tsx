import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import LocationSelect from '../inputs/LocationSelect';
import GenderSelect from '../inputs/GenderSelect';
import AgeSelect from '../inputs/AgeSelect';
import PriceSelect from '../inputs/PriceSelect';
import IndustrySelect from '../inputs/IndustrySelect';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Kol } from '@/types';

interface FilterProps {
    setKols: Dispatch<SetStateAction<Kol[]>>
}

const KolFilter: React.FC<FilterProps> = ({ setKols }) => {

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
            minAge: null,
            maxAge: null,
            minSalary: null,
            maxSalary: null,
            gender: {
                value: 'all',
                label: 'Tất cả giới tính'
            }
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        const properties = [
            "industry",
            "location",
            "gender",
            "minAge",
            "maxAge",
            "minSalary",
            "maxSalary",
        ];
        let params = "?";

        for (const property of properties) {
            if (data[property]?.value && data[property]?.value !== 'all') {
                console.log(property);
                const value = data[property]?.value;
                if (params.length === 1) params = `${params}${property}=${value}`;
                else params = `${params}&${property}=${value}`;
            }
        }
        setKols([]);
        const res = await axios.get(`/api/kols${params}`);
        setKols(res.data);
    }

    const location = watch('location');
    const minAge = watch('minAge');
    const maxAge = watch('maxAge');
    const industry = watch('industry');
    const minSalary = watch('minSalary');
    const maxSalary = watch('maxSalary');
    const gender = watch('gender');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    return (
        <div className="py-5 flex-wrap gap-4 mt-[-28px] bg-white shadow-lg flex flex-row items-center justify-center z-[0] px-2">
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
                onChangeStart={ (value) => setCustomValue('minAge', value) }
                valueStart={ minAge }
                onChangeEnd={ (value) => setCustomValue('maxAge', value) }
                valueEnd={ maxAge }
            />
            <PriceSelect
                onChangeStart={ (value) => setCustomValue('minSalary', value) }
                valueStart={ minSalary }
                onChangeEnd={ (value) => setCustomValue('maxSalary', value) }
                valueEnd={ maxSalary }
            />
            <button
                className='block w-[90px] border-2 px-4 py-2 rounded-lg border-green-400 bg-green-200'
                onClick={ handleSubmit(onSubmit) }
            >
                Tìm kiếm
            </button>
        </div>
    );
}

export default KolFilter;