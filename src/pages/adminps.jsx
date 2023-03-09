import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";


export default function Adminps() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    Swal.fire({
      position: "center",
      title: "Cargando",
      showConfirmButton: false,
      timer: 500
    });
    try {
      const res = await fetch('http://localhost:5000/api/recovadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Link enviado",
          showConfirmButton: false,
          timer: 2500,
        });
        setTimeout(_ => { router.reload(window.location.pathname) }, 700)
      } else if (res.status === 401) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: json.error,
          showConfirmButton: false,
          timer: 2500,
        });
      }
      console.log(json);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container adminps'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Reestablecer contraseña de adminitrador</h2>
        <div className="login-input">
          <input
            type="text"
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
          />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <button className="btn submit">Enviar link</button>

      </form>
    </div>
  )
}
