/* globals require module Promise */
"use strict";

module.exports = function (models) {
    let { Comment } = models;

    return {
        createComment(title, content, poster) {
            let comment = new Comment({
                Title = title,
                Content = content,
                isDeleted = false,
                PosterID = poster
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