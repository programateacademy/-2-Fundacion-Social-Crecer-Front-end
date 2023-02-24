const nodemailer = require('nodemailer')
const fs = require('fs')

const postEmail = (req, res) => {

    const {email} = req.body
    console.log(email);

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'river90@ethereal.email',
            pass: 'zgh1qay8qG6SUME6br'
        }
    });

    const pdf = fs.readFileSync('certificado.pdf')

    let mailOptions = {
        from: 'dericksaa@gmail.com',
        to: 'dmsaao@unal.edu.co',
        subject: 'ya solo falta el de verdad',
        text: 'enviando correo con pdf',
        attachments:[
            {
                filename:'certderick.pdf',
                content:pdf
            }
        ]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
            console.log('URL de la vista previa: ' + nodemailer.getTestMessageUrl(info));
        }
    });
    
    

    try {
        res.status(200).json({msg: 'correo enviado con exito'})
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports={
    postEmail
}