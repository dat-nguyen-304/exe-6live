import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { BsChevronDown } from "react-icons/bs";
import Image from 'next/image';
import Layout from '@/components/Header';

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
            <div id="home">
                <section>
                    <div>
                        <motion.h1 { ...animations.h1 }>
                            Nền tảng <br /> 6Live
                        </motion.h1>

                        <Typewriter options={ {
                            strings: ["Nhanh chóng", "Tiện lợi", "Uy tín", "Hiệu quả"],
                            autoStart: true,
                            loop: true,
                            cursor: "<3",
                            wrapperClassName: "typewriterpara",
                            delay: 100,
                            deleteSpeed: 50,
                        } } />
                        <article>
                            <p>
                                +
                                <motion.span
                                    ref={ companyCount }
                                ></motion.span>
                            </p>
                            <span>Clients Worldwide</span>
                        </article>

                        <aside>
                            <article>
                                <p>
                                    +
                                    <motion.span
                                        ref={ kolCount }
                                    >
                                    </motion.span>
                                </p>
                                <span>Projects Done</span>
                            </article>

                            <article data-special>
                                <p>Contact</p>
                                <span>official.6packprogrammer@gmail.com</span>
                            </article>
                        </aside>
                    </div>
                </section>
                <section>
                    <Image src="/images/home-1.png" width={ 500 } height={ 500 } alt='' className=' object-contain rounded-full' />
                </section>
                <BsChevronDown />
            </div>
        </Layout >
    )
}

export default Home