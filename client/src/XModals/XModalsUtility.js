import { useState } from "react";
import { Row, Col, Carousel, Button , Image, Form, FormControl, FormGroup, FormLabel, FormCheck, Alert } from 'react-bootstrap';

import { getDefaultMeme } from "../Meme";
import TEMPLATES from "../TEMPLATES";
import { FONTS, COLORS } from "../STYLES"


function XPickTemplate(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => setIndex(selectedIndex);
  
  return (
    <>
      <Row className="mx-0 p-2 justify-content-between">
        <p className="my-0 pt-1">Pick a template:</p>
        <Button variant="success" onClick={() => props.setMeme(getDefaultMeme(index))}>
            Select
        </Button>
      </Row>
      <Carousel activeIndex={index} onSelect={handleSelect} >
        {TEMPLATES.map(t =>
          <Carousel.Item key={t.templateId} >
            <Image className="d-block w-100" src={t.image} alt="" />
          </Carousel.Item>
        )}
      </Carousel>
    </>
  );
}

// MANDATORY props: submit (copy or create), closeModal, isCopy (true or false), meme, setMeme
// CASE COPY props: userId, isProtected
function XMemeForm(props) {
  const [meme, setMeme] = [props.meme, props.setMeme];
  const [errorTitle, setErrorTitle] = useState("");
  const [errorText, setErrorText] = useState("");

  const template = TEMPLATES[props.meme.templateId];
  const iter = [...Array(template.numFields).keys()]
  
  // if is a copy, check condition on visibility, otherwise it's always true
  let canChangeVisibility = props.isCopy ? (!props.isProtected || props.userId === meme.userId) : true;

  const onSubmit = (e) => {
    e.preventDefault();
    
    let error = false;

    if(!meme.title) {
      setErrorTitle("Title can't be empty!");
      error = true;
    }
    else 
      setErrorTitle();
    
    if(!meme.vetText[0] && !meme.vetText[1] && !meme.vetText[2]) {
      setErrorText("At least one text field must be filled!");
      error = true;
    }
    else 
      setErrorText();
    
    if(error)
      return;

    props.submit(meme);
    props.closeModal();
  }

  return (
    <Form>
      <FormGroup>
        <FormLabel>Title</FormLabel>
        <FormControl type="text" placeholder="Title" value={meme.title} onChange={(event) => setMeme({ ...meme, title: event.target.value })} />
        { errorTitle && <Alert className="my-2 py-1 px-2" variant="danger">{errorTitle}</Alert> }
      </FormGroup>

      {iter.map(idx => {
        return (
          <FormGroup key={idx}>
            <FormLabel>Text {idx + 1}</FormLabel>
            <FormControl type="text" placeholder={"Enter text field #" + (idx + 1)} value={meme.vetText[idx]} onChange={(event) => {
              const newVetText = meme.vetText.map((item, j) => j === (idx) ? event.target.value : item);
              setMeme({ ...meme, vetText: newVetText });
            }} />
          </FormGroup>
        )
      })
      }
      {errorText && <Alert className="my-2 py-1 px-2" variant="danger">{errorText}</Alert>}

      {canChangeVisibility ?
        <FormCheck inline type="checkbox" className="mb-3 ml-2" label="Protected" defaultChecked={meme.prot} onChange={event =>
          setMeme({ ...meme, prot: event.target.checked })
        } />
          :
        <FormCheck inline type="checkbox" disabled className="mb-3 ml-2" label="Protected" defaultChecked={meme.prot} />
      }

      <Form.Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Font</Form.Label>
          <Form.Control as="select" defaultValue={meme.font} onChange={(event) => setMeme({ ...meme, font: event.target.value })}>
            {Object.keys(FONTS).map(key => <option key={key} value={key}>{FONTS[key][1]}</option>)}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Color</Form.Label>
          <Form.Control as="select" defaultValue={meme.color} onChange={(event) => setMeme({ ...meme, color: event.target.value })}>
            {Object.keys(COLORS).map(key => <option key={key} value={key}>{COLORS[key][1]}</option>)}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Row className='mx-1 justify-content-end'>
        <Button variant="success" className='mx-1' onClick={onSubmit}>Confirm</Button>
        <Button variant="danger" className='mx-1' onClick={props.closeModal}>Cancel</Button>
      </Row>
      
    </Form>
  )
}

export { XPickTemplate, XMemeForm };