import React, { ChangeEvent, useState } from 'react';
import { platforms as platfs, locations as locats } from '@/utils/variables';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import ImageUpload from '../inputs/ImageUpload';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useCompany from '@/hooks/useCompany';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CompanyProfile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const myUser = useUser();
    const myCompany = useCompany();
    const [company, setCompany] = useState(myCompany.company);
    const [imgLink, setImgLink] = useState(company?.image);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: company?.email,
            name: company?.name,
            image: company?.image,
            phone: company?.phone,
            description: company?.description,
            platforms: company?.platforms || [],
            locations: company?.locations || [],
            addresses: company?.addresses || ["", "", ""],

        }
    });

    const isEmpty = (value: string) => {
        const quillText = value.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
        return quillText.trim() === '';
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (isEmpty(data.description)) {
            toast.error("Bạn cần điền thông tin mô tả");
            return;
        }
        const company = await axios.put("/api/companies", data);
        myCompany.onChangeCompany(company.data);
        toast.success("Cập nhật thành công");
    }

    const name = watch('name');
    const email = watch('email');
    const image = watch('image');
    const phone = watch('phone');
    const description = watch('description');
    const locations = watch('locations');
    const addresses = watch('addresses');
    const platforms = watch('platforms');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const addPlatform = (platf: string) => {
        let platformsClone = [...platforms];
        const isExist = platformsClone.includes(platf);
        if (isExist)
            platformsClone = platformsClone.filter((platform: string) => {
                return platform !== platf
            })
        else platformsClone.push(platf);
        setCustomValue("platforms", platformsClone);
    }

    const addLocation = (loc: string, index: any) => {
        let locationsClone = [...locations];
        const isExist = locationsClone.includes(loc);
        if (isExist) {
            locationsClone = locationsClone.filter((address: string) => {
                return address !== loc
            })
            let addressesClone = [...addresses];
            addressesClone[index] = "";
            setCustomValue("addresses", addressesClone);
        }
        else locationsClone.push(loc);
        setCustomValue("locations", locationsClone);
    }

    const addAddress = (e: ChangeEvent<HTMLInputElement>, index: any) => {
        let addressesClone = [...addresses];
        addressesClone[index] = e.target.value;
        setCustomValue("addresses", addressesClone);
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="grid gap-6 mb-6 md:grid-cols-4">
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tải ảnh đại diện
                    </label>
                    <ImageUpload
                        onChange={ (value) => setCustomValue('image', value) }
                        value={ image }
                    />
                </div>
                <div className='col-span-3 grid gap-6 mb-6 md:grid-cols-3'>
                    <div className=''>
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Họ và tên
                        </label>
                        <input type="text" id="name" { ...register("name") }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input { ...register("email") } disabled type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6live@gmail.com" required />
                    </div>
                    <div>
                        <label htmlFor="phone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            SĐT
                        </label>
                        <input type="text" id="phone" { ...register("phone") }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="097654321" required />
                    </div>
                    <div className='col-span-3'>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nền tảng ({ platforms.length }/5)
                        </label>
                        <div className='flex flex-wrap gap-4'>
                            { platfs.map((platf) => (
                                platf.icon &&
                                (
                                    <div key={ platf.value } onClick={ () => addPlatform(platf.value) }
                                        className={ `border-2 px-2 py-1 rounded-lg cursor-pointer
                                                ${platforms.includes(platf.value) ? 'border-green-400' : ''}
                                                `}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <platf.icon size={ 16 } />
                                            <span>{ platf.label }</span>
                                        </div>
                                    </div>
                                )
                            )) }
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Địa chỉ ({ locations.length }/3)
                        </label>
                        <div className='flex flex-wrap gap-4'>
                            { locats.map((locat, index) => (
                                (
                                    locat.value !== 'all' && (
                                        <div key={ locat.value } onClick={ () => addLocation(locat.value, index - 1) }
                                            className={ `border-2 px-2 py-1 rounded-lg cursor-pointer
                                                            ${locations.includes(locat.value) ? 'border-green-400' : ''}
                                                            `}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <span>{ locat.label }</span>
                                            </div>
                                        </div>
                                    )
                                )
                            )) }
                        </div>
                    </div>
                    {
                        locats.map((locat, index) => (
                            locat.value !== 'all' && locations.includes(locat.value) && (
                                <div key={ locat.value }>
                                    <label htmlFor={ `address-${locat.value}` }
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Địa chỉ ở { `${locat.label}` }
                                    </label>
                                    <input type="text" id={ `address-${locat.value}` } value={ addresses[index - 1] } onChange={ (e) => addAddress(e, index - 1) }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={ `100 Hai Bà Trưng - ${locat.label}` } required />
                                </div>
                            )))
                    }
                </div>
            </div>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lời giới thiệu</label>
            {/* <textarea { ...register("description") } id="message" rows={ 4 } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea> */ }
            <ReactQuill className='h-[300px]' theme="snow" value={ description } onChange={ (value) => setCustomValue("description", value) } />
            <div className="flex items-start my-16">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tôi đồng ý <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">với chính sách và điều khoản của 6Live</a>.</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        </form>
    )
}

export default CompanyProfile;