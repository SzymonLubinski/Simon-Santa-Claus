import {Dayjs} from "dayjs";


export function checkEveryoneHasEmail(list: externalFriend[]) {
    let has = true;
    list.forEach((friend) => {
        if (friend.email.length === 0) {
            has = false;
        }
    })
    return has;
}

export function checkEveryoneHasEndowed(list: DrawResult[]) {
    let has = true;
    list.forEach((friend) => {
        if (typeof friend.endowed !== 'object') {
            has = false;
        }
    })
    return has;
}

export function isToDayOrGiftDay(checkDay: Dayjs, today: Dayjs, giftDay: Dayjs) {
    if (checkDay.format('DD-MM-YYYY') === today.format('DD-MM-YYYY')) {
        return 'today'
    }
    if (checkDay.format('DD-MM-YYYY') === giftDay.format('DD-MM-YYYY')) {
        return 'gift-day'
    }
    return 'other';
}

export function isInstanceOfUser(object: any): object is User {
    return 'image' in object;
}

function drawing(drawMembers: DrawMember[], currentMember: DrawMember) {
    const listWithoutCurrent = drawMembers.filter((member) => {
        return member != currentMember;
    })
    return listWithoutCurrent[Math.floor(
        Math.random() * listWithoutCurrent.length
    )];

}
export async function getDrawResults (drawMembers: DrawMember[]) {
    let restOfMembers = drawMembers;
    const drawMembersWithEndowed = drawMembers.map(
        (member) => {
            let endowed = drawing(restOfMembers, member)
            restOfMembers = restOfMembers.filter((member) => {
                return member != endowed;
            })
            return {
                endowed: endowed,
                id: member.id,
                name: member.name,
            } as DrawResult
        }
    )
    const hasEveryoneEndowed = checkEveryoneHasEndowed(drawMembersWithEndowed);
    if (hasEveryoneEndowed){
        return drawMembersWithEndowed;
    } else {
        await getDrawResults(drawMembers);
    }
}