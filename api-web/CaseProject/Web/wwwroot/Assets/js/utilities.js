

window.ModalJS = function (params) {
    this._modal = $('<div class="modal fade ' + (params.modalClass || "") + '" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>');
    this._modalDialog = $('<div class="modal-dialog" role="document"></div>').appendTo(this._modal);
    this._modalContent = $('<div class="modal-content"></div>').appendTo(this._modalDialog);
    this._modalHeader = $('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="myModalLabel">' + params.title + '</h4></div>').appendTo(this._modalContent);

    this._modalBody = $('<div class="modal-body"></div>').appendTo(this._modalContent);
    this._modalFooter = $('<div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div>').appendTo(this._modalContent);

    this._modalBody.html(params.body || "");
    this._modalFooter.html(params.footer || "");
}

ModalJS.prototype.open = function () {
    this._modal.modal('show');
    var _self = this;
    this._modal.on('hidden.bs.modal', function () {
        _self.destroy();
    });
    return this;
}

ModalJS.prototype.destroy = function () {
    this._modal.data('bs.modal', null);
    this._modal.remove();
    delete this;
}

ModalJS.prototype.close = function () {
    this._modal.modal('hide');
}

ModalJS.prototype.setBodyHtml = function (html) {
    this._modalBody.html(html);
}


$.fn.ResponsiveFileManager = function (params) {

    var homePath = "";
    if (typeof (__configs) != "undefined") {
        homePath = params.home || __configs.UserMekanID;
    } else {
        homePath = params.home || "";
    }

    
    var _container = $(this).parent("div");

    //console.log(_container);
    var thumbStyle = params.thumbStyle || {height:"60px"};
    if (_container.find("p").length == 0) {
        _container.prepend("<p></p>");
    }
    var _btn = $(this);
    var _name = params.name;
    var fieldID = _name + "Path";
    var $_fileinput = $('<input id="' + _name + 'Path" type="hidden" name="' + _name + '.Path" value="'+(params.model.Path||"")+'">').appendTo(_container);
    var $_fileinput2 = $('<input id="' + _name + 'LineID" type="hidden" name="' + _name + '.LineID" value="' + params.model.LineID + '">').appendTo(_container);
    var $_fileinput3 = $('<input id="' + _name + 'BelgeTuru" type="hidden" name="' + _name + '.BelgeTuru" value="' + params.model.BelgeTuru + '">').appendTo(_container);
    var _fileNameSpan = $('<span></span>').appendTo(_container);
    $_fileinput.change(function (evt) {
        console.log("hi");        
    });
    var url = 'https://files.cepgarson.com/filemanager/dialog.php?&type=1&lang=tr_TR&crossdomain=1&field_id='+fieldID+'&popup=1&home=' + homePath;
    var onFileManagerMessage = function (e) {
        var event = e.originalEvent;
        if (event.data.sender === 'responsivefilemanager') {
            if (event.data.field_id) {
                var fieldID = event.data.field_id;
                var url = event.data.url;
                $('#' + fieldID).val(url).trigger('change');
             
               
                mypopup.close();
                $(window).off('message', onFileManagerMessage);
               
                var p = _container.find("p");
                var img = $('<img src="' + url + '"  />');
                img.css(thumbStyle);
                _container.find("p").html(img);
            }
        }
    }
    if (typeof (mypopup) != "undefined")
        mypopup.close();
    window.onunload = function () {
        if (typeof (mypopup) != "undefined")
            mypopup.close();
    }
    
    if (params.hasgaleri) {
       var galeribtn= $(`<button type="button" class="btn  btn-sm btn-primary"><i class="zmdi zmdi-upload zmdi-hc-fw"></i> Galeriden Seç</button>`);
       _container.append(galeribtn);
       galeribtn.click(function () {
           var url2 = 'https://files.cepgarson.com/filemanager/dialog.php?&type=1&lang=tr_TR&crossdomain=1&field_id=' + fieldID + '&popup=1&home=arsiv';
           mypopup = window.open(url2, 'pdwfilebrowser', 'top=150,left=150,screenx=150,width=1000,height=650,scrollbars=no,toolbar=no,location=no');
           $(window).on('message', onFileManagerMessage);
       });
    }

    $(this).click(function () {
        mypopup = window.open(url, 'pdwfilebrowser', 'top=150,left=150,screenx=150,width=1000,height=650,scrollbars=no,toolbar=no,location=no');

        $(window).on('message', onFileManagerMessage);
    });
}
$(document).on("click", ".load-file", function () {
    var $btn = $(this);
    var parent = $(this).parent("div");
    var $input = parent.find("input");
    var $_fileinput = $('<input type="file">');
    $_fileinput.click();
    $_fileinput.change(function (evt) {
        var file = $(this)[0].files[0];
        console.log(file);
        var formData = new FormData();
        var name = $btn.attr("data-filename");
        name = name.replace("-rand", "-" + Date.now());
        formData.append("Name", name);
        formData.append("Path", $btn.attr("data-filepath"));
        formData.append("File", file);
        $.ajax({
            url: '/MekanBelge/Upload/',
            data: formData,
            type: 'POST',
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
            processData: false, // NEEDED, DON'T OMIT THIS
            success: function (response) {
                if (response.State == 0) {
                    $input.val(response.Data.FullPath);
                    $input.trigger("change");
                }
                else {
                    alert(response.ErrorMessage);
                }
            }
        });

    });
});
$(document).on("change", ".load-belge", function () {
    var $_this = $(this);
    // $_this.data()/
    //a=>a.LineID==model.LineID && a.MekanID==model.MekanID && a.DilID==model.DilID && a.Anahtar==model.Anahtar
    var model = {
        LineID: $_this.attr("data-LineID"),
        MekanID: $_this.attr("data-MekanID"),
        DilID: $_this.attr("data-DilID"),
        Anahtar: $_this.attr("data-Anahtar")
    };
    model["OrginalPath"] = $_this.val();
    $.post("/MekanBelge/AddOrUpdate", model, function (response) {
        if (response.State == 0) {
            $_this.parent("div").find("img").attr("src", response.Data.OrginalPath)
        }
        else {
            alert(response.ErrorMessage)
        }
    })

    console.log(model);
});

var loadHasLangs = function () {

    var langs = $(".has-lang");
    langs.each(function () {

        var lineID = $(this).attr("data-id");
        var input = $(this).find("*[name]");
        var inputDiv = input.parent("div");
        inputDiv.removeClass("col-md-10");
        inputDiv.addClass("col-md-8");
        inputDiv.append('<div class="dil-list"></div>');
        var model = $(this).attr("data-model");
        var fieldName = $(this).attr("data-field-name");
        if (fieldName != "" && fieldName) {
            var anahtar = fieldName;
        }
        else {
            var anahtar = input.attr("name");
        }

        var tablename = model;
        $(this).append(` <div class="col-md-2">
                        <button class="dil-content-btn btn btn-sm btn-warning" type="button" data-LineID="${lineID}" data-Anahtar="${anahtar}" data-TableName="${tablename}" data-type="Input">Dil Seçenekleri + </button>
                    </div>`);
        //console.log(anahtar,input[0])
    });
}

$(document).on("modal-load", function () {
    loadHasLangs();
})
$(document).ready(function (d) {
    loadHasLangs();
})
$(document).on("click", ".dil-content-btn", function () {
    console.log("girdim");
    var parent = $(this).parents(".form-group");
    var _this = $(this);
    parent.find(".dil-list").html("");
    var addInput = function (item) {

        var input = $(`<div class="p-t-15 p-b-15 form-group" style="border-bottom:1px solid blue;">
                            <div class ="col-md-12">${item.DilAd}</div>
                            <div class ="col-md-12"><input type="text" class ="input-icerik form-control" value="${item.Icerik || ""}"></div>
                        </div>`);
        parent.find(".dil-list").append(input);
        input.find(".input-icerik").change(function () {
            $.post("/DilIcerikRelApi/Add", {
                TableName: item.TableName,
                LineID: item.LineID,
                Icerik: $(this).val(),
                DilID: item.DilID,
                Anahtar: item.Anahtar
            }, function (response) {
                console.log(response);

            });
        });
    }
    $.post("/DilIcerikRelApi/GetMekanDilIcerikList", {
        LineID: _this.attr("data-LineID"),
        Anahtar: _this.attr("data-Anahtar"),
        TableName: _this.attr("data-TableName")
    }, function (response) {
        console.log(response);
        if (response.State == 0) {
            if (response.Data == null) {
                alert("Mekan Dil Bulunamadı.");
                return;
            }
            for (var i = 0; i < response.Data.length; i++) {
                addInput(response.Data[i]);
            }
        }
        else {
            alert(response.ErrorMessage)
        }
        //console.log(response);
    })
});