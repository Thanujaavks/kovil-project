import ejs from "ejs";
import nodemailer from "nodemailer";
import {fileURLToPath} from "url";
import {dirname, join} from "path";


const currentFilePath = import.meta.url;
const currentDirPath = dirname(fileURLToPath(currentFilePath));
// console.log(currentDirPath);


const mail = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
});

async function sendPasswordResetEmail(email, token, name) {
    try {
        const renderedContent = await ejs.renderFile(`${currentDirPath}/../template/reset_password.ejs`,{name, token});
        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: "Password Reset",
            html: renderedContent,
        };
        const verificationInfo = await mail.sendMail(mailOptions);
        return verificationInfo;
    }
    catch (error) {
        return(error);
    }
}

export default sendPasswordResetEmail;