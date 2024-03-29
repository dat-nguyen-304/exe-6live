import Container from '@/components/Container';
import Layout from '@/components/Header';
import CampaignCard from '@/components/campaigns/CampaignCard'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Campaign, Company, UserRole } from '@/types';
import useCompany from '@/hooks/useCompany';
import Error404 from '@/pages/404';
import Loading from '@/components/Loading';
import DeleteModal from '@/components/modals/DeleteModal';

export default function Posts() {

  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const myCompany = useCompany();
  const [company, setCompany] = useState<Company | null>(myCompany.company);
  const [deleteCampaignId, setDeleteCampaignId] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (myCompany.company) {
      setCompany(myCompany.company);
      const getCampaigns = async () => {
        const res = await axios.get(`/api/campaigns?companyId=${myCompany.company?.id}`);
        setCampaigns(res.data);

      }
      getCampaigns();
    }
  }, [myCompany.company]);

  const deleteCampaign = async (campaignId: string) => {
    const res = await axios.delete(`/api/campaigns/${campaignId}`);
    if (campaigns) {
      let newCampaigns = [...campaigns];
      newCampaigns = newCampaigns.filter(campaign => campaign.id !== campaignId);
      setCampaigns(newCampaigns);
    }
  }


  return (
    <Layout roles={ [UserRole.company] }>
      <Container>
        { (company || campaigns === null) ?
          (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {
              campaigns?.length === 0 ?
                <div className='flex justify-center items-center'>Bạn chưa đăng chiến dịch nào</div>
                : campaigns?.map((campaign) => (
                  <CampaignCard
                    key={ campaign.id }
                    campaign={ campaign }
                    modify={ true }
                    setOpenModal={ setOpenModal }
                    setDeleteCampaignId={ setDeleteCampaignId }
                  />
                ))
            }
            <DeleteModal id={ deleteCampaignId as string }
              openModal={ openModal }
              setOpenModal={ setOpenModal }
              content="Bạn có chắc muốn xóa chiến dịch này"
              deleteAction={ () => deleteCampaign(deleteCampaignId as string) }
            />
          </div>
          )
          : <Loading />
        }
      </Container>
    </Layout>
  )
}
