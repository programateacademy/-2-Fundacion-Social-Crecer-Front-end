import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md';
import { RiRotateLockFill } from "react-icons/ri";
import Modal from "react-modal";
import axios from 'axios'
import Swal from "sweetalert2";

Modal.setAppElement("#__next");

export default function SendRecovery({ isOpen, onRequestClose }) {
    const style = {

        overlay: {
            backgroundColor: "rgba(0,0,0,.7)"
        },

        content: {
            width: "50vw",
            inset: 0,
            margin: "auto",
            height: "min-content",
            padding: "0 30px 50px",
            backgroundColor: "#d9d9d9"
        }
    }

    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:5000/api/user');
            setUsers(response.data);
        }
        fetchData();
    }, []);

    const reestablecer = async (id) => {
        const dataos = { id }
        Swal.fire({
            position: "center",
            title: "Cargando",
            showConfirmButton: false,
        });
        try {
            await axios.post('http://localhost:5000/api/change', dataos)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Link enviado",
                showConfirmButton: false,
                timer: 2500,
            });
            onRequestClose()
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Algo paso...',
                text: "Revisa tu conexion a internet",
                showConfirmButton: false,
                timer: 2500
            })
        }

    }

    return (
        <Modal isOpen={isOpen} style={style} onRequestClose={onRequestClose}>
            <div onClick={onRequestClose}><MdClose size={30} className="close-modal" /></div>
            <div className="modal">
                <header>
                    <h2>Restablecer Contraseña</h2>
                </header>
                <div className='table'>
                    <div>
                        <p>E-mail</p>
                        <p>Enviar LInk</p>

                    </div>

                    {users.map(user => (
                        <div key={user._id}>
                            <span>{user.email}</span>
                            <button className="btn submit"
                                onClick={() => reestablecer(user._id)}
                            ><RiRotateLockFill /></button>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    )
}
