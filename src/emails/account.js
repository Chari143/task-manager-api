// npm i @sendgrid/mail

const sgMail = require('@sendgrid/mail')

// const sendGridApi = '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'

// sgMail.setApiKey(sendGridApi)

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to: 'chennahari123@gmail.com',
//     from: 'chennahari123@gmail.com',
//     subject: 'this is my email',
//     text: 'I hope it will successfull'
// }) // it send email but it goes to spam because we use same email for to and from and we need buy a domail for our websites

const sendWelcomeEmail = (email, name) => {
    // we can use async functions here but we r not using here because it not necessary for us to send email before creating account
    sgMail.send({
        to: email,
        from: 'chennahari123@gmail.com',
        subject: 'Thanks for signIn',
        text: `welcome to the app Mr.${name}`
        // html:'html'
    })
}


const sendFareWellEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'chennahari123@gmail.com',
        subject: 'farewell email',
        text: `Goodbye, ${name} i hope i see u soon`
    })
}
module.exports = {
    sendWelcomeEmail, sendFareWellEmail
}