const db = require("../../database");
const article = require("../../app/controllers/articles.controllers");


const getOneComment =(id,done) => {
    console.log('in comments')
    const sql = 'SELECT * FROM comments WHERE article_id=?'

    db.get(sql, [id], (err,row) => {
        if(err) return done(err)
        if(!row) return done(404)

        return done(null, {
                comment_id:row.comment_id,
                comment_text:row.comment_text,
                date_published:new Date(row.date_published).toLocaleDateString(),
                article_id:row.article_id,

            })
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
    getOneComment:getOneComment,
    AddNewComment:AddNewComment,
    deleteC:deleteC,
}