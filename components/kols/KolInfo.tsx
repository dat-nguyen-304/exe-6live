import parse from 'html-react-parser';

interface ListingHeadProps {
    id: string;
    description: string
}

const ListingInfo: React.FC<ListingHeadProps> = ({ id, description }) => {

    return (
        <div key={ id } className="flex-[1] px-8 lg:border-l-2 lg:border-[#00b14f]">
            <div className="text-md font-ligh mt-4">
                <span className="text-md font-bold list-disc">Giới thiệu:</span>
                <div>
                    { parse(description) }
                </div>
            </div>
        </div>
    );
}

export default ListingInfo;