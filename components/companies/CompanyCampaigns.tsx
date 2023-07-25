import { useEffect, useState } from "react";
import CampaignCard from "../campaigns/CampaignCard";
import { Campaign, Company } from "@/types";
import axios from "axios";
import Loading from "../Loading";

interface CompanyCampaignsProps {
    company: Company
}

const CompanyCampaigns: React.FC<CompanyCampaignsProps> = ({ company }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    useEffect(() => {
        const getCampaigns = async () => {
            const res = await axios.get(`/api/campaigns?companyId=${company.id}`);
            setCampaigns(res.data);
        }
        if (company.id) getCampaigns();
    }, [company.id]);

    return (
        <div className="flex-[1] sm:px-8 lg:border-l-2 lg:border-[#00b14f] mt-8 lg:mt-0">
            <p className="text-[#00b14f] text-bold text-base md:text-xl font-bold">Các chiến dịch gần đây</p>
            <div className="my-4 rounded-lg">
                { campaigns ?
                    campaigns.map((campaign) => (
                        <div key={ campaign.id } className="my-4">
                            <CampaignCard campaign={ campaign } modify={ false } />
                            <hr />
                        </div>
                    ))
                    :
                    <Loading />
                }
            </div>

        </div>
    );
}

export default CompanyCampaigns;