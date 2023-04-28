const db = require("../../database");


const getAllComments = (article_id, done) => {
    const results = [];

    db.each(
        "SELECT * FROM comments WHERE article_id=?",
        [],
        (err, row) => {
            if (err) return done(err);

            results.push({
                comment_id: row.comment_id,
                date_published: new Date(row.date_published).toLocaleDateString(),
                comment_text: row.comment_text,
                article_id: row.article_id
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

const AddNewComment = (comment_text, article_id, done) => {
    let date = Date.now();
    const sql = 'INSERT INTO comments (comment_text, date_published, article_id) VALUES (?,?,?)';
    let values = [comment_text, date, article_id];

    db.run(
        sql,
        values,
        function (err) {
            if (err) return done(err, null);
            return done(null, this.lastID);
        }
    )
}

const deleteC = (id, done) => {

    const sql = 'DELETE FROM comments WHERE comment_id=?'
    let values = [id];

    db.run(sql, [id], values, (err) => {
        return done(err);
    })

}

module.exports = {
    getAllComments: getAllComments,
    AddNewComment: AddNewComment,
    deleteC: deleteC,
}