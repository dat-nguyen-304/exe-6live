import Select from 'react-select';
import { GiClothes, GiCheckeredDiamond } from 'react-icons/gi';
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
        value: 'food',
    },
    {
        label: 'Quần áo',
        icon: GiClothes,
        value: 'clothes',
    },
    {
        label: 'Mỹ phẩm',
        icon: GiCheckeredDiamond,
        value: 'cosmetology'
    },
    {
        label: 'Phụ kiện',
        icon: IoDiamond,
        value: 'accessory'
    }
]

export type IndustrySelectValue = {
    label: string;
    value: string;
    icon: IconType | null
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
                            <div>< option.icon size={ 16 } /></div>
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
                        primary: '#166534',
                        primary25: '#dcfce7'
                    }
                }) }
            />
        </div>
    );
}

export default IndustrySelect;