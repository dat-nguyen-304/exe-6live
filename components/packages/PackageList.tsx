import { Package } from '@/types';
import axios from 'axios';

interface PackageListProps {
    premiumPackages: Package[],
    selectedPackage: number,
    setSelectedPackage: React.Dispatch<React.SetStateAction<number>>
}

const PackageList: React.FC<PackageListProps> = ({ premiumPackages, selectedPackage, setSelectedPackage }) => {
    const nonSelectedCss = "block cursor-pointer my-4 my:py-0 border-[#333] md:border-[#fff] p-2 sm:p-8 md:shadow-xl w-[100%] md:w-[400px] rounded-2xl ";
    const selectedCss = `${nonSelectedCss} !border-[#00b14f] border-2`;

    const saleOff: (index: number) => string = (index: number) => {
        const originalPrice = premiumPackages[0].price;
        const numberOfMonth = premiumPackages[index].numberOfMonth;
        const sale = originalPrice * numberOfMonth - premiumPackages[index].price;
        return sale.toLocaleString('vi-VN');
    }

    return (
        <div className='sm:flex justify-between mt-4 gap-2 sm:gap-8 mx-auto'>
            {
                premiumPackages.map((premiumPackage, index) => (
                    <label key={ index } htmlFor={ `p-${index}` }
                        className={ index === selectedPackage ? selectedCss : nonSelectedCss }

                    >
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-base md:text-xl">{ premiumPackage.numberOfMonth } tháng</div>
                            <input onChange={ () => setSelectedPackage(index) } checked={ index === selectedPackage } type='radio' name="premiumPackageId" id={ `p-${index}` } className='block h-[12px] w-[12px] sm:w-[20px] sm:h-[20px]' />
                        </div>
                        <div className="flex items-baseline mt-4">
                            <p className='text-[#087526] font-semibold text-sm md:text-lg'>{ premiumPackage.price.toLocaleString('vi-VN') } VNĐ</p>
                            { index !== 0 && <p className='ml-4 text-[#333] block 2xl:block sm:hidden text-xs'>Tiết kiệm: { saleOff(index) }</p> }
                        </div>
                    </label>
                ))
            }
        </div>
    )
}

export default PackageList