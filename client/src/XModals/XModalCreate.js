import { useState } from "react";
import { Modal } from "react-bootstrap";

import XMeme from "../XMeme/XMeme";
import { XPickTemplate, XMemeForm } from './XModalsUtility'

function XModalCreate(props) {
  const [meme, setMeme] = useState("");

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter" centered show={true} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create new meme</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-2'>
        {!meme ?
          <XPickTemplate setMeme={setMeme} />
            :
          <>
            <XMeme thumbnail={false} meme={meme} />
            <XMemeForm meme={meme} setMeme={setMeme} closeModal={props.closeModal} submit={props.createMeme} isCopy={false} />
          </>
        }        
      </Modal.Body>
    </Modal>
  );
}


export default XModalCreate;