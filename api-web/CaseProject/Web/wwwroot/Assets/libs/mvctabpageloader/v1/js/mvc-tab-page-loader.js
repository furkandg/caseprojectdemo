
function $_getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
$.fn.FileInputUploader = function () {
   
    var _container = $(this).parent("div");
    var _btn = $(this);
    var _name = $(this).attr("data-name");
    var _filedata = $('<input type="hidden" name="'+_name+'.data">').appendTo(_container);
    var _fileNameInput = $('<input type="hidden" name="' + _name + '.filename">').appendTo(_container);
    var _typeInput = $('<input type="hidden" name="' + _name + '.type">').appendTo(_container);
    var _sizeInput = $('<input type="hidden" name="' + _name + '.size">').appendTo(_container);
    var _fileNameSpan = $('<span></span>').appendTo(_container);
   
    var $_fileinput = $('<input type="file">'); 
    _btn.click(function () {
        $_fileinput.click();
    });
    $_fileinput.change(function (evt) {
        var file = $_fileinput[0].files[0];
        //console.log(file);
        $_getBase64(file).then(
           function (base64) {
               _fileNameSpan.html(file.name);
               _filedata.val(base64);
               _fileNameInput.val(file.name);
               _sizeInput.val(file.size);
               _typeInput.val(file.type);
           }
    );
    })

}


$.fn.serializeForm = function () {

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
        //debugger;
        //// kabul edilmeyen keyleri atla
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
$eval = function (code) {
    try {
        eval(code);
    } catch (e) {

    }
}
var startLoader = function () {
    if ($('.page-loader')[0]) {
        $('.page-loader').show();
    }
}
var stopLoader = function () {
    if ($('.page-loader')[0]) {

        $('.page-loader').hide();

    }
}

alertScreen = function (text, title) {
    // swal("", val);
    swal({
        title: title || "",
        text: text,
        type: "warning",
        confirmButtonText: "Kapat",
        html: true
    });

}
alertScreenSuccess = function (text, title, timer) {
    swal({
        title: title || "Başarılı",
        text: text,
        type: "success",
        confirmButtonText: "Kapat",
        html: true,
        timer: timer || 10000
    });
}
alertScreenError = function (text, title) {
    swal({
        title: title || "!!Hata",
        text: text,
        type: "error",
        confirmButtonText: "Kapat",
        html: true
    });
}
alertScreenInfo = function (text, title) {
    swal({
        title: title || "",
        text: text,
        confirmButtonText: "Kapat",
        html: true
    });
}
var $request = {
    GetUrl: function (url, callback, errorback) {
        startLoader();
        $.ajax({
            method: "GET",
            url: makeLayoutUrl(url)
        }).done(function (d) {
            stopLoader();
            //if (typeof (_callback) != undefined) { $eval(_callBack); }
            return callback(d);
        }).error(function (request, status, error) {
            stopLoader();
            var _html = request.responseText.replace("<!DOCTYPE html>", "") + "</body></html>";
            var m = request.responseText.match(/<body[^>]*>([^<]*(?:(?!<\/?body)<[^<]*)*)<\/body\s*>/i);
            return callback(m[1] || error);

        });
    },
    FormSubmit: function (form, callback, errorback) {

        if (typeof (form.valid) != "undefined") {
            if (!form.valid()) return false;
        }
        console.log("bura");
        if ($(form).attr("action")) {
            startLoader();
            $.ajax({
                method: "POST",
                url: makeLayoutUrl($(form).attr("action")),
                data: $(form).serializeForm()
            }).done(function (d) {
                stopLoader();
                if (callback) return callback(d);
            });
        }

    }
}
var makeLayoutUrl = function (url) {
    if (url.indexOf("layout=null") > 0) return url;
    if (url.indexOf("?") > 0) return url + "&layout=null";
    else {
        return url + "?layout=null";
    }

}
$(document).on("click", "[data-mvc-url]", function () {
    var _target = $(this).data("target");
    var _title = $(this).data("title");
    var _url = $(this).data("mvc-url");
    var _name = $(this).data("name");
    var _postCallBack = $(this).attr("data-post-callback");
    var _callBack = $(this).attr("data-callback");

    var loadPage = function (callback, errorback) {
        $request.GetUrl(_url, function (d) {
            if (callback) return callback(d);
        }, function (d) {
            if (errorback) return errorback(d);
        });
    }
    var loadData = function (d) {
        $(_target).parents("aside").addClass("toggled");
        $(_target).removeClass("hidden");
        var _data = $('<div class="p-l-5 p-r-5">' + d + '</div>');

        if ($(_target).find("#" + _name).length > 0) {
            var _nav = $("[href='#" + _name + "']").parent("li");
            $(_target).find("#" + _name).html(_data);

        }
        else {
            var _nav = $('<li><a href="#' + _name + '" aria-controls="' + _name + '" role="tab" data-toggle="tab">' + _title + '</a>  <span class="close-tab"> X </span></li>');
            $(_target).find(".tab-nav").prepend(_nav);

            var _content = $('<div role="tabpanel" class="tab-pane active" id="' + _name + '"></div>');
            _content.html(_data);
            $(_target).find(".tab-content").prepend(_content);
        }


        _nav.find("a").click();

        var _form = _data.find("form");
        if (_form.length > 0) {
            _form.submit(function () {
                $request.FormSubmit(_form, function (d) {
                    if (typeof (_postCallBack) != undefined) { $eval(_postCallBack); }
                    loadData(d);
                });
                return false;
            });
        }
    }
    loadPage(function (d) {
        $("aside").not($(_target).parents("aside")).removeClass("full-screen");
        loadData(d);
    });



});
var _modalLoaderElem = null;
$(document).on("click", "[data-img-url]", function () {
    $("#myModal").remove();
    var _modalLoaderElem = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                            '<div class="modal-dialog" role="document">' +
                             '<div class="modal-content">' +
                               '<div class="modal-header-2">' +
                                 ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                '  <h4 class="modal-title" id="myModalLabel"></h4>' +
                               ' </div>' +
                                '<div class="modal-body">' +

                               ' </div>' +
                                //'<div class="modal-footer">' +                              
                                //'</div>' +
                              '</div>' +
                            '</div>' +
                          '</div>');
    _modalLoaderElem.find(".modal-body").html('<img width="100%" src="' + $(this).attr("data-img-url") + '">');
    _modalLoaderElem.modal('show');
    return false;
});
$(document).on("click", ".load-modal", function () {
    $("#myModal").modal('hide');
    $("#myModal").remove();
    $("body").removeClass("modal-open");
    var _url = $(this).attr("href");
    var _postCallBack = $(this).attr("data-post-callback");
    var _callBack = $(this).attr("data-callback");


    var _postRefreshElem = $(this).attr("data-post-refresh-elem") || null;
    var _postRefreshHref = $(this).attr("data-post-refresh-href") || null;
    var _postCloseModal = $(this).attr("data-post-close-modal") || null;

    var loadPage = function (callback, errorback) {

        $request.GetUrl(_url, function (d) {
            if (typeof (_callback) != undefined) { $eval(_callBack); }
            if (callback) return callback(d);
        }, function (d) {
            if (errorback) return errorback(d);
        });

    }
    var loadData = function (d) {
        if (_modalLoaderElem != null) {
            _modalLoaderElem.modal('hide')

        }
        var _data = $("<div>" + d + "</div>");
        _modalLoaderElem = $('<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                        '<div class="modal-dialog" role="document">' +
                         '<div class="modal-content">' +
                           '<div class="modal-header-2">' +
                             ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                            '  <h4 class="modal-title" id="myModalLabel"></h4>' +
                           ' </div>' +
                            '<div class="modal-body">' +

                           ' </div>' +
                            //'<div class="modal-footer">' +                              
                            //'</div>' +
                          '</div>' +
                        '</div>' +
                      '</div>');
        _modalLoaderElem.find(".modal-body").html(_data);
        _modalLoaderElem.modal('show');
        setTimeout(function () {
            LoadAfterAllForms();
        }, 500);

        var _form = _data.find("form");
        if (_form.length > 0) {
            _form.submit(function () {

                $request.FormSubmit(_form, function (d) {
                    if (_postRefreshElem) {
                        $request.GetUrl(_postRefreshHref, function (d) {
                            $(_postRefreshElem).html(d);
                        }, function (e) {
                            console.error(e);
                        });
                    }
                    if (_postCloseModal) {
                        _modalLoaderElem.modal('hide');
                        return;
                    }
                    if (typeof (_postCallBack) != undefined) { $eval(_postCallBack); }
                    loadData(d);
                });
                return false;
            });
        }
    }
    loadPage(function (d) {
        loadData(d);
    });
    return false;
});

$(document).on("click", ".load-tab", function () {

    var _url = $(this).attr("data-href");
    var _postCallBack = $(this).attr("data-post-callback");
    var _callBack = $(this).attr("data-callback");
    var _target = $($(this).attr("href"));

    var _postRefreshElem = $(this).attr("data-post-refresh-elem") || null;
    var _postRefreshHref = $(this).attr("data-post-refresh-href") || null;
    var _reload = $(this).attr("data-reload") || false;
    var loadPage = function (callback, errorback) {
        if (_target.find(".load-data").length > 0 && _reload == false) {
            return false;
        }
        $request.GetUrl(_url, function (d) {
            if (typeof (_callback) != undefined) { $eval(_callBack); }
            if (callback) return callback(d);
        }, function (d) {
            if (errorback) return errorback(d);
        });

    }
    var loadData = function (d) {
        var _data = $('<div class="load-data">' + d + '</div>');
        _target.html(_data);
        setTimeout(function () {
            LoadAfterAllForms();
        }, 500);

        var _form = _data.find("form");
        if (_form.length > 0) {
            _form.submit(function () {
                $request.FormSubmit(_form, function (d) {
                    loadData(d);
                    if (typeof (_postCallBack) != undefined) { $eval(_postCallBack); }
                });
                return false;
            });
        }
    }
    loadPage(function (d) {
        loadData(d);
    });
    return false;
});

$(document).on("click", ".close-tab", function () {
    var tabLi = $(this).parent("li");
    if (tabLi.length > 0) {
        var target = tabLi.find("a").attr("href");
        tabLi.remove();
        $(target + ".tab-pane").remove();
    }
});


