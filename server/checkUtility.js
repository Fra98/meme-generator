exports.FONTS = ['arial', 'capriola', 'kalam', 'anton'];
exports.COLORS = ['white', 'black', 'blue', 'red', 'green', 'violet', 'yellow'];
exports.MIN_TEMPLATE_ID = 0;
exports.MAX_TEMPLATE_ID = 5;

const TEMPLATE_NUM_FIELDS = [1, 1, 2, 2, 3, 3];       // NUM FIELDS OF TEMPLATES: the index is the templateId

exports.checkVetText = (value, { req }) => {
    let countNotNull = 0;
    value.forEach(x => { if(x) countNotNull++ });

    if(countNotNull > TEMPLATE_NUM_FIELDS[req.body.templateId])
        throw new Error('Too many text fields for this template');
        
    if(countNotNull == 0)
        throw new Error('At least one text field must be not empty');
    
    let badPlacement = false;
    switch (TEMPLATE_NUM_FIELDS[req.body.templateId]) {
        case 1:
            if(!value[0]) badPlacement = true;
            break;
        case 2:
            if(!value[0] && !value[1] || value[2]) badPlacement = true;
            break;
        default:
            break;
    }
     
    if(badPlacement)
        throw new Error('Bad displacement of text values');

    return true;
}