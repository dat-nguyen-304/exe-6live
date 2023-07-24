import React from 'react';
import Success from "../../public/images/ezgif-3-27ee762c73.gif";
import Image from "next/image";
import { Modal, Button } from 'flowbite-react';
import useSuccessModal from '@/hooks/useSuccessModal';

const SuccessModal = () => {
    const { isOpen, content, onClose } = useSuccessModal();
    return (
        <Modal
            onClose={ onClose }
            popup
            show={ isOpen }
            size="xl"
            className='modal-delete'
            position='center'
        >
            <div >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">

                        <div className="flex justify-center mb-8">
                            <Image src={ Success } alt="" width={ 200 } height={ 200 } className='gif' />
                        </div>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <p>
                                { content }
                            </p>
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="green" onClick={ onClose }>
                                Đồng ý
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default SuccessModal