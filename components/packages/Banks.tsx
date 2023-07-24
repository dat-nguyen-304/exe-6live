import Image from 'next/image'
import React from 'react'

interface BanksProps {
    setBank: React.Dispatch<React.SetStateAction<string>>,
    bank: string
}

const Banks: React.FC<BanksProps> = ({ bank, setBank }) => {
    const banks = ["tpbank", "techcombank", "vibbank", "viettinbank", "bidv", "vietcombank", "vpbank", "scbbank"];
    const selectedCss = "border-[#00b14f] border-2 flex items-center justify-center basis-1/3 sm:basis-1/4  lg:basis-1/5  px-4 py-2 rounded-lg cursor-pointer";
    const nonSelectedCss = "border-[#eee] border-2 flex items-center justify-center basis-1/3 sm:basis-1/4 lg:basis-1/5  px-4 py-2 rounded-lg cursor-pointer";
    return (
        <>
            <p className='text-base md:text-xl font-semibold mb-4 mt-16'>Chọn ngân hàng</p>
            <div className="flex lg:w-[800px] mx-auto gap-4 justify-evenly md:justify-between flex-wrap">

                {
                    banks.map(b => (
                        <div key={ b } className={ bank === b ? selectedCss : nonSelectedCss }
                            onClick={ () => setBank(b) }
                        >
                            <Image className='object-contain object-center w-[160px] h-[60px]' src={ `/images/${b}.png` } width={ 160 } height={ 80 } alt='' />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Banks;