import { useRouter } from "next/router";
import CompanyClient from "@/components/companies/CompanyClient";
import Layout from '@/components/Header';
import { Company, UserRole } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import Container from "@/components/Container";

const ListingPage = () => {
    const router = useRouter();
    const { companyId } = router.query;
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
        <Layout roles={ [UserRole.kol, "guest"] }>
            <Container>
                {
                    company ?
                        <CompanyClient
                            company={ company }
                        />
                        : <Loading />
                }
            </Container>
        </Layout>
    );
}

export default ListingPage;