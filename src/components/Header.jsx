import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import Swal from 'sweetalert2';
import AddUser from '../components/AddUser'
import SendRecovery from './SendRecovery'

export default function Header({ data }) {
   const router = useRouter()
   const { email, role } = data
   const logout = _ => {
      Cookies.remove("token")
      router.push("/")
   }
   const goDash = _ => {
      Swal.fire({
         position: "center",
         title: "Cargando",
         showConfirmButton: false,
         timer: 800
     });
      router.push("/dashboard")
   }
   const [modalToShow, setModalToShow] = useState(null);

   const handleModalOpen = (modal) => {
      setModalToShow(modal);
   };

   const handleModalClose = () => {
      setModalToShow(null);
   };
   return (
      <header>
         <Link href="/dashboard"><Image src="/img/logo.png" alt="logo" width={60} height={60} /></Link>
         <h1 className='titulo-name'>¡Bienvenido, {role}!</h1>
         <nav>
            <div>{email} <MdArrowDropDown size={20} /></div>
            <ul>
               <li onClick={goDash}>Dashboard</li>
               {role === "admin" && <><li onClick={() => handleModalOpen('modalUser')}>Crear usuario</li>
                  <li onClick={() => handleModalOpen('modalPassword')}>Cambiar contraseñas</li></>}
               <li onClick={logout}>Cerrar sesión</li>
            </ul>
            {modalToShow === 'modalUser' && (
               <AddUser isOpen={true} onRequestClose={handleModalClose} />
            )}
            {modalToShow === 'modalPassword' && (
               <SendRecovery isOpen={true} onRequestClose={handleModalClose} />
            )}
         </nav>
      </header>
   )
}
