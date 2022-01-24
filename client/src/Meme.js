function Meme(id, templateId, userId, title = undefined, prot = true, creator, font, color, vetText) {
    this.id = id;
    this.userId = userId;
    this.templateId = templateId;
    this.title = title;
    this.prot = prot
    this.creator = creator;
    this.font = font;
    this.color = color;
    this.vetText = vetText;
}

function getDefaultMeme(templateId) {
    return new Meme(undefined, templateId, undefined, "", true, undefined, "anton", "black", ["", "", ""])
}

export  { Meme, getDefaultMeme };