import Table from "../../components/Table";
import Header from "../../components/Header";
import { getData, writeExcel } from "../../utils/tools";
import { MdAdd, MdOutlinePostAdd }from "react-icons/md";
import { useState, useRef } from "react";
import ModalCollb from "../../components/ModalCollb";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#__next");
export default function Dashboard({ data, people }) {
  const posRef = useRef(null);
  const orderRef = useRef(null);
  const searchOptRef = useRef(null);
  const position = [...new Set(people.map((item) => item.position))];
  const [listPeople, setListPeople] = useState(people);
  const [inputType, setInputType] = useState("number");

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

  const filterData = _ => {
    let filterPeople = [...people];
    switch (orderRef.current.value) {
      case "1":
        filterPeople = [
          ...filterPeople.sort((a, b) => a.fName?.localeCompare(b.fName)),
        ];
        break;
      case "2":
        filterPeople = [
          ...filterPeople.sort((a, b) => b.fName?.localeCompare(a.fName)),
        ];
        break;
    }
    if (posRef.current.value !== "0") {
      filterPeople = [
        ...filterPeople.filter(
          (item) => item.position === posRef.current.value
        ),
      ];
    }
    if (search.value !== "") {
      if (searchOptRef.current.value === "name") {
        filterPeople = [
          ...filterPeople.filter((item) => {
            const name = `${item.fName} ${item.sName} ${item.fName} ${item.fName}`;
            return name.toLowerCase().includes(search.value.toLowerCase());
          }),
        ];
      } else {
        filterPeople = [
          ...filterPeople.filter((item) =>
            item[searchOptRef.current.value].includes(search.value)
          ),
        ];
      }
    }
    setListPeople(filterPeople);
  };
  const resetSearch = _ => {
    search.value = "";
    setInputType(searchOptRef.current.value === "name" ? "text" : "number");
    filterData();
  };
  const genExcel = _ => {
    Swal.fire({
      position: "center",
      title: "Cargando",
      showConfirmButton: false,
      timer: 800
  });
   writeExcel(listPeople)
  }
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className="dashboard">
      <Header data={data} />
      <div className="filters">
        <div className="options">
          <label htmlFor="">Ordenar</label>
          <select onChange={filterData} ref={orderRef} name="" id="">
            <option value="0">Por Defecto</option>
            <option value="1">Nombre A-Z</option>
            <option value="2">Nombre Z-A</option>
          </select>
        </div>
        <div className="options">
          <label htmlFor="">Cargo</label>
          <select onChange={filterData} ref={posRef} name="" id="">
            <option value="0">Por Defecto</option>
            {position.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        
        <div className="actions" onClick={openModal}>
          <MdAdd size={40} />
          <span>Agregar Colaborador</span>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="ventana modal"
          style={style}
        >
          <ModalCollb onClose={closeModal} />
        </Modal>

        <div className="actions" onClick={genExcel}>
          <MdOutlinePostAdd size={40} />
          <span>Exportar datos</span>
        </div>
        <div className="search">
          <input
            onChange={filterData}
            type={inputType}
            name="search"
            id="search"
            placeholder="Buscar"
          />
          <select onChange={resetSearch} ref={searchOptRef} name="" id="">
            <option value="document">Documento</option>
            <option value="name">Nombre</option>
          </select>
        </div>
      </div>
      <Table people={listPeople} dataUser={data}/>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const data = JSON.parse(req.headers["x-data"]);
  // /api/collaborator
  const people = await getData();
  return {
    props: {
      data,
      people,
    },
  };
}
