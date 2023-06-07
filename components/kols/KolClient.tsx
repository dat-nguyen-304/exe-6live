import Container from "@/components/Container";
import KolHead from "@/components/kols/KolHead";
import KolInfo from "@/components/kols/KolInfo";
import { Kol } from "@/types";

interface KolClientProps {
    key: string;
    currentKol: Kol;
}

const KolClient: React.FC<KolClientProps> = ({
    key, currentKol
}) => {
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