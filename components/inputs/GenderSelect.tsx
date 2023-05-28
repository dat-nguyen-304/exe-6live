'use client';

import Select from 'react-select'

const genders = [
    {
        label: 'Tất cả',
        value: 'all'
    },
    {
        label: 'Nam',
        value: 'male'
    },
    {
        label: 'Nữ',
        value: 'female'
    },
    {
        label: 'LGBT',
        value: 'lgbt'
    }
]

export type GenderSelectValue = {
    label: string;
    value: string
}

interface GenderSelectProps {
    value?: GenderSelectValue;
    onChange: (value: GenderSelectValue) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({
    value,
    onChange
}) => {

    return (
        <div>
            <div className="font-medium mb-2">Giới tính</div>
            <Select
                placeholder="Bạn muốn tìm KOL/KOC giới tính nào"
                isClearable
                options={ genders }
                value={ value }
                onChange={ (value) => onChange(value as GenderSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'p-3 border-2',
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

export default GenderSelect;