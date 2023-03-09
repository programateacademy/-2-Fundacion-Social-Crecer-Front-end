import React from "react";
import { useForm } from "react-hook-form";
import { MdPersonAdd, MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import axios from 'axios'
import { useRouter } from "next/router";



export default function Recovery() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  const router = useRouter()
  const { token } = router.query

  const onSubmit = async (data) => {
    Swal.fire({
      position: "center",
      title: "Cargando",
      showConfirmButton: false,
      timer: 500
    });
    try {
      await axios.post('http://localhost:5000/api/verify', {
        token,
        data
      })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña Restablecida Satisfactoriamente',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(_ => void router.push("/"), 500)
    } catch (error) {
      console.log(error)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Algo paso...',
        text: "Revisa tu conexion a internet",
        showConfirmButton: false,
        timer: 2500
      })
    }

  };

  return (
    <> <div className="container adminps">
      <form name="recovery" onSubmit={handleSubmit(onSubmit)}>
        <div className="restCont">
          <MdPersonAdd size={30} />
          <h3>Restablecer Contraseña</h3>
        </div>

        <div className="login-input">
          {/* <label htmlFor="password"> Nueva contraseña</label> */}
          <input
            type="password"
            id="password"
            placeholder=" Nueva Contraseña"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === "required" && (
            <span>Este campo es obligatorio</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>La contraseña debe tener al menos 8 caracteres</span>
          )}
        </div>
        <div className="login-input">
          {/* <label htmlFor="password2">Confirmar Contraseña:</label> */}
          <input
            type="password"
            id="password2"
            placeholder="Confirmar Contraseña"
            {...register("password2", {
              required: true,
              validate: (value) =>
                value === password.current || "las contraseñas no coinciden",
            })}
          />
          {errors.password2 && errors.password2.type === "required" && (
            <span>Este campo es obligatorio</span>
          )}
          {errors.password2 && errors.password2.type === "validate" && (
            <span>{errors.password2.message}</span>
          )}
        </div>
        <div className="bp">
          <button type="submit" className="btn submit">Enviar</button>
        </div>
      </form>
    </div>
    </>
  );
}
