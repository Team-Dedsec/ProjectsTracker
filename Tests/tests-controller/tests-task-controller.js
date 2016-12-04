/* globals describe it beforeEach afterEach*/
/* eslint-disable no-unused-expressions */
/* eslint-disable max-lines */
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
        status: "some status",
        assignee: ["pe6o"]
    },
    params: {
        id: "2",
        projectId: "3",
        status: "some status",
        priority: "some priority",
        username: "Pesho123"
    },
    user: { username: "Pesho123" }
};

const controller = require("../../app/controllers/task-controller")(data);

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

    describe("findTasksByProject tests", () => {
        let tasks = ["some task"];
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.findTasksByProject = sinon.stub();
            data.findTasksByProject.returns(Promise.resolve(tasks));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.findTasksByProject = null;
        });

        it("Expect findTasksByProject to exist and be a function.", () => {
            expect(controller.findTasksByProject).to.exist;
            expect(controller.findTasksByProject).to.be.a("function");
        });

        it("Expect findTasksByProject to call data.findTasksByProject with correct params once.", () => {
            controller.findTasksByProject(req, res);
            expect(data.findTasksByProject.calledOnce).to.be.true;
            expect(data.findTasksByProject.calledWith(req.params.projectId)).to.be.true;
        });

        it("Expect findTasksByProject to redirect to correct page with correct params", (done) => {
            controller.findTasksByProject(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/tasks.pug", { tasks })).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("findTasksByStatus tests", () => {
        let tasks = ["some task"];
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.findTasksByStatus = sinon.stub();
            data.findTasksByStatus.returns(Promise.resolve(tasks));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.findTasksByStatus = null;
        });

        it("Expect findTasksByStatus to exist and be a function.", () => {
            expect(controller.findTasksByStatus).to.exist;
            expect(controller.findTasksByStatus).to.be.a("function");
        });

        it("Expect findTasksByStatus to call data.findTasksByStatus with correct params once.", () => {
            controller.findTasksByStatus(req, res);
            expect(data.findTasksByStatus.calledOnce).to.be.true;
            expect(data.findTasksByStatus.calledWith(req.params.status)).to.be.true;
        });

        it("Expect findTasksByStatus to redirect to correct page with correct params", (done) => {
            controller.findTasksByStatus(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/tasks.pug", { tasks })).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("findTasksByPriority tests", () => {
        let tasks = ["some task"];
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.findTasksByPriority = sinon.stub();
            data.findTasksByPriority.returns(Promise.resolve(tasks));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.findTasksByPriority = null;
        });

        it("Expect findTasksByPriority to exist and be a function.", () => {
            expect(controller.findTasksByPriority).to.exist;
            expect(controller.findTasksByPriority).to.be.a("function");
        });

        it("Expect findTasksByPriority to call data.findTasksByPriority with correct params once.", () => {
            controller.findTasksByPriority(req, res);
            expect(data.findTasksByPriority.calledOnce).to.be.true;
            expect(data.findTasksByPriority.calledWith(req.params.priority)).to.be.true;
        });

        it("Expect findTasksByPriority to redirect to correct page with correct params", (done) => {
            controller.findTasksByPriority(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/tasks.pug", { tasks })).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("findTasksByReporter tests", () => {
        let tasks = ["some task"];
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.findTasksByReporter = sinon.stub();
            data.findTasksByReporter.returns(Promise.resolve(tasks));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.findTasksByReporter = null;
        });

        it("Expect findTasksByReporter to exist and be a function.", () => {
            expect(controller.findTasksByReporter).to.exist;
            expect(controller.findTasksByReporter).to.be.a("function");
        });

        it("Expect findTasksByReporter to call data.findTasksByReporter with correct params once.", () => {
            controller.findTasksByReporter(req, res);
            expect(data.findTasksByReporter.calledOnce).to.be.true;
            expect(data.findTasksByReporter.calledWith(req.params.username)).to.be.true;
        });

        it("Expect findTasksByReporter to redirect to correct page with correct params", (done) => {
            controller.findTasksByReporter(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/tasks.pug", { tasks })).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("findTasksByAsignee tests", () => {
        let tasks = ["some task"];
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.findTasksByAsignee = sinon.stub();
            data.findTasksByAsignee.returns(Promise.resolve(tasks));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.findTasksByAsignee = null;
        });

        it("Expect findTasksByAsignee to exist and be a function.", () => {
            expect(controller.findTasksByAsignee).to.exist;
            expect(controller.findTasksByAsignee).to.be.a("function");
        });

        it("Expect findTasksByAsignee to call data.findTasksByAsignee with correct params once.", () => {
            controller.findTasksByAsignee(req, res);
            expect(data.findTasksByAsignee.calledOnce).to.be.true;
            expect(data.findTasksByAsignee.calledWith(req.params.username)).to.be.true;
        });

        it("Expect findTasksByAsignee to redirect to correct page with correct params", (done) => {
            controller.findTasksByAsignee(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/tasks.pug", { tasks })).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("getEditTask tests", () => {
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

        it("Expect findTasksByAsignee to exist and be a function.", () => {
            expect(controller.getEditTask).to.exist;
            expect(controller.getEditTask).to.be.a("function");
        });

        it("Expect findTasksByAsignee to call data.getTaskById with correct params once.", () => {
            controller.getEditTask(req, res);
            expect(data.getTaskById.calledOnce).to.be.true;
            expect(data.getTaskById.calledWith(req.params.id)).to.be.true;
        });

        it("Expect findTasksByAsignee to redirect to correct page with correct params", (done) => {
            controller.getEditTask(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/edit-task.pug", task)).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("postEditTask tests", () => {
        let task = "some task";
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.editTask = sinon.stub();
            data.editTask.returns(Promise.resolve(task));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.editTask = null;
        });

        it("Expect postEditTask to exist and be a function.", () => {
            expect(controller.postEditTask).to.exist;
            expect(controller.postEditTask).to.be.a("function");
        });

        it("Expect postEditTask to call data.getTaskById with correct params once.", () => {
            controller.postEditTask(req, res);
            expect(data.editTask.calledOnce).to.be.true;
            expect(data.editTask.calledWith(req.params.id)).to.be.true;
        });

        it("Expect postEditTask to redirect to correct page with correct params", (done) => {
            controller.postEditTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("success_msg", "Task edited successfully!")).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect postEditTask to catch error and redirect to task page", (done) => {
            let message = "Invalid task parameters!";
            data.editTask = sinon.stub();
            data.editTask.returns(Promise.reject(new Error(message)));

            controller.postEditTask(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("getReassign tests", () => {
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

        it("Expect getReassign to exist and be a function.", () => {
            expect(controller.getReassign).to.exist;
            expect(controller.getReassign).to.be.a("function");
        });

        it("Expect getReassign to call data.getTaskById with correct params once.", () => {
            controller.getReassign(req, res);
            expect(data.getTaskById.calledOnce).to.be.true;
            expect(data.getTaskById.calledWith(req.params.id)).to.be.true;
        });

        it("Expect getReassign to redirect to correct page with correct params", (done) => {
            controller.getReassign(req, res)
                .then(() => {
                    expect(res.render.calledWith("../views/reassignTask.pug", task)).to.be.true;
                })
                .then(done, done);
        });
    });

    describe("postReassign tests", () => {
        let res = {};
        beforeEach(() => {
            req.flash = sinon.stub();
            res.redirect = sinon.stub();
            res.render = sinon.stub();
            data.reassign = sinon.stub();
            data.reassign.returns(Promise.resolve());
            data.findUserByUsername = sinon.stub();
            data.findUserByUsername.returns(Promise.resolve(req.body.assignee));
        });

        afterEach(() => {
            req.flash = null;
            res.render = null;
            res.redirect = null;
            data.reassign = null;
            data.findUserByUsername = null;
        });

        it("Expect postReassign to exist and be a function.", () => {
            expect(controller.postReassign).to.exist;
            expect(controller.postReassign).to.be.a("function");
        });

        it("Expect postReassign to call data.reassign and data.findUserByUsername methods with correct params once.", (done) => {
            controller.postReassign(req, res)
                .then(() => {
                    expect(data.findUserByUsername.calledOnce).to.be.true;
                    expect(data.findUserByUsername.calledWith(req.body.assignee)).to.be.true;
                    expect(data.reassign.calledOnce).to.be.true;
                    expect(data.reassign.calledWith(req.params.id, req.body.assignee[0])).to.be.true;
                })
                .then(done, done);
        });

        it("Expect postReassign to redirect to correct page with correct params", (done) => {
            controller.postReassign(req, res)
                .then(() => {
                    console.log(req.flash.calledWith("success_msg", "Assignee changed successfully!"));
                    expect(req.flash.calledWith("success_msg", "Assignee changed successfully!")).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });

        it("Expect postReassign to catch error and redirect to task page", (done) => {
            let message = "Invalid assignee!";
            data.findUserByUsername = sinon.stub();
            data.findUserByUsername.returns(Promise.reject(new Error(message)));

            controller.postReassign(req, res)
                .then(() => {
                    expect(req.flash.calledWith("error_msg", message)).to.be.true;
                    expect(res.redirect.calledWith(`/tasks/${req.params.id}`)).to.be.true;
                })
                .then(done, done);
        });
    });
});