import React, { ChangeEvent, useEffect } from "react";
import Modal from "react-modal";
const Test = () => {
  // let portal;
  // if (typeof window !== "undefined") {
  //   portal = document.querySelector("#portal");
  //   createPortal(<div>Hello World</div>, portal!);
  // }

  Modal.setAppElement("#__next");

  return (
    <div>
      <main>This is main</main>
      <Modal isOpen={true}>
        <h1>Modal!</h1>
      </Modal>
    </div>
  );
};

export default Test;
