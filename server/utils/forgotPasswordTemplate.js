
const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <p>Dear ${name}</p>
    <p>Your otp for forgot password is : </p>
    <div style="color:white;background:blue;margin-top:10px">
    ${otp}
    </div>
    `
}

export default forgotPasswordTemplate