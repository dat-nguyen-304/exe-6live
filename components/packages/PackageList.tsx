import { Package } from '@/types';
import axios from 'axios';

interface PackageListProps {
    premiumPackages: Package[],
    selectedPackage: number,
    setSelectedPackage: React.Dispatch<React.SetStateAction<number>>
}

const PackageList: React.FC<PackageListProps> = ({ premiumPackages, selectedPackage, setSelectedPackage }) => {
    const nonSelectedCss = "cursor-pointer p-8 shadow-xl w-[400px] rounded-2xl";
    const selectedCss = `${nonSelectedCss} border-[#00b14f] border-2`;

    const saleOff: (index: number) => string = (index: number) => {
        const originalPrice = premiumPackages[0].price;
        const numberOfMonth = premiumPackages[index].numberOfMonth;
        const sale = originalPrice * numberOfMonth - premiumPackages[index].price;
        return sale.toLocaleString('vi-VN');
    }

    return (
        <div className='flex justify-between mt-4'>
            {
                premiumPackages.map((premiumPackage, index) => (
                    <label key={ index } htmlFor={ `p-${index}` }
                        className={ index === selectedPackage ? selectedCss : nonSelectedCss }

                    >
                        <div className="flex justify-between items-center">
                            <div className="font-bold text-xl">{ premiumPackage.numberOfMonth } tháng</div>
                            <input onClick={ () => setSelectedPackage(index) } checked={ index === selectedPackage } type='radio' name="premiumPackageId" id={ `p-${index}` } className='block w-[20px] h-[20px]' />
                        </div>
                        <div className="flex items-baseline mt-4">
                            <p className='text-[#087526] font-semibold text-lg'>{ premiumPackage.price.toLocaleString('vi-VN') } VNĐ</p>
                            { index !== 0 && <p className='ml-4 text-[#333] text-xs'>Tiết kiệm: { saleOff(index) }</p> }
                        </div>
                    </label>
                ))
            }
        </div>
    )
}

export default PackageList