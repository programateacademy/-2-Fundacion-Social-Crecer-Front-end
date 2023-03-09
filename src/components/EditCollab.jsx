import axios from "axios";
import { useEffect, useState } from "react";
import { MdPersonAdd, MdClose } from "react-icons/md";
import FormCollab from "./FormCollab";


export default function EditCollab({ onClose, propid}) {

  const [userData, setUserData] = useState({});


  useEffect(() => {
    const update = async () => {
      const res = await axios.get(`http://localhost:5000/api/editcollab/${propid}`)
      setUserData(res.data)
    }
    update()
  }, [])

  return (

    <div className="modal">
      <header>
        <MdPersonAdd size={30} />
        <h2>Editar colaborador</h2>
      </header>
      <div onClick={onClose}><MdClose size={30} className="close-modal" /></div>
      <FormCollab closeM={onClose} enviar={false} person={userData}/> 
    </div>

  )
}