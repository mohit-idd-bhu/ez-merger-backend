const router = require('express').Router();
const Document = require('../models/document');
const getDocument = require('../services/docService');
const {verifyToken} = require('../middleware/authMiddleware');
const {v4:uuid} = require('uuid');

router.get('/',verifyToken,async (req,res)=>{
    try{
        const email = req.user.email;
        const doc = await Document.find({
            collaborators : {$in : [email]}
        });
        return res.status(200).json({documents:doc});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
});

router.get('/:id',verifyToken,async (req,res)=>{
    try{
        const documentID = req.params.id;
        const document = await getDocument(documentID);
        if(!document) return res.status(404).json({error:"Document Not Found"});
        return res.status(200).json({message:"Document Found",document:document});
    }
    catch(err){
        return res.status(500).json({error:"Internal Server Error"});
    }
});

router.post('/create',verifyToken,async (req,res)=>{
    try{
        const {title}= req.body;
        const email = req.user.email;
        const doc={
            id:uuid(),
            title:title,
            owner:email,
            collaborators:[email],
            content:""
        }
        await Document.create(doc);
        res.status(200).json({message:"Document Created",id:doc.id});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
});

router.put('/update/:id',verifyToken,async (req,res)=>{
    try{
        const documentID = req.params.id;
        const {content} = req.body;
        const userEmail = req.user.email;
        const document = await getDocument(documentID);
        if(!document){
            return res.status(404).json({error:"Doccument Not Found"});
        }
        if(!document.collaborators.includes(userEmail)){
            document.collaborators.push(userEmail);
        }
        document.content=content;
        await Document.findOneAndUpdate({id:documentID},document);
        res.status(200).json({message:"Document Updated Succesfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
});

router.delete('/delete/:id',verifyToken,async (req,res)=>{
    try{
        const documentID = req.params.id;
        const document = await getDocument(documentID);
        const email = req.user.email;
        if(document.owner===email){
            await Document.findOneAndDelete(document);
            return res.status(200).json({message:"Doccument is deleted"});
        }
        return res.status(400).json({error:"Access Denied"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"});
    }
});

module.exports=router;