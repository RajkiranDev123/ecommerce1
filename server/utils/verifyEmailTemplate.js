
const verifyEmailTemplate = ({ name, url }) => {
    return `
    <p>Dear ${name}</p>
    <p>Thanks for registering for B Clone !</p>
    <a href=${url} style="color:white;background:blue;margin-top:10px">
   Click here to Verify email !
    </a>
    `
}

export default verifyEmailTemplate