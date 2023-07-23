import Select from 'react-select'
import { genders } from "@/utils/variables";


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
        <div className='px-4 border-l-2 border-green-800'>
            <Select
                defaultValue={ genders[0] }
                options={ genders }
                value={ value }
                className='w-[136px] md:w-[160px]'
                onChange={ (value) => onChange(value as GenderSelectValue) }
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center">
                        <div className='text-xs md:text-sm'>
                            { option.label }
                        </div>
                    </div>
                ) }
                classNames={ {
                    control: () => 'border-2',
                    input: () => 'text-xs md:text-sm',
                    option: () => 'text-xs md:text-sm'
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

export default GenderSelect;