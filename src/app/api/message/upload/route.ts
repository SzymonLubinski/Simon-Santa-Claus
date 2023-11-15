import {Buffer} from "buffer";
import {writeFile} from "fs/promises";
import path from "path";
import * as fs from "fs";
import {nanoid} from "nanoid";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth";
import {db} from "@/lib/db";
import {messageValidator} from "@/lib/validation/message";
import {pusherServer} from "@/lib/pusher";
import {toPusherKey} from "@/lib/utils";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response('Unauthorized', {status: 401});
    }
    try {
        const formData = await req.formData();
        const chatId = formData.get('chatId');

        formData.delete('chatId');
        for (const entry of Array.from(formData.entries())) {
            const [key, value] = entry;
            const isFile = typeof value === 'object';
            if (!isFile) {
                return new Response('No files received', {status: 400})
            }
            const blob = value as Blob;
            const fileName = `${Date.now()}-${blob.name}`;
            if (!blob) {
                return new Response('No blob received', {status: 400});
            }
            const buffer = Buffer.from(await blob.arrayBuffer());
            const folderPath = path.join(process.cwd(), `public/${chatId}`);
            const filePath = path.join(process.cwd(), `public/${chatId}/${fileName}`);
            if (!fs.existsSync(folderPath)) {
                try {
                    fs.mkdirSync(folderPath);
                } catch (error) {
                    console.error(error);
                }
            }
            try {
                await writeFile(
                    filePath,
                    buffer,
                )
                const fileType = blob.type === 'video/mp4' ? 'video' : 'image';
                const timestamp = Date.now();
                const messageData: Message = {
                    id: nanoid(),
                    senderId: session.user.id,
                    text: `/${chatId}/${fileName}`,
                    timestamp: timestamp,
                    messageType: fileType,
                }
                const message = messageValidator.parse(messageData);
                await pusherServer.trigger(
                    toPusherKey(`chat:${chatId}`),
                    'incoming-message',
                    message
                );
                await db.zadd(`chat:${chatId}:messages`, {
                    score: timestamp,
                    member: JSON.stringify(message),
                });
                console.log('poszło image lub video')

            } catch (error) {
                return new Response('No saved', {status: 400})
            }
        }

        return new Response('OK')
    } catch (error) {
        return new Response('No saved', {status: 400})
    }
}