var ImageLoader = function (elem, params) {
    var cloneObject = function (arr) {
        if (arr != null) {
            return JSON.parse(JSON.stringify(arr));
        }
        else return arr;
    }
    String.prototype.replaceAllImageLoader = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    if (!params.image) {
        params.image = {
            width: "100px",
            height: "50px"
        }
    }
    if (!params.properties) params.properties = [];
    if (!params.fileName) params.fileName = "file";
    var imageContainer = $(elem);
    var addButton = $('<div><input type="file" style="display:none;"><a href="#" class="btn btn-default btn-icon-text"> <i class="zmdi zmdi-upload zmdi-hc-fw"></i> Yeni Resim</a></div>');

    var _input = $(addButton).find("input");
    _input.change(function (evt) {
        var files = evt.target.files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var fr = new FileReader();
            addButton.hide();
            fr.onload = function () {
                addButton.show();
                var fData = fr.result;

                var props = cloneObject(params.properties);
                var propIndex = findFieldIndex(props, params.fileName);
                props[propIndex]["value"] = fData;

                addItem(props);
            };
            fr.readAsDataURL(file);
        }
    });

    var findFieldIndex = function (arr, fname) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].name == fname) {
                return i;
            }
        }
    }
    var fileList = $('<div class="file-list"></div>');
    var fileListOrder = function () {
        $.each(fileList.find(".file-list-item"), function (i, d) {
            var _order = $(d).attr("data-order");
            var mustChangeList = $(d).find("[name]");
            $.each(mustChangeList, function (j, elem) {
                var n = $(elem).attr("name");
                n = n.replace(_order, i);
                $(elem).attr("name", n);
            });
            $(d).attr("data-order", i);
        });
    }
    var addItem = function (fData) {
        var propIndex = findFieldIndex(fData, params.fileName);
        var listLength = fileList.find(".file-list-item").length;
        var fileListItem = $('<div class="file-list-item" data-order="' + listLength + '"></div>');
        for (var i = 0; i < fData.length; i++) {
            var formGroup = $("<div class='form-group'></div>");

            var itemProperties = fData[i];
            if (itemProperties.name == params.fileName) {
                formGroup.append('<img src="' + fData[propIndex].value + '" width="' + params.image.width + '" height="' + params.image.height + '" />');
                fileListItem.append('<input  type="hidden" name="' + params.namePrefix + '[' + listLength + '].' + itemProperties.name + '" value="' + itemProperties.value + '"/>');
            } else {

                if (itemProperties.type == "checkbox") {
                    if (itemProperties.label) {
                        formGroup.append('<label for="id-' + i + '"  class="ts-label" >' + itemProperties.label + '</label><br />');
                    }

                    var cP = $('<input  type="' + itemProperties.type + '" name="' + params.namePrefix + '[' + listLength + '].' + itemProperties.name + '" value="true" id="id-'+i+'" />');

                    var inP = $('<div class="toggle-switch" data-ts-color="blue"> <label for="id-' + i + '" style="margin-top:15px;" class="ts-helper"></label></div>');

                    inP.prepend(cP);

                    formGroup.append(inP);

                    if (itemProperties.value == true || itemProperties.value == "true") {
                        cP.attr("checked", "true");
                    }

                }
                else {
                    formGroup.addClass("fg-line");
                    if (itemProperties.label) {
                        formGroup.append("<label>" + itemProperties.label + "</label>");
                    }
                    var inP = $('<input  type="' + itemProperties.type + '" name="' + params.namePrefix + '[' + listLength + '].' + itemProperties.name + '" value="' + (itemProperties.value || "") + '" class="form-control input-sm text-box single-line" />');
                    formGroup.append(inP);
                }
            }

            fileListItem.append(formGroup);
        }
        var deleteButton = $('<button class="btn btn-default btn-icon file-item-sil" type="button"><i class="zmdi zmdi-close"></i></button>');
        fileListItem.append(deleteButton);

        deleteButton.click(function () {
            fileListItem.remove();
            fileListOrder();

        });

        fileList.append(fileListItem);
    }
    addButton.find("a").click(function () {

        _input.click();


    });
    imageContainer.append(addButton);
    imageContainer.append(fileList);
    if (params.data) {
        for (var i = 0; i < params.data.length; i++) {
            var instance = cloneObject(params.properties);
            for (var j = 0; j < instance.length; j++) {
                var _name = instance[j].name;
                var _value = params.data[i][_name] || "";
                instance[j]["value"] = _value;
            }
            addItem(instance);
        }
    }
}