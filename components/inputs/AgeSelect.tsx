import Select from 'react-select'

interface Age {
    label: string,
    value: string
}

let ages: Age[] = [];
for (let age = 18; age <= 60; age++) {
    ages.push({
        label: `${age} tuổi`,
        value: `${age}`
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
        <div className='flex gap-2 justify-center items-center px-4 md:border-l-2 md:border-green-800'>
            <div className='text-xs md:text-sm'>Từ</div>
            <Select
                placeholder="Từ tuổi"
                classNamePrefix="custom-select"
                options={ ages }
                className='w-[108px] md:w-[120px]'
                value={ valueStart }
                onChange={ (value) => onChangeStart(value as AgeSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div className='text-xs md:text-sm'>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'border-2',
                    input: () => 'text-xs md:text-sm',
                    option: () => 'text-xs md:text-sm',
                    placeholder: () => 'text-xs md:text-sm'
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
            <div className='ml-4 text-xs md:text-sm'>Đến</div>
            <Select
                placeholder="Đến tuổi"
                classNamePrefix="custom-select"

                className='w-[108px] md:w-[120px]'
                defaultValue={ ages[0] }
                options={ ages }
                value={ valueEnd }
                onChange={ (value) => onChangeEnd(value as AgeSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div className='text-xs md:text-sm'>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'border-2',
                    input: () => 'text-xs md:text-sm',
                    option: () => 'text-xs md:text-sm',
                    placeholder: () => 'text-xs md:text-sm',
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

export default AgeSelect;