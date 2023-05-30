import Image from 'next/image'
import Container from '@/components/Container';
import Layout from '@/components/Header';

export default function Packages() {
    return (
        <>
            <Layout>
                <div className='px-[200px] mt-[-40px]'>
                    <h3 className='text-4xl font-bold text-center pt-[40px]'>Chọn gói Premium của bạn</h3>
                    <h5 className='text-lg mt-4 text-center'>Tìm kiếm, kết nối KOL/KOC dễ dàng hơn với 6Live Premium</h5>
                    <p className='text-xl font-semibold mt-8'>Chọn gói</p>
                    <div className='flex justify-between mt-4'>
                        <label htmlFor="one-month" className='cursor-pointer p-8 shadow-xl w-[320px] rounded-2xl border-[#00b14f] border-2'>
                            <div className="flex justify-between items-center">
                                <div className="font-bold text-xl">1 tháng</div>
                                <input type='radio' name="packageId" id="one-month" className='block w-[20px] h-[20px]' />
                            </div>
                            <div className="flex items-baseline mt-4">
                                <p className='text-[#087526] font-semibold text-lg'>800.000 VNĐ</p>
                                <p className='ml-4 text-[#333] text-xs'>Tiết kiệm: 400.000 VNĐ</p>
                            </div>
                        </label>
                        <label htmlFor="six-month" className='cursor-pointer p-8 shadow-xl w-[320px] rounded-2xl'>
                            <div className="flex justify-between items-center">
                                <div className="font-bold text-xl">1 tháng</div>
                                <input type='radio' name="packageId" id="six-month" className='block w-[20px] h-[20px]' />
                            </div>
                            <div className="flex items-baseline mt-4">
                                <p className='text-[#087526] font-semibold text-lg'>800.000 VNĐ</p>
                                <p className='ml-4 text-[#333] text-xs'>Tiết kiệm: 400.000 VNĐ</p>
                            </div>
                        </label>
                        <label htmlFor="one-year" className='cursor-pointer p-8 shadow-xl w-[320px] rounded-2xl'>
                            <div className="flex justify-between items-center">
                                <div className="font-bold text-xl">1 tháng</div>
                                <input type='radio' name="packageId" id="one-year" className='block w-[20px] h-[20px]' />
                            </div>
                            <div className="flex items-baseline mt-4">
                                <p className='text-[#087526] font-semibold text-lg'>800.000 VNĐ</p>
                                <p className='ml-4 text-[#333] text-xs'>Tiết kiệm: 400.000 VNĐ</p>
                            </div>
                        </label>
                    </div>
                    <p className='text-xl font-semibold mb-4 mt-16'>Chọn ngân hàng</p>
                    <div className="flex w-[800px] mx-auto gap-4 justify-between  flex-wrap">
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/tpbank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image src="/images/techcombank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/vibbank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/viettinbank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/bidv.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/vietcombank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/vpbank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                        <div className='flex items-center justify-center border-2 basis-1/5 border-[#eee] px-4 py-2 rounded-lg'>
                            <Image className='object-contain object-center' src="/images/scbbank.png" width={ 160 } height={ 80 } alt='' />
                        </div>
                    </div>
                    <p className='text-xl font-semibold mb-4 mt-16'>Thông tin chuyển khoản</p>
                    <div className="flex gap-8 bg-gradient-to-b from-green-50 to-white shadow-lg border-green-500 border-2 p-8 w-[80%] mx-auto rounded-lg">
                        <div className="">
                            <Image src="/images/qr-code.png" width={ 200 } height={ 200 } alt='' />
                        </div>
                        <div className="flex-[1]">
                            <div className="flex justify-between my-4">
                                <p className='font-bold text-md'>Ngân hàng</p>
                                <p className='text-md font-semibold'>VIETTINBANK - NH CONG THUONG VN</p>
                            </div>
                            <div className="flex justify-between my-4">
                                <p className='font-bold text-md'>Số tài khoản</p>
                                <p className='text-md font-semibold'>1234567890</p>
                            </div>
                            <div className="flex justify-between my-4">
                                <p className='font-bold text-md'>Tên chủ tài khoản</p>
                                <p className='text-md font-semibold'>CTY CO PHAN 6LIVE</p>
                            </div>
                            <div className="flex justify-between my-4">
                                <p className='font-bold text-md'>Nội dung chuyển khoản</p>
                                <p className='text-md font-semibold'>6LIVE1234567890</p>
                            </div>
                            <div className="flex justify-between my-4">
                                <p className='font-bold text-md'>Số tiền cần chuyển</p>
                                <p className='text-md font-semibold'>200.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <button className='bg-[#00b14f] text-white px-4 py-2 mt-8 rounded-lg'>Tôi đã thanh toán</button>
                    </div>
                </div>
            </Layout>
        </>
    )
}
