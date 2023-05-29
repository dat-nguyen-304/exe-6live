import Container from "@/components/Container";
import KolHead from "@/components/kols/KolHead";
import KolInfo from "@/components/kols/KolInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { KOL, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface KolClientProps {
    listing: KOL;
    currentUser?: User | null;
}

const KolClient: React.FC<KolClientProps> = ({
    listing, currentUser
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Container>
            <div>

                <div className="flex justify-around gap-8 mt-8">
                    <KolHead
                        id={ listing.id }
                        currentUser={ currentUser }
                    />
                    <KolInfo />
                </div>
            </div>
        </Container>
    )
}

export default KolClient;