/*
  var FormUtilities = {};
  FormUtilities.FormGroup = function (params) {
      this.dom = $('<div class="form-group"></div>');
      this.label = $('<label class="control-label col-md-2">' + params + '</label>').appendTo(this.dom);
      this.inputContainer = $(' <div class="col-md-10"></div>').appendTo(this.dom);
      this.input = params.input;
  }
  FormUtilities.FormGroup.prototype.getHtml = function () {
      return this.dom();
  }
  FormUtilities.FormGroup.prototype.setValue = function (val) {
      this.input(val);
  }
  FormUtilities.FormGroup.prototype.getValue = function () {
      return this.input();
  }
  */


var Models = {};
Models.Enums = {};

Models.Enums.GorunumTipi = {
    aktifpasif: { value: 0, text: "Aktif Pasif" },
    teksecim: { value: 1, text: "Tek Seçim" },
    coklusecim: { value: 2, text: "Çoklu Seçim" },
    acilirliste: { value: 3, text: "Açılır Liste" },
    eklecikar: { value: 4, text: "Ekle Çıkar" }
}
var FindEnumStringByInteger = function (enumModel, value) {
    for (var i in enumModel) {
        if (enumModel.hasOwnProperty(i)) {
            if (enumModel[i].value == value) {
                return i;
                break;
            }
        }
    }
}
Models.Enums.GorunumTipiGrupRel = {
    defaultdeger: { value: 0, text: "Default Değer" },
    adetli: { value: 1, text: "Adetli" },
    secimli: { value: 2, text: "Seçimli(Checkbox)" }
}
Models.Enums.GosterimDurumu = {
    goster: { value: 0, text: "Göster" },
    gizle: { value: 1, text: "Gizle" }
}

Models.Enums.DurumGosterGizle = {
    goster: { value: 0, text: "Göster" },
    gizle: { value: 1, text: "Gizle" }
}
/* Models.UrunSecenekGrup = function (params) {
     this.ID = params.ID || null;
     this.Ad = params.Ad || null;
     this.GorunenAd = params.GorunenAd || null;
     this.UrunID = params.UrunID || null;
     this.Durum = params.Durum || Models.Enums.DurumGosterGizle.goster.value;
     this.Sira = params.Sira || 1;
     this.GorunumTipi = params.GorunumTipi || null;
     this.UrunSecenekGrupRels = [];
     if (params.UrunSecenekGrupRels) {
         for (var i = 0; i < params.UrunSecenekGrupRels.length; i++) {
             params.UrunSecenekGrupRels[i]["UrunSecenekGrup"] = this;
             this.UrunSecenekGrupRels.push(new Models.UrunSecenekGrupRel(params.UrunSecenekGrupRels[i]));
         }
     }
 }

 Models.UrunSecenek = function (params) {
     this.ID = params.ID || null;
     this.Ad = params.Ad || null;
     this.MekanID = params.MekanID || null;
     this.UnKnown = params.UnKnown || null;
     this.Durum = params.Durum || null;
 }
 Models.Urun = function (params) {
     this.ID = params.ID || null;
     this.MenuKategoriID = params.ID || null;
     this.UrunAdi = params.ID || null;
     this.Aciklama = params.ID || null;
     this.Fiyat = params.ID || null;
     this.GarsoniyeOrani = params.ID || null;
     this.GosterimDurumu = params.ID || null;
     this.FotografPath = params.ID || null;
     this.YorumSayisi = params.ID || null;
     this.UrunSecenekGrups = [];
     if (params.UrunSecenekGrups) {
         for (var i = 0; i < params.UrunSecenekGrups.length; i++) {
             params.UrunSecenekGrups[i]["Urun"] = this;
             this.UrunSecenekGrups.push(new Models.UrunSecenekGrup(params.UrunSecenekGrups[i]));
         }
     }
     //UrunSecenekGrups
 }

 Models.UrunSecenekGrupRel = function (params) {
     this.ID = params.ID || null;
     this.UrunSecenekGrupID = params.UrunSecenekGrupID || null;
     this.UrunSecenekID = params.UrunSecenekID || null;
     this.Fiyat = params.Fiyat || null;
     this.DefaultDeger = params.DefaultDeger || null;
     this.GorunumTipi = params.GorunumTipi || null;
     this.UrunSecenekGrup = params.UrunSecenekGrup || null;
     // UrunSecenek
 }
 */
var UrunSecenekGrupRelForm = function (container, urunSecenekGrupRel) {

    var _container = $('<div></div>').appendTo(container);


    if (container.find("tbody").length == 0) {
        var _table = $('<table class="table table-bordered table-urun-secenek-grup-rel"></table>').appendTo(_container);
        var _tableHeader = $('<thead><tr> <th>Özellik Adı</th> <th>Fiyat</th> <th>Default Değer</th> <th>Gorunum</th> <th>Sil</th> </tr></thead>').appendTo(_table);
        var _tableBody = $('<tbody></tbody>').appendTo(_table);
    } else {
        var _tableBody = container.find("tbody");
    }

    var _tr = $('<tr class="urun-secenek-rel-item"></tr>').appendTo(_tableBody);
    _td1 = $('<td></td>').appendTo(_tr);
    var siraInput = $('<input class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].Sira" value="' + (urunSecenekGrupRel.Sira || "1") + '"  type="hidden" >').appendTo(_td1);
    var idInput = $('<input class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].ID" value="' + (urunSecenekGrupRel.ID || "") + '" type="hidden" >').appendTo(_td1);
    var urunSecenekGrupIDInput = $('<input class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].UrunSecenekGrupID" value="' + (urunSecenekGrupRel.UrunSecenekGrupID || "") + '" type="hidden" >').appendTo(_td1);
    var UrunSecenekIDInput = $('<input class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].UrunSecenekID" value="' + (urunSecenekGrupRel.UrunSecenekID || "") + '" type="hidden" >').appendTo(_td1);
    var UrunSecenekIDInput = $('<input class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].UrunSecenek.ID" value="' + (urunSecenekGrupRel.UrunSecenekID || "") + '" type="hidden" >').appendTo(_td1);

    var adValue = "";
    if (urunSecenekGrupRel.UrunSecenek) {
        adValue = urunSecenekGrupRel.UrunSecenek.Ad || "";
    }
    var adInput = $('<input type="text" class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].UrunSecenek.Ad" value="' + adValue + '">').appendTo(_td1);

    _td2 = $('<td></td>').appendTo(_tr);
    var fiyatInput = $('<input type="text" class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].Fiyat" value="' + (urunSecenekGrupRel.Fiyat || "0") + '">').appendTo(_td2);

    _td3 = $('<td></td>').appendTo(_tr);
    var defaultDegerInput = $('<input type="checkbox" class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].DefaultDeger" value="true" >').appendTo(_td3);
    if (urunSecenekGrupRel.DefaultDeger) {
        defaultDegerInput.attr("checked","checked");
        //console.log(urunSecenekGrupRel.DefaultDeger);
    }
   
    _td4 = $('<td></td>').appendTo(_tr);

    var gorunumTipiInput = $('<select class="usgr-input" data-name="UrunSecenekGrups[x].UrunSecenekGrupRels[y].GorunumTipi"  ></select>').appendTo(_td4);
    for (var i in Models.Enums.GorunumTipiGrupRel) {
        if (Models.Enums.GorunumTipiGrupRel.hasOwnProperty(i)) {
            gorunumTipiInput.append('<option value="' + i + '">' + Models.Enums.GorunumTipiGrupRel[i].text + '</option>');
        }
    }
    if (urunSecenekGrupRel.GorunumTipi) gorunumTipiInput.val(FindEnumStringByInteger(Models.Enums.GorunumTipiGrupRel, urunSecenekGrupRel.GorunumTipi));
    _td5 = $('<td></td>').appendTo(_tr);
    var removeBtn = $('<button type="button" class="btnDelete"></button>').appendTo(_td5);

    var _relContainer = $('<div></div>');
    removeBtn.click(function () {
        _tr.remove();
        UrunSecenekManager.regulateArray();
    });
    $(container).append(_container);

}
var UrunSecenekGrupForm = function (containerID, urunSecenekGrup) {
    var containerPanel = $('<div class="panel subPanel  urun-secenek-item"></div>');
    var containerPanelHeading = $('<div class="panel-heading"></div>').appendTo(containerPanel);
    var containerPanelTitle = $('<div class="panel-title"></div>').appendTo(containerPanelHeading);

    var _container = $('<div class="form-inline"></div>').appendTo(containerPanelTitle);
    var idInput = $('<input class="us-input" data-name="UrunSecenekGrups[x].ID"  type="hidden" value="' + (urunSecenekGrup.ID || "") + '"  >').appendTo(_container);
    var urunIDInput = $('<input class="us-input" data-name="UrunSecenekGrups[x].UrunID"  type="hidden" value="' + (urunSecenekGrup.UrunID || "") + '" >').appendTo(_container);
    var siraInput = $('<input class="us-input form-control" data-name="UrunSecenekGrups[x].Sira" placeholder="Sıra" value="' + (urunSecenekGrup.Sıra || "1") + '" type="hidden" >').appendTo(_container);
    var durumIDInput = $('<input class="us-input" data-name="UrunSecenekGrups[x].Durum"  type="hidden" value="' + (urunSecenekGrup.Durum || "goster") + '" >').appendTo(_container);

    var formInput = function (item) {
        var col = $('<div class="col-sm-3"></div>').appendTo(_container);
        var grup = $('<div class="form-group fg-inline"></div>').appendTo(col);
        grup.append(item);
        return item;
    }
    var adInput = formInput($('<input type="text" class="us-input form-control input-sm" data-name="UrunSecenekGrups[x].Ad"  placeholder="Ad" value="' + (urunSecenekGrup.Ad || "") + '">'));


    var gorunenAdInput = $('<input  class="us-input form-control" type="text" data-name="UrunSecenekGrups[x].GorunenAd"  placeholder="Görünen Ad" value="' + (urunSecenekGrup.GorunenAd || "") + '">').appendTo(_container);
    var gorunumTipiInput = $('<select  class="us-input form-control" data-name="UrunSecenekGrups[x].GorunumTipi"  ></select>').appendTo(_container);
    for (var i in Models.Enums.GorunumTipi) {
        if (Models.Enums.GorunumTipi.hasOwnProperty(i)) {
            gorunumTipiInput.append('<option value="' + i + '">' + Models.Enums.GorunumTipi[i].text + '</option>');
        }
      
    }
    if (urunSecenekGrup.GorunumTipi) gorunumTipiInput.val(FindEnumStringByInteger(Models.Enums.GorunumTipi, urunSecenekGrup.GorunumTipi));
    var removeBtn = $('<button type="button" class="btn-delete"></button>').appendTo(_container);
    removeBtn.click(function () {
        containerPanel.remove();
        UrunSecenekManager.regulateArray();
    });
    var addRelButton = $('<button type="button" class="btn btn-primary btn-sm"><i class="zmdi zmdi-plus zmdi-hc-fw"></i>Yeni Özellik Ekle</button>').appendTo(_container);
    addRelButton.click(function () {
        UrunSecenekGrupRelForm(_relContainer, {});
        UrunSecenekManager.regulateArray();
    });
    var _relContainer = $('<div class="table-responsive"></div>').appendTo(containerPanelTitle);
    if (Array.isArray(urunSecenekGrup.UrunSecenekGrupRels)) {
        for (var i = 0; i < urunSecenekGrup.UrunSecenekGrupRels.length; i++) {
            UrunSecenekGrupRelForm(_relContainer, urunSecenekGrup.UrunSecenekGrupRels[i]);
        }
    }


    $(containerID).append(containerPanel);
}

var UrunSecenekManager = function () {
    var regulateArray = function () {
        var changeUsgr = function (usgr, i1, i2) {
            usgr.find(".usgr-input").each(function (i) {
                var newName = $(this).attr("data-name").replace("[x]", "[" + i1 + "]").replace("[y]", "[" + i2 + "]");
                $(this).attr("name", newName);
            });
        }
        var changeUs = function (us, i1) {
            us.find(".us-input").each(function (i) {
                var newName = $(this).attr("data-name").replace("[x]", "[" + i1 + "]");
                $(this).attr("name", newName);
            });
            $.each(us.find(".urun-secenek-rel-item"), function (i2, d2) {
                changeUsgr($(this), i1, i2);
            });
        }
        $.each($(".urun-secenek-item"), function (i1, d1) {
            changeUs($(this), i1);
        });
    }
    var addNewUrunSecenekGrup = function (urunSecenekGroup) {
        UrunSecenekGrupForm(".UrunSecenekGrups-container", urunSecenekGroup || {});
    }
    var addFromList = function (urunSecenekGroupList) {
        console.log(urunSecenekGroupList);
        for (var i = 0; i < urunSecenekGroupList.length; i++) {
            addNewUrunSecenekGrup(urunSecenekGroupList[i]);
        }
    }
    return {
        addFromList: addFromList,
        regulateArray: regulateArray,
        addNewUrunSecenekGrup: addNewUrunSecenekGrup
    }
}();