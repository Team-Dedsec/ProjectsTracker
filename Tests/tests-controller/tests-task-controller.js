/* globals chai describe it requester expect */
// Note: ignore EINVAL error if running on node 7.1.0 - see https://github.com/nodejs/node/issues/9542
"use strict";
const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const data = {};
const req = {
    body: {
        content: "Some comment",
        commentId: "2",
        status: "some status"
    },
    params: {
        id: "2"
    },
    user: {
        username: "Pesho123"
    }
};
const controller = require("../../ProjectsTracker/app/controllers/task-controller")(data);

describe("ProjectsTracker/app/controllers/task-controller.js tests", () => {
    describe("addCommentToTask tests", () => {
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            data.addCommentToTask = sinon.stub();
            data.addCommentToTask.returns(Promise.resolve());
        });

        afterEach(() => {
            req.flash = null;
            res.redirect = null;
            data.addCommentToTask = null;
        });

        it("Expect addCommentToTask to exist and be a function.", () => {
            expect(controller.addCommentToTask).to.exist;
            expect(controller.addCommentToTask).to.be.a("function");
        });

        it("Expect addCommentToTask to call data.addCommentToTask with correct params once.", () => {
            controller.addCommentToTask(req, res);
            expect(data.addCommentToTask.calledOnce).to.be.true;
            expect(data.addCommentToTask.calledWith(req.params.id, req.body.content, req.user.username)).to.be.true;
        });

        it("Expect addCommentToTask to flash success message and redirect to correct page", (done) => {
            controller.addCommentToTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("success_msg", "Comment added successfully!")).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect addCommentToTask to catch error and redirect to home page", (done) => {
            let message = "some message";
            data.addCommentToTask = sinon.stub();
            data.addCommentToTask.returns(Promise.reject(new Error(message)));

            controller.addCommentToTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith("/")).to.be.true;
                })
                .then(done, done);
        });
    });
    describe("deleteCommentFromTask tests", () => {
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            data.deleteComment = sinon.stub();
            data.deleteComment.returns(Promise.resolve());
        });

        afterEach(() => {
            req.flash = null;
            res.redirect = null;
            data.deleteComment = null;
        });

        it("Expect deleteCommentFromTask to exist and be a function.", () => {
            expect(controller.deleteCommentFromTask).to.exist;
            expect(controller.deleteCommentFromTask).to.be.a("function");
        });

        it("Expect deleteCommentFromTask to call data.deleteComment with correct params once.", () => {
            controller.deleteCommentFromTask(req, res);
            expect(data.deleteComment.calledOnce).to.be.true;
            expect(data.deleteComment.calledWith(req.body.commentId, req.params.id)).to.be.true;
        });

        it("Expect deleteCommentFromTask to flash success message and redirect to correct page", (done) => {
            controller.deleteCommentFromTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("success_msg", "Comment removed successfully!")).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect deleteCommentFromTask to catch error and redirect to home page", (done) => {
            let message = "some message";
            data.deleteComment = sinon.stub();
            data.deleteComment.returns(Promise.reject(new Error(message)));

            controller.deleteCommentFromTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith("/")).to.be.true;
                })
                .then(done, done);
        });
    });
    describe("changeTaskStatus tests", () => {
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            data.changeTaskStatus = sinon.stub();
            data.changeTaskStatus.returns(Promise.resolve());
        });

        afterEach(() => {
            req.flash = null;
            res.redirect = null;
            data.changeTaskStatus = null;
        });

        it("Expect changeTaskStatus to exist and be a function.", () => {
            expect(controller.changeTaskStatus).to.exist;
            expect(controller.changeTaskStatus).to.be.a("function");
        });

        it("Expect changeTaskStatus to call data.changeTaskStatus with correct params once.", () => {
            controller.changeTaskStatus(req, res);
            expect(data.changeTaskStatus.calledOnce).to.be.true;
            expect(data.changeTaskStatus.calledWith(req.params.id, req.body.status)).to.be.true;
        });

        it("Expect changeTaskStatus to redirect to correct page", (done) => {
            controller.changeTaskStatus(req, res)
                .then(() => {
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect changeTaskStatus to catch error and redirect to correct task page", (done) => {
            let message = "Invalid task status!";
            data.changeTaskStatus = sinon.stub();
            data.changeTaskStatus.returns(Promise.reject(new Error("Invalid task status!")));

            controller.changeTaskStatus(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("getTaskById tests", () => {
        let task = "some task";
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.getTaskById = sinon.stub();
            data.getTaskById.returns(Promise.resolve(task));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.getTaskById = null;
        });

        it("Expect getTaskById to exist and be a function.", () => {
            expect(controller.getTaskById).to.exist;
            expect(controller.getTaskById).to.be.a("function");
        });

        it("Expect getTaskById to call data.getTaskById with correct params once.", () => {
            controller.getTaskById(req, res);
            expect(data.getTaskById.calledOnce).to.be.true;
            expect(data.getTaskById.calledWith(req.params.id)).to.be.true;
        });

        it("Expect getTaskById to redirect to correct page with correct params", (done) => {
            controller.getTaskById(req, res)
                .then(() => {
                    expect(res.render.calledWith("task-details", task)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect getTaskById to catch error and redirect to home page", (done) => {
            let message = "DBERR!";
            data.getTaskById = sinon.stub();
            data.getTaskById.returns(Promise.reject(new Error(message)));

            controller.getTaskById(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith("/")).to.be.true;
                })
                .then(done, done);
        });
    });
});