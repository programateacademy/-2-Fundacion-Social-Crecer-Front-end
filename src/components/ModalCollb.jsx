import { MdPersonAdd, MdClose } from "react-icons/md";
import FormCollab from "./FormCollab";


export default function ModalCollb({ onClose }) {

  return (

    <div className="modal">
      <header>
        <MdPersonAdd size={30} />
        <h2>Agregar colaborador</h2>
      </header>
      <div onClick={onClose}><MdClose size={30} className="close-modal" /></div>
      <FormCollab closeM={onClose}/>
    </div>
  )
}
