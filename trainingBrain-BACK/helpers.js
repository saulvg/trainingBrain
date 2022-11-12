const crypto = require('crypto');//Comes with node core modules
const {SENDGRID_FROM, SENDGRID_API_KEY, UPLOADS_DIRECTORY} = process.env;
const sgMail = require('@sendgrid/mail');
const { ensureDir } = require('fs-extra');
sgMail.setApiKey(SENDGRID_API_KEY);
const sharp = require('sharp')
const uuid = require('uuid')
const path = require('path')

//Generate an alphanumeric string
function generateRandomString (length) {
    return crypto.randomBytes(length).toString('hex');
};

//Send an account confirmation email
async function sendMail ({to, subject, body}) {
    try{
        const msg = {
            to,
            from: SENDGRID_FROM,
            subject,
            text: body,
            html: 
            `
                <div>
                    <h1>${subject}</h1>
                    <p>${body}</p>
                </div>
            `
        };
        await sgMail.send(msg);
    }catch(error){
        throw new Error('There was an error sending the message')
    }
};

//Save photo to server
const uploadsDir = path.join(__dirname, UPLOADS_DIRECTORY)
async function savePhoto (img) {
    try {
        await ensureDir(uploadsDir);
        const sharpImg = sharp(img.data);
        sharpImg.resize(150, 150);

        const imgName = `${uuid.v4()}.jpg`
        const imgPath = path.join(uploadsDir, imgName);
        await sharpImg.toFile(imgPath)

        return imgName
    } catch (error) {
        throw new Error('Error processing image')
    }
}

module.exports={
    generateRandomString,
    sendMail,
    savePhoto
};