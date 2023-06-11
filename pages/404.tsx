import Image from 'next/image';
import React from 'react'

const Error404 = () => {
    return (
        <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
            <Image src="/images/error-404.png" width={ 200 } height={ 200 } alt='' />
        </div>
    )
}

export default Error404;