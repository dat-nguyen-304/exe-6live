interface ListingHeadProps {
    id: string;
    description: string
}

const ListingInfo: React.FC<ListingHeadProps> = ({ id, description }) => {

    return (
        <div key={ id } className="flex-[1] px-8 border-l-2 border-[pink]">
            <div className="text-md font-light text-neutral-500 mt-4">
                Giới thiệu: { description }
            </div>
        </div>
    );
}

export default ListingInfo;