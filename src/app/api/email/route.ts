

import * as nodemailer from 'nodemailer'


export async function POST (req: Request){
    try {
        const {email, memberName, recipientName} = await req.json();
        let transporter: nodemailer.Transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'szymon.lubinski.it@gmail.com',
                pass: 'kqnq ejwz sxhz xbkt'
            }
        });
        const mail = await transporter.sendMail({
            from: 'szymon.lubinski.it@gmail.com',
            to: email,
            replyTo: email,
            subject: 'Simon Santa!',
            html: `
                <div>
                    <h1>Cześć ${memberName}</h1>
                    <p>Osoba której wręczysz prezent to ${recipientName}</p>
                </div>
            `,
        });
        console.log('(EMAIL), message sent Success step 2: ', mail.messageId);
        return new Response('OK')
    } catch (error) {
        return new Response('No email sent', {status: 400})
    }
}