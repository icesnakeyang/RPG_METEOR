Template.settingsPageTpl.helpers({
    currLanguage:function () {
        var lan=TAPi18n.getLanguage();
        if(lan==='en'){
            return 'English';
        }
        if(lan==='zh'){
            return '简体中文';
        }
    }
});

Template.settingsPageTpl.events({
    'click #linkChinese':function (e, tpl) {
        e.preventDefault();

        TAPi18n.setLanguage('zh');
    },

    'click #linkEnglish':function (e, tpl) {
        e.preventDefault();

        TAPi18n.setLanguage('en');
    }
});