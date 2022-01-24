import { Modal, Button, Container, Col, Row } from "react-bootstrap";
import { EmojiSmileFill } from "react-bootstrap-icons";

function XModalWelcome(props) {

  return (
    <Modal size="md" aria-labelledby="contained-modal-title-vcenter" centered show={props.show} onHide={props.closeModal} animation={false}>
      <Modal.Header>      
        <Container className="justify-content-md-center">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <EmojiSmileFill size={55}/><br/>
            </Col>
            <Col md="auto">
              <h1 >
                Meme Generator
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-3">
            <Col md="auto">
              <h3>
                Welcome {props.user}!        
              </h3>              
            </Col>
          </Row>  
        </Container>      
      </Modal.Header>
      <Modal.Body>
        <Container className="justify-content-md-center">
          <Row className="justify-content-sm-center mt-2 mb-3">
            <Col md="auto" >              
              <h4>
                Create and share your memes
              </h4>              
            </Col>
          </Row>             
          <Row className="justify-content-sm-center">
            <Col md="auto">              
              <Button variant="primary" size="lg" onClick={props.closeModal}>Get Started</Button>  
            </Col>
          </Row>
        </Container>                    
      </Modal.Body>      
    </Modal>
  );
}

export default XModalWelcome;