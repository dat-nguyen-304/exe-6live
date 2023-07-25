import React, { ChangeEvent } from 'react';
import { industries as inds, platforms as platfs, genders, locations } from '@/utils/variables';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import ImageUpload from '../inputs/ImageUpload';
import axios from 'axios';
import useKol from '@/hooks/useKol';
import { toast } from 'react-hot-toast';
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const KolProfile = () => {
    const myKol = useKol();
    const kol = myKol.kol;

    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: kol?.name,
            email: kol?.email,
            phone: kol?.phone,
            description: kol?.description,
            location: kol?.location || 'hcm',
            salary: kol?.salary,
            gender: kol?.gender || 'male',
            status: kol?.status || false,
            age: kol?.age,
            image: kol?.image,
            industries: kol?.industries || [],
            platforms: kol?.platforms || []
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
        const kol = await axios.put("/api/kols", data);
        myKol.onChangeKol(kol.data);
        toast.success("Cập nhật thành công");
    }

    const name = watch('name');
    const email = watch('email');
    const phone = watch('phone');
    const description = watch('description');
    const location = watch('location');
    const salary = watch('salary');
    const gender = watch('gender');
    const status = watch('status');
    const age = watch('age');
    const image = watch('image');
    const industries = watch('industries');
    const platforms = watch('platforms');


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const addIndustry = (ind: string) => {
        let industriesClone = [...industries];
        const isExist = industriesClone.includes(ind);
        if (isExist)
            industriesClone = industriesClone.filter((industry: string) => {
                return industry !== ind
            })
        else industriesClone.push(ind);
        setCustomValue("industries", industriesClone);
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

    const toggleWorkStatus = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked)
            setCustomValue("status", true);
        else setCustomValue("status", false);
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="grid gap-6 mb-6 md:grid-cols-4">
                <div className='max-w-[90%] mx-auto'>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tải ảnh đại diện
                    </label>
                    <ImageUpload
                        onChange={ (value) => setCustomValue('image', value) }
                        value={ image }
                    />
                </div>
                <div className='md:col-span-3 grid gap-6 mb-6 md:grid-cols-3'>
                    <div className=''>
                        <label htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Họ và tên
                        </label>
                        <input type="text" id="name" { ...register("name") }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nguyễn Văn A" required />
                    </div>
                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa điểm</label>
                        <select onChange={ (e) => setCustomValue('location', e.target.value) } id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            { locations.map(location => {
                                return (
                                    location.value !== 'all' &&
                                    <option key={ location.value } value={ location.value }>{ location.label }</option>
                                )
                            }) }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa điểm</label>
                        <select onChange={ (e) => setCustomValue('gender', e.target.value) } id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            { genders.map(gender => {
                                return (
                                    gender.value !== 'all' &&
                                    <option key={ gender.value } value={ gender.value }>{ gender.label }</option>
                                )
                            }) }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tuổi</label>
                        <input { ...register("age") } type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                    </div>
                    <div>
                        <label htmlFor="salary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mức lương yêu cầu</label>
                        <input { ...register("salary") } type="number" id="salary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18.000.000" required />
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
                    <div >
                        <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngành hàng ({ industries.length }/4)
                        </label>
                        <div className='flex flex-wrap gap-4'>
                            { inds.map((ind) => (
                                ind.icon &&
                                (
                                    <div key={ ind.value } onClick={ () => addIndustry(ind.value) }
                                        className={ `border-2 px-2 py-1 rounded-lg cursor-pointer
                                                ${industries.includes(ind.value) ? 'border-green-400' : ''}
                                                `}
                                    >
                                        <div className='flex items-center gap-2'>
                                            <ind.icon size={ 16 } />
                                            <span>{ ind.label }</span>
                                        </div>

                                    </div>
                                )
                            )) }
                        </div>
                    </div>
                    <div >
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
                    <div>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input type="checkbox" value="" checked={ status } className="sr-only peer" onChange={ (e: ChangeEvent<HTMLInputElement>) => toggleWorkStatus(e) } />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-rose-500 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Trạng thái tìm việc</span>
                        </label>
                    </div>
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

export default KolProfile