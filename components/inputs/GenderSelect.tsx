import Select from 'react-select'

const genders = [
    {
        label: 'Tất cả giới tính',
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
        <div className='px-4 border-l-2'>
            <Select
                defaultValue={ genders[0] }
                options={ genders }
                value={ value }
                className='w-[150px]'
                onChange={ (value) => onChange(value as GenderSelectValue) }
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

export default GenderSelect;