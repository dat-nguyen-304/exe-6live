;

import Container from "@/components/Container";
import CompanyHead from "@/components/companies/CompanyHead";
import CompanyInfo from "@/components/companies/CompanyInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { User, Company } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface CompanyClientProps {
    company: Company;
    currentUser?: User | null;
}

const CompanyClient: React.FC<CompanyClientProps> = ({
    company, currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Container>
            <div>
                <div className="flex justify-around gap-8 mt-8">
                    <CompanyHead
                        id={ "1" }
                        currentUser={ currentUser }
                    />
                    <CompanyInfo />
                </div>
            </div>
        </Container>
    )
}

export default CompanyClient;