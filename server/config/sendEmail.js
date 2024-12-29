
import { Resend } from 'resend';

export const sendEmail = async ({sendTo,subject,html}) => {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
            from: 'BClone <onboarding@resend.dev>',
            to: sendTo,
            subject: subject,
            html: html,
        });
        // console.log("data",data)
        return data
    } catch (error) {
        return error.message
    }

}