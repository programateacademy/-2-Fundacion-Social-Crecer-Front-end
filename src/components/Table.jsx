import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import MaterialReactTable from 'material-react-table';
import { useRouter } from 'next/router';
import { MdMode, MdPictureAsPdf } from 'react-icons/md';
import Modal from "react-modal";
import EditCollab from "./EditCollab"
import Swal from 'sweetalert2';



export default function Table({ people, dataUser }) {
   
   const [modalIsOpen, setModalIsOpen] = useState(false);

   const style = {
      content: {
         width: "100vw",
         inset: 0,
         margin: 0,
         height: "100vh",
         padding: 0,
         border: "none"
      },
   };

   function openModal() {
      setModalIsOpen(true);
   }

   function closeModal() {
      setModalIsOpen(false);
   }

   const [divar, setdivar] = useState()

   const router = useRouter();
   const columns = useMemo(
      () => [

         {
            accessorKey: 'document', header: 'Documento', width: 150,
         },
         /*{
            accessorKey: 'fName', header: 'Primer Nombre', width: 150,    
         },
         {
            accessorKey: 'sName', header: 'Segundo Nombre', width: 150,    
         },
         {
            accessorKey: 'fLastName', header: 'Primer Apellido',   width: 150,  
         },
         {
            accessorKey: 'sLastName', header: 'Segundo Apellido',   width: 150,  
         },*/
         {
            accessorKey: 'fullName',
            header: 'Nombre Completo',
            accessorFn: (row) => `${row.fName} ${row.sName} ${row.fLastName} ${row.sLastName}`,
            width: 300,
         },
         {
            accessorKey: 'age', header: 'Edad en años', width: 110,
         },
         {
            accessorKey: 'contract', header: 'Tipo de Contrato', width: 200,
         },
         {
            accessorKey: 'campus', header: 'Sede', width: 110,
         },
         {
            accessorKey: 'birthdate', header: 'Fecha de Nacimiento', width: 170,
         },
         {
            accessorKey: 'position', header: 'Cargo', width: 110,
         },
         {
            accessorKey: 'state', header: 'Estado', width: 110,
         },
         {
            accessorKey: 'modality', header: 'Modalidad', width: 110,
         },
         {
            accessorKey: 'email', header: 'Correo', width: 200,
         },
         {
            accessorKey: 'transit', header: 'Transito', width: 110,
         },
         {
            accessorKey: 'PS', header: 'Consecutivo P.S', width: 150,
         },
         {
            accessorKey: 'OYL', header: 'Consecutivo OYL', width: 150,
         },
         {
            accessorKey: 'ICBF', header: '# Contrato ICBF', width: 150,
         },
         {
            accessorKey: 'gen', header: 'Género', width: 110,
         },
         {
            accessorKey: 'dateECedula', header: 'Fecha Expedición Cédula', width: 200,
         },
         {
            accessorKey: 'locality', header: 'Localidad', width: 110,
         },
         {
            accessorKey: 'neighborhood', header: 'Barrio', width: 110,
         },
         {
            accessorKey: 'adress', header: 'Dirección de Domicilio', width: 180,
         },
         {
            accessorKey: 'telP', header: 'Teléfono Primario', width: 150,
         },
         {
            accessorKey: 'telS', header: 'Teléfono Secundario', width: 160,
         },
         {
            accessorKey: 'salaryL', header: 'Salario en Letras', width: 300,
         },
         {
            accessorKey: 'salaryN', header: 'Salario en Números', width: 150,
         },
         {
            accessorKey: 'dateIICBF', header: 'Fecha inicio ICBF', width: 150,
         },
         {
            accessorKey: 'dateIFSC', header: 'Fecha inicio FSC', width: 150,
         },
         {
            accessorKey: 'newDateI', header: 'Nueva Fecha de inicio', width: 180,
         },
         {
            accessorKey: 'dateR', header: 'Fecha de retiro', width: 150,
         },
         {
            accessorKey: 'EPS', header: 'EPS', width: 110,
         },
         {
            accessorKey: 'FDP', header: 'Fondo de Pensiones', width: 150,
         },
         {
            accessorKey: 'ARL', header: 'ARL', width: 110,
         },
         {
            accessorKey: 'obs', header: 'Observaciones', width: 300,
         },
         {
            accessorKey: 'actions', header: <p className='actions' style={{ textAlign: 'center', display: 'grid', placeItems: 'center', width: 150, }}>Acciones</p>, width: 100,
            muiTableBodyCellProps: () => ({
               className: 'actions',

            }),
            Cell: (params) => {
               return (
                  <div>
                    {dataUser.role === "admin" && <MdMode size={40} onClick={() => {setdivar(params.row.original.id); openModal()}} />}
                     <MdPictureAsPdf size={40} onClick={async _ => {
                        Swal.fire({
                           position: "center",
                           title: "Generando Certificacion...",
                           showConfirmButton: false,
                           timer: 2500
                       });
                        try {
                           const json = await fetch('http://localhost:5000/api/cert', {
                              method: 'POST',
                              headers: {
                                 "Content-Type": "application/json"
                              },
                              body: JSON.stringify({
                                 name: `${params.row.original.fName || ''} ${params.row.original.sName || ''} ${params.row.original.fLastName || ''} ${params.row.original.sLastName || ''}`,
                                 cc: params.row.original.document,
                                 modality: params.row.original.modality,
                                 contract: params.row.original.contract,
                                 cargo: params.row.original.position,
                                 // time: `${params.row.original.dateIFSC} hasta ${params.row.original.dateR ?? new Date().toJSON().slice(0, 10).replace(/-/g, '/')}.`,
                                 timeI: params.row.original.dateIFSC,
                                 sletras: params.row.original.salaryL,
                                 snumeros: params.row.original.salaryN,
                                 estado: params.row.original.state,
                                 typeCon: params.row.original.contract,
                                 fechaFinal: params.row.original.dateR,
                              })

                           }).then(res => res.json())
                           console.log(json)
                           setTimeout(() => {
                              router.push({
                                 pathname: '/certification',
                                 query: { email: params.row.original.email }
                              })
                           }, 400); 
                        } catch (error) {
                           console.log(error)
                        }

                     }} />
                  </div>)
            }

         },


      ],
      [],
   );

   const rows = people.map(({ _id, document, fName, sName, fLastName, sLastName, age, contract, campus,
      birthdate, position, state, modality, email, transit, PS, OYL, ICBF, gen, dateECedula, locality,
      neighborhood, adress, telP, telS, salaryL, salaryN, dateIICBF, dateIFSC, newDateI, dateR,
      EPS, FDP, ARL, obs }) => {
      return {
         id: _id,
         document: document ?? "---",
         fName,
         sName,
         fLastName,
         sLastName,
         age: age ?? "---",
         contract,
         campus,
         birthdate,
         position,
         state,
         modality,
         email,
         transit,
         PS,
         OYL: OYL ?? "---",
         ICBF,
         gen,
         dateECedula,
         locality,
         neighborhood,
         adress,
         telP,
         telS: telS ?? "---",
         salaryL,
         salaryN,
         dateIICBF,
         dateIFSC,
         newDateI: newDateI ?? "---",
         dateR: dateR ?? "---",
         EPS,
         FDP,
         ARL,
         obs
      }
   })
   const options = {
      showHideCols: false,
   };

   return (
      <div className='container-table'>
         <Box sx={{ height: 300, width: '100%' }}>
            <MaterialReactTable
               data={rows}//base de datos reemplace rows con la data
               columns={columns}
               muiTablePaginationProps={
                  {
                     rowsPerPageOptions: [17, 30, 50, 100]
                  }
               }
               enableTopToolbar={false}
               enableColumnActions={false}
               initialState={
                  {
                     pagination: {
                        pageSize: 17
                     },
                     columnPinning: {
                        right: ['actions']
                     }
                  }
               }
            />
         </Box>
         <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="ventana modal"
            style={style}
         >
            <EditCollab onClose={closeModal} propid = {divar}/>
         </Modal>
      </div>
   );
}