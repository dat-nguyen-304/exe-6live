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

interface Age {
    label: string,
    value: string
}

let ages: Age[] = [];
for (let age = 18; age <= 60; age++) {
    ages.push({
        label: `${age}`,
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
        <div>
            <div className="font-medium mb-2">Độ tuổi</div>
            <div className='flex gap-8 justify-evenly'>
                <Select
                    className='w-[200px]'
                    placeholder="Từ"
                    isClearable
                    options={ ages }
                    value={ valueStart }
                    onChange={ (value) => onChangeStart(value as AgeSelectValue) }
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
                <Select
                    className='w-[200px]'
                    placeholder="Đến"
                    isClearable
                    options={ ages }
                    value={ valueEnd }
                    onChange={ (value) => onChangeEnd(value as AgeSelectValue) }
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

        </div>
    );
}

export default AgeSelect;