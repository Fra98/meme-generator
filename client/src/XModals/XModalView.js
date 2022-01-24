import { Modal } from "react-bootstrap";
import { Globe, LockFill } from "react-bootstrap-icons";
import XMeme from "../XMeme/XMeme";

function XModalView(props) {

  return (
    <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.meme.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className='px-2 mx-auto'>
        <XMeme thumbnail={false} meme={props.meme} />
      </Modal.Body>
      
      <Modal.Footer className='justify-content-between'>
        <div>{props.meme.prot ? <LockFill /> : <Globe />}</div>
        <div>Created by {props.meme.creator}</div>
      </Modal.Footer>
    </Modal>
  );
}



export default XModalView;