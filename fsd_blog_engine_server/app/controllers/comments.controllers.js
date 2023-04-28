const Joi = require("joi");
const comments = require("../models/comments.models");
//const articles = require("../models/articles.models");
const articles = require("../models/articles.models");

const getComments = (req, res) => {
    let article_id = parseInt(req.params.article_id);

    comments.getAllComments(article_id, (err, num_rows, results) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        return res.status(200).send(results);
    })

}

const addComment = (req, res) => {

    const schema = Joi.object({
        "comment_text": Joi.string().required()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let comment = Object.assign({}, req.body);
    let article_id = parseInt(req.params.article_id);
    console.log(comment, 'works')

    articles.getSingleArticle(article_id, (err, id) => {
        console.log(article_id, 'article_id is here')

        //if (err === 404) return res.sendStatus(404)
        if (err) {
            console.log(res.details);
            return res.sendStatus(500)
            

        }

        else {
            comments.AddNewComment(req.body.comment_text, article_id, (err, id) => {
                // console.log(comment_text, article_id, 'here')

                if (err === 500) return res.sendStatus(500)
                if (err === 404) return res.sendStatus(404)

                return res.status(201).send({ comment_id: id })

            })
        }
    })

}

const deleteComment = (req, res) => {
    let comment_id = parseInt(req.params.comment_id);

    comments.getAllComments(req.params.comment_id, (err, results) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);

        comments.deleteC(req.params.comment_id, (err, id) => {
            if (err === 500) return res.sendStatus(500)
            if (err === 404) return res.sendStatus(404)

            return res.status(200).send("Comment deleted")
        })
    })
}

module.exports = {
    getComments,
    addComment,
    deleteComment,
}