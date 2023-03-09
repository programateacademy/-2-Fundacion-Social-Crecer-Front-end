import React from 'react'
import Header from "../components/Header";
import axios from 'axios'
import Swal from "sweetalert2";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";


export default function Certification({ data }) {

  const router = useRouter()
  const { email } = router.query
  const postEmail = {
    email
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const enviarEmail = async () => {

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Certificacion Enviada',
      showConfirmButton: false,
      timer: 2500
    })
    await axios.post('http://localhost:5000/api/send', postEmail)
  }

  return (
    <>
      <Header data={data} />
      <div className='certification'>
        <iframe src="http://localhost:5000/api/cert#toolbar=0&navpanes=0" ></iframe>
        <div className='btncert'>
          <a href='http://localhost:5000/api/cert/download'>Descargar Certificado Laboral</a>
          <h4>Email al cual se enviara la certificacion</h4>
          <form action="" onSubmit={handleSubmit(enviarEmail)}>
            <div className='formEmail'>
              <input type="text"
                autoComplete="off"
                name="email"
                placeholder="ejemplo@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto",
                  },
                })}
                defaultValue={email} />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <button>Enviar Por E-mail</button>

          </form>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const data = JSON.parse(req.headers["x-data"]);
  return {
    props: {
      data,
    },
  };
}
