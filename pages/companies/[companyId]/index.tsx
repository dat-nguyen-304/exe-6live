import { useRouter } from "next/router";
import CompanyClient from "@/components/companies/CompanyClient";
import Layout from '@/components/Header';
import { Company } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";

const ListingPage = () => {
    const router = useRouter();
    const { companyId } = router.query;
    console.log("companyId", companyId);
    const [company, setCompany] = useState<Company | null>(null);
    useEffect(() => {
        const getCompanyDetail = async () => {
            const res = await axios.get(`/api/companies/${companyId}`);
            setCompany(res.data);
        }
        if (companyId)
            getCompanyDetail();
    }, [companyId]);
    return (
        <Layout>
            {
                company ?
                    <CompanyClient
                        company={ company }
                    />
                    : <Loading />
            }

        </Layout>
    );
}

export default ListingPage;