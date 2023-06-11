interface ListingHeadProps {
    id: string;
    description: string
}

const ListingInfo: React.FC<ListingHeadProps> = ({ id, description }) => {

    return (
        <div key={ id } className="flex-[1] px-8 border-l-2 border-[#00b14f]">
            <div className="text-md font-ligh mt-4">
                <span className="text-md font-bold">Giới thiệu:</span> { description }
            </div>
        </div>
    );
}

export default ListingInfo;