const Joi = require("joi");
const { json } = require("body-parser");
const comments = require("../models/comments.models");

const getComments = (req,res) => {
    comments.getAllComments(article_id, (err, num_rows, results) => {
        if(err) return res.sendStatus(500);
        console.log('Triggered in comments')
        return res.status(200).send(results);
    })  
    
}

const addComment = (req,res) => {

    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err,result)=> {
        if(err === 404) return res.sendStatus(404);   
        if(err) return res.sendStatus(500);
    
        const schema = Joi.object({
            "comment_text":Joi.string().required()
        })
    
        const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
    })
    let comment = Object.assign({},req.body);

    comments.AddNewComment(comment, (err,id) => {
        if(err) return res.sendStatus(500);
        return res.status(201).send({comment_id: id})
    })
   
}

const deleteComment = (req,res) => {
    let comment_id= parseInt(req.params.comment_id);
    
    comments.getAllComments(comment_id,(err,result)=>{
        if(err === 404) return res.sendStatus(404);   
        if(err) return res.sendStatus(500);
    
    comments.deleteC(comment_id,(err,id)=> {
        if(err){
        console.log(err)
        return res.sendStatus(500)
        }
        return res.status(200).send("Comment deleted")
    })
    })
}

module.exports = {
    getComments:getComments,
    addComment:addComment,
    deleteComment:deleteComment,
}