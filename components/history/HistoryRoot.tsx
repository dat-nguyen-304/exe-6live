import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react';
import axios from 'axios';
import { Payment } from '@/types';
import useUser from '@/hooks/useUser';
import { Package } from '@prisma/client';
import { format } from 'date-fns';
import Loading from '../Loading';

const HistoryRoot = () => {
    const myUser = useUser();
    const [payments, setPayments] = useState<(Payment & { package: Package })[] | null>(null);
    useEffect(() => {
        const getAllPayments = async () => {
            const res = await axios.get(`/api/payments/${myUser.user?.id}`);
            console.log(res.data);
            setPayments(res.data);
        }
        if (myUser.user?.isVip) getAllPayments();
        else setPayments([]);
    }, [myUser.user]);

    return (
        <>
            <div className='mb-16 text-green-700 font-bold text-sm sm:text-lg'>Lịch sử giao dịch:</div>
            {
                payments !== null ?
                    payments.length === 0 ?
                        <div>Bạn chưa có giao dịch nào!</div>
                        :
                        <div className='w-[100%] overflow-scroll sm:overflow-auto sm:w-auto'>
                            <div className='w-fit sm:w-auto'>
                                <Table striped >
                                    <Table.Head>
                                        <Table.HeadCell>
                                            Tên gói
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Ngân hàng
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Giá
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Ngày giao dịch
                                        </Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {
                                            payments.map(payment => (
                                                <Table.Row key={ payment.id } className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        Gói { payment.package.numberOfMonth } tháng
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        { payment.bank.toUpperCase() }
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        { payment.price.toLocaleString('vi-VN') }
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        { format(new Date(payment.createdAt as string), 'HH:mm - dd/MM/yyy') }
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        }
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    :
                    <Loading />
            }

        </>
    )
}

export default HistoryRoot