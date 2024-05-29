const googleTranslateConfig = {
    lang: "ru",
};

function TranslateInit() {
    let code = TranslateGetCode();
    $('[data-google-lang="' + code + '"]').addClass('language__img_active');

    if (code == googleTranslateConfig.lang) {
        TranslateClearCookie();
    }

    new google.translate.TranslateElement({
        pageLanguage: googleTranslateConfig.lang,
    });

    $('[data-google-lang]').click(function () {
        TranslateSetCookie($(this).attr("data-google-lang"));
        window.location.reload();
    });
}

function TranslateGetCode() {
    let lang = ($.cookie('googtrans') != undefined && $.cookie('googtrans') != "null") ? $.cookie('googtrans') : googleTranslateConfig.lang;
    return lang.substr(-2);
}

function TranslateClearCookie() {
    $.cookie('googtrans', null);
    $.cookie("googtrans", null, {
        domain: "." + document.domain,
    });
}

function TranslateSetCookie(code) {
    $.cookie('googtrans', "/auto/" + code);
    $.cookie("googtrans", "/auto/" + code, {
        domain: "." + document.domain,
    });
}
