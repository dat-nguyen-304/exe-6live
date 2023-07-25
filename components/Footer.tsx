import Image from 'next/image';
import React from 'react';
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiTiktok } from "react-icons/si";
import Container from './Container';

const Footer = () => {
    return (
        <div className='border-t-4 border-green-800 py-4 md:py-8 text-[#71869d] bg-green-50'>
            <Container>
                <div className="flex justify-around pt-2">
                    <div >
                        <div className="">
                            <h5 className="uppercase text-xs md:text-sm lg:text-base font-bold text-[#333] mb-2">Chăm sóc khách hàng</h5>
                            <ul className="footer-content__list">
                                <li className="text-xs md:text-sm"><a href="#">Trung tâm hỗ trợ</a></li>
                                <li className="text-xs md:text-sm"><a href="#">6Live Blog</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Hướng dẫn booking</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Thanh toán</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Chăm sóc khách hàng</a></li>
                            </ul>
                        </div>
                    </div>
                    <div >
                        <div className="">
                            <h5 className="uppercase text-xs md:text-sm lg:text-base font-bold text-[#333] mb-2">về 6live</h5>
                            <ul className="footer-content__list">
                                <li className="text-xs md:text-sm"><a href="#">Tuyển dụng</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Điều khoản 6Live</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Kênh Doanh nghiệp</a></li>
                                <li className="text-xs md:text-sm"><a href="#">Chương trình tiếp thị liên kết 6Live</a>
                                </li>
                                <li className="text-xs md:text-sm"><a href="#">Liên hệ với truyền thông</a></li>

                            </ul>
                        </div>
                    </div>
                    <div >
                        <div className="">
                            <h5 className="uppercase text-xs md:text-sm lg:text-base font-bold text-[#333] mb-2">
                                Theo dõi chúng tôi trên
                            </h5>
                            <ul className="footer-content__list">
                                <li className="text-sm">
                                    <a href="#" className='flex items-center'>
                                        <span className='text-xs md:text-sm mr-1 md:mr-4'>Facebook</span>
                                        <FaFacebookSquare size={ 16 } className='sm:w-[16px] sm:h-[16px] w-[11px] h-[11px]' />
                                    </a>
                                </li>
                                <li className="text-sm">
                                    <a href="#" className='flex items-center'>
                                        <span className='text-xs md:text-sm mr-1 md:mr-4'>Instagram</span>
                                        <AiFillInstagram size={ 18 } className='sm:w-[18px] sm:h-[18px] w-[12px] h-[12px]' />
                                    </a>
                                </li>
                                <li className="text-sm">
                                    <a href="#" className='flex items-center'>
                                        <span className='text-xs md:text-sm mr-1 md:mr-4'>Youtube</span>
                                        <FaYoutube size={ 16 } className='sm:w-[16px] sm:h-[16px] w-[11px] h-[11px]' />
                                    </a>
                                </li>
                                <li className="text-sm">
                                    <a href="#" className='flex items-center'>
                                        <span className='text-xs md:text-sm mr-1 md:mr-4'>TikTok</span>
                                        <SiTiktok size={ 14 } className='sm:w-[14px] sm:h-[14px] w-[10px] h-[10px]' />
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="">
                        <div className="">
                            <h5 className="uppercase text-xs md:text-sm lg:text-base font-bold text-[#333] mb-2">Tải ứng dụng 6live ngay thôi</h5>
                            <div className="flex items-center">
                                <Image
                                    src="/images/qr-code.png" alt=""
                                    width={ 120 }
                                    height={ 120 }
                                    className='w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] md:w-[120px] md:h-[120px] object-contain'
                                />
                                <div className="flex flex-col justify-center md:justify-evenly h-[120px] ml-1 md:ml-4">
                                    <a href="#">
                                        <Image
                                            src="/images/google-play.png"
                                            alt=""
                                            width={ 100 }
                                            height={ 40 }
                                            className='w-[50px] h-[20px] sm:w-[75px] sm:h-[30px] md:w-[100px] md:h-[40px] object-contain'
                                        />
                                    </a>
                                    <a href="#">
                                        <Image
                                            src="/images/app-store.png"
                                            alt="" width={ 100 }
                                            height={ 40 }
                                            className='w-[50px] h-[20px] sm:w-[75px] sm:h-[30px] md:w-[100px] md:h-[40px] object-contain'
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default Footer;