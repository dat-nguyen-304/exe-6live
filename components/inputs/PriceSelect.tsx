import Select from 'react-select'


interface Price {
    label: string,
    value: string
}

let prices: Price[] = [];

for (let price = 1; price <= 50; price++) {
    prices.push({
        label: `${price}.000.000`,
        value: `${price * 1000000}`
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
        <div className='flex gap-2 justify-center items-center px-4 border-l-2 border-green-800'>
            <div className='text-xs md:text-sm'>Từ</div>
            <Select
                placeholder="Từ Giá"
                classNamePrefix="custom-select"
                className='w-[108px] md:w-[140px]'
                options={ prices }
                value={ valueStart }
                onChange={ (value) => onChangeStart(value as PriceSelectValue) }
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
                classNamePrefix="custom-select"
                placeholder="Đến giá"
                className='w-[108px] md:w-[140px]'
                options={ prices }
                value={ valueEnd }
                onChange={ (value) => onChangeEnd(value as PriceSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div className='text-sm'>
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
        </div>
    );
}

export default PriceSelect;