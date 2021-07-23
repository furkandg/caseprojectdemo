String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
var RenderTemplate = function (tString, data) {
    if (data) {
        $.each(data, function (indis, veri) {
            if (veri != null) {
                if (typeof (veri) == "object") {
                    $.each(veri, function (indis2, veri2) {
                        if (veri2 != null) {
                            tString = tString.replaceAll('{{' + indis + "." + indis2 + '}}', veri2);
                        }
                    });
                }

                tString = tString.replaceAll('{{' + indis + '}}', veri);
            }
        });
    }
    tString = tString.replaceAll('{{(.*)}}', "");
    return tString;
}

$.fn.serializeDiv = function () {
    var json = {};
    $.each($(this).find("[name]"), function (i, d) {
        var name = $(d).attr("name");
        var value = $(d).val();
        json[name] = value;
    });
    return json;
}
$.fn.serializeFormAtable = function () {

    var self = this,
        json = {},
        push_counters = {},
        patterns = {
            "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
            "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
            "push": /^$/,
            "fixed": /^\d+$/,
            "named": /^[a-zA-Z0-9_]+$/
        };


    this.build = function (base, key, value) {
        base[key] = value;
        return base;
    };

    this.push_counter = function (key) {
        if (push_counters[key] === undefined) {
            push_counters[key] = 0;
        }
        return push_counters[key]++;
    };

    $.each($(this).serializeArray(), function () {

        // kabul edilmeyen keyleri atla
        //if (!patterns.validate.test(this.name)) {
        //    return;
        //}

        var k,
            keys = this.name.match(patterns.key),
            merge = this.value,
            reverse_key = this.name;

        while ((k = keys.pop()) !== undefined) {

            // Ayarla reverse_key (Geri Dönüş anahtarı)
            reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

            // push
            if (k.match(patterns.push)) {
                merge = self.build([], self.push_counter(reverse_key), merge);
            }

                // karisiksa
            else if (k.match(patterns.fixed)) {
                merge = self.build([], k, merge);
            }

                // isimlendirme
            else if (k.match(patterns.named)) {
                merge = self.build({}, k, merge);
            }
        }

        json = $.extend(true, json, merge);
    });

    return json;
}
$.fn.extend({
    Stable: function (params) {
        var _this = this;


        $(_this).css("position", "relative");
        var _table = $(this).find("table");

        $(this).find(".export-excel").click(function () {
            exportexcel(_table);

        });
        if (_table.length == 0) {
            console.info("Hata : Tablo bulunamadı.");
            return;
        }
        _table.css("position", "relative");
        var startLoading = function () {
            $(_table).append('<caption class="a-loading">' +
                '<div  class="pls-blue a-preloader"> <svg class="a-pl-circular" viewBox="25 25 50 50"> <circle class="plc-path" cx="50" cy="50" r="20" /></svg><p>Yükleniyor...</p></div>' +
                '</caption>');
        }
        var stopLoading = function () {
            $(_this).find(".a-loading").remove();
        }
        $(this).find("[data-show-count]").click(function () {
            var showCount = $(this).attr("data-show-count");
            if (showCount == "all") {
                showCount = getTotalCount();
            }
            setPageSize(showCount);
            loadTable();
        });
        $(this).find("[data-order-field]").click(function () {
            //data toogle
            if ($(this).attr("data-order-toggle") == "true") {

                $("[data-order-field]").not(this).removeAttr("data-ordered");


                $(this).attr("data-ordered", "true");
                $("th", $(this).parent().parent()).removeClass("ordered");
                $(this).parent().addClass("ordered");

                if ($(this).attr("data-order-type") == "ASC") {
                    $(this).attr("data-order-type", "DESC");
                }
                else {
                    $(this).attr("data-order-type", "ASC")
                }
                setTimeout(function () {
                    loadTable();
                }, 50);

                return false;
            }

            if ($(this).attr("data-ordered") == "true") { return false; }

            $("[data-order-field]").not(this).removeAttr("data-ordered");

            $(this).attr("data-ordered", "true");
            $("th", $(this).parent().parent()).removeClass("ordered");
            $(this).parent().addClass("ordered");

            loadTable();
            return false;
        });

        var _tablePaging = $(this).find(".a-table-paging");
        if (_tablePaging.length == 0) {
            var _tablePagingDiv = $('<div class="row"><div class="col-md-12"><div class="a-table-paging pull-right"></div></div></div>');
            _tablePaging = _tablePagingDiv.find(".a-table-paging");
            _table.after(_tablePagingDiv);
        }



        var _method = _table.data("method").toString().toLowerCase();

        var _url = _table.data("url");
        var _form = $(this).find("form");



        if (_form.length != 0) {
            for (var i = 0; i < _form.length; i++) {
                $(_form[i]).submit(function () {
                    $(_form).not(this).removeAttr("data-submit");
                    $(this).attr("data-submit", "true");
                    setStartIndex(0);
                    loadTable();
                    return false;
                });
            }

        }


        var getStartIndex = function () {
            return _table.data("startindex");
        }
        var setStartIndex = function (i) {
            _table.data("startindex", i);
        }
        var getPageSize = function () {
            return _table.data("pagesize");
        }
        var setPageSize = function (i) {
            _table.data("pagesize", i);
        }

        var getTotalCount = function () {
            var ret = _this.find("#totalCountResponse").val() || 0;

            return ret;

        }
        var getFilterQuery = function () {
            var retString = [];
            for (var i = 0; i < _form.length; i++) {
                if ($(_form[i]).attr("data-submit") == "true" && $(_form[i]).attr("data-query") != null) {
                    var fname = $(_form[i]).attr("name") || i;
                    var tString = $(_form[i]).data("query");
                    var formData = $(_form[i]).serializeFormAtable();

                    $.each(formData, function (indis, veri) {
                        tString = tString.replaceAll('{{' + indis + '}}', veri);
                    });
                    tString = tString.replaceAll('{{(.*)}}', "''");
                    retString.push({
                        FormName: fname,
                        Query: tString
                    });
                }
            }
            return retString;
        }
        var getFilters = function () {
            var filters = [];
            if (params) {
                if (params.DefaultFiltersCallback) {
                    var defaultFilters = params.DefaultFiltersCallback();
                    for (var i = 0; i < defaultFilters.length; i++) {
                        filters.push(defaultFilters[i]);
                    }
                }
            }
            for (var i = 0; i < _form.length; i++) {
                if ($(_form[i]).attr("data-submit") == "true") {
                    var fname = $(_form[i]).attr("name") || i;
                    var datas = $(_form[i]).serializeFormAtable();

                    $.each(datas, function (j, item) {
                        if (typeof (item) != "object") {
                            filters.push({
                                Key: j,
                                Value: item,
                                FormName: fname
                            });
                        }
                        else {
                            $.each(item, function (k, itemalt) {
                                if (typeof (itemalt) != "object") {
                                    filters.push({
                                        Key: j + "." + k,
                                        Value: itemalt,
                                        FormName: fname
                                    });
                                }
                            });

                        }


                    });
                }
            }
            return filters;

        }
        var clearTable = function () {
            _table.find("tbody").html("");
        }



        var getOrderBy = function () {
            var retOrder = _table.data("order") || "";
            var _ordered = _this.find("[data-ordered='true']");
            $("[data-ordered='true']").parent().addClass("ordered");
            if (_ordered.length > 0) {
                var first = _ordered.first();
                var type = first.attr("data-order-type");
                var field = first.attr("data-order-field");
                retOrder = field + " " + type;
            }
            return retOrder;
        }

        var _query = function (isFirst, callback, errorback) {
            console.log(isFirst)
            var aRequest = {
                ordering: getOrderBy(),
                startIndex: getStartIndex(),
                pageSize: getPageSize(),
                searchText: null,
                searchFields: null,
                filterQuery: getFilterQuery(),
                filters: getFilters()
            }
            startLoading();
            $.ajax({
                method: _method || "POST",
                url: _url,
                data: aRequest
            }).done(function (d) {

                return callback(d);
            })
            .fail(function () {
                console.log("Hata");
            })
              .always(function () {
                  stopLoading();
              });

        }

        clearTable();
        var pageLi = function (pSize, currentPage, startIndex, len) {
            var _ret = "";
            for (var i = startIndex; i < len; i++) {
                var pNumber = i + 1;
                var pSIndex = i * pSize;
                var _activeClass = "";
                var _aria_selected = "false";
                if (currentPage == i) {
                    _activeClass = "active";
                    _aria_selected = "true";
                }
                _ret += '<li class="page-' + pNumber + ' ' + _activeClass + '" aria-disabled="false" aria-selected="' + _aria_selected + '"><a href="#" data-start-index="' + pSIndex + '" class="button">' + pNumber + '</a></li>';
            }
            return _ret;
        }

        var paging = function (totalCount) {
            _tablePaging.html("");

            var pSize = getPageSize();
            var sIndex = getStartIndex();

            var pageCount = Math.ceil(totalCount / pSize);
            var currentPage = Math.ceil(sIndex / pSize);
            if (totalCount > 0) {
                var _pagingHtml = '<ul class="pagination">';
                _pagingHtml = _pagingHtml + '<li class="p-15 f-12">' + totalCount + ' adet kayıttan ' + (sIndex + 1) + ' ile ' + (sIndex + pSize) + ' arası kayıtlar listeleniyor</li>';
                _pagingHtml = _pagingHtml + '<li class="go-page"><input type="number" width="4" min="1"  max="' + pageCount + '" value="' + (currentPage + 1) + '"> <button href="#"  class="btn btn-small ">Sayfaya Git</a></li>';
                if (currentPage > 0) {
                    _pagingHtml += '<li class="page-' + (currentPage - 1) + '" aria-disabled="false" ><a href="#" data-start-index="' + ((currentPage - 1) * pSize) + '" class="button">Geri</a></li>';

                }



                if (pageCount > 4) {
                    var startPage = currentPage;

                    if (currentPage >= pageCount - 4) {
                        startPage = pageCount - 4;
                    }
                    _pagingHtml += pageLi(pSize, currentPage, startPage, startPage + 2);
                    if (currentPage <= pageCount - 4) {
                        _pagingHtml += '<li><a href="#"  class="button">...</a></li>';
                    }
                    _pagingHtml += pageLi(pSize, currentPage, pageCount - 2, pageCount);


                }
                else {

                    _pagingHtml += pageLi(pSize, currentPage, 0, pageCount);
                    //for (var i = 0; i < pageCount; i++) {
                    //    var pNumber = i + 1;
                    //    var pSIndex = i * pSize;
                    //    var _activeClass = "";
                    //    var _aria_selected = "false";
                    //    if (currentPage == i) {
                    //        _activeClass = "active";
                    //        _aria_selected = "true";
                    //    }
                    //    _pagingHtml += '<li class="page-' + pNumber + ' ' + _activeClass + '" aria-disabled="false" aria-selected="' + _aria_selected + '"><a href="#" data-start-index="' + pSIndex + '" class="button">' + pNumber + '</a></li>';
                    //}
                }
                if (currentPage < pageCount - 1) {
                    _pagingHtml += '<li class="page-' + (currentPage + 1) + '" aria-disabled="false" ><a href="#" data-start-index="' + ((currentPage + 1) * pSize) + '" class="button">İleri</a></li>';

                }
                _pagingHtml += '</ul>';
            }

            if (pageCount != 1) {
                var $_pagingHtml = $(_pagingHtml);
                $_pagingHtml.find(".go-page>.btn").click(function () {
                    var p = $_pagingHtml.find(".go-page input").val();
                    setStartIndex((p - 1) * pSize);
                    loadTable();

                });
                _tablePaging.html($_pagingHtml);
            }

            _tablePaging.find("[data-start-index]").click(function () {
                var sIndex = $(this).data("start-index");
                if (getStartIndex() != sIndex) {

                    setStartIndex(sIndex);
                    loadTable();
                }
                return false;
                //debugger;
            });

        }
        var loadTable = function (isFirst) {
            _query(isFirst, function (d) {
                _table.find("tbody").html(d);
                if (_table.find("tbody tr").length == 0) {
                    var colspan = _table.find("thead tr th").length;
                    if (colspan < 1) {
                        colspan = _table.find("thead tr td").length;
                    }
                    _table.find("tbody").html("<tr><td colspan='" + colspan + "' class='text-center'>Listelenecek Kayıt Bulunamadı.</td><tr>");
                }
                var totalCount = getTotalCount();
                paging(totalCount);
            });
        }
        loadTable(true);
        var RefreshTable = function () {
            loadTable();
        }
        //  debugger;
        return {
            RefreshTable: RefreshTable,
            ClearTable: clearTable
        }

    },
    Atable: function () {
        var _this = this;
        var _table = $(this).find("table");
        if (_table.length == 0) {
            console.info("Hata : Tablo bulunamadı.");
            return;
        }
        $(this).find("[data-order-field]").click(function () {
            //data toogle
            if ($(this).attr("data-order-toggle") == "true") {

                $("[data-order-field]").not(this).removeAttr("data-ordered");


                $(this).attr("data-ordered", "true");
                $("th", $(this).parent().parent()).removeClass("ordered");
                $(this).parent().addClass("ordered");

                if ($(this).attr("data-order-type") == "ASC") {
                    $(this).attr("data-order-type", "DESC");
                }
                else {
                    $(this).attr("data-order-type", "ASC")
                }
                setTimeout(function () {
                    loadTable();
                }, 50);

                return false;
            }

            if ($(this).attr("data-ordered") == "true") { return false; }

            $("[data-order-field]").not(this).removeAttr("data-ordered");

            $(this).attr("data-ordered", "true");
            $("th", $(this).parent().parent()).removeClass("ordered");
            $(this).parent().addClass("ordered");

            loadTable();
            return false;
        });

        var _tablePaging = $(this).find(".a-table-paging");
        if (_tablePaging.length == 0) {
            var _tablePagingDiv = $('<div class="row"><div class="col-md-12"><div class="a-table-paging pull-right"></div></div></div>');
            _tablePaging = _tablePagingDiv.find(".a-table-paging");
            _table.after(_tablePagingDiv);
        }



        var _method = _table.data("method").toString().toLowerCase();

        var _url = _table.data("url");
        var _form = $(this).find("form");



        if (_form.length != 0) {
            for (var i = 0; i < _form.length; i++) {
                $(_form[i]).submit(function () {
                    $(_form).not(this).removeAttr("data-submit");
                    $(this).attr("data-submit", "true");
                    loadTable();
                    return false;
                });
            }

        }

        var _trTemplateString = _table.find("tbody>tr")[0].outerHTML;

        var getStartIndex = function () {
            return _table.data("startindex");
        }
        var setStartIndex = function (i) {
            _table.data("startindex", i);
        }
        var getPageSize = function () {
            return _table.data("pagesize");
        }
        var setPageSize = function (i) {
            _table.data("pagesize", i);
        }

        var getFilterQuery = function () {
            var retString = [];
            for (var i = 0; i < _form.length; i++) {
                if ($(_form[i]).attr("data-submit") == "true" && $(_form[i]).attr("data-query") != null) {
                    var fname = $(_form[i]).attr("name") || i;
                    var tString = $(_form[i]).data("query");
                    var formData = $(_form[i]).serializeFormAtable();

                    $.each(formData, function (indis, veri) {
                        tString = tString.replaceAll('{{' + indis + '}}', veri);
                    });
                    tString = tString.replaceAll('{{(.*)}}', "''");
                    retString.push({
                        FormName: fname,
                        Query: tString
                    });
                }
            }
            return retString;
        }
        var getFilters = function () {
            var filters = [];
            for (var i = 0; i < _form.length; i++) {
                if ($(_form[i]).attr("data-submit") == "true") {
                    var fname = $(_form[i]).attr("name") || i;
                    var datas = $(_form[i]).serializeFormAtable();

                    $.each(datas, function (j, item) {
                        if (typeof (item) != "object") {
                            filters.push({
                                Key: j,
                                Value: item,
                                FormName: fname
                            });
                        }
                        else {
                            $.each(item, function (k, itemalt) {
                                if (typeof (itemalt) != "object") {
                                    filters.push({
                                        Key: j + "." + k,
                                        Value: itemalt,
                                        FormName: fname
                                    });
                                }
                            });

                        }


                    });
                }
            }
            return filters;

        }
        var clearTable = function () {
            _table.find("tbody").html("");
        }

        var renderTr = function (data) {
            var tString = $(_trTemplateString)[0].outerHTML;
            $.each(data, function (indis, veri) {
                if (veri != null) {
                    if (typeof (veri) == "object") {
                        $.each(veri, function (indis2, veri2) {
                            if (veri2 != null) {
                                tString = tString.replaceAll('{{' + indis + "." + indis2 + '}}', veri2);
                            }
                        });
                    }

                    tString = tString.replaceAll('{{' + indis + '}}', veri);
                }
            });
            //eval işlemi
            //var evalReg = new RegExp('eval(.*?);', 'g');
            //var evalRegs = tString.match(evalReg);
            //if (evalRegs != null) {
            //    $.each(evalRegs, function (i, item) {
            //        var value = eval(item);
            //        var itemi = "(" + item + ")";
            //        tString = tString.replace(item, value);
            //    });
            //}

            //var sevalReg = new RegExp('jjjj(.*?)jjjj', 'g');
            //var sevalRegs = tString.match(sevalReg);
            //debugger;
            //if (sevalRegs != null) {
            //    $.each(sevalRegs, function (i, item) {
            //        debugger;
            //      //eval(item);
            //        //var itemi = "jjjj" + item + "jjjj";
            //        //tString = tString.replace(item, value);
            //    });
            //}
            //eval işlemi sonu

            tString = tString.replaceAll('{{(.*)}}', "");
            return tString;
        }

        var getOrderBy = function () {
            console.log("hiii");
            var retOrder = _table.data("order") || "";
            var _ordered = _this.find("[data-ordered='true']");
            $("[data-ordered='true']").parent().addClass("ordered");
            if (_ordered.length > 0) {
                var first = _ordered.first();
                var type = first.attr("data-order-type");
                var field = first.attr("data-order-field");
                retOrder = field + " " + type;
            }
            return retOrder;
        }

        var _query = function (callback, errorback) {
            var aRequest = {
                ordering: getOrderBy(),
                startIndex: getStartIndex(),
                pageSize: getPageSize(),
                searchText: null,
                searchFields: null,
                filterQuery: getFilterQuery(),
                filters: getFilters()
            }

            $.ajax({
                method: _method || "POST",
                url: _url,
                data: aRequest
            }).done(function (d) {

                return callback(d);
            }).fail(function () {
                console.log("Hata");
            })
              .always(function () {
                  stopLoading();
              });



        }

        clearTable();

        var paging = function (totalCount) {
            _tablePaging.html("");

            var pSize = getPageSize();
            var sIndex = getStartIndex();

            var pageCount = Math.ceil(totalCount / pSize);
            var currentPage = Math.ceil(sIndex / pSize);

            var _pagingHtml = '<ul class="pagination">';
            for (var i = 0; i < pageCount; i++) {
                var pNumber = i + 1;
                var pSIndex = i * pSize;
                var _activeClass = "";
                var _aria_selected = "false";
                if (currentPage == i) {
                    _activeClass = "active";
                    _aria_selected = "true";
                }
                _pagingHtml += '<li class="page-' + pNumber + ' ' + _activeClass + '" aria-disabled="false" aria-selected="' + _aria_selected + '"><a href="#" data-start-index="' + pSIndex + '" class="button">' + pNumber + '</a></li>';
            }
            //'<ul class="pagination">'+
            //    '<li class="first disabled" aria-disabled="true"><a data-page="first" class="button"><i class="zmdi zmdi-more-horiz"></i></a></li><li class="prev disabled" aria-disabled="true"><a data-page="prev" class="button"><i class="zmdi zmdi-chevron-left"></i></a></li>
            //<li class="page-1 active" aria-disabled="false" aria-selected="true"><a data-page="1" class="button">1</a></li>
            //<li class="page-2" aria-disabled="false" aria-selected="false"><a data-page="2" class="button">2</a></li>
            //<li class="next" aria-disabled="false"><a data-page="next" class="button"><i class="zmdi zmdi-chevron-right"></i></a></li>
            //    <li class="last" aria-disabled="false"><a data-page="last" class="button"><i class="zmdi zmdi-more-horiz"></i></a></li></ul>';
            _pagingHtml += '</ul>';
            if (pageCount != 1) _tablePaging.html(_pagingHtml);

            _tablePaging.find("[data-start-index]").click(function () {
                var sIndex = $(this).data("start-index");
                if (getStartIndex() != sIndex) {

                    setStartIndex(sIndex);
                    loadTable();
                }
                return false;
                //debugger;
            });

        }
        var loadTable = function () {
            _query(function (d) {
                clearTable();
                paging(d.totalCount);
                $.each(d.data, function (index, item) {
                    var _renderedTr = renderTr(item);
                    _table.find("tbody").append(_renderedTr);
                });
                //debugger;
            });
        }
        loadTable();
        var RefreshTable = function () {
            loadTable();
        }
        //  debugger;
        return {
            RefreshTable: RefreshTable,
            ClearTable: clearTable
        }

    }

});
