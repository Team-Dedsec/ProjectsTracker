/* globals $ jQuery*/
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
$(function () {
    var taskOptions = {
        rules: {
            assignee: "required",
            description: {
                required: true,
                rangelength: [1, 500]
            },
            title: {
                required: true,
                rangelength: [3, 50]
            }
        },
        messages: {
            assignee: "Please select an asignee.",
            lastname: "Please enter your lastname",
            description: {
                required: "Please provide a description",
                rangelength: "Description should be less than 500 characters long"
            },
            title: {
                required: "Please provide a title for the task",
                rangelength: "Task name should be between 3 and 50 characters long"
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    };
    jQuery.validator.addMethod("username", function(value) {
        return (/^[A-Za-z0-9_. ]+$/).test(value);
    });

    jQuery.validator.addMethod("password", function(value) {
        return (/^[A-Za-z0-9_.!@#$%^&*(){}:"<>?~|]+$/).test(value);
    });

    $("form[name='createProject']").validate({
        rules: {
            name: {
                required: true,
                rangelength: [2, 120]
            },
            description: {
                required: true,
                rangelength: [10, 10000]
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });

    $("form[name='createTask']").validate(taskOptions);
    $("form[name='editTask']").validate(taskOptions);

    $("form[name='registerForm']").validate({
        rules: {
            firstName: "required",
            lastName: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 6,
                password: true
            },
            username: {
                required: true,
                username: true
            },
            confirm: { equalTo: "#tb-password" }
        },
        messages: {
            firstname: "Please enter your firstname",
            lastname: "Please enter your lastname",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 6 characters long",
                password: "Your password can only contain alphabetical characters, numerics and the characters _.!@#$%^&*(){}:\"<>?~|]!"
            },
            email: "Please enter a valid email address",
            username: {
                required: "Please enter your username",
                username: "Your username can only contain alphabetical characters, numerics and _"
            },
            confirm: { equalTo: "Passwords don't match" }
        },
        submitHandler: function (form) {
            form.submit();
        }
    });
});
