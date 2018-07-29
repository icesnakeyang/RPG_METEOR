getUserLanguage = function () {
    return 'en';
};

if (Meteor.isClient) {
    Meteor.startup(function () {
        Session.set('showLoadingIndicator', true);

        TAPi18n.setLanguage(getUserLanguage())
            .done(function () {
                Session.set('showLoadingIndicator', false);
            })
            .fail(function (error_message) {
                console.log(error_message);
            });
    })
}


//
// Deps.autorun(function () {
//
//     if (started && Meteor.userId())
//         console.log('I logged out!');
//
//     started = true;
// });