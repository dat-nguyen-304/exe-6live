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

interface Price {
    label: string,
    value: string
}

let prices: Price[] = [];
for (let price = 1; price <= 50; price++) {
    prices.push({
        label: `${price}.000.000`,
        value: `${price}`
    });
    if (price === 3) price++;
    if (price >= 5 && price < 20) price += 4;
    if (price >= 20) price += 9;

}

export type PriceSelectValue = {
    label: string;
    value: string
}

interface PriceSelectProps {
    valueStart?: PriceSelectValue;
    onChangeStart: (value: PriceSelectValue) => void;
    valueEnd?: PriceSelectValue;
    onChangeEnd: (value: PriceSelectValue) => void;
}

const PriceSelect: React.FC<PriceSelectProps> = ({
    valueStart,
    onChangeStart,
    valueEnd,
    onChangeEnd,
}) => {

    return (
        <div>
            <div className="font-medium mb-2">Giá cả (VNĐ/Tháng)</div>
            <div className='flex gap-8 justify-evenly'>
                <Select
                    className='w-[200px]'
                    placeholder="Từ"
                    isClearable
                    options={ prices }
                    value={ valueStart }
                    onChange={ (value) => onChangeStart(value as PriceSelectValue) }
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
                    options={ prices }
                    value={ valueEnd }
                    onChange={ (value) => onChangeEnd(value as PriceSelectValue) }
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

export default PriceSelect;