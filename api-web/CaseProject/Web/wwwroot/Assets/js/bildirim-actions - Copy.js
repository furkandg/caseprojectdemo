/*Models*/

var BildirimTuru = {
    0: {
        "TurAdi": "Garson Çağırma", "Text": "Garson Çağırıyor", method: "MusteriGarsonCagirma", "Img": "waiter.png",
        "BtnOnayClick": function (notify, evt) {
            Bildirim.MekanGarsonCagirOnay(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-onay.png" /></p><h5>Müşterinizin Garson Çağırma İsteğini Onayladınız</h5>', "pink");

        },
        "BtnIptalClick": function (notify, evt) {
            Bildirim.MekanGarsonCagirIptal(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-ret.png" /></p><h5>Müşterinizin Garson Çağırma İsteğini İptal Ettiniz</h5>', "bluegray");
        }
    },
    1: {
        "TurAdi": "Oturum Açma", "Text": "Oturum Açtı", method: "MusteriOturumAcma", "Img": "",
        "BtnOnayClick": function (notify, evt) {
            Bildirim.MekanOnayOturumAcma(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-onay.png" /></p><h5>Müşterinizin Oturum İsteğini Onayladınız</h5>', "pink");
        },
        "BtnIptalClick": function (notify, evt) {
            Bildirim.MekanOturumAcmaIptal(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-ret.png" /></p><h5>Müşterinizin Oturum Açma İsteğini İptal Ettiniz</h5>', "bluegray");
        }
    },
    2: {
        "TurAdi": "Sipariş Verme", "Text": "Sipariş Verdi", method: "MusteriSiparisVerme", "Img": "",
        "SiparisContent": function (notfy, evt) {
        },
        "BtnSiparisIptalBtn": function (notify, evt) {
            Bildirim.SiparisIptalOnayControl(notify);
            evt.dom.setModalBody('<p><img src="/img/bildirim-ret.png" /></p><h5>Müşterinizin Siparişlerini İptal Ettiniz</h5>', "bluegray");
        },
        "BtnSiparisOnayBtn": function (notify, evt) {
            Bildirim.SiparisIptalOnayControl(notify);
            evt.dom.setModalBody('<p><img src="/img/bildirim-onay.png" /></p><h5>Müşterinizin Siparişlerini Onayladınız</h5>', "pink");
        }

    },
    3: {
        "TurAdi": "Hesap İsteme", "Text": "Hesap İstiyor", method: "MusteriHesapIsteme", "Img": "",
        "BtnOnayClick": function (notify, evt) {
            Bildirim.HesapIstemeOnay(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-onay.png" /></p><h5>Müşterinizin Hesap İsteğini Onayladınız</h5>', "pink");
        },
        "BtnIptalClick": function (notify, evt) {
            Bildirim.HesapIstemeIptal(notify.ID);
            evt.dom.setModalBody('<p><img src="/img/bildirim-ret.png" /></p><h5>Müşterinizin Hesap İsteğini İptal Ettiniz</h5>', "bluegray");
        },
        "HesapContent": function (notfy, evt) {
        },
    },
    4: { "TurAdi": "Hesap Ödeme", "Text": "Hesap Ödedi", method: "MusteriHesapOdeme", "Img": "" },
    5: { "TurAdi": "Garson Çağırma", "Text": '<div class="page-img"><img src="../img/icon/waiter.png"></div><h4>Garsonunuz Geliyor</h4>', method: "GarsonCagirmaOnay" },

    6: { "TurAdi": "Oturum Açma", "Text": '', method: "OturumAcmaOnay" },
    7: { "TurAdi": "Hesap İsteme", "Text": 'Hesap İsteğiniz Onaylandı. Hesabınız getiriliyor', method: "HesapIstemeOnay" },
    8: { "TurAdi": "Sipariş Verme", "Text": 'Siparişleriniz Onaylandı. Hazırlanıyor', method: "SiparisVermeOnay" },

    9: { "TurAdi": "Garson Çağırma", "Text": '<div class="page-img"><img src="../img/icon/waiter.png"></div><h4>Garsonunuz Geliyor</h4>', method: "GarsonCagirmaIptal" },
    10: { "TurAdi": "Oturum Açma", "Text": '', method: "OturumAcmaIptal" },
    11: { "TurAdi": "Oturum Açma", "Text": '', method: "MekanOturumKapatma" },
    12: { "TurAdi": "Hesap İsteme", "Text": 'Hesap İsteği İptal Edildi.', method: "HesapIstemeIptal" },
    13: { "TurAdi": "Sipariş Verme", "Text": 'Siparişler İptal Edildi.', method: "SiparisVermeIptal" },

    14: { "TurAdi": "Garson Çağırma", "Text": 'Garson Çağırma İşleminiz İptal Edildi', method: "GarsonCagirmaMusteriIptal" },
    15: { "TurAdi": "Oturum Açma", "Text": 'Oturum Açma İşleminiz İptal Edildi', method: "MusteriOturumKapatma" },
    16: { "TurAdi": "Sipariş Verme", "Text": 'Sipariş Verme İşleminiz İptal Edildi', method: "SiparisVermeMusteriIptal" },
    17: { "TurAdi": "Hesap İsteme", "Text": 'Hesap İsteğiniz İptal Edildi', method: "HesapIstemeMusteriIptal" }
}

/*Utilities*/
function parseJsonDate(jsonDateString) {
    var d = new Date(parseInt(jsonDateString.replace('/Date(', '')));
    return d.getHours() + ":" + d.getMinutes() + "  " + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}


var getParent = function () {
    if (typeof (_isIframe) != "undefined") {
        return window.parent.document.body;
    }
    else {
        return window.document.body;
    }
}
var getWindow = function () {
    if (typeof (_isIframe) != "undefined") {
        return window.parent.window;
    }
    else {
        return window;
    }
}
var _scope = getWindow();
$$ = _scope.$;

var BildirimKasaCevap = (function () {
    var IslemOnay = function (_id) {

    };
    var IslemIptal = function () {

    };
    return {
        IslemOnay: IslemOnay,
        IslemIptal: IslemIptal
    }
})();

var NotifyModal = function (notify) {
    var bildirimTuru = BildirimTuru[notify.BildirimTuru];
    $("#BildirimModal").remove();

    var domNodeContainer = $$(' <div class="modal fade" id="BildirimModal" tabindex="-1" role="dialog" aria-labelledby="BildirimModalLabel"></div>');
    var domDialog = $$(' <div class="modal-dialog" role="document"></div>').appendTo(domNodeContainer);
    var domNodeContent = $$('<div class="modal-content notification-details"></div>').appendTo(domDialog);
    var domHeader = $$('<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="BildirimModalLabel">Bildirim</h4>' +
                '</div>').appendTo(domNodeContent);
    var domBody = $$('<div class="modal-body">' +
                    '<h4>' + notify.MasaAdi + ' Numaralı Masa Bildirimi</h4>' +
                    '<h5>' + BildirimTuru[notify.BildirimTuru].TurAdi + '</h5>' +
                    '<div>' +
                        '<img src="" />' +
                    '</div>' +
                    '<p>' + notify.MasaAdi + ' numaralı masa ' + BildirimTuru[notify.BildirimTuru].Text + '</p>' +
                '</div>').appendTo(domNodeContent);


    var setModalBody = function (message, closeBtnColor) {
        notify.listitem.remove();
        domBody.html(message);
        domFooter.hide();
        $$('<div class="modal-footer"><button type="button" class="btn bgm-' + closeBtnColor + '" data-dismiss="modal">Kapat</button></div>').appendTo(domNodeContent);
    }



    var domFooter = $$('<div class="modal-footer"></div>').appendTo(domNodeContent);
    
    if (bildirimTuru.BtnIptalClick) {
        var domIptalBtn = $$('<button type="button" class="btn bgm-bluegray" id="btnBildirimIptal">İptal</button>').appendTo(domFooter);
        domIptalBtn.click(function () {
            bildirimTuru.BtnIptalClick(notify, { modal: domNodeContainer, dom: { setModalBody: setModalBody, btn: domIptalBtn } });
        });
    }
    if (bildirimTuru.BtnOnayClick) {
        var domOnayBtn = $$('<button type="button" class="btn bgm-pink" id="btnBildirimOnay">Onayla</button>').appendTo(domFooter);
        domOnayBtn.click(function () {
            bildirimTuru.BtnOnayClick(notify, { modal: domNodeContainer, dom: { setModalBody: setModalBody, btn: domOnayBtn } });
        });
    }
    if (bildirimTuru.SiparisContent) {
        /* Modal da sipariş listesi getirme */
        var siparisTable = $$('<table class="table SiparisNotifTable"></table>');
        var siparisThead = $$('<thead><tr> <th>Seç</th> <th>Ürün Adı</th> <th>Adet</th> <th>Fiyat</th> </tr></thead>').appendTo(siparisTable);
        var siparisTbody = $$('<tbody></tbody>').appendTo(siparisTable);
        Bildirim.GetSiparisList(notify.LineID, function (notifyList) {
            $.each(notifyList, function (index) {
                var _data = notifyList[index];
                var tr = $$('<tr>' +
                    '<td><input name="check" type="checkbox" value="' + _data.ID + '"  /></td>' +
                    '<td>' + _data.Urun.UrunAdi + '</td>' +
                    '<td>' + _data.Adet + '</td>' +
                    '<td>' + _data.Fiyat + '</td>' +
                    '</tr>').appendTo(siparisTbody);
            });
        }, function (e) {
            console.error(e);
        });

       
        /*-------*/
        if (bildirimTuru.BtnSiparisIptalBtn) {
            var domIptalBtn = $$('<button type="button" class="btn bgm-bluegray" id="btnBildirimIptal">İptal 2</button>').appendTo(domFooter);
            domIptalBtn.click(function () {

                var siparisIptalList = new Array();
                $$(siparisTbody).find("input[name='check']").each(function () {
                    if ($$(this).prop("checked")) { siparisIptalList.push($(this).val()); }
                });
                Bildirim.SiparisIptal(siparisIptalList, notify);

                bildirimTuru.BtnSiparisIptalBtn(notify, {modal: domNodeContainer, dom: { btn: domIptalBtn } });
            });
        }
        if (bildirimTuru.BtnSiparisOnayBtn) {
            var domOnayBtn = $$('<button type="button" class="btn bgm-pink" id="btnBildirimOnay">Onayla 2</button>').appendTo(domFooter);
            domOnayBtn.click(function () {

                var siparisOnayList = new Array();
                $$(siparisTbody).find("input[name='check']").each(function () {
                    if ($$(this).prop("checked")) { siparisOnayList.push($(this).val()); }
                });
                Bildirim.SiparisOnay(siparisOnayList,notify);

                bildirimTuru.BtnSiparisOnayBtn(notify, {modal: domNodeContainer, dom: { btn: domOnayBtn } });
            });
        }
        /*-------*/


        /* Sipariş İptal Butonu*/
        /*
        var domSiparisIptalBtn = $$('<button type="button" class="btn bgm-bluegray" id="btnSiparisIptal">Siparişleri İptal Et</button>').appendTo(domFooter);
        domSiparisIptalBtn.click(notify,function () {
            var siparisIptalList = new Array();
            $$(siparisTbody).find("input[name='check']").each(function () {
                if ($$(this).prop("checked")) { siparisIptalList.push($(this).val()); }
            });
            Bildirim.SiparisIptal(siparisIptalList);
        });*/
        
        /* Sipariş Onaylama Butonu*/
        /*
        var domSiparisOnayBtn = $$('<button type="button" class="btn bgm-pink" id="btnSiparisOnay">Siparişleri Onayla</button>').appendTo(domFooter);
        domSiparisOnayBtn.click(notify,function () {
            var siparisOnayList = new Array();
            $$(siparisTbody).find("input[name='check']").each(function () {
                if ($$(this).prop("checked")) { siparisOnayList.push($(this).val()); }
            });
            Bildirim.SiparisOnay(siparisOnayList);
        });*/

        siparisTable.appendTo(domBody);
    }
    if (bildirimTuru.HesapContent) {
        /* Modal da hesap listesi getirme */
        var siparisTable = $$('<table class="table SiparisNotifTable"></table>');
        var siparisThead = $$('<thead><tr><th>Ürün Adı</th> <th>Adet</th> <th>Fiyat</th> </tr></thead>').appendTo(siparisTable);
        var siparisTbody = $$('<tbody></tbody>').appendTo(siparisTable);
        Bildirim.GetHesap(notify.LineID, function (notifyList) {
            $.each(notifyList, function (index) {
                var _data = notifyList[index];
                $$('<tr> <td>' + _data.Urun.UrunAdi + '</td> <td>' + _data.Adet + '</td> <td>' + _data.Fiyat + '</td>' + '</tr>').appendTo(siparisTbody);
            });
        }, function (e) { console.error(e); });

        siparisTable.appendTo(domBody);
    }


    domNodeContainer.modal("show");
}


var NotifyListItem = function (notify) {
    notify["listitem"] = this;
    this.notify = notify;
    this.domNode = $('<li class="media"></li>');
    this.domLink = $('<a href="#"></a>').appendTo(this.domNode);
    this.domMasaAd = $('<span class="tvh-user pull-left"></span>').appendTo(this.domLink);
    this.domMediaBody = $('<div class="media-body"></div>').appendTo(this.domLink);
    this.domTur = $('<strong></strong>').appendTo(this.domMediaBody);
    this.domTarih = $('<small class="c-gray"></small>').appendTo(this.domMediaBody);
    this.domMessage = $('<div></div>').appendTo(this.domMediaBody);

    this.setNotifyHtml(notify);
}
NotifyListItem.prototype.setNotifyHtml = function (notifyItem) {
    this.domMasaAd.text(notifyItem.MasaAdi);
    this.domTur.text(BildirimTuru[notifyItem.BildirimTuru].TurAdi);
    this.domTarih.text(parseJsonDate(notifyItem.Tarih));
    this.domMessage.text(notifyItem.MasaAdi + ' Numaralı Masa, ' + BildirimTuru[notifyItem.BildirimTuru].Text);
    this.getMasa().bildirimEkle();
    $(this.domLink).on("click", function () {

        NotifyModal(notifyItem);
    })
}
NotifyListItem.prototype.getNotifyHtml = function () {
    return this.domNode;
}
NotifyListItem.prototype.remove = function () {
    this.getMasa().bildirimCikar();
    return $$(this.domNode).remove();
}
NotifyListItem.prototype.getMasa = function () {
    return MasaListManager.getMasaListItem(this.notify.MasaID);
}


var NotifyListManager = function () {
    var _parent = getParent();
    var $notify = $(".tvc-lists");
    if (_parent)
        $notify = $(".tvc-lists", _parent);
    var $counterDom = $(".header-notifications", _parent).find(".tmn-counts");
    var _setCount = function (count) {
        $(".header-notifications", _parent).find(".tmn-counts").text(count);
    }
    var _addNotify = function (notifyData) {
        var notiftyItem = new NotifyListItem(notifyData);
        $notify.append(notiftyItem.getNotifyHtml());
        return notiftyItem;
    }

    return {
        setCount: _setCount,
        addNotify: _addNotify
    }
}();

var MasaListItem = function (masa) {
    masa["_masalistitem"] = this;
    this._masa = masa;
    this.domNode = $('<li></li>');
    this.domLink = $('<a href="/MekanMasa/MasaDetay/' + masa.ID + '" class="load-modal" data-modal-type="modal-lg"></a>').appendTo(this.domNode);
    this.domLinkSpan = $('<div></div>').appendTo(this.domLink);
    this.domNotfiyIcon = $('<span class="d-none" ></span>').appendTo(this.domLink);
    this.domNotfiyCount = $('<small></small>').appendTo(this.domNotfiyIcon);
    this.setMasaHtml(masa);
}

MasaListItem.prototype.setMasaHtml = function (masaItem) {
    this.domLinkSpan.text(masaItem.MasaAdi);
    this.domNotfiyCount.text("");
    $(this.domLink).on("click", function () {
        console.log(masaItem);
    })
}
MasaListItem.prototype.getMasaHtml = function () {
    return this.domNode;
}
MasaListItem.prototype.bildirimEkle = function () {
    this.domNotfiyIcon.removeClass('d-none');
    if (this.domNotfiyCount.text() == "") this.domNotfiyCount.text("1");
    else {
        this.domNotfiyCount.text(parseInt(this.domNotfiyCount.text()) + 1);
    }
}
MasaListItem.prototype.bildirimCikar = function () {
    if (this.domNotfiyCount.text() == "1") {
        this.domNotfiyIcon.addClass('d-none');
    }
    else {
        this.domNotfiyCount.text(parseInt(this.domNotfiyCount.text()) - 1);
    }
}
var MasaListManager = function () {
    var _parent = getParent();
    var $masa = $(".masalar");
    if (_parent)
        $masa = $(".masalar", _parent);

    /*
        var $counterDom = $(".header-notifications", _parent).find(".tmn-counts");
        var _setCount = function (count) {
            $(".header-notifications", _parent).find(".tmn-counts").text(count);
        }
    
        */
    var _masaListesi = {};
    var _addMasa = function (masaData) {
        _masaListesi["masa_" + masaData.ID] = masaData;
        var masaItem = new MasaListItem(masaData);
        $masa.append(masaItem.getMasaHtml());
        return masaItem;
    }
    var _getMasa = function (id) {
        return _masaListesi["masa_" + id];
    }
    var _getMasaListItem = function (id) {
        var mm = _getMasa(id);

        return mm._masalistitem;
    }

    return {
        //  setCount: _setCount,
        addMasa: _addMasa,
        getMasa: _getMasa,
        getMasaListItem: _getMasaListItem
    }
}();

var Bildirim = (function () {
    var parent = getParent();

    /* Masa Listeleme */
    var GetMasa = function (callback, errorback) {
        $.post("/MasaServices/GetMasa").done(function (response) {
            if (response.State == 0) {

                $.each(response.Data, function (index) {
                    var _data = response.Data[index];
                    console.log(_data);
                    MasaListManager.addMasa(_data);
                });
                callback(response);
            }
            else {
                console.error(response.ErrorMessage);
                errorback(response);
            }

        }).fail(function (e) { errorback(); console.error("Masa Yükleme Sırasında Bir Hata Oluştu!") });
    };

    /* Bildirimleri Listeleme */
    var GetBildirim = function () {
        $.post("/BildirimServices/GetNotification").done(function (response) {
            if (response.State == 0) {
                var notify = $(".tvc-lists", parent);
                $(".header-notifications", parent).find(".tmn-counts").text(response.Data.length);
                $.each(response.Data, function (index) {
                    var _data = response.Data[index];
                    console.log(_data);
                    NotifyListManager.addNotify(_data);
                    var iconNotfy = $("#masa" + _data.MasaID + " span", parent);
                    iconNotfy.addClass("d-block").removeClass("d-none");
                    iconNotfy.find("small").text(parseInt(iconNotfy.find("small").text()) + 1);
                });
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Bildirim Alma Sırasında Bir Hata Oluştu!") });
    };

    /* Müşteri Oturum Acma Onaylama */
    var MekanOnayOturumAcma = function (id) {
        $.post("/OturumServices/MusteriOturumAc", { ID: id }).done(function (response) {
            if (response.State == 0) {
            }
            else
                alert(response.ErrorMessage);
        }).fail(function (x) { alert(x + "İşlem Sırasında Bir Hata Oluştu") });
    };

    /* Müşteri Oturum Acma İptal */
    var MekanOturumAcmaIptal = function (id) {
        $.post("/OturumServices/OturumAcmaIptal", { ID: id }).done(function (response) {
            if (response.State == 0) { }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Bir Hata Oluştu") });
    };

    /* Müşteri Garson Çağırma Onaylama */
    var MekanGarsonCagirOnay = function (id) {
        $.post("/GarsonServices/MekanGarsonCagirOnay", { ID: id }).done(function (response) {
            if (response.State == 0) {
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Bir Hata Oluştu") });
    };

    /* Müşteri Garson Çağırma İptal */
    var MekanGarsonCagirIptal = function (id) {
        $.post("/GarsonServices/MekanGarsonCagirIptal", { ID: id }).done(function (response) {
            if (response.State == 0) { }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Bir Hata Oluştu") });
    };

    /* Sipariş Listeleme */
    var GetSiparisList = function (_lineID, callback, errorback) {
        $.post("/SiparisServices/GetSiparis", { oturumID: _lineID }).done(function (response) {
            if (response.State == 0) {
                callback(response.Data);
            }
            else {
                errorback(response);
            }
        }).fail(function (e) { if (errorback) errorback(e); console.error("İşlem Sırasında Bir Hata Oluştu", e); });
    };

    /* Sipariş Onaylama */
    var SiparisOnay = function (_siparisOnayList,notify) {
        $.post("/SiparisServices/SiparisOnayla", { siparisOnayList: _siparisOnayList }).done(function (response) {
            if (response.State == 0) {
                alert("Sipariş Onaylama Başarılı");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    var SiparisIptalOnayControl = function (notify) {

        Bildirim.GetSiparisList(notify.LineID, function (notifyList) {
            console.log("notifyList.Length = " + notifyList.length);
            if (notifyList.length==0)
            {
                alert("ürün yok bildirim");
            }
        }, function (e) {
            console.error(e);
        });
    };

    /* Sipariş İptal */
    var SiparisIptal = function (_siparisIptalList,notify) {
        $.post("/SiparisServices/SiparisIptal", { siparisIptalList: _siparisIptalList }).done(function (response) {
            if (response.State == 0) {
                alert("Sipariş İptal Başarılı");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };


    /* Hesap İsteme - Hesap Detayları */
    var GetHesap = function (_lineID, callback, errorback) {
        $.post("/SiparisServices/GetHesap", { oturumID: _lineID }).done(function (response) {
            if (response.State == 0) {
                callback(response.Data);
            }
            else {
                errorback(response);
            }
        }).fail(function (e) { if (errorback) errorback(e); console.error("İşlem Sırasında Bir Hata Oluştu", e); });
    };

    /* Hesap İsteme Onay */
    var HesapIstemeOnay = function (_id) {
        $.post("/SiparisServices/HesapIstemeOnay", { id: _id }).done(function (response) {
            if (response.State == 0) {
                alert("Hesap İsteme İsteğini Onayladınız");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    /* Hesap İsteme İptal */
    var HesapIstemeIptal = function (_id) {
        $.post("/SiparisServices/HesapIstemeIptal", { id: _id }).done(function (response) {
            if (response.State == 0) {
                alert("Hesap İsteme İsteğini İptal Ettiniz");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    var AddBildirim = function () {
        $.post("/BildirimServices/AddNotification", { id: islemID }).done(function (response) {
            if (response.State == 0) {
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Bir Hata Oluştu") });
    };

    return {
        GetMasa: GetMasa,
        GetBildirim: GetBildirim,
        AddBildirim: AddBildirim,
        MekanOnayOturumAcma: MekanOnayOturumAcma,
        MekanOturumAcmaIptal: MekanOturumAcmaIptal,
        MekanGarsonCagirOnay: MekanGarsonCagirOnay,
        MekanGarsonCagirIptal: MekanGarsonCagirIptal,
        GetSiparisList: GetSiparisList,
        SiparisOnay: SiparisOnay,
        SiparisIptal: SiparisIptal,
        SiparisIptalOnayControl:SiparisIptalOnayControl,
        GetHesap: GetHesap,
        HesapIstemeOnay: HesapIstemeOnay,
        HesapIstemeIptal: HesapIstemeIptal
    }
})();



$$(getWindow()).on("load", function () {
    Bildirim.GetMasa(function () {
        Bildirim.GetBildirim();
    });
});


//$(document).on("click", "#btnBildirimOnay", function () {
//    var metod = $("#btnBildirimOnay").data("onay");
//    bildirimActions._methods[metod];
//});

