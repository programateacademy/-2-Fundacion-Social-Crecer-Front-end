import { display } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineFileUpload } from "react-icons/md";
import Swal from "sweetalert2";
import { readDB } from "../utils/tools";

export default function FormCollab({ enviar = true, person, closeM }) {


    const router = useRouter()

    const [drag, setDrag] = useState(false);
    const toggleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(!drag);
    };
    const loadFile = async (e) => {
        const file = e.target.files[0];
        Swal.fire({
            position: "center",
            title: "Cargando",
            showConfirmButton: false,
        });
        const data = await file.arrayBuffer(); //alert
        readDB(data);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cargado Satisfactoriamente",
            showConfirmButton: false,
            timer: 2500,
        });
        //cerrar modal
        closeM()
        setTimeout(_ => {router.reload(window.location.pathname)},1200)
    };
    const dropFile = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        Swal.fire({
            position: "center",
            title: "Cargando...",
            showConfirmButton: false,
        });
        const data = await file.arrayBuffer();
        readDB(data);
        setDrag(!drag);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cargado Satisfactoriamente",
            showConfirmButton: false,
            timer: 2500,
        });
        //cerrar modal
        closeM()
        setTimeout(_ => {router.reload(window.location.pathname)},1500)
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(person &&
    {
        values: person
    }
    );

    function confirmEdit(data) {
        Swal.fire({
            position: "center",
            icon: "info",
            title: person?'Desea confirmar los cambios?':'Desea agregar nuevo colaborador?',
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: 'No'
        }).then(res => {
            if (res.isConfirmed) {
                onSubmit(data)
            }
        })
    }


    const onSubmit = async (data) => {
        try {
            const res = await fetch(`http://localhost:5000/api/collaborator/${person?._id ?? ''}`, {
                method: person ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            console.log(json);
        } catch (error) {
            console.log(error);
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Algo paso...',
              text: "Revisa tu conexion a internet",
              showConfirmButton: false,
              timer: 2500
            })
        }
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Cargado Satisfactoriamente",
            showConfirmButton: false,
            timer: 2500,
        });
        //cerrar modal
        closeM()
        setTimeout(_ => {router.reload(window.location.pathname)},700)
    };

    function calculate_age(e) {
        const dob = e.target.value
        const fecha = new Date(dob)
        const diff_ms = Date.now() - fecha.getTime();
        const age_dt = new Date(diff_ms);

        age.value = Math.abs(age_dt.getUTCFullYear() - 1970);
    }
    const nombresEps = [
        "ALIANSALUD",
        "SALUD TOTAL S.A. E.P.S",
        "CAFESALUD E.P.S. S.A.",
        "BONSALUD S.A.",
        "E.P.S. SANITAS S.A.",
        "INSTITUTO DE SEGUROS SOCIALES",
        "UNIMEC S.A.",
        "COMPENSAR E.P.S.",
        "EPS COMFENALCO ANTIOQUIA",
        "SURA E.P.S",
        "ASEGURADORA DE VIDA COLSEGUROS",
        "COMFENALCO VALLE E.P.S.",
        "E.P.S. SALUDCOOP",
        "HUMANA VIVIR S.A. E.P.S.",
        "SALUD COLPATRIA E.P.S.",
        "COOMEVA E.P.S. SA",
        "E.P.S. FAMISANAR LTDA.",
        "SERVICIO OCCIDENTAL DE SALUD",
        "E.P.S. RISARALDA",
        "CAPRECOM E.P.S.",
        "CORPORANONIMAS",
        "CONVIDA",
        "CRUZ BLANCA E.P.S. SA",
        "CAJANAL",
        "CAPRESOCA",
        "SOLSALUD E.P.S. S.A.",
        "BARRANQUILLA SANA E.P.S.",
        "CALISALUD E.P.S.",
        "E.P.S. DE CALDAS S.A.",
        "E.P.S. CONDOR S.A.",
        "SELVASALUD S.A. E.P.S.",
        "SALUDVIDA S.A. E.P.S.",
        "SALUDCOLOMBIA E.P.S. S.A.",
        "RED SALUD ATENCION HUMANA EPS",
        "DEPTO SERVICIO MED Y ODOD EPM",
        "NUEVA E.P.S. S.A.",
        "MULTIMEDICAS SALUD E.P.S. S.A",
        "GOLDEN GROUP S.A. EPS",
        "MEDIMAS EPS S.A.S",
        "FOSYGA",
        "POLICIA NACIONAL",
        "ECOPETROL",
        "FUERZAS MILITARES",
        "MAGISTERIO",
        "CONGRESO DE LA REPUBLICA",
        "INPEC",
        "S.O.S COMFANDI",
        "UNISALUD",
        "DIR. GENERAL DE SALUD MILITAR",
        "COSMITET LTDA MAGISTER QUINDIO",
        "COLOMBIANA DE SALUD",
        "MEJOR SALUD",
        "COMFAMILIARES",
        "EMSSANAR ESS",
        "COMFAMILIAR CARTAGENA EPS",
        "COMFABOY EPS",
        "COMFACOR EPS",
        "CAFAM EPS",
        "COMFAMILIAR DE LA GUAJIRA",
        "COMFAMILIAR HUILA EPS",
        "COMFAMILIAR NARIÑO EPS",
        "COMFASUCRE EPS",
        "COMFACUNDI",
        "CAJACOPI ATLANTICO",
        "COLSUBSIDIO EPSS",
        "COMFACHOCO",
        "EPSS CONVIDA",
        "CAPRESOCA EPS",
        "DUSAKAWI",
        "ANAS WAY",
        "ASOCIACION INDIGENA DEL CAUCA",
        "EPS MALLAMAS EPSI",
        "PIJAOSALUD EPSI",
        "CAPITAL SALUD ",
        "COOSALUD ESS",
        "ASMET SALUD",
        "AMBUQ",
        "ECOOPSOS",
        "COOP DE SALUD COMUNITARIA",
        "ASOCIACION MUTUAL SER EMPRESA",
        "SAVIA SALUD EPS",
        "AMBUQ EPSS ESS",
        "COMFAORIENTE",
        "FAMISALUD COMFANORTE ARS",
        "EMPRESAS PUBLICAS DE MEDELLIN",
        "FONDO PASIVO SOCIAL FERROCARR",
    ];

    const nombrePension = [

        'PROTECCION',
        'PORVENIR',
        'BBVA HORIZONTE',
        'COLPENSIONES',
        'SANTANDER',
        'COLFONDOS',
        'SKANDIA',
        'CAXDAC-CAJA DE PREV. SOCIAL DE',
        'FONPRECON-FONDO DEL CONGRESO',
        'CAPRECOM-CAJA DE PREVISION SOC',
        'PENSIONES DE ANTIOQUIA',
        'CAJANAL-CAJA NACIONAL DE PREVI',
        'CAJA DE PREV. SOC. DE UNICAUCA',
        'ING PENSIONES Y CESANTIAS',
        'PERSONA PENSIONADA - NO REQUIERE COTIZACIÓN A PENSACIÓN',

    ];

    const nombreArl = [
        'A.R.L. Seguros de Vida Colpatria S.A.',
        'Compañía de Seguros Bolívar S.A.',
        'Seguros de Vida Aurora',
        'ARP Alfa',
        'Liberty Seguros de Vida S.A.',
        'Positiva Compañía de Seguros',
        'Colmena Riesgos Profesionales',
        'ARL Sura',
        'La Equidad Seguros de Vida',
        'Mapfre Colombia Vida Seguros S.A',

    ];



    return (
        <div className={`add-c ${enviar ? '' : 'hf'}`}>
            <form onSubmit={handleSubmit(confirmEdit)}>
                <div className="add-i">
                    <label htmlFor="doc">Documento</label>
                    <input
                        id="doc"
                        type="number"
                        name="document"
                        placeholder="Documento"
                        {...register("document", {
                            required: {
                                value: true,
                                maxLength: 20,
                                maxLength: 20,
                                message: "El campo es requerido",
                            },
                            pattern: {
                                value: /[0-9]/i,
                                message: "El formato no es correcto",
                            },
                        })}
                    />
                    {errors.document && <span>{errors.document.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="dateECedula">Fecha Expedicion Cedula </label>
                    <input
                        id="dateECedula"
                        type="date"
                        name="dateECedula"
                        placeholder="Fecha Expedicion Cedula"
                        {...register("dateECedula", {
                            required: {
                                value: true,
                                maxLength: 20,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value:
                            //     /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.dateECedula && <span>{errors.dateECedula.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="nombre1">Primer Nombre</label>
                    <input
                        id="nombre1"
                        type="text"
                        name="fName"
                        placeholder="Primer Nombre "
                        {...register("fName", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^ [a-zA-Z] + [a-zA-Z] + $ /i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.fName && <span>{errors.fName.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="nombre2">Segundo Nombre</label>
                    <input
                        id="nombre2"
                        type="text"
                        name="sName"
                        placeholder="Segundo Nombre"
                        {...register("sName", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^ [a-zA-Z] + [a-zA-Z] + $ /i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.sName && <span>{errors.sName.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="Apellido1">Primer Apellido</label>
                    <input
                        id="Apellido1"
                        type="text"
                        name="fLastName"
                        placeholder="Primer Apellido"
                        {...register("fLastName", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^ [a-zA-Z] + [a-zA-Z] + $ /i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.fLastName && <span>{errors.fLastName.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="Apellido2">Segundo Apellido</label>
                    <input
                        id="Apellido2"
                        type="text"
                        name="sLastName"
                        placeholder="Segundo Apellido"
                        {...register("sLastName", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^ [a-zA-Z] + [a-zA-Z] + $ /i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.sLastName && <span>{errors.sLastName.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="nac">Fecha de Nacimiento</label>
                    <input
                        id="nac"
                        name="birthdate"
                        type="date"
                        placeholder="Fecha de Nacimiento"
                        {...register("birthdate", {
                            onChange: calculate_age,
                            required: {
                                value: true,
                                maxLength: 48,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.birthdate && <span>{errors.birthdate.message}</span>}
                </div>


                <div className="add-i">
                    <label htmlFor="age">Edad</label>
                    <input
                        id="age"
                        type="number"
                        name="age"
                        placeholder="Edad"
                        {...register("age", {
                            disabled: true,
                            required: {
                                value: true,
                                maxLength: 3,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^[0-9]+$/i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>



                <div className="add-i">
                    <label htmlFor="contract">Tipo de Contrato</label>
                    <input
                        id="contract"
                        type="text"
                        name="contract"
                        placeholder="Tipo de Contrato "
                        {...register("contract", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.age && <span>{errors.age.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="sede">Sede</label>

                    <input
                        id="sede"
                        name="campus"
                        type="text"
                        placeholder="Sede"
                        {...register("campus", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.campus && <span>{errors.campus.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="cargo">Cargo</label>
                    <input
                        id="cargo"
                        name="position"
                        type="text"
                        placeholder="Cargo"
                        {...register("position", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            // pattern: {
                            //   value: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/i,
                            //   message: "El formato no es correcto",
                            // },
                        })}
                    />
                    {errors.position && <span>{errors.position.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="Estado">Estado</label>
                    <select {...register("state")} id="estado" name="state">
                        <option value="Activo">Activo</option>
                        <option value="Retirado">Retirado</option>
                        <option value="Incapacidad">Incapacidad</option>
                        <option value="Licencia de Maternidad">
                            Licencia de Maternidad
                        </option>
                        <option value="Licencia No Remunerada">
                            Licencia No Remunerada
                        </option>
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="email">Correo</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Correo"
                        {...register("email", {
                            required: {
                                value: true,
                                maxLength: 50,
                                message: "El campo es requerido",
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: "El formato no es correcto",
                            },
                        })}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="transit">Transito</label>
                    <select {...register("transit")} id="transit" name="transit">
                        <option value="No">No</option>
                        <option value="Retirado">Retirado</option>
                        <option value="Si">Si</option>
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="ps">Consecutivo PS</label>
                    <input
                        id="ps"
                        name="PS"
                        type="number"
                        placeholder="Consecutivo PS"
                        {...register("PS", { maxLength: 4 })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="consoyl"> Consecutivo OYL</label>
                    <input
                        id="consoyl"
                        name="OYL"
                        type="number"
                        placeholder="Consecutivo OYL"
                        {...register("OYL", {
                            maxLength: 4,
                        })}
                    />
                    {errors.OYL && <span>{errors.OYL.message}</span>}
                </div>

                <div className="add-i">
                    <label htmlFor="ICBF">Contrato ICBF</label>
                    <input
                        id="ICBF"
                        name="ICBF"
                        type="number"
                        placeholder="Contrato ICBF"
                        {...register("ICBF", {
                            required: true,
                            maxLength: 15,
                            // pattern: /^[0-9]+$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="modality">Modalidad</label>
                    <select {...register("modality")} id="modality" name="modality">
                        <option value="Desarrollo Infantil Medio Familiar">
                            Desarrollo Infantil Medio Familiar
                        </option>
                        <option value="Institucional Centro Desarrollo Infantil">
                            Institucional Centro Desarrollo Infantil
                        </option>
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="Genero">Genero</label>
                    <select {...register("gen")} id="Genero" name="gen">
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="locality">Localidad</label>
                    <input
                        id="locality"
                        name="locality"
                        type="text"
                        placeholder="Localidad"
                        {...register("locality", {
                            required: true,
                            maxLength: 100,
                            message: "El campo es requerido",
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="barrio">Barrio</label>
                    <input
                        id="barrio"
                        name="neighborhood"
                        type="text"
                        placeholder="Barrio "
                        {...register("neighborhood", { required: true, maxLength: 20 })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="direc">Direccion</label>
                    <input
                        id="direc"
                        name="adress"
                        type="text"
                        placeholder="Direccion"
                        {...register("adress", { required: true, maxLength: 90 })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="telf">Telefono Principal</label>
                    <input
                        id="telf"
                        name="telP"
                        type="text"
                        placeholder="Telefono Principal"
                        {...register("telP", {
                            required: true,
                            maxLength: 10,
                            // pattern: /^\d{10}$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="telfs">Telefono Secundario</label>
                    <input
                        id="telfs"
                        name="telS"
                        type="number"
                        placeholder="Telefono Secundario "
                        {...register("telS", {
                            // pattern: /^\d{10}$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="salL">Salario en Letras </label>
                    <input
                        id="salL"
                        name="salaryL"
                        type="text"
                        placeholder="Salario en Letras "
                        {...register("salaryL", {
                            required: true,
                            maxLength: 200,
                            // pattern: /^ [a-zA-Z] + [a-zA-Z] + $ /i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="salN">Salario en Numero</label>
                    <input
                        id="salN"
                        name="salaryN"
                        type="number"
                        placeholder="Salario en Numero"
                        {...register("salaryN", {
                            required: true,
                            maxLength: 20,
                            // pattern: /^\d*\.\d+$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="icbf">Fecha Inicio ICBF</label>
                    <input
                        id="icbf"
                        name="dateIICBF"
                        type="date"
                        placeholder="Fecha Inicio ICBF"
                        {...register("dateIICBF", {
                            required: true,
                            // pattern:
                            //   /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="fsc">Fecha Inicio FSC </label>
                    <input
                        id="fsc"
                        name="dateIFSC"
                        type="date"
                        placeholder="Fecha Inicio FSC"
                        {...register("dateIFSC", {
                            required: true,
                            // pattern:
                            //   /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="">Nueva Fecha De Inicio </label>
                    <input
                        id="dtI"
                        name="newDateI"
                        type="date"
                        placeholder=" Nueva Fecha De Inicio"
                        {...register("newDateI", {
                            required: true,
                            // pattern:
                            //   /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="date">Fecha Retiro</label>
                    <input
                        id="dateR"
                        name="dateR"
                        type="date"
                        placeholder="Fecha Retiro"
                        {...register("dateR", {
                            required: true,
                            // pattern:
                            //   /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/i,
                        })}
                    />
                </div>

                <div className="add-i">
                    <label htmlFor="eps">EPS</label>
                    <select
                        {...register("EPS")}
                        d="eps"
                        name="EPS"
                        type="text"
                        placeholder="EPS"
                    >
                        {nombresEps.map((nombreEps) => (
                            <option key={nombreEps} value={nombreEps}>{nombreEps}</option>
                        ))}
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="FDP">Fondo De Pensiones</label>
                    <select {...register("FDP")} id="FDP" name="FDP" placeholder="FDP">
                        {nombrePension.map((nombrePension) => (
                            <option key={nombrePension} value={nombrePension}>{nombrePension}</option>
                        ))}
                    </select>
                </div>

                <div className="add-i">
                    <label htmlFor="arl">ARL</label>
                    <select {...register("ARL")} id="arl" name="ARL" placeholder="ARL">
                        {nombreArl.map((nombreArl) => (
                            <option key={nombreArl} value={nombreArl}>{nombreArl}</option>
                        ))}
                    </select>
                </div>

                <div className="add-i obs">
                    <label htmlFor="">Observaciones</label>
                    <textarea
                        rows={5}
                        id="obs"
                        name="obs"
                        {...register("obs")}
                    />
                </div>

                <input className="submit btn" type="submit" value={enviar ? 'Agregar' : 'Editar'} />
            </form>

            <div className="file">
                <div className={`dragzone ${drag ? "drag" : ""} `}>
                    <MdOutlineFileUpload size={80} />
                    <span>Sube o arrastra un excel</span>
                </div>

                <input id="data" name="data" type="file" hidden onChange={loadFile} />
                <label
                    htmlFor="data"
                    onDragEnter={toggleDrag}
                    onDragOver={onDragOver}
                    onDragLeave={toggleDrag}
                    onDrop={dropFile}
                >
                </label>
            </div>
        </div>
    );
}
