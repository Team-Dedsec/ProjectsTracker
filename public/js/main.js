/* globals $*/
/* eslint-disable no-underscore-dangle*/
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */

$(function() {
    $(".ajax-user").autocomplete({
        serviceUrl: "/user",
        dataType: "json",
        paramName: "username",
        preventBadQueries: false,
        minChars: 2,
        showNoSuggestionNotice: true,
        noSuggestionNotice: "User not found! Try again.",
        transformResult: function(response) {
            var users = $.map(response, function(user) {
                return { value: user.username, data: user._id };
            });
            return { suggestions: users };
        }
    });
});