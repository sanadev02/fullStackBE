const Joi = require("joi");
const { json } = require("body-parser");
const comments = require("../models/comments.models");
const articles = require("../controllers/articles.controllers");

const getComments = (req,res) => {
let article_id = parseInt(req.params.article_id);

    comments.getOneComment(article_id, (err, results) => {
        if(err) return res.sendStatus(500);
        console.log('Triggered in comments')
        return res.status(200).send(results);
    })  
    
}

const addComment = (req,res) => {
    let article_id = req.params.article_id;

console.log(article_id,"bkj")
   const hasArticle =  articles.getOne(article_id)
   console.log(hasArticle, 'article')
   if(!hasArticle) return res.status(400).json({messsage: 'article does not exist'})
    
    
    let comment = req.body;
    console.log(comment)

    // comments.AddNewComment(comment, (err,id) => {
    //     if(err) return res.sendStatus(500);
    //     return res.status(200).send({comment_id: id})
    // })
   
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
    getComments,
    addComment,
    deleteComment,
}