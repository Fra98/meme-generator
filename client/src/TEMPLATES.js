import meme_0 from "./assets/images/0.jpg";
import meme_1 from "./assets/images/1.jpg";
import meme_2 from "./assets/images/2.jpg";
import meme_3 from "./assets/images/3.jpg";
import meme_4 from "./assets/images/4.jpg";
import meme_5 from "./assets/images/5.png";

function TemplateMeme(templateId, image, numFields = 1, vetPosX, vetPosY, fontSize) {
    this.templateId = templateId;
    this.image = image;
    this.numFields = numFields;
    this.vetPosX = vetPosX;
    this.vetPosY = vetPosY;
    this.fontSize = fontSize;
}

const TEMPLATES = [
    // templateId, image, numFields, [posX1, posX2, posX3], [posY1, posY2, posY3], fontSize
    new TemplateMeme(0, meme_0, 1, [3, undefined, undefined], [6, undefined, undefined], 20),
    new TemplateMeme(1, meme_1, 1, [5, undefined, undefined], [3, undefined, undefined], 20),
    new TemplateMeme(2, meme_2, 2, [58, 58, undefined], [10, 60, undefined], 25),
    new TemplateMeme(3, meme_3, 2, [24, 4, undefined], [2, 74, undefined], 26),
    new TemplateMeme(4, meme_4, 3, [8, 37, 75], [65, 65, 63], 35),
    new TemplateMeme(5, meme_5, 3, [9, 40, 75], [30, 15, 50], 35),
  ];


export default TEMPLATES;