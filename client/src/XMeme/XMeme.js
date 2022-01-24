import { Card } from "react-bootstrap";

import TEMPLATES from '../TEMPLATES';
import { FONTS } from '../STYLES'

import './XMeme.css'

const WIDTH_THUMB = 15;
const WIDTH = 25;

function XMeme(props) {
  const template = TEMPLATES[props.meme.templateId];
  const iter = [...Array(template.numFields).keys()]
  

  return (
    <Card className='my-2 px-auto mx-auto' border='light' style={props.thumbnail ? { width: WIDTH_THUMB+'rem' } : { width: WIDTH+'rem' }}>
      <Card.Img src={template.image} className='m-0 p-0' />
      {iter.map(idx => {
        return (
          <Card.ImgOverlay className='p-0 m-0' key={idx} >
            <XMemeText idx={idx} meme={props.meme} thumbnail={props.thumbnail} />
          </Card.ImgOverlay>);
        })
      }
    </Card>
  );
}

function XMemeText(props) {
  const template = TEMPLATES[props.meme.templateId];
  const fontSize = props.thumbnail ? (WIDTH_THUMB/WIDTH) * template.fontSize : template.fontSize;
  const top = template.vetPosY[props.idx] + "%";
  const left = template.vetPosX[props.idx] + "%";

  const style = {
    color: props.meme.color,
    position: 'absolute',
    top: top,
    left: left,
    fontSize: fontSize,
    textAlign: 'center'
  }

  const fontStyle = FONTS[props.meme.font][0] + " text-uppercase";

  return (
    <Card.Text border="success" className={fontStyle} style={style}>
      {props.meme.vetText[props.idx]}
    </Card.Text>
  )
}

export default XMeme;