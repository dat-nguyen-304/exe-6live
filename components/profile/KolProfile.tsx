import React, { useState } from 'react'
import Layout from '../Header'
import Container from '../Container'
import { locations } from "../inputs/LocationSelect";
import { industries as inds, IndustrySelectValue } from '../inputs/IndustrySelect';
import { FieldValues, useForm } from 'react-hook-form'
import ImageUpload from '../inputs/ImageUpload';

const KolProfile = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
            name: '',
            email: '',
            phone: '',
            description: '',
            location: '',
            salary: '',
            gender: '',
            status: '',
            age: '',
            avatar: '',
            industries: []
        }
    });

    const name = watch('name');
    const email = watch('email');
    const phone = watch('phone');
    const description = watch('description');
    const location = watch('location');
    const salary = watch('salary');
    const gender = watch('gender');
    const status = watch('salary');
    const age = watch('age');
    const avatar = watch('avatar');
    const industries = watch('industries');


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }
    console.log(industries);

    return (
        <Layout>
            <Container>
                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-4">
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Tải avatar
                            </label>
                            <ImageUpload
                                onChange={ (value) => setCustomValue('avatar', value) }
                                value={ avatar }
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
                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa điểm</label>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    { locations.map(location => {
                                        return (
                                            location.value !== 'all' &&
                                            <option key={ location.value } value={ location.value }>{ location.label }</option>
                                        )
                                    }) }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tuổi</label>
                                <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18" required />
                            </div>
                            <div>
                                <label htmlFor="visitors" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mức lương yêu cầu</label>
                                <input type="number" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="18.000.000" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="6live@gmail.com" required />
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
                                    Ngành hàng (4/4)
                                </label>
                                <div className='flex flex-wrap gap-4'>
                                    { inds.map((ind) => (
                                        ind.icon &&
                                        <div key={ ind.value } className='border-2 border-green-400 px-2 py-1 rounded-lg cursor-pointer'>
                                            <span>{ ind.label }</span>
                                        </div>
                                    )) }
                                </div>
                            </div>
                            <div>
                                <label className="relative inline-flex items-center mb-4 cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-rose-500 peer-checked:bg-blue-600"></div>
                                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Trạng thái tìm việc</span>
                                </label>
                            </div>
                        </div>

                    </div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lời giới thiệu</label>
                    <textarea id="message" rows={ 4 } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    <div className="flex items-start my-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tôi đồng ý <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">với chính sách và điều khoản của 6Live</a>.</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
                </form>
            </Container>
        </Layout>
    )
}

export default KolProfile