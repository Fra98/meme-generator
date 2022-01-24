import { useState } from "react";
import { Modal } from "react-bootstrap";

import XMeme from "../XMeme/XMeme";
import { XMemeForm } from './XModalsUtility'

function XModalCopy(props) {
  const isProtected = props.meme.prot; 
  const [memeCopy, setMemeCopy] = useState({ ...props.meme });

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Copy meme</Modal.Title>
      </Modal.Header>
      <Modal.Body className='px-2 mx-auto'>
        <XMeme thumbnail={false} meme={memeCopy} />
        <XMemeForm meme={memeCopy} setMeme={setMemeCopy} closeModal={props.closeModal} submit={props.copyMeme} 
                  isCopy={true} userId={props.userId} isProtected={isProtected} />
      </Modal.Body>
    </Modal>
  );
}

export default XModalCopy;