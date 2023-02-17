const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')

const getPdf = (req, res) =>{
    try {
        const file = fs.readFileSync(path.resolve(__dirname, "../certificado.pdf"))
        res.contentType("application/pdf")
        res.send(file)
    } catch (error) {
        console.error(error);
        res.status(400).json(error)
    }
}

const downloadPdf = (req, res) => {
    // res.status(200).download(__dirname,'../certificado.pdf')
    const filePath = path.join(__dirname, "../certificado.pdf")
    res.sendFile(filePath)
}

const generatePdf = (req,res)=>{

    const html = fs.readFileSync('const.html','utf-8')

    var options = {
        format: "A3",
        orientation: "portrait",
        border: "40mm",
        header: {
            height: "45mm",
            contents: '<div style="text-align: center;"></div>'
        },
        footer: {
            height: "28mm",
            contents: {
                first: 'Cover page',
                2: 'Second page', // Any page number is working. 1-based index
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                last: 'Last Page'
            }
        }
    };

    var users = [
        {
            name: 'Derick Mauricio Saa Ortega',
            cc: "1.010.241.012",
            modality:'desarrollo infantil medio familiar',
            contract:'prestación de servicios',
            cargo:'promotor de derechos - profesional',
            time:'11/01/2022 hasta 11/01/2023 ',
            sletras:'tres millones de pesos',
            snumeros:'$3.000.000'
        },
        // {
        //     name: "maria",
        //     age: "26",
        // },
    ];

    var document = {
        html: html,
        data: {
        users: users,
        },
        path: "./certificado.pdf",
        type: "",
    };



    pdf.create(document, options)
    .then((data) => {
        console.log(data);
        res.status(200).json({msg:'pdf creado'})
        // const file = fs.readFileSync(data.filename)
    })
    .catch((error) => {
        console.error(error);
        res.status(400).json(error)
    });
}

module.exports = {
    getPdf,
    generatePdf,
    downloadPdf
}