import useRentModal from "../../hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import LocationSelect from "../inputs/LocationSelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import AgeSelect from "../inputs/AgeSelect";
import PriceSelect from "../inputs/PriceSelect";
import GenderSelect from "../inputs/GenderSelect";

enum STEPS {
    CATEGORY = 0,
    LOCATION_GENDER = 1,
    AGE_PRICE = 2
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            ageStart: 20,
            ageEnd: 30,
            priceStart: 0,
            priceEnd: 5,
        }
    });

    const location = watch('location');
    const ageStart = watch('ageStart');
    const ageEnd = watch('ageEnd');
    const category = watch('category');
    const priceStart = watch('priceStart');
    const priceEnd = watch('priceEnd');
    const gender = watch('gender');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.AGE_PRICE) return 'Tìm kiếm';
        return 'Tiếp theo'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) return undefined;
        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Bạn muốn tìm KOL/KOC livestream về mảng nào?"
                subtitle="Hãy chọn một loại"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                { categories.map((item) => (
                    <div key={ item.label } className="col-span-1">
                        <CategoryInput
                            onClick={ (category) => { setCustomValue('category', category) } }
                            selected={ category === item.label }
                            label={ item.label }
                            icon={ item.icon }
                        />
                    </div>
                )) }
            </div>
        </div>
    );

    if (step === STEPS.LOCATION_GENDER) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Địa điểm và giới tính"
                    subtitle=""
                />
                <LocationSelect
                    onChange={ (value) => setCustomValue('location', value) }
                    value={ location }
                />
                <GenderSelect
                    onChange={ (value) => setCustomValue('gender', value) }
                    value={ gender }
                />
            </div>
        )
    }

    if (step === STEPS.AGE_PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Độ tuổi và giá cả"
                    subtitle=""
                />
                <AgeSelect
                    onChangeStart={ (value) => setCustomValue('ageStart', value) }
                    valueStart={ ageStart }
                    onChangeEnd={ (value) => setCustomValue('ageEnd', value) }
                    valueEnd={ ageEnd }
                />
                <PriceSelect
                    onChangeStart={ (value) => setCustomValue('priceStart', value) }
                    valueStart={ priceStart }
                    onChangeEnd={ (value) => setCustomValue('priceEnd', value) }
                    valueEnd={ priceEnd }
                />
            </div>
        )
    }

    // const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //     if (step !== STEPS.AGE_PRICE) {
    //         return onNext();
    //     }

    //     setIsLoading(true);

    //     axios.post('/api/listings', data)
    //         .then(() => {
    //             toast.success('Listing created!');
    //             router.refresh();
    //             reset();
    //             setStep(STEPS.CATEGORY)
    //             rentModal.onClose();
    //         })
    //         .catch(() => {
    //             toast.error('Something went wrong.');
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         })
    // }

    return (
        <Modal
            isOpen={ rentModal.isOpen }
            onClose={ rentModal.onClose }
            onSubmit={ () => { } }
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
            title="Bộ lọc"
            body={ bodyContent }
        />
    )
}

export default RentModal