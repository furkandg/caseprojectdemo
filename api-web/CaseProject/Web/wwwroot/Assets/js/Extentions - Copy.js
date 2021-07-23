isDefined = function (val) {
    try {
        eval("typeof(" + val + ");");
        return true;
    } catch (e) {
        return false;
    }
}
subTypeof = function () {
    var obj = arguments[0];
    try {
        var subs = [];
        for (var i = 1; i < arguments.length; i++) {
            subs.push(arguments[i]);
        }
        return eval("typeof(obj." + subs.join(".") + ");");
    } catch (e) {

        return "undefined";
    }
}
Array.prototype.hasAny = function (arr2) {
    var ret = [];
    for (var i in this) {
        if (arr2.indexOf(this[i]) > -1) {
            return true;
            break;
        }
    }
    return false;
};
function indexOf(array, item) {
    for (var i in array) {
        if (array[i].toString() === item.toString()) return i;
    }
    return -1;
}
simpleTemplateStringRender = function (str, data) {
    for (var i in data) {
        str = str.replace("[" + i.toVaribleLowerCase() + "]", data[i]);
        str = str.replace("[" + i.toVaribleUpperCase() + "]", data[i]);
    }
    return str;
}
displayFieldItemValue = function (value, fieldItem, field) {
    if (fieldsLowerCase) {
        field = field.toVaribleLowerCase();
    }
    if (!fieldItem) {
        // console.log(field, "Tanımsız Field.");
        return value;
    }
    if (value == null || value == undefined) {
        return "";
    }
    if (fieldItem.type == "esriFieldTypeDate") {
        return new Date(value).toLocaleString();
    }
    if (fieldItem.domain) {
        for (var j in fieldItem.domain.codedValues) {
            if (fieldItem.domain.codedValues[j].code == value) {
                value = fieldItem.domain.codedValues[j].name;
                break;
            }
        }
    }


    return value;
}
Date.prototype.toInputValueDate = function () {
    var month = (this.getMonth() + 1);
    var day = this.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return this.getFullYear() + '-' + month + '-' + day;
}
var isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
}
String.prototype.toVaribleLowerCase = function () {
    return this.toLowerCase(this.replace(new RegExp('I', 'g'), 'i'));
}

String.prototype.toVaribleUpperCase = function () {
    return this.toUpperCase(this.replace(new RegExp('i', 'g'), 'I'));
}
