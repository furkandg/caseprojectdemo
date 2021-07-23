var ExcelUpload = function (params, callback) {

    var ExcelRead = function (data) {
        var workbook = XLSX.read(data, {
            type: 'binary'
        });
        //Fetch the name of First Sheet.
        var firstSheet = workbook.SheetNames[0];
        //Read all rows from First Sheet into an JSON array.
        var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

        return {
            sheet: firstSheet,
            rows: excelRows,
            workbook: workbook
        }
    }
    //Reference the FileUpload element.
    var fileUpload = params.fileInputDom || document.getElementById("fileUpload");
    //Validate whether File is valid Excel file.
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    callback(ExcelRead(e.target.result));
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    callback(ExcelRead(data));
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Lütfen Uyumlu Excel Tablosu Yükleyiniz.");
    }
};
var ExcelLoader = function (params) {
    var model = params.model || {};
    var container = $(params.container) || $(".excel-uploader");
    var fileInputDom = container.find("input[type='file']");
    var saveBtn = container.find(".excel-save-btn");
    var tableLoadDivDom = container.find(".excel-table-load-div");
    var loadedData = [];
    var LoadTable = function () {
        var table = document.createElement("table");
        table.setAttribute("class", params.tableClass || "table");
        // table.border = "1";
        //Add the header row.
        var row = table.insertRow(-1);
        //Add the header cells.
        for (var i = 0; i < model.length; i++) {
            var modelItem = model[i];
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = modelItem.label;
            row.appendChild(headerCell);

        }
        //Add the data rows from Excel file.
        for (var i = 0; i < loadedData.length; i++) {
            var row = table.insertRow(-1);
            for (var j = 0; j < model.length; j++) {
                var modelItem = model[j];
                var cell = row.insertCell(-1);
                cell.innerHTML = loadedData[i][modelItem.fieldname];
            }
        }
        var dvExcel = tableLoadDivDom[0];
        dvExcel.innerHTML = "";
        dvExcel.appendChild(table);

    }
    var LoadData = function () {
        loadedData = [];
        ExcelUpload({ fileInputDom: fileInputDom[0] }, function (results) {
            if (results.rows) {
                var firstRow = results.rows[0];
                var state = true;
                for (var i = 0; i < model.length; i++) {
                    var modelItem = model[i];
                    if (typeof (firstRow[modelItem.fieldname]) == "undefined") {
                        state = false;
                    }
                }
                if (!state) {
                    alert("Hatalı Excel");
                }
                else {
                    loadedData = results.rows;
                    LoadTable();
                }
            } else {
                alert("Yüklenecek Veri Bulunamadı.");
            }


        })
    }

    fileInputDom.change(function () {
        LoadData();
    });
    saveBtn.click(function () {

        var responseData = [];
        for (var i = 0; i < loadedData.length; i++) {
            var modelDataItem = {};
            for (var j = 0; j < model.length; j++) {
                var modelItem = model[j];
                modelDataItem[(modelItem.modelfieldname || modelItem.fieldname)] = loadedData[i][modelItem.fieldname];
            }
            responseData.push(modelDataItem);
        }

        if (params.saveAjax) {
            params.saveAjax["data"] = { pData: responseData };
            $.ajax(params.saveAjax);
        }
        else if (params.loadCallBack)
            params.loadCallBack(responseData);
        else console.log(responseData);
    });

}