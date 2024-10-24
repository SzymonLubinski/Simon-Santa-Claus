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

export function isToDayOrGiftDay(checkDay: Dayjs, today: Dayjs, giftDay: Dayjs) {
    if (checkDay.format('DD-MM-YYYY') === today.format('DD-MM-YYYY')) {
        return 'today'
    }
    if (checkDay.format('DD-MM-YYYY') === giftDay.format('DD-MM-YYYY')) {
        return 'gift-day'
    }
    return 'other';
}

export async function getDrawResults (drawMembers: DrawMember[]) {
    const giftsList = getGiftsNumbers(drawMembers.length);

    // DEFAULT ARRAYS
    let availableDonors: DrawMember[] = drawMembers;
    let availableRecipients: DrawMember[] = drawMembers;
    let donorsWithRecipients: {
        donor: DrawMember;
        recipient: DrawMember;
    }[] = [];

    while (availableDonors.length !== 0 && availableRecipients.length !== 0) {
        if (availableDonors.length !== availableRecipients.length){
            return 'incorrect number of members - error'
        }
        if (
            availableDonors.length === 1 &&
            availableRecipients.length === 1 &&
            availableDonors[0] === availableRecipients[0]
        ){
            console.log('one person left - reset');
            availableDonors = drawMembers;
            availableRecipients = drawMembers;
            donorsWithRecipients = [];
        }

        const donor = availableDonors[0];
        const recipients = availableRecipients.filter((el) => el.id !== donor.id);
        const recipient = recipients[Math.floor(Math.random() * recipients.length)]
        const pair = {donor: donor, recipient: recipient}

        // UPDATE ARRAYS
        availableDonors = availableDonors.filter((el) => el.id !== donor.id);
        availableRecipients = availableRecipients.filter((el) => el.id !== recipient.id);
        donorsWithRecipients.push(pair)
    }

    if (donorsWithRecipients.length !== giftsList.length){
        return 'bad gifts amount - error'
    }

    const drawResult: DrawResult[] = donorsWithRecipients.map((item, i) => ({
        recipient: item.recipient,
        donor: item.donor,
        giftPictureNum: giftsList[i],
        alreadyGiven: false
    }));

    return drawResult;
}


export function getGiftsNumbers (members: number) {
    const MAX_LIMIT = 18;
    const randomArray: number[] = [];
    const initialNumbers: number[] = Array.from({length: MAX_LIMIT + 1}, (_, i) => i);
    let availableNumbers: number[] = initialNumbers;
    while (randomArray.length < members) {
        if (availableNumbers.length === 0){
            availableNumbers = initialNumbers;
        }

        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        const randomNum = availableNumbers.splice(randomIndex, 1)[0];
        randomArray.push(randomNum);
    }

    return randomArray;
}