import moment from "moment/moment"
import { readFile, utils, writeFile } from "xlsx"

export async function getData() {
    const response = await fetch("http://localhost:5000/api/collaborator")
    const json = await response.json()
    return json
}

export async function sendData(data) {
    try {
        const res = await fetch("http://localhost:5000/api/collaborator", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await res.json()
        console.log(json)
        return json
    } catch (error) {
        console.log(error.message);
    }
}

export async function readDB(file) {
    const workbook = readFile(file)
    const workSheet = workbook.Sheets[workbook.SheetNames[0]]
    const json = utils.sheet_to_json(workSheet, {
        defval: null
    })
    const data = json.map(item => {
        return {
            document: item['DOCUMENTO'],
            fName: item['PRIMER NOMBRE'],
            sName: item['SEGUNDO NOMBRE'],
            fLastName: item['PRIMER APELLIDO'],
            sLastName: item['SEGUNDO APELLIDO'],
            age: item['EDAD EN AÑOS'],
            contract: item['TIPO DE CONTRATO'],
            modality: item['MODALIDAD'],
            campus: item['LUGAR DE TRABAJO'],
            birthdate: moment(new Date(Date.UTC(0, 0, item['FECHA DE NACIMIENTO']))).format('DD/MM/YYYY'),
            position: item['CARGO'],
            state: item['ESTADO'],
            email: item['CORREO ELECTRÓNICO'],
            transit: item['TRANSITO'],
            PS: item['CONSECUTIVO P.S'],
            OYL: item['CONSECUTIVO OYL'],
            ICBF: item['# CONTRATO ICBF '],
            gen: item['GENERO'],
            dateECedula: moment(new Date(Date.UTC(0, 0, item['FECHA EXPEDICIÓN CEDULA']))).format('DD/MM/YYYY'),
            locality: item['LOCALIDAD'],
            neighborhood: item['BARRIO'],
            adress: item['DIRECCIÓN DE DOMICILIO'],
            telP: item['TELÉFONO'],
            telS: item['TELEFONO SECUNDARIO'],
            salaryL: item['SALARIO EN LETRAS'],
            salaryN: item['SALARIO EN VALOR'],
            dateIICBF: moment(new Date(Date.UTC(0, 0, item['FECHA DE INICIO ICBF']))).format('DD/MM/YYYY'), // REVISAR QUE ESTA REPETIDA 
            dateIFSC: moment(new Date(Date.UTC(0, 0, item['FECHA DE INICIO ICBF']))).format('DD/MM/YYYY'),
            newDateI: moment(new Date(Date.UTC(0, 0, item['NUEVA FECHA DE INICIO']))).format('DD/MM/YYYY'),
            dateR: moment(new Date(Date.UTC(0, 0, item['FECHA DE RETIRO']))).format('DD/MM/YYYY'),
            EPS: item['EPS'],
            FDP: item['FONDO DE PENSIONES'],
            ARL: item['ARL'],
            obs: item['OBSERVACIONES']
        }
    })
    console.log(data);
    sendData(data)

}

export function writeExcel(excelData) {

    const dataFormated = excelData.map(json => {
        return {
            'DOCUMENTO': json.document,
            'PRIMER NOMBRE': json.fName,
            'SEGUNDO NOMBRE': json.sName,
            'PRIMER APELLIDO': json.fLastName,
            'SEGUNDO APELLIDO': json.sLastName,
            'EDAD EN AÑOS': json.age,
            'TIPO DE CONTRATO': json.contract,
            'MODALIDAD': json.modality,
            'LUGAR DE TRABAJO': json.campus,
            'FECHA DE NACIMIENTO': json.birthdate,
            'CARGO': json.position,
            'ESTADO': json.state,
            'CORREO ELECTRÓNICO': json.email,
            'TRANSITO': json.transit,
            'CONSECUTIVO P.S': json.PS,
            'CONSECUTIVO OYL': json.OYL,
            '# CONTRATO ICBF ': json.ICBF,
            'GENERO': json.gen,
            'FECHA EXPEDICIÓN CEDULA': json.dateECedula,
            'LOCALIDAD': json.locality,
            'BARRIO': json.neighborhood,
            'DIRECCIÓN DE DOMICILIO': json.adress,
            'TELÉFONO': json.telP,
            'TELEFONO SECUNDARIO': json.telS,
            'SALARIO EN LETRAS': json.salaryL,
            'SALARIO EN VALOR': json.salaryN,
            'FECHA DE INICIO ICBF': json.dateIICBF,
            'FECHA DE INICIO ICBF': json.dateIFSC,
            'NUEVA FECHA DE INICIO': json.newDateI,
            'FECHA DE RETIRO': json.dateR,
            'EPS': json.EPS,
            'FONDO DE PENSIONES': json.FDP,
            'ARL': json.ARL,
            'OBSERVACIONES': json.obs
        }
    })
    const workBook = utils.book_new()
    const sheet = utils.json_to_sheet(dataFormated)
    utils.book_append_sheet(workBook, sheet, "Filtrada")
    writeFile(workBook, "Datos-Filtrados.xlsx")
}