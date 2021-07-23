var __scripts_ = document.getElementsByTagName("script");
var _this_src_ = __scripts_[__scripts_.length - 1].src;
var _this_path_uploader = _this_src_.split('/').slice(0, -1).join('/') + '/';
var DocumentModel = function (params) {
    this.Id = params.Id || params.ID || 0;
    this.LineID = params.LineID || params.LINEID || 0;
    this.Shema = params.Shema || params.SCHEMA_NAME || null;
    this.Type = params.Type || params.BELGE_TIPI || "0";
    this.FileName = params.FileName || params.FILE_NAME || null;
    this.FolderName = params.FolderName || params.FOLDER_NAME || null;
    this.Kind = params.Kind || params.BELGE_TURU || null;
    this.Active = params.Active || params.AKTIF || 1;
    this.Order = params.Order || params.SIRA || 1;
    this.Date = params.Date || params.TARIH || null;
    this.Ext = params.Ext || params.UZANTI || null;
    this.Description = params.Description || params.ACIKLAMA || null;
    this.Table = params.Table || params.TABLO || null;
    this.PathName = params.PathName || params.PATH || null;
    this.Thumbnail = params.Thumbnail || null;
    this.Preview = params.Preview || null;
    this.ServerUrl = params.ServerUrl || null;
    //  this.DELETESTATUS = params.DELETESTATUS || 0;
    // this.File = params.file || null;
}
DocumentModel.prototype.ToDbModel = function () {
    return {
        ID: this.Id,
        LINEID: this.LineID,
        SCHEMA_NAME: this.Shema,
        BELGE_TIPI: this.Type,
        FILE_NAME: this.FileName,
        FOLDER_NAME: this.FolderName,
        BELGE_TURU: this.Kind,
        AKTIF: this.Active,
        SIRA: this.Order,
        TARIH: this.Date,
        UZANTI: this.Ext,
        ACIKLAMA: this.Description,
        TABLO: this.Table,
        DELETESTATUS: 0,
        PATH: this.PathName,
        SERVERURL: this.ServerUrl
    };
}
var DocumentTypes = {
    "notype": { type: "0", icon: "", ext: "*" },
    "image": { type: "1", icon: "", ext: "jpg,png,jpeg,gif" },
    "dwg": { type: "2", icon: "cad.png", ext: "dwg" },
    "word": { type: "3", icon: "word.png", ext: "doc,docx" },
    "excel": { type: "4", icon: "excel.png", ext: "xls,xlsx" },
    "pdf": { type: "5", icon: "pdf.png", ext: "pdf" },
    "txt": { type: "6", icon: "txt.png", ext: "txt" },
    getType: function (type) {
        for (var i in this) {
            if (typeof (this[i]) != "function") {
                if (this[i].type == type) { return this[i]; }
            }
        }
    }
}
var ImageExtentions = ["jpg", "jpeg", "png", "jpeg", "gif"];
jQuery.fn.extend({
    UploaderJS: function (params) {
        var preLoader = require("libs/PreLoader");
        var _allowdelete = true;
        if (params.allowdelete != undefined) {
            _allowdelete = params.allowdelete;
        }

        var _allowdownload = true;
        if (params.allowdownload != undefined) {
            _allowdownload = params.allowdownload;
        }

        var _allowadd = true;
        if (params.allowadd != undefined) {
            _allowadd = params.allowadd;
        }

        var _data = params.data || undefined;
        var _label = params.label || "";
        var _linklabel = params.linklabel || "Yeni Dosya";
        var _type = params.type || "single";
        var _inputName = params.inputname || "file";
        var serviceUrl = $_configData._FILE_SERVER;
        var model = new DocumentModel(params.model);
        var _documentType = DocumentTypes.getType(model.Type) || {};

        var container = $(this);
        var _templateContainer = $('<div class="document-container"><div>');
        container.html(_templateContainer);

        var _templateInputDom = $('<div class="document-input"><div>');
        _templateContainer.append(_templateInputDom);


        var _inputButton = $('<button type="button" class="btn-file-add"><i class="zmdi zmdi-plus"></i>' + _linklabel + '</button>');
        var _inputFile = $('<input  type="file" class="document-file"/>');
        if (_type == "multiple") { _inputFile.attr("multiple", true); }
        _inputButton.click(function () {
            _inputFile.click();
        });
        if (_allowadd)
            _templateInputDom.append(_inputButton);

        _templateInputDom.append("<label>" + _label + "</label>");
        var _inputDescription = $('<input  class="document-description">');
        //_templateInputDom.append(_inputDescription);

        //Validations
        var _getFileExt = function (file_name_string) {
            var file_name_array = file_name_string.split(".");
            return file_name_array[file_name_array.length - 1].toLowerCase();

        }

        var _minLength = params.minLength || 0;
        var _maxLength = params.maxLength || undefined;
        var _validationControls = function () {

            var _exts = params.ext || _documentType.ext || "*";
            _exts = _exts.toLowerCase();


            return {
                minLength: function () {
                    if (_minLength > 0) {
                        if (_domManage.getRecordCount() < _minLength) {
                            if (_templateInputDom.find(".min-validation-message").length == 0)
                                _templateInputDom.append($('<div class="min-validation-message validation-message"> En az ' + _minLength + ' dosya giriniz</div>'));
                            return false;
                        }
                    }
                    _templateInputDom.find(".min-validation-message").remove();
                    return true;
                },
                maxLength: function () {
                    if (_maxLength && _type == "multiple") {
                        _fileLength = _inputFile[0].files.length;
                        if ((_domManage.getRecordCount() + _fileLength) > _maxLength) {
                            swal({
                                title: "Yükleme Sınırı.",
                                text: ' En fazla' + _maxLength + ' tane dosya yükleyebilirsiniz.',
                                type: "warning",
                                confirmButtonText: "Kapat",
                                html: true
                            });
                            return false;
                        }
                        //_templateInputDom.find(".max-validation-message").remove();

                    }
                    return true;
                },
                extControl: function () {
                    if (_exts != "*") {
                        _extArray = _exts.split(",");
                        for (var i = 0; i < _inputFile[0].files.length; i++) {
                            var fileItem = _inputFile[0].files[i];
                            var ext = _getFileExt(fileItem.name);

                            if (_extArray.indexOf(ext) == -1) {
                                swal({
                                    title: "Dosya desteklenmiyor.",
                                    text: ' Desteklenen dosya uzantıları ' + _exts,
                                    type: "warning",
                                    confirmButtonText: "Kapat",
                                    html: true
                                });
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        }();

        container.parent("form").submit(function (evt) {
            if (!_validationControls.minLength()) return false;
        });
        var _templateTableContainer = $('<div class="document-table-container"></div>');
        var _templateBody = $('<table class="document-body table table-striped"></table>').appendTo(_templateTableContainer);
        _templateContainer.append(_templateTableContainer);

        var _fileProgress = function (target) {
            var _template = $('<div class="fileProgress" class="progress hidden"><div class="progress-bar progress-bar-striped active" role="progressbar" style="width: 100%">  100%</div></div>');
            // $(target).append(_template);
            return {
                start: function () {
                    _template.removeClass("hidden");
                    _template.find("div.progress-bar").html("%0");
                    _template.find("div.progress-bar").css({
                        width: 0 + '%'
                    });
                },
                stop: function () {
                    _template.addClass("hidden");
                    container.find("#file-name-list").addClass("hidden");
                }
            }

        }(_templateInputDom);
        var _request = function () {
            var _removeAll = function (data, success, error) {
                preLoader.start({ message: "Dosya Siliniyor" });
                $.ajax({
                    url: serviceUrl + "/RemoveAll",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }

                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        if (error)
                            error(x, s, e);

                    }
                });
            }
            var _remove = function (data, success, error) {
                preLoader.start({ message: "Dosya Siliniyor" });
                $.ajax({
                    url: serviceUrl + "/Remove",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        if (error)
                            error(x, s, e);
                    }
                });
            }
            var _setActive = function (data, success, error) {
                preLoader.start({ message: "Dosya Varsayılan yapılıyor" });
                $.ajax({
                    url: serviceUrl + "/SetActive",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        if (error) { error(x); }
                    }
                });

            }
            var _setOrder = function (data, success, error) {
                preLoader.start({ message: "Dosya Sırası düzenleniyor." });
                $.ajax({
                    url: serviceUrl + "/SetOrder",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        if (error) { error(x); }
                    }
                });

            }
            var _getList = function (data, success, error) {
                preLoader.start({ message: "Dosyalar yükleniyor." });
                $.ajax({
                    url: serviceUrl + "/GetList",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        if (error) return error(x);
                    }
                });
            }
            var _get = function (data, success, error) {
                preLoader.start({ message: "Dosya getiriliyor" });
                $.ajax({
                    url: serviceUrl + "/Get",
                    method: "POST",
                    data: data,
                    crossDomain: true,
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            if (success) success(result.Data);
                        } else {
                            if (error) error("Hata");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);

                        if (error) return error(x);
                    }
                });
            }
            var _upload = function (formData, success, error) {
                preLoader.start({ message: "Dosya(lar) Yükleniyor. Lütfen Bekleyiniz." });
                $.ajax({
                    type: "POST",
                    url: serviceUrl + "/Upload",
                    data: formData,
                    dataType: 'json',
                    crossDomain: true,
                    contentType: false,
                    processData: false,
                    xhr: function () {
                        var xhr = $.ajaxSettings.xhr();
                        xhr.upload.addEventListener("progress", function (evt) {
                        }, false);
                        return xhr;
                    },
                    success: function (result) {
                        preLoader.stop();
                        if (result.State == 0) {
                            console.log(JSON.stringify(result.Data));
                            if (success) success(result.Data);
                        } else {

                            if (error) error("Hata");
                            else
                                swal("Tekrar Dene", result.AllMessage, "error");
                        }
                    },
                    error: function (x, s, e) {
                        preLoader.stop();
                        console.info(x, s, e);
                        swal("Tekrar Dene", "Yükleme Başarısız", "error");
                    }
                });
            }
            return {
                removeAll: _removeAll,
                remove: _remove,
                setActive: _setActive,
                setOrder: _setOrder,
                getList: _getList,
                get: _get,
                upload: _upload
            }
        }();
        var _factory = function () {
            var _getFormData = function () {
                let formData = new FormData();
                let totalFiles = _inputFile[0].files.length;
                for (var i = 0; i < totalFiles; i++) {
                    formData.append("Files", _inputFile[0].files[i]);
                }
                if (totalFiles > 0) {
                    for (var i in model) {
                        var item = model[i];
                        if (item)
                            formData.append(i, item);
                    }
                    formData.append("Description", _inputDescription.val() || "");
                }

                return formData;
            }
            return {
                FormData: _getFormData
            }
        }();
        var _domManage = function () {
            var _renameInput = function () {
                _templateBody.find(".document-item .inputs").each(function (i, _inputs) {
                    $(_inputs).find("input").each(function (j, _input) {
                        var _name = $(_input).attr("data-name");
                        $(_input).attr("name", _inputName + "[" + i + "]." + _name);
                    });
                });
            }
            var _getRecordCount = function () {
                return _templateBody.find(".document-item").length;
            }
            var _clearAll = function () {
                _templateBody.find(".document-item").remove();
            }
            var _loadList = function (data) {
                for (var i = 0; i < data.length; i++) {
                    _loadItem(new DocumentModel(data[i]));
                }
            }

            var _imageSlider = function () {
                var _sliderContainer = $('<div class="light-box"></div>');
                // container.append(_sliderContainer);
                var _lightGallery = $(_sliderContainer).lightGallery({
                    // enableTouch: true
                });

                var _addItem = function (imageNode, dataItem) {
                    var _divbase = $('<div data-src="' + dataItem.PathName.replace("~", dataItem.ServerUrl) + '"></div>');
                    // _a.append(imageNode);
                    var _div = $('<div class="lightbox-item"></div>');

                    var _imageDiv = $('<img src="' + dataItem.Thumbnail.replace("~", dataItem.ServerUrl) + '" />');
                    _div.append(_imageDiv);
                    _divbase.append(_div);

                    _sliderContainer.append(_divbase);
                    _lightGallery.destroy();
                    _lightGallery = $(_sliderContainer).lightGallery({
                        //  enableTouch: true
                    });
                    imageNode.click(function () {
                        _imageDiv.click();
                    });

                }
                return {
                    addItem: _addItem
                };
            }();
            var _loadItem = function (dataItem) {
                var _itemNode = $('<tr class="document-item"></tr>');

                //Body
                var _itemIconNode = $('<td class="document-body-item"></td>');

                var _itemExt = _getFileExt(dataItem.Ext);
                if (ImageExtentions.indexOf(_itemExt) != -1) {
                    var _imageNode = $('<img src="' + dataItem.Thumbnail.replace("~", dataItem.ServerUrl) + '?v=' + Date.now() + '" />');
                    _itemIconNode.append(_imageNode);
                    _imageSlider.addItem(_imageNode, dataItem);
                }
                else {
                    var _imageNode = $('<img src="' + _this_path_uploader + "/images/" + _getFileExt(dataItem.Ext) + '.png?v=' + Date.now() + '" />');
                    _itemIconNode.append(_imageNode);
                }
                _itemNode.append(_itemIconNode);

                //Description
                var _itemDescription = $('<td class="document-description-item">' + dataItem.FileName + '<br> ' + (dataItem.Description || "") + '</td>');
                _itemNode.append(_itemDescription);



                //Toolbars
                var _itemToolbar = $('<td class="item-toolbar"></td>');


                var _downloadNode = $('<a href="' + dataItem.PathName.replace("~", dataItem.ServerUrl) + '" download="' + dataItem.FileName + '" class="btn btn-icon-text btn-primary"><i class="zmdi zmdi-download"></i> <span>İndir</span></a>');
                if (_allowdownload) _itemToolbar.append(_downloadNode);


                var _deleteNode = $('<button type="button" class="btn btn-icon-text btn-danger"><i class="zmdi zmdi-delete"></i><span> Sil<span></button>');
                if (_allowdelete) _itemToolbar.append(_deleteNode);
                _deleteNode.click(function () {
                    _request.remove(dataItem, function (data) {
                        _itemNode.remove();
                        _renameInput();
                    });
                });
                //Data inputs
                if (dataItem.LineID == null || dataItem.LineID == 0) {
                    var _itemLength = _getRecordCount();
                    var _itemDataNode = $('<div  class="inputs hidden"></div>');
                    var dbModel = dataItem.ToDbModel();
                    for (var dKey in dbModel) {
                        var dItemValue = dbModel[dKey];
                        var _hiddenInput = $('<input data-name="' + dKey + '" type="hidden">');
                        if (_type == "single") {
                            _hiddenInput.attr("name", _inputName + "." + dKey);
                        } else {
                            _hiddenInput.attr("name", _inputName + "[" + _itemLength + "]." + dKey);
                        }
                        _hiddenInput.val(dItemValue);
                        _itemDataNode.append(_hiddenInput);
                    }
                    _itemToolbar.append(_itemDataNode);
                }
                _itemNode.append(_itemToolbar);

                _templateBody.append(_itemNode);
            }

            return {
                loadList: _loadList,
                getRecordCount: _getRecordCount,
                clearAll: _clearAll
            };

        }();

        var _constructure = function () {
            _inputFile.change(function () {
                if (!_validationControls.maxLength()) return;
                if (!_validationControls.extControl()) return;
                var formData = _factory.FormData();
                if (_type == "single") {
                    if (model.LineID == 0) {
                        _request.upload(formData,
                            function (data) {
                                _domManage.clearAll();
                                _domManage.loadList(data);
                                _validationControls.minLength();

                            });
                    }
                    else {
                        _request.removeAll(model, function () {
                            _domManage.clearAll();
                            _request.upload(formData,
                                 function (data) {
                                     _domManage.loadList(data);
                                     _validationControls.minLength();

                                 });
                        });
                    }

                }
                else {
                    _request.upload(formData,
                    function (data) {
                        _domManage.loadList(data);
                        _validationControls.minLength();

                    });

                }


            });
            if (_data) {
                if (Array.isArray(_data))
                    _domManage.loadList(_data);
                else {
                    _domManage.loadList([_data]);
                }
            } else if (model.LineID != 0 || model.LineID != "0") {
                _request.getList(model, function (data) {
                    _domManage.loadList(data);
                });
            }

        }();

        return {
            instance: this,
            setMinLength: function (l) {
                _minLength = l;
            },
            getLength: function () {
                return _domManage.getRecordCount();
            }
        }
    }
});