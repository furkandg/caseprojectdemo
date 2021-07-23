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
    var _filedata = $('<input type="hidden" name="' + _name + '.data">').appendTo(_container);
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


var LoadAfterAllForms = function () {
    $(document).trigger("modal-load",[]);
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
       return $.ajax({
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
        if ($(form).attr("action")) {
            startLoader();
            return $.ajax({
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
    var _modalLoaderElem = $('<div class="modal fade col-sm-12" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                            '<div class="modal-dialog" role="document">' +
                             '<div class="modal-content">' +
                               '<div class="modal-header-2">' +
                                 ' <button type="button" title="Kapat" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
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

var OpenModal = function (params) {
    $("#myModal").remove(); //her defasında modal'ı siler...
    _modalLoaderElem = $('<div class="modal fade col-sm-12" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
                    '<div class="modal-dialog modal-lg">' +
                     '<div class="modal-content">' +
                       '<div class="modal-header">' +
                         '<button type="button" title="Kapat" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                         '<h4 class="modal-title p-l-15" id="myModalLabel">' + (params.title || "") + '</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                       '</div>' +
                        '<div class="modal-footer">' +
                                '<button type="button" class="btn btn-default" data-dismiss="modal">Kapat</button>' +
                                //'<button type="button" class="btn btn-primary">Kaydet</button>'+
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>');
    _modalLoaderElem.find(".modal-body").html(params.data);
    _modalLoaderElem.modal('show');
    return false;
}

window.LoadModalJS = function () {
    this.modalClass = "modal fade  load-modal-modal  come-from-modal right";
    this.modalDialogClass = "modal-dialog";
    this._modal = $('<div class="'+this.modalClass+'" id="loadModalJS" tabindex="-1" role="dialog" aria-labelledby="loadModalJS"></div>');
    this._modalDialog = $('<div class="modal-dialog" role="document"></div>').appendTo(this._modal);
    this._modalContent = $('<div class="modal-content"></div>').appendTo(this._modalDialog);
    this._modalHeader = $('<div class="modal-header-2"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>').appendTo(this._modalContent);
    //this._modalTitle = $('<h4 class="modal-title" id="myModalLabel"></h4>').appendTo(_modalHeader);
    this._modalBody = $('<div class="modal-body"></div>').appendTo(this._modalContent);
    //'<div class="modal-header-2">' +
    //                     ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    //                    '  <h4 class="modal-title" id="myModalLabel"></h4>' +
    //                   ' </div>'
    //this._modalFooter = $('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div>').appendTo(this._modalContent);

    //this._modalBody.html(params.body || "");
    //this._modalFooter.html(params.footer || "");
    var _self = this;
    this._modal.on('hidden.bs.modal', function () {
        _self.destroy();
    });
}

LoadModalJS.prototype.open = function (params) {
    if($("#loadModalJS").length==0){
      $("body").append(this._modal);
    }
   
    //this._modalTitle.html(params.title || "");
    this._modalDialog.addClass(params.dialogClass || "");
    this._modal.addClass(params.modalClass || "");
    this._modalBody.html(params.body);
    this._modal.modal('show');
   
    LoadAfterAllForms();
    return this;
}

LoadModalJS.prototype.destroy = function () {
    console.log("destroyed");
    this._modalBody.html("<div></div>");
    this._modalDialog.attr("class", this.modalDialogClass);
    this._modal.attr("class", this.modalClass);
    //this._modal.data('bs.modal', null);
    //this._modal.remove();
    //delete this;
}

LoadModalJS.prototype.hide = function () {
    this._modal.modal('hide');
    this.destroy();
}
LoadModalJS.prototype.Success = function () {
    //this.setBodyHtml("Tebrikler İşleminiz Başarılı");
    //alertScreenSuccess("Tebrikler", "İşleminiz Başarılı", 3000);
    $.growl({ title: "", message: "hi" });
    this.hide();
   // 
}
LoadModalJS.prototype.DeleteSuccess = function () {
    
   // this.setBodyHtml("Tebrikler Silme İşleminiz Başarılı");
    //alertScreenSuccess("Tebrikler", "Silme İşleminiz Başarı İle Gerçekleştirildi", 3000);
    $.growl({ title: "", message: "hi" });
    this.hide();
}
LoadModalJS.prototype.setBodyHtml = function (html) {
    this._modalBody.html(html);
}
loadModalModal = new LoadModalJS();
jQuery.fn.extend({
    loadModal: function () {
        var _url = $(this).attr("href");
        var _postCallBack = $(this).attr("data-post-callback");
        var _callBack = $(this).attr("data-callback");
        var _modalType = $(this).attr("data-modal-type")||"load-modal-dialog";
        var _postRefreshElem = $(this).attr("data-post-refresh-elem") || null;
        var _postRefreshHref = $(this).attr("data-post-refresh-href") || null;
        var _postCloseModal = $(this).attr("data-post-close-modal") || null;
        var loadPage = function (callback, errorback) {
            if (typeof (loadModalLoading) != "undefined") {
                loadModalLoading.abort();
            }
            loadModalLoading=$request.GetUrl(_url, function (d) {
                if (typeof (_callback) != undefined) { $eval(_callBack); }
                if (callback) return callback(d);
            }, function (d) {
                if (errorback) return errorback(d);
            });
        }
        var loadData = function (d) {
            //if (_modalLoaderElem != null) {
            //    _modalLoaderElem.modal('hide');
            //}
            var _data = $("<div>" + d + "</div>");
            loadModalModal.open({
                body: _data,
                dialogClass: _modalType
            })
            //_modalLoaderElem = $('<div class="modal fade load-modal-modal  come-from-modal right" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">' +
            //                '<div class="modal-dialog ' + _modalType + '" role="document">' +
            //                 '<div class="modal-content">' +
            //                   '<div class="modal-header-2">' +
            //                     ' <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            //                    '  <h4 class="modal-title" id="myModalLabel"></h4>' +
            //                   ' </div>' +
            //                    '<div class="modal-body"></div>' +                                
            //                  '</div>' +
            //                '</div>' +
            //              '</div>');
            //_modalLoaderElem.find(".modal-body").html(_data);
            //_modalLoaderElem.modal('show');
            //_modalLoaderElem.on('hidden.bs.modal', function () {
            //    setTimeout(function () {
            //        _modalLoaderElem.data('bs.modal', null);
            //        _modalLoaderElem.remove();
            //    }, 1000);
                

            //});
            //setTimeout(function () {
            //    LoadAfterAllForms();
            //}, 500);

            var _form = _data.find("form");
            if (_form.length > 0) {
                _form.submit(function () {
                    $request.FormSubmit(_form, function (d) {
                        loadModalModal.setBodyHtml('<div></div>');
                        if (_postRefreshElem) {
                            $request.GetUrl(_postRefreshHref, function (d) {
                                $(_postRefreshElem).html(d);
                            }, function (e) {
                                console.error(e);
                            });
                        }
                        if (_postCloseModal) {
                            // _modalLoaderElem.modal('hide');
                            //console.log("bura");
                            loadModalModal.hide();
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
    }
});


$(document).on("click", ".load-modal", function () {
    return $(this).loadModal();
    return false;

});

$(document).on("click", ".load-tab", function () {

    var _url = $(this).attr("data-href");
    var _postCallBack = $(this).attr("data-post-callback");
    var _callBack = $(this).attr("data-callback");
    var _target = $($(this).attr("href"));

    var _postRefreshElem = $(this).attr("data-post-refresh-elem") || null;
    var _postRefreshHref = $(this).attr("data-post-refresh-href") || null;

    var loadPage = function (callback, errorback) {
        if (_target.find(".load-data").length > 0) {
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





