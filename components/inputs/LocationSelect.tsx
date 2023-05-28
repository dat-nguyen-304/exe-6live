'use client';

import Select from 'react-select'

const locations = [
    {
        label: 'Tất cả',
        value: 'all'
    },
    {
        label: 'TP. Hồ Chí Minh',
        value: 'HCM'
    },
    {
        label: 'TP. Đà Nẵng',
        value: 'DN'
    },
    {
        label: 'TP. Hà Nội',
        value: 'HN'
    }
]

export type LocationSelectValue = {
    label: string;
    value: string
}

interface LocationSelectProps {
    value?: LocationSelectValue;
    onChange: (value: LocationSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({
    value,
    onChange
}) => {

    return (
        <div>
            <div className="font-medium mb-2">Địa điểm</div>
            <Select
                placeholder="Bạn muốn tìm KOL ở đâu"
                isClearable
                options={ locations }
                value={ value }
                onChange={ (value) => onChange(value as LocationSelectValue) }
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

export default LocationSelect;