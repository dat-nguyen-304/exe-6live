;

import Select from 'react-select'

interface Age {
    label: string,
    value: string
}

let ages: Age[] = [];
for (let age = 18; age <= 60; age++) {
    ages.push({
        label: `${age} tuổi`,
        value: `${age} tuổi`
    })
}

export type AgeSelectValue = {
    label: string;
    value: string
}

interface AgeSelectProps {
    valueStart?: AgeSelectValue;
    onChangeStart: (value: AgeSelectValue) => void;
    valueEnd?: AgeSelectValue;
    onChangeEnd: (value: AgeSelectValue) => void;
}

const AgeSelect: React.FC<AgeSelectProps> = ({
    valueStart,
    onChangeStart,
    valueEnd,
    onChangeEnd,
}) => {

    return (
        <div className='flex gap-2 justify-center items-center px-4 border-l-2'>
            <div>Từ</div>
            <Select
                placeholder="Từ tuổi"
                classNamePrefix="custom-select"
                styles={ {
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: '0.875rem',
                    }),
                } }
                options={ ages }
                className='w-[120px]'
                value={ valueStart }
                onChange={ (value) => onChangeStart(value as AgeSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
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
            <div className='ml-4'>Đến</div>
            <Select
                placeholder="Đến tuổi"
                classNamePrefix="custom-select"
                styles={ {
                    placeholder: (provided) => ({
                        ...provided,
                        fontSize: '0.875rem',
                    }),
                } }
                className='w-[120px]'
                defaultValue={ ages[0] }
                options={ ages }
                value={ valueEnd }
                onChange={ (value) => onChangeEnd(value as AgeSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
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

export default AgeSelect;