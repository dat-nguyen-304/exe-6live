import Container from "@/components/Container";
import KolHead from "@/components/kols/KolHead";
import KolInfo from "@/components/kols/KolInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { Kol, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Loading from "../Loading";

interface KolClientProps {
    key: string;
    currentKol?: Kol | null;
}

const KolClient: React.FC<KolClientProps> = ({
    key, currentKol
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(currentKol === null);

    useEffect(() => {
        if (currentKol) setIsLoading(false);
    }, [currentKol]);

    if (isLoading) return <Loading />

    return (
        <Container>
            <div>
                <div className="flex justify-around gap-8 mt-8">
                    <KolHead
                        id={ key }
                        currentKol={ currentKol }
                    />
                    <KolInfo
                        id={ key }
                        description={ currentKol?.description as string }
                    />
                </div>
            </div>
        </Container>
    )
}

export default KolClient;