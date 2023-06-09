import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { platforms as platfs, locations as locats, genders as gends, industries } from '@/utils/variables';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import ImageUpload from '../inputs/ImageUpload';
import useUser from '@/hooks/useUser';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Calendar } from "react-date-range";
import { addDays, format } from 'date-fns';
import vi from 'date-fns/locale/vi';
import { PatternFormat, NumberFormatBase } from 'react-number-format';
import { Campaign } from '@/types';

interface UpdateCampaignProps {
    campaign: Campaign
}

const UpdateCampaign: React.FC<UpdateCampaignProps> = ({ campaign }) => {
    const myUser = useUser();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [imgLink, setImgLink] = useState();
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const [disabledAge, setDisabledAge] = useState<boolean>(false);
    const [disabledSalary, setDisabledSalary] = useState<boolean>(false);

    useEffect(() => {
        if (!companyId) {
            setCustomValue("companyId", myUser.user?.id);
        }
    }, [myUser.user]);

    useEffect(() => {
        setDisabledAge(minAge === 0);
        setDisabledSalary(minSalary === 0);
        setSelectedDate(new Date(expiredDate));
    }, [])

    const handleClickOutside = (event: MouseEvent) => {
        if (calendarRef.current && !calendarRef.current?.contains(event.target as Node)) {
            setShowCalendar(false);
        }
    };

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            companyId: campaign.companyId,
            title: campaign.title,
            expiredDate: campaign.expiredDate,
            status: campaign.status,
            minAge: campaign.minAge,
            maxAge: campaign.maxAge,
            minSalary: campaign.minSalary,
            maxSalary: campaign.maxSalary,
            image: campaign.image,
            industry: campaign.industry,
            locations: campaign.locations,
            genders: campaign.genders,
            platforms: campaign.platforms,
            description: campaign.description,
            benefit: campaign.benefit
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (data.image === "") toast.error("Bạn chưa cập nhật ảnh đại diện");
        else {
            const res = await axios.put(`/api/campaigns/${campaign.id}`, data);
            toast.success("Cập nhật chiến dịch thành công");
        }
    }

    const companyId = watch('companyId');
    const title = watch('title');
    const locations = watch('locations');
    const genders = watch('genders');
    const expiredDate = watch('expiredDate');
    const status = watch('status');
    const minAge = watch('minAge');
    const maxAge = watch('maxAge');
    const minSalary = watch('minSalary');
    const maxSalary = watch('maxSalary');
    const image = watch('image');
    const industry = watch('industry');
    const platforms = watch('platforms');
    const description = watch('description');
    const benefit = watch('benefit');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const addGender = (gend: string) => {
        let gendersClone = [...genders];
        const isExist = gendersClone.includes(gend);
        if (isExist) {
            gendersClone = gendersClone.filter((location: string) => {
                return location !== gend
            })
        }
        else gendersClone.push(gend);
        setCustomValue("genders", gendersClone);
    }

    const addLocation = (loc: string) => {
        let locationsClone = [...locations];
        const isExist = locationsClone.includes(loc);
        if (isExist) {
            locationsClone = locationsClone.filter((location: string) => {
                return location !== loc
            })
        }
        else locationsClone.push(loc);
        setCustomValue("locations", locationsClone);
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

    const togglePostStatus = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked)
            setCustomValue("status", true);
        else setCustomValue("status", false);
    }

    const handleSelect = (date: Date) => {
        setSelectedDate(date);
        setCustomValue("expiredDate", date);
    }

    const handleAllAge = () => {
        setDisabledAge(true);
        setCustomValue("minAge", 0);
        setCustomValue("maxAge", 0);
    }

    const handleAllSalary = () => {
        setDisabledSalary(true);
        setCustomValue("minSalary", 0);
        setCustomValue("maxSalary", 0);
    }

    const formatVnd = (numStr: string) => {
        if (numStr === '') return '';
        return new Intl.NumberFormat('vi-VI', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0,
        }).format(numStr as any);
    };

    return (
        <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="grid gap-6 mb-6 md:grid-cols-4">
                <div>
                    <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Tải ảnh cho chiến dịch
                    </label>
                    <ImageUpload
                        onChange={ (value) => setCustomValue('image', value) }
                        value={ image }
                    />
                </div>
                <div className='col-span-3 grid gap-6 mb-6 md:grid-cols-3'>
                    {/* Title */ }
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tiêu đề
                        </label>
                        <input type="text" id="title" { ...register("title") }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nguyễn Văn A"
                            required
                        />
                    </div>
                    {/* Industry */ }
                    <div >

                        <label htmlFor="industry"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Ngành
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="industry"
                            onChange={ (e) => setCustomValue('industry', e.target.value) }
                        >
                            { industries.map(ind => {
                                return (
                                    ind.value !== 'all' && (
                                        <option key={ ind.value } value={ ind.value }>
                                            { ind.label }
                                        </option>
                                    )
                                )
                            }) }
                        </select>
                    </div>
                    {/* Gender  */ }
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Giới tính ({ genders.length }/3)
                        </label>
                        <div className='flex flex-wrap gap-4'>
                            { gends.map((gend, index) => (
                                (
                                    gend.value !== 'all' && (
                                        <div key={ gend.value } onClick={ () => addGender(gend.value) }
                                            className={ `border-2 px-2 py-1 rounded-lg cursor-pointer
                                                            ${genders.includes(gend.value) ? 'border-green-400' : ''}
                                                        `}
                                        >
                                            <div className='flex items-center gap-2'>
                                                <span>{ gend.label }</span>
                                            </div>
                                        </div>
                                    )
                                )
                            )) }
                        </div>
                    </div>
                    <div className='col-span-3 grid grid-cols-5'>
                        {/* Location */ }
                        <div className='col-span-2'>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Địa điểm ({ locations.length }/3)
                            </label>
                            <div className='flex flex-wrap gap-4'>
                                { locats.map((locat, index) => (
                                    (
                                        locat.value !== 'all' && (
                                            <div key={ locat.value } onClick={ () => addLocation(locat.value) }
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
                        {/* Platform  */ }
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
                    </div>

                    {/* Age  */ }
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Độ tuổi
                        </label>
                        <div className="flex gap-8">
                            <div className="flex flex-[1] justify-around items-center">
                                <div className="">
                                    <input checked={ disabledAge } type='radio' id="allAge" onChange={ handleAllAge } />
                                    <label className='ml-2 text-sm font-semibold' htmlFor='allAge'>Tất cả độ tuổi</label>
                                </div>
                                <div className="">
                                    <input checked={ !disabledAge }
                                        type='radio'
                                        id="chooseAge"
                                        onChange={ () => setDisabledAge(false) }
                                    />
                                    <label className='ml-2 text-sm font-semibold' htmlFor='chooseAge'>Tùy chọn</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Từ
                        </label>
                        { !disabledAge ?
                            <PatternFormat
                                key={ 1 }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                format="##"
                                required
                                value={ minAge }
                                onValueChange={ (values) => {
                                    const { value } = values;
                                    setCustomValue("minAge", parseInt(value));
                                } }
                            />
                            :
                            <input disabled className='bg-gray-300 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        }
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Đến
                        </label>
                        { !disabledAge ?
                            <PatternFormat
                                key={ 2 }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                format="##"
                                required
                                value={ maxAge }
                                onValueChange={ (values) => {
                                    const { value } = values;
                                    setCustomValue("maxAge", parseInt(value));
                                } }
                            />
                            :
                            <input disabled className='bg-gray-300 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        }
                    </div>
                    {/* Salary  */ }
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Khoảng lương
                        </label>
                        <div className="flex gap-8">
                            <div className="flex flex-[1] justify-around items-center">
                                <div className="">
                                    <input checked={ disabledSalary } type='radio' name="age" id="allSalary" onChange={ handleAllSalary } />
                                    <label className='ml-2 text-sm font-semibold' htmlFor='allSalary'>Thỏa thuận</label>
                                </div>
                                <div className="">
                                    <input checked={ !disabledSalary } type='radio' name="age" id="chooseSalary" onChange={ () => setDisabledSalary(false) } />
                                    <label className='ml-2 text-sm font-semibold' htmlFor='chooseSalary'>Tùy chọn</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Từ
                        </label>
                        { !disabledSalary ?
                            <NumberFormatBase
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                format={ formatVnd }
                                required
                                value={ minSalary }
                                onValueChange={ (values) => {
                                    const { value } = values;
                                    setCustomValue("minSalary", parseInt(value));
                                } }
                            />
                            :
                            <input disabled className='bg-gray-300 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        }
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Đến
                        </label>
                        { !disabledSalary ?
                            <NumberFormatBase
                                className='bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                format={ formatVnd }
                                required
                                value={ maxSalary }
                                onValueChange={ (values) => {
                                    const { value } = values;
                                    setCustomValue("maxSalary", parseInt(value));
                                } }
                            />
                            :
                            <input disabled className='bg-gray-300 cursor-not-allowed border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                        }
                    </div>
                    {/* Expired date  */ }
                    <div className='relative'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Ngày hết hạn
                        </label>
                        <div className='inline-flex gap-4 items-center' onClick={ toggleCalendar }>
                            <div className='px-2 py-1 bg-green-800 rounded-lg text-sm font-light cursor-pointer text-white'>Chọn ngày</div>
                            { selectedDate && <span>{ format(selectedDate as Date, 'dd/MM/yyyy') }</span> }
                        </div>
                        { showCalendar &&
                            <div ref={ calendarRef } className="border bg-gray-50 p-0 border-green-300 absolute left-0 top-16 rounded-md !w-[480px] z-10">
                                <Calendar
                                    locale={ vi }
                                    date={ selectedDate as Date }
                                    onChange={ handleSelect }
                                    minDate={ addDays(new Date(), 1) }
                                    color="#22713d"
                                />
                            </div>
                        }
                    </div>
                    {/* Status  */ }
                    <div>
                        <label className="relative inline-flex items-center mb-4 cursor-pointer">
                            <input type="checkbox" value="" checked={ status } className="sr-only peer" onChange={ (e: ChangeEvent<HTMLInputElement>) => togglePostStatus(e) } />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-rose-500 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Trạng thái tìm việc</span>
                        </label>
                    </div>
                </div>

            </div >
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mô tả chi tiết</label>
            <textarea { ...register("description") } id="description" rows={ 4 } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mô tả chi tiết..."></textarea>

            <label htmlFor="benefit" className="mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quyền lợi</label>
            <textarea { ...register("benefit") } id="benefit" rows={ 4 } className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quyền lợi..."></textarea>

            <div className="flex items-start my-6">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                </div>
                <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tôi đồng ý <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">với chính sách và điều khoản của 6Live</a>.</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Xác nhận</button>
        </form >
    )
}

export default UpdateCampaign;