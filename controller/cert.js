const fs = require('fs')
const pdf = require('pdf-creator-node')
const path = require('path')

const bitmap = fs.readFileSync(path.resolve(__dirname,'../logo.png'))
const logo = bitmap.toString('base64')

const bitmap2 = fs.readFileSync(path.resolve(__dirname,'../mark.jpg'))
const mark = bitmap2.toString('base64')

const bitmap3 = fs.readFileSync(path.resolve(__dirname,'../firma.png'))
const firma = bitmap3.toString('base64')


const getPdf = (req, res) => {
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
    const filePath = path.join(__dirname, "../certificado.pdf")
    res.sendFile(filePath)
}

const generatePdf = (req, res) => {
    const {
        name,
        cc,
        modality,
        contract,
        cargo,
        timeI,
        sletras,
        snumeros,
        estado,
        typeCon,
        fechaFinal
    } = req.body


    // const fechaFinal  = ''
    const aoi = fechaFinal == ''?'':`hasta ${fechaFinal}`;

    // const estado = 'dd'
    const enc = () => {if (estado == 'Activo' || estado =='Incapacidad' 
    || estado =='Licencia de Maternidad' || estado =='Licencia No Remunerada' ) {
        return 'encuentra'
        }else{
            return 'encontraba'
        }
    }

    // const typeCon = ''
    const h_or_s = _ => {
        if (typeCon == 'OBRA Y LABOR') {
            return 'un salario'
        }else{
            return 'unos honorarios'
        }
    }

    const html = fs.readFileSync('const.html', 'utf-8')

    var options = {
        format: "A3",
        orientation: "portrait",
        border: "",
        header: {
            height: "",
            // contents: '<div style="text-align: center;"></div>'
            // contents: '<img src="data:image/png;base64,{{logo}}" alt="logo">'
        },
        // footer: {
        //     height: "28mm",
        //     contents: {
        //         first: 'Cover page',
        //         2: 'Second page', // Any page number is working. 1-based index
        //         default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        //         last: 'Last Page'
        //     }
        // }
    };

    const month = new Date().toLocaleString('es-ES', { month: 'long' });
    const day = new Date().getDate()
    const year = new Date().getFullYear()

    var users = [
        // {
        //     name: 'Derick Mauricio Saa Ortega',
        //     cc: "1.010.241.012",
        //     modality: 'desarrollo infantil medio familiar',
        //     contract: 'prestación de servicios',
        //     cargo: 'promotor de derechos - profesional',
        //     timeI: '11/01/2022',
        //     sletras: 'tres millones de pesos',
        //     snumeros: '$3.000.000',
        //     timeF: aoi,
        //     asset:enc(),
        //     honsal:h_or_s(),
        //     logo:logo,
        //     mark:mark,
        //     firma:firma,
        //     date: new Date().toLocaleDateString('en-GB'),
        //     month:month,
        //     day:day,
        //     year:year
        // },
        {
            name,
            cc,
            modality,
            contract,
            cargo,
            timeI,
            sletras,
            snumeros,
            timeF: aoi,
            asset:enc(),
            honsal:h_or_s(),
            logo:logo,
            mark:mark,
            firma:firma,
            date: new Date().toLocaleDateString('en-GB'),
            month:month,
            day:day,
            year:year
        } ,
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
            // console.log(data);
            res.status(200).json({ msg: 'pdf creado' })
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