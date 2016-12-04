/* globals JSON */
"use strict";
let requester = {
    getInstance: function($) {
        return {
            get: function(url) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        method: "GET",
                        success: function(response) {
                            resolve(response);
                        },
                        error: function(err) {
                            reject(err);
                        }
                    });
                });
            },
            putJSON: function(url, body, headers = {}) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        headers: headers,
                        method: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success: function(response) {
                            resolve(response);
                        },
                        error: function(err) {
                            reject(err);
                        }
                    });
                });
            },
            postJSON: function(url, body, headers = {}) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        headers: headers,
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(body),
                        success: function(response) {
                            resolve(response);
                        },
                        error: function(err) {
                            reject(err);
                        }
                    });
                });
            },
            getJSON: function(url, headers = {}) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: url,
                        method: "GET",
                        headers: headers,
                        contentType: "application/json",
                        success: function(response) {
                            resolve(response);
                        },
                        error: function(err) {
                            reject(err);
                        }
                    });
                });
            }
        };
    }
};

if (typeof module !== "undefined") {
    module.exports = requester.getInstance;
}