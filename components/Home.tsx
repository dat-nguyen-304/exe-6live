import React, { useEffect, useRef } from 'react'
import { animate, motion, useInView } from "framer-motion";
import Typewriter from 'typewriter-effect';
import { BsArrowUpRight, BsChevronDown } from "react-icons/bs";
import Image from 'next/image';

const Home = () => {
    const clientCount = useRef<HTMLSpanElement>(null);
    const projectCount = useRef<HTMLSpanElement>(null);
    const isClientInView = useInView(clientCount)

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

    const animationClientsCount = () => {
        clientCount.current && animate(0, 100, {
            duration: 1,
            onUpdate: (v) => {
                if (clientCount.current)
                    clientCount.current.textContent = v.toFixed();
            },
        });
    };

    useEffect(() => {
        clientCount.current && animate(0, 100, {
            duration: 1,
            onUpdate: (v) => {
                if (clientCount.current)
                    clientCount.current.textContent = v.toFixed();
            },
        });
    }, [isClientInView])

    const animationProjectsCount = () => {
        projectCount.current && animate(0, 500, {
            duration: 1,
            onUpdate: (v) => {
                if (projectCount.current)
                    projectCount.current.textContent = v.toFixed();
            },
        });
    };

    return (
        <div className='w-full flex h-[90vh]'>
            <section className='w-full pl-[13.33vmax]'>
                <div className='border-t-2 h-full pt-[6rem]'>
                    <motion.h1 className='text-3xl font-bold' { ...animations.h1 }>
                        6Live
                    </motion.h1>

                    <Typewriter options={ {
                        strings: ["Đến bao giờ anh mới có được em", "hả", "Thương Phương"],
                        autoStart: true,
                        loop: true,
                        cursor: "|",
                        wrapperClassName: "typewriterpara",
                        delay: 100,
                        deleteSpeed: 50,
                    } } />
                    <div>
                        <a href="mailto:official.6packprogrammer@gmail.com">Hire Me</a>
                        <a href="#work">
                            Projects <BsArrowUpRight />
                        </a>
                    </div>
                    <article>
                        <p>
                            +
                            <motion.span
                                ref={ clientCount }
                            ></motion.span>
                        </p>
                        <span>Clients Worldwide</span>
                    </article>
                </div>
            </section>
            <section>
                <Image src="/images/home-1.png" width={ 100 } height={ 100 } alt='' />
            </section>
            <BsChevronDown />
        </div>
    )
}

export default Home