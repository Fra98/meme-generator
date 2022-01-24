import { Card, Button, Row, Col } from "react-bootstrap";
import { EyeFill, TrashFill, Clipboard } from "react-bootstrap-icons"

import XMeme from "../XMeme/XMeme";

function XCardGrid(props) {
  let memes = props.userLogged ? props.memes.filter(m => m.userId !== props.userId) : props.memes;   // logged : all memes from other creators, not logged: public memes
  let yourMemes = props.userLogged ? props.memes.filter(m => m.userId === props.userId) : [];       // logged : all memes from logged user, not logged: empty

  return (
    <>
      {props.userLogged &&
        <>
          <Row className="w-100 justify-content-between mx-0 px-2">
            <h2 className="my-2 mr-1">Your Memes</h2>
            <div><Button className="my-2 mr-1" variant="secondary" onClick={() => props.openModal("create", undefined)}>Create</Button></div>
          </Row>
          {yourMemes.length === 0 ?
            <p className="ml-2 my-0" style={{ color: "red" }}>You haven't created any meme yet. </p>
            :
            <XCardRow memes={yourMemes} openModal={props.openModal} userLogged={props.userLogged} userId={props.userId} />
          }
        </>
      }

      <Row className="w-100 justify-content-between mx-0 px-2">
        <h2 className="my-2 mr-1">{props.userLogged ? "Memes by other creators" : "Public Memes"}</h2>
      </Row>
      {memes.length === 0 ?
        <p className="ml-2 my-0" style={{ color: "red" }}>No memes</p>
        :
        <XCardRow memes={memes} openModal={props.openModal} userLogged={props.userLogged} userId={props.userId} />
      }

    </>
  );
}

function XCardRow(props) {
  return (
    <Row className='mt-1 mb-2 mx-0 justify-content-start align-items-center'>
      {props.memes.map(m =>
        <Col key={m.id} xl={3} lg={4} sm={6} className='py-3 px-auto'>
          <XCard meme={m} openModal={props.openModal} userLogged={props.userLogged} userId={props.userId} />
        </Col>
      )}
    </Row>
  );
}


function XCard(props) {
  return (
    <Card style={{ width: '16rem' }} bg='light' border='primary' className="mx-auto">
      <Card.Body className="py-2 px-2">
        <Row>
          <Card.Title className="my-0 mx-auto">{props.meme.title}</Card.Title>
        </Row>

        <XMeme thumbnail={true} meme={props.meme} />

        <Row className='justify-content-around'>
          <Button className='py-0 mx-2' variant="trasparent" onClick={() => props.openModal('open', props.meme)}>
            <EyeFill size={20} />
          </Button>

          {props.userLogged &&
            <Button className='py-0 mx-2' variant="trasparent" onClick={() => props.openModal('copy', props.meme)}>
              <Clipboard size={20} />
            </Button>
          }
          {props.userLogged && props.userId === props.meme.userId &&
            <Button className='py-0 mx-2' variant="trasparent" onClick={() => props.openModal('delete', props.meme)}>
              <TrashFill size={20} />
            </Button>
          }

        </Row>

      </Card.Body>
    </Card>
  );
}


export default XCardGrid;