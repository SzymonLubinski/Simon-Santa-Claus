import {fetchRedis} from "@/helpers/redis";


export const getFriendsByUserId = async (userId: string) => {
    const friendIds = await fetchRedis(
        'smembers',
        `user:${userId}:friends`
    ) as string[];
    const friends = await Promise.all(
        friendIds.map( async (friendId) => {
            const friend = await fetchRedis(
                'get',
                `user:${friendId}`
            ) as string;
            const parsedFriend = JSON.parse(friend);
            return parsedFriend;
        })
    )
    return friends;
}

export const getGroupsByUserId = async (userId: string) => {
    const groupIds = await fetchRedis(
        'smembers',
        `user:${userId}:groups`
    );
    const groups = await Promise.all(
        groupIds.map(async (groupId: string) => {
            const group = await fetchRedis(
                'get',
                `group:${groupId}`
            );
            const parsedGroup = JSON.parse(group);
            return parsedGroup;
        })
    )
    return groups;
}