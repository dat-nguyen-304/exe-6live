import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { BsChevronDown } from "react-icons/bs";
import Image from 'next/image';
import Layout from '@/components/Header';
import Link from 'next/link';

const Home = () => {
    const companyCount = useRef<HTMLSpanElement>(null);
    const kolCount = useRef<HTMLSpanElement>(null);
    const isClientCountInView = useInView(companyCount);
    const isKolCountInView = useInView(kolCount);


    const animations = {
        h1: {
            initial: {
                x: "-100%", opacity: 0
            },
            whileInView: {
                x: 0,
                opacity: 1
            }
        },
        section: {
            initial: {
                y: "--100%",
                opacity: 0
            },
            whileInView: {
                y: 0,
                opacity: 1
            },
            // transition: {
            //     duration: .5
            // }
        },
        button: {
            initial: {
                y: "-100%", opacity: 0
            },
            whileInView: {
                y: 0,
                opacity: 1
            }
        }
    }

    useEffect(() => {
        companyCount.current && animate(0, 100, {
            duration: 1,
            onUpdate: (v) => {
                if (companyCount.current)
                    companyCount.current.textContent = v.toFixed();
            },
        });
    }, [isClientCountInView])

    useEffect(() => {
        kolCount.current && animate(0, 500, {
            duration: 1,
            onUpdate: (v) => {
                if (kolCount.current)
                    kolCount.current.textContent = v.toFixed();
            },
        });
    }, [isKolCountInView])

    return (
        <Layout>
            <div id="home" className='mt-[-40px] relative'>
                <Image src="/images/bg-left.png" width={ 120 } height={ 600 } alt='img'
                    className='absolute top-[280px]'
                />
                <Image src="/images/bg-right.png" width={ 120 } height={ 600 } alt='img'
                    className='absolute top-[200px] right-[0px] z-[1]'
                />
                <section className='bg-[#f2fbf6] py-[40px]'>
                    <div>
                        <motion.h1 { ...animations.h1 } className='text-[#00b14f]'>
                            Nền tảng <br /> 6Live
                        </motion.h1>

                        <Typewriter options={ {
                            strings: ["Nhanh chóng", "Tiện lợi", "Uy tín", "Hiệu quả"],
                            autoStart: true,
                            loop: true,
                            cursor: ".",
                            wrapperClassName: "typewriterpara",
                            delay: 100,
                            deleteSpeed: 50,
                        } } />
                        <article>
                            <p className='text-[#087526]'>
                                +
                                <motion.span
                                    ref={ companyCount }
                                ></motion.span>
                            </p>
                            <span>Doanh nghiệp</span>
                        </article>

                        <aside>
                            <article>
                                <p className='text-[#087526]'>
                                    +
                                    <motion.span
                                        ref={ kolCount }
                                    >
                                    </motion.span>
                                </p>
                                <span>KOL / KOC</span>
                            </article>

                            <article data-special>
                                <p className='text-[#087526]'>Liên hệ</p>
                                <span>6live@gmail.com</span>
                            </article>
                        </aside>
                    </div>
                </section>
                <section className='bg-[#f2fbf6] py-[40px]'>
                    <Image src="/images/home-1.png" width={ 500 } height={ 500 } alt='' className=' object-contain rounded-full' />
                </section>
                <BsChevronDown color='#00b14f' />
            </div>
            <div className='px-[160px] mt-[100px]'>
                <div className='flex items-center'>
                    <motion.section { ...animations.section } className='flex-[1]'>
                        <Image src="/images/home-2.png" width={ 500 } height={ 500 } alt='' className=' object-contain rounded-full' />
                    </motion.section>
                    <motion.section { ...animations.section } className='flex-[1]'>
                        <p className='text-[1rem]'>Khi đến với book KOL bạn sẽ được hỗ trợ các ý tưởng quảng cáo, content, hình ảnh, video, livestream trên các kênh Website, Fanpage, Instagram, Youtube…thông qua việc hợp tác sử dụng hình ảnh với Influencers, KOLs, Reviewers, Sellers Marrketing.</p>
                        <Link href="/kols">
                            <button className='text-[1rem] text-[#00b14f] bg-[#e5f7ed] px-4 py-2 border-2 rounded-lg mt-4'>Khám phá ngay</button>
                        </Link>
                    </motion.section>

                </div>
            </div>
            <div className='px-[160px] py-[100px] bg-[#f2fbf6] mb-[-80px]'>
                <div className='flex items-center justify-between'>
                    <motion.section { ...animations.section } className='flex-[1]'>
                        <p className='text-[1rem]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <p className='text-3xl mt-8'>
                            Alexander Bách HD
                        </p>
                        <p className='mt-8 text-[1rem]'>Businessman</p>
                    </motion.section>
                    <motion.section { ...animations.section } className='flex-[1]'>
                        <Image src="/images/bach.png" width={ 300 } height={ 300 } alt='' className='object-contain rounded-full mx-auto' />
                    </motion.section>

                </div>
            </div>
        </Layout>
    )
}

export default Home