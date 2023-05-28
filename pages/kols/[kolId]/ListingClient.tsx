;

import Container from "@/components/Container";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { KOL, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface ListingClientProps {
    listing: KOL;
    currentUser?: User | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);


    return (
        <Container>
            <div>
                <div className="flex justify-around gap-8">
                    <ListingHead
                        id={ listing.id }
                        currentUser={ currentUser }
                    />
                    <ListingInfo />
                </div>
            </div>
        </Container>
    )
}

export default ListingClient