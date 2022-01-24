import { Modal, Button } from 'react-bootstrap';

function XModalDelete(props) {
    const toBeDeleted = props.meme;
  
    return (
      <Modal centered onHide={props.closeModal} show={true}>
        <Modal.Header closeButton>
          <Modal.Title>Delete meme</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <p>Meme "{toBeDeleted.title}" will be deleted. Are you sure?</p>
        </Modal.Body>
  
        <Modal.Footer>
          <Button variant="success" onClick={() => { props.deleteMeme(toBeDeleted); props.closeModal(); }}>Confirm</Button>
          <Button variant="danger" onClick={props.closeModal}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  export default XModalDelete;