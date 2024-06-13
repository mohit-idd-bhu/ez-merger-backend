const Document = require('../models/document');

const getDocument = async (documentID)=>{
    try{
        const document = await Document.findOne({id:documentID});
        return document;
    }
    catch(err){
        return err;
    }
}

module.exports=getDocument;