$(".panel-left").resizable({
    handleSelector: ".splitter",
    resizeHeight: false,
    onDrag: function (e, $el, newWidth, newHeight, opt) {
        // limit box size
        if (newWidth < 20)
            $("#left-content-open-close").prop('checked', true);
        else
            $("#left-content-open-close").prop('checked', false);
        $el.width(newWidth);
        return false;
    }
});


$("#left-content-open-close").click(function () {
    if ($(this).is(':checked')) {
        $(".panel-left").css({"width":80});
    }
    else{
        $(".panel-left").css({ "width":500});
    }
})