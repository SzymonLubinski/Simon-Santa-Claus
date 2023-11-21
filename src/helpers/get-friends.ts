import {fetchRedis} from "@/helpers/redis";


export const getFriendsByUserId = async (userId: string) => {
    const friendIds = await fetchRedis(
        'smembers',
        `user:${userId}:friends`
    ) as string[];
    return await Promise.all(
        friendIds.map(async (friendId) => {
            const friend = await fetchRedis(
                'get',
                `user:${friendId}`
            ) as string;
            return JSON.parse(friend);
        })
    );
}

export const getGroupsByUserId = async (userId: string) => {
    const groupIds = await fetchRedis(
        'smembers',
        `user:${userId}:groups`
    );
    return await Promise.all(
        groupIds.map(async (groupId: string) => {
            const group = await fetchRedis(
                'get',
                `group:${groupId}`
            );
            return JSON.parse(group);
        })
    );
}