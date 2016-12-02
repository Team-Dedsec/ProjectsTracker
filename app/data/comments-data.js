/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let { Comment } = models;

    return {
        createComment(title, content, poster) {
            let deleted = false;

            let comment = new Comment({
                title,
                content,
                deleted,
                poster
            });

            return new Promise((resolve, reject) => {
                comment.save((err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    return resolve(comment);
                });
            });
        },

        getAllcomments() {
            return new Promise((resolve, reject) => {
                Comment.find((err, comments) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(comments);
                });
            });
        },

        getCommentById(id) {
            return new Promise((resolve, reject) => {
                CommandEvent.find()
                    .byId(id)
                    .exec((err, comment) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(comment);
                    });
            });
        }
    };
};