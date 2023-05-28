import Select from 'react-select';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiClothes, GiMedicines, GiBarn, GiCheckeredDiamond, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { IoFastFoodOutline } from 'react-icons/io5';
import { IconType } from 'react-icons';

export const industries = [
    {
        label: 'Tất cả ngành',
        icon: null,
        value: 'all'
    },
    {
        label: 'Thức ăn',
        icon: IoFastFoodOutline,
        value: 'F&B',
    },
    {
        label: 'Quần áo',
        icon: GiClothes,
        value: 'Quần áo',
    },
    {
        label: 'Mỉ phẫm',
        icon: GiCheckeredDiamond,
        value: 'Mỉ phẫm!'
    },
    {
        label: 'Trang sức',
        icon: IoDiamond,
        value: 'Trang sức!'
    }
]

export type IndustrySelectValue = {
    label: string;
    value: string;
    icon: IconType
}

interface IndustrySelectProps {
    value?: IndustrySelectValue;
    onChange: (value: IndustrySelectValue) => void;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({
    value,
    onChange
}) => {

    return (
        <div className='px-4'>
            <Select
                defaultValue={ industries[0] }
                options={ industries }
                value={ value }
                onChange={ (value) => onChange(value as IndustrySelectValue) }
                className='w-[140px]'
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        {
                            option.icon &&
                            <div>< option.icon size={ 10 } /></div>
                        }
                        <div className='text-sm'>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                } }
                theme={ (theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6'
                    }
                }) }
            />
        </div>
    );
}

export default IndustrySelect;