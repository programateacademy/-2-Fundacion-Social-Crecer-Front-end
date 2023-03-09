import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { MdPersonAdd } from "react-icons/md";
import Swal from "sweetalert2";

Modal.setAppElement("#__next");

export default function AddUser({ isOpen, onRequestClose }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = React.useRef({});
  password.current = watch("password", "");

  const style = {
    overlay: {
      backgroundColor: "rgba(0,0,0,.7)",
    },

    content: {
      width: "min-content",
      inset: 0,
      margin: "auto",
      height: "min-content",
      padding: "30px 50px",
      backgroundColor: "#d9d9d9",
    },
  };

  const onSubmit = async (data) => {
    Swal.fire({
      position: "center",
      title: "Cargando",
      showConfirmButton: false,
    });
    try {
      const res = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Nuevo usuario creado Satisfactoriamente",
          showConfirmButton: false,
          timer: 2500,
        });
        onRequestClose()
      }else if(res.status === 401){
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
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className="modal">
        <header>
          <MdPersonAdd size={30} />
          <h2>Nuevo Usuario</h2>
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="usernew">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && <span>Este campo es obligatorio</span>}
          </div>

          <div className="usernew">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && (
              <span>Este campo es obligatorio</span>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <span>La contraseña debe tener al menos 8 caracteres</span>
            )}
          </div>

          <div className="usernew">
            <label htmlFor="password2">Confirmar Contraseña:</label>
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

          <div className="usernew">
            <label htmlFor="role">Rol</label>
            <select
              {...register("role")}
              id="role"
              name="role"
              placeholder="Rol"
            >
              <option value="user">Usuario</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="btns">
            <button className="btn submit" type="submit">
              Agregar
            </button>
            <button
              className="btn cancel"
              type="submit"
              onClick={onRequestClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
