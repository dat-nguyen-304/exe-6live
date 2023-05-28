import Select from 'react-select'

const locations = [
    {
        label: 'Tất cả địa điểm',
        value: 'all'
    },
    {
        label: 'TP. Hồ Chí Minh',
        value: 'hcm'
    },
    {
        label: 'TP. Đà Nẵng',
        value: 'dn'
    },
    {
        label: 'TP. Hà Nội',
        value: 'hn'
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

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {

    return (
        <div className='px-4 border-l-2'>
            <Select
                options={ locations }
                value={ value }
                className='w-[160px]'
                onChange={ (value) => onChange(value as LocationSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center">
                        <div className='text-sm'>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'border-2',
                    input: () => 'text-sm',
                    option: () => 'text-sm'
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