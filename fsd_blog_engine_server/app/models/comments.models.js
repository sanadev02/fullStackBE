const db = require("../../database");
const article = require("../../app/controllers/articles.controllers");


const getAllComments =(done) => {
    console.log('in comments')
    const results =[];

    db.each(
        "SELECT * FROM comments",
        [],
        (err,row) => {
            if (err) console.log("Something went wrong: " + err);

            results.push({
                comment_id:row.comment_id,
                comment_text:row.comment_text,
                date_published:new Date(row.date_published).toLocaleDateString(),
                article_id:row.article_id,

            });
        },
        (err, num_rows)=> {
            return done(err,num_rows, results);
        }
    )
}

const AddNewComment = (comments,done) => {

    let date = Date.now();
    const sql = 'INSERT INTO comments (comment_text, date_published, article_id) VALUES (?,?,?)';
    let values = [comments.comment_text, date, article.article_id];

    db.run(
        sql,
        values,
        function(err){
            if(err) return done(err,null);
            return done (null,this.lastID);
        }
    )
}

const deleteC = (id,done) => {

    const sql = 'DELETE FROM comments WHERE comment_id=?'
    let values = [id];

    db.run (sql,values,(err) => {
        return done(err);
    })

}

module.exports = {
    getAllComments:getAllComments,
    AddNewComment:AddNewComment,
    deleteC:deleteC,
}