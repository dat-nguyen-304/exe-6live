import KolHead from "@/components/kols/KolHead";
import KolInfo from "@/components/kols/KolInfo";
import { Kol } from "@/types";

interface KolClientProps {
    id: string;
    currentKol: Kol;
}

const KolClient: React.FC<KolClientProps> = ({ id, currentKol }) => {
    return (
        <div>
            <div className="lg:flex justify-around gap-8 mt-8">
                <KolHead
                    id={ id }
                    currentKol={ currentKol }
                />
                <KolInfo
                    id={ id }
                    description={ currentKol?.description as string }
                />
            </div>
        </div>
    )
}

export default KolClient;