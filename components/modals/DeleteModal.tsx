import React, { useState } from 'react'
import { Modal, Button } from 'flowbite-react';
import SvgCom from "../../public/images/warning.svg";
import { PuffLoader } from 'react-spinners';
import Success from "../../public/images/ezgif-3-27ee762c73.gif";
import Image from "next/image";

interface DeleteModalProps {
    id: string,
    openModal: boolean,
    setOpenModal: (value: React.SetStateAction<boolean>) => void,
    content: string,
    deleteAction: () => Promise<void>
}

const DeleteModal: React.FC<DeleteModalProps> = ({ id, openModal, setOpenModal, content, deleteAction }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        await deleteAction();
        setLoading(false);
        setSuccess(true);
    }
    return (
        <Modal
            onClose={ () => {
                setOpenModal(false);
                setSuccess(false);
            } }
            popup
            show={ openModal }
            size="xl"
            className='modal-delete'
        >
            <div >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {
                            success ?
                                <div className="flex justify-center mb-8">
                                    <Image src={ Success } alt="" width={ 100 } height={ 100 } className='gif' />
                                </div>
                                :
                                loading ?
                                    <div className="flex justify-center mb-8">
                                        <PuffLoader size={ 100 } color="red" />
                                    </div>
                                    :
                                    <SvgCom className="mx-auto mb-8 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        }
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <p>
                                {
                                    !success ?
                                        content : 'Xóa thành công'
                                }
                            </p>
                        </h3>
                        <div className="flex justify-center gap-4">
                            {
                                !success ?
                                    <>
                                        <Button
                                            color="failure"
                                            disabled={ loading }
                                            onClick={ handleDelete }
                                        >
                                            {
                                                loading ? "Đang xóa ..." : "Chắc chắn"
                                            }
                                        </Button>
                                        <Button
                                            color="gray"
                                            onClick={ () => setOpenModal(false) }
                                            disabled={ loading }
                                        >
                                            Quay lại
                                        </Button>
                                    </>
                                    :
                                    <Button color="green"
                                        onClick={ () => {
                                            setOpenModal(false); setSuccess(false);
                                        } }
                                    >
                                        Đồng ý
                                    </Button>
                            }
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default DeleteModal