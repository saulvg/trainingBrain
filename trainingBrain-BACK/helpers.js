const crypto = require('crypto');//Comes with node core modules
const {SENDGRID_FROM, SENDGRID_API_KEY} = process.env;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

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

module.exports={
    generateRandomString,
    sendMail
};