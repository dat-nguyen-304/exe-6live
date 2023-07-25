import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import LocationSelect from '../inputs/LocationSelect';
import GenderSelect from '../inputs/GenderSelect';
import IndustrySelect from '../inputs/IndustrySelect';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Campaign } from '@/types';

interface FilterProps {
    setCampaigns: Dispatch<SetStateAction<Campaign[]>>
}

const CampaignFilter: React.FC<FilterProps> = ({ setCampaigns }) => {

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
            gender: {
                value: 'all',
                label: 'Tất cả giới tính'
            }
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const properties = [
            "industry",
            "location",
            "gender",
        ];
        let params = "?";

        for (const property of properties) {
            if (data[property]?.value && data[property]?.value !== 'all') {
                const value = data[property]?.value;
                if (params.length === 1) params = `${params}${property}=${value}`;
                else params = `${params}&${property}=${value}`;
            }
        }
        setCampaigns([]);
        const res = await axios.get(`/api/campaigns${params}`);
        setCampaigns(res.data);
    }

    const location = watch('location');
    const industry = watch('industry');
    const gender = watch('gender');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    return (
        <div className="py-4 mt-[-28px] bg-white shadow-lg flex flex-row flex-wrap gap-2 items-center justify-center z-[0]">
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
            <button
                className='border-2 px-4 py-2 rounded-lg border-green-400 bg-green-200'
                onClick={ handleSubmit(onSubmit) }
            >
                Tìm kiếm
            </button>
        </div>
    );
}

export default CampaignFilter;