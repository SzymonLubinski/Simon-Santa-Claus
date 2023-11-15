import Results from "@/components/Main/Results";
import {fetchRedis} from "@/helpers/redis";
import {notFound} from "next/navigation";
import Background from "@/components/Main/Background";


interface PageProps {
    params: {
        result: string;
    }
}

const Page = async ({params}: PageProps) => {
    const {result} = params;
    const [groupId, friendId] = result.split('---');
    const drawResults = await fetchRedis(
        'get',
        `group:${groupId}:draw-result`
    );
    if (drawResults === null) notFound();
    const parsedDrawResults = JSON.parse(drawResults) as DrawResult[];
    const [you] = parsedDrawResults.filter(
        member => member.id === friendId
    );

    return (
        <Background>
            <Results you={you}/>
        </Background>
    )
}

export default Page;