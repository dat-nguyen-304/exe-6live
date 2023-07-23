import Select from 'react-select';
import { IconType } from 'react-icons';
import { industries } from "@/utils/variables";

export type IndustrySelectValue = {
    label: string;
    value: string;
    icon: IconType | null
}

interface IndustrySelectProps {
    value?: IndustrySelectValue;
    onChange: (value: IndustrySelectValue) => void;
}

const IndustrySelect: React.FC<IndustrySelectProps> = ({
    value,
    onChange
}) => {

    return (
        <div className='px-4'>
            <Select
                defaultValue={ industries[0] }
                options={ industries }
                value={ value }
                onChange={ (value) => onChange(value as IndustrySelectValue) }
                className='w-[128px] md:w-[140px]'
                formatOptionLabel={ (option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        {
                            option.icon &&
                            <div>< option.icon size={ 16 } /></div>
                        }
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

export default IndustrySelect;