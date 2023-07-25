import CompanyHead from "@/components/companies/CompanyHead";
import CompanyCampaigns from "@/components/companies/CompanyCampaigns";
import { Company } from "@/types";

interface CompanyClientProps {
    company: Company;
}

const CompanyClient: React.FC<CompanyClientProps> = ({
    company
}) => {
    return (
        <div>
            <div className="lg:flex justify-around gap-8 mt-0 lg:mt-8">
                <CompanyHead
                    id={ company.id }
                    company={ company }
                />
                <CompanyCampaigns
                    company={ company }
                />
            </div>
        </div>
    )
}

export default CompanyClient;