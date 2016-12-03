/* globals $*/
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
    },
    onSelect: function (suggestion) {
        // TODO: add user data to form or delete the function entirely
        console.log(suggestion);
    }
});