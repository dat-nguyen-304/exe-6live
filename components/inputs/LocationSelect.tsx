import Select from 'react-select'
import { locations } from "@/utils/variables";

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
        <div className='px-4 md:border-l-2 md:border-green-800'>
            <Select
                options={ locations }
                value={ value }
                className='w-[136px] md:w-[160px]'
                onChange={ (value) => onChange(value as LocationSelectValue) }
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

export default LocationSelect;