//Create each of the functions that you have called in routes file, and return a 500 response to the client
//http://localhost:3333/articles

const articles = require("../models/articles.models");
const Joi = require("joi")

const getAll = (req, res) => {
        articles.getAllArticles((err, num_rows, results) => {
            if (err) return res.sendStatus(500);

            return res.status(200).send(results);
        })
    }
    //if the client sends some malformed data
const create = (req, res, next) => {
        //Joi validates the incoming data against the specification
        const schema = Joi.object({
            "title": Joi.string().required(),
            "author": Joi.string().required(),
            "article_text": Joi.string().required()
        })
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message); //return 400 Bad request if data doesn't validate
        //gets the article data out of req.body,and sends it to the model function that we have just created
        let article = Object.assign({}, req.body);
        //call the addNewArticle function
        articles.addNewArticle(article, (err, id) => {
            if (err) return res.sendStatus(500);

            return res.status(201).send({ article_id: id })
        })
    }
    //if we find the row, we structure the object as the API states so we don't need to reformat
const getOne = (req, res) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404)
        if (err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
}

const updateArticle = (req, res, next) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        //validate the incoming data using Joi, and return a 400 if the data in therequest body is malformed


        const schema = Joi.object({
            "title": Joi.string(),
            "author": Joi.string(),
            "article_text": Joi.string()
        })

        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        if (req.body.hasOwnProperty("title")) {
            result.title = req.body.title
        }

        if (req.body.hasOwnProperty("author")) {
            result.author = req.body.author
        }

        if (req.body.hasOwnProperty("article_text")) {
            result.article_text = req.body.article_text
        }

        articles.updateArticle(article_id, result, (err, id) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            return res.sendStatus(200)
        })
    })
}

const deleteArticle = (req, res, next) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if (err === 404) return res.sendStatus(404);
        if (err) return res.sendStatus(500);
        //validate the incoming data using Joi, and return a 400 if the data in therequest body is malformed

        const schema = Joi.object({
            "title": Joi.string(),
            "author": Joi.string(),
            "article_text": Joi.string()
        })
        if (!schema) return res.status(404).send("No article found");
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);



        articles.deleteArticle(article_id, (err, id) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            }
            return res.status(200).send("Article deleted");
        })

    })


}

//export functions so they can be accessed by other files
module.exports = {
    getAll: getAll,
    create: create,
    getOne: getOne,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
}



// const Joi = require("joi")
// const articles = require("../models/articles.models");

// const getAll = (req, res) => {
//     articles.getAllArticles((err, num_rows, results) => {
//         if (err) return res.sendStatus(500);
//         return res.status(200).send(results);
//     })
// }

// const create = (req, res, next) => {

//     const schema = Joi.object({
//         "title": Joi.string().required(),
//         "author": Joi.string().required(),
//         "article_text": Joi.string().required()
//     })

//     const { error } = schema.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let temp_article = Object.assign({}, req.body);

//     articles.addNewArticle(temp_article, (err, id) => {
//         if (err) return res.sendStatus(500);

//         return res.status(201).send({ article_id: id })
//     })

// }


// const getOne = (req, res) => {
//     console.log('triggered')
//     let article_id = parseInt(req.params.article_id);
//     console.log(article_id, "blhkjh")
//     articles.getSingleArticle(article_id, (err, result) => {
        
//         if (err === 404) return res.sendStatus(404)
//         if (err) return res.sendStatus(500)

//         return res.status(200).send(result)
//     })

// }

// const updateArticle = (req, res, next) => {
//     let article_id = parseInt(req.params.article_id);

//     articles.getSingleArticle(article_id, (err, result) => {
//         if (err === 404) return res.sendStatus(404);
//         if (err) return res.sendStatus(500);

//         const schema = Joi.object({
//             "title": Joi.string(),
//             "author": Joi.string(),
//             "article_text": Joi.string()
//         })

//         const { error } = schema.validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         if (req.body.hasOwnProperty("title")) {
//             result.title = req.body.title
//         }

//         if (req.body.hasOwnProperty("author")) {
//             result.author = req.body.author
//         }

//         if (req.body.hasOwnProperty("article_text")) {
//             result.article_text = req.body.article_text
//         }

//         articles.updateArticle(article_id, result, (err, id) => {
//             if (err) {
//                 console.log(err)
//                 return res.sendStatus(500)
//             }
//             return res.sendStatus(200)
//         })
//     })
// }

// const deleteArticle = (req, res, next) => {
//     let article_id = parseInt(req.params.article_id);

//     articles.getSingleArticle(article_id, (err, result) => {
//         if (err === 404) return res.sendStatus(404);
//         if (err) return res.sendStatus(500);

//         const schema = Joi.object({
//             "title": Joi.string(),
//             "author": Joi.string(),
//             "article_text": Joi.string()
//         })

//         if (!schema) return res.status(404).send("No article found");
//         const { error } = schema.validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);


//         articles.deleteArticle(article_id, (err, id) => {
//             if (err) {
//                 console.log(err)
//                 return res.sendStatus(500)
//             }
//             return res.status(200).send("Article deleted")
//         })
//     })
// }

// module.exports = {
//     getAll: getAll,
//     create: create,
//     getOne: getOne,
//     updateArticle: updateArticle,
//     deleteArticle: deleteArticle
// }

