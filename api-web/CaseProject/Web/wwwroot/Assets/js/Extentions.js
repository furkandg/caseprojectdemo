isDefined = function (val) {
    try {
        eval("typeof(" + val + ");");
        return true;
    } catch (e) {
        return false;
    }
}
subTypeof = function () {
    let obj = arguments[0];
    try {
        let subs = [];
        for (let i = 1; i < arguments.length; i++) {
            subs.push(arguments[i]);
        }
        return eval("typeof(obj." + subs.join(".") + ");");
    } catch (e) {

        return "undefined";
    }
}
Array.prototype.hasAny = function (arr2) {
    let ret = [];
    for (let i in this) {
        if (arr2.indexOf(this[i]) > -1) {
            return true;
            break;
        }
    }
    return false;
};
function indexOf(array, item) {
    for (let i in array) {
        if (array[i].toString() === item.toString()) return i;
    }
    return -1;
}
simpleTemplateStringRender = function (str, data) {
    for (let i in data) {
        str = str.replace("[" + i.toVaribleLowerCase() + "]", data[i]);
        str = str.replace("[" + i.toVaribleUpperCase() + "]", data[i]);
    }
    return str;
}
displayFieldItemValue = function (value, fieldItem, field) {
    if (!fieldItem) {
        return value;
    }
    if (!field) {
        return value;
    }
    if (fieldsLowerCase) {
        if (field) {
            field = field.toVaribleLowerCase();
        } else {
            console.log(value, fieldItem, field);
        }
    }

    if (value == null || value == undefined) {
        return "";
    }
    if (fieldItem.type == "esriFieldTypeDate") {

        let d = new Date(value).toLocaleString();
        if (d == "Invalid Date") return value;
        return d;

    }
    if (fieldItem.domain) {
        for (let j in fieldItem.domain.codedValues) {
            if (fieldItem.domain.codedValues[j].code == value) {
                value = fieldItem.domain.codedValues[j].name;
                break;
            }
        }
    }


    return value;
}
getFieldItemValue = function (fieldName, attributes, fields) {

    if (fieldsLowerCase) {
        fieldName = fieldName.toVaribleLowerCase();
    }
    if (!fieldItem) {
        // console.log(field, "Tanımsız Field.");
        return value;
    }
    if (value == null || value == undefined) {
        return "";
    }
    if (fieldItem.type == "esriFieldTypeDate") {

        let d = new Date(value).toLocaleString();
        if (d == "Invalid Date") return value;
        return d;

    }
    if (fieldItem.domain) {
        for (let j in fieldItem.domain.codedValues) {
            if (fieldItem.domain.codedValues[j].code == value) {
                value = fieldItem.domain.codedValues[j].name;
                break;
            }
        }
    }


    return value;
}
Date.prototype.toInputValueDate = function () {
    let month = (this.getMonth() + 1);
    let day = this.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return this.getFullYear() + '-' + month + '-' + day;
}

Date.prototype.toInputValueDateTime = function () {
 
    return this.toInputValueDate()+"T" +this.toLocaleTimeString() ;
}
let _isMobileDevice = function () {
    return /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);

}();
let isMobile = function () {
    return _isMobileDevice;
}
String.prototype.toVaribleLowerCase = function () {
    return this.toLowerCase(this.replace(new RegExp('I', 'g'), 'i'));
}
String.prototype.toVaribleUpperCase = function () {
    return this.toUpperCase(this.replace(new RegExp('i', 'g'), 'I'));
}
