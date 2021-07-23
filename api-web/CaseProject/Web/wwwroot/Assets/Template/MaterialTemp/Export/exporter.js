function HtmlToExcel(elem) {

    if ($("head style[id=export]").length == 0)
        $("head link").each(function (i, e) {
            var url = $(this).attr("href");
            if ($("head style[id=export]").length == 0)
                $("head").append('<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">').append("<style id='export'></style>");
            $("head style[id=export]").html("");
            $.ajax({
                url: url,
                async: false,
                success: function (data) {
                    $("head style[id=export]").append(data)
                }
            });
        });
    var exportElem = $($(elem)[0].outerHTML);
    exportElem.find("[data-order-field]").remove();
    $.each(exportElem.find("tr"), function () {
        $.each($(this).find(".fiyat"), function () {
            var v = $(this).text();
            v = v.replace(/\./g, '');
            v = v.replace('₺', '');
            v = v.replace(',', '.');
            $(this).html(v);
        });
        $.each($(this).find(".excel-toplanabilir"), function () {
            var v = $(this).text();
            v = v.replace(',', '.');
            $(this).html(v);
        });
        $.each($(this).find(".export-hidden"), function () {
            $(this).html("");
        });
    });

    var t = exportElem.find("table");
    if (t.length == 0) t = exportElem;
    t.table2excel({
        // exclude CSS class
        exclude: ".noExl",
        filename: "icmal"
    });
    //window.open('data:application/vnd.ms-excel,' + encodeURIComponent(exportElem.html()));
}
//$(".export").on("click", function () {
//    debugger;
//    var command = $(this).attr("data-command");
//    var target = $(this).attr("data-target");
//    if (target)
//        switch (command) {
//            case "export-excel":
//                HtmlToExcel($(target));
//                break;
//            default:
//                break;
//        }
//});
var exporter = function (command, target) {

    switch (command) {
        case "export-excel":
            HtmlToExcel(target);
            break;
        default:
            break;
    }
    return false;
}
var exportexcel = function (target) {
    exporter("export-excel", $(target));
    return false;
}