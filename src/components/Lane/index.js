import React from "react";

import { renderTitle } from "./laneUtils";
import { db } from "../../firebase";
import Card from "../Card";
import Modal from "../Modal";
import styles from "./lane.module.css";

const Lane = (props) => {
  const [newCard, setNewCard] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  const { type, data } = props;
  const dbRef = db.ref(`/board/${type}`);

  const handleRemove = (id) => {
    console.log(`removing ${id}`);
    dbRef.child(id).remove();
    handleModalClose();
  };

  const renderTasks = () => {
    const arr = [];

    for (let key in data) {
      arr.push(
        <Card
          key={key}
          item={{ id: key, title: data[key].title }}
          handleModalOpen={handleModalOpen}
        />
      );
    }

    return arr.map((item) => item);
  };

  const handleModalOpen = (item) => {
    setOpen(true);
    setModalData(item);
  };

  const handleModalClose = () => {
    setOpen(false);
    setModalData(null);
  };

  const handleNewCard = (e) => {
    e.preventDefault();

    dbRef.push().set({ title: newCard });
    setNewCard("");
  };

  const handleOnChange = (e) => {
    setNewCard(e.target.value);
  };

  const renderModal = () => {
    return (
      <Modal
        open={open}
        data={modalData}
        onRemove={handleRemove}
        onClose={handleModalClose}
      />
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>{renderTitle(type)}</h3>
      </div>
      {open && renderModal()}
      <form onSubmit={handleNewCard}>
        <input onChange={handleOnChange} value={newCard} />
        <button onClick={handleNewCard}>Add</button>
      </form>
      {renderTasks()}
    </div>
  );
};

export default Lane;
