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
import Loading from "../Loading";

interface CompanyClientProps {
    company: Company;
}

const CompanyClient: React.FC<CompanyClientProps> = ({
    company
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div>
            <div className="flex justify-around gap-8 mt-8">
                <CompanyHead
                    id={ company.id }
                    company={ company }
                />
                <CompanyInfo
                    company={ company }
                />
            </div>
        </div>
    )
}

export default CompanyClient;