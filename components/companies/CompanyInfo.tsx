import PostCard from "../campaigns/CampaignCard";

const ListingInfo: React.FC = () => {

    return (
        <div className="flex-[1] px-8 border-l-2 border-[pink]">
            <p className="text-[#00b14f] text-bold text-xl font-bold">Các chiến dịch gần đây</p>
            <div className="shadow-md my-4 rounded-lg">
                <PostCard />
            </div>

        </div>
    );
}

export default ListingInfo;