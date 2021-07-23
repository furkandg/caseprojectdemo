/*Models*/
var sessionInterval = setInterval(function () {
    $.get("/", function (d) { console.log(d);});
}, 120000);
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
        "BtnOnayText": "Siparişleri Gör",
        "BtnOnayClick": function (notify, evt) {
            notify.listitem.closeModal();
            var masa = MasaListManager.getMasa(notify.MasaID);
            //MasaListManager.bildirimCikar(notify.MasaID);
            masa._masalistitem.detayAc();
            //  alert();
        },
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
    17: { "TurAdi": "Hesap İsteme", "Text": 'Hesap İsteğiniz İptal Edildi', method: "HesapIstemeMusteriIptal" },

    18: { "TurAdi": "Mutfak", "Text": 'Mutfak', method: "Mutak" },
    19: { "TurAdi": "Mutfak Sipariş Hazırlanıyor", "Text": 'Siparişiniz Hazırlanıyor', method: "MutfakSiparisHazirlaniyor" },
    20: { "TurAdi": "Mutfak Sipariş Hazır", "Text": 'Siparişiniz Hazır', method: "MutfakSiparisHazir" },
    21: { "TurAdi": "Mutfak sipariş İptal", "Text": 'Siparişiniz Mutfak Tarafından İptal Edildi', method: "MutfakSiparisIptal" }
}

/*Utilities*/
function parseJsonDate(jsonDateString) {
    var d = new Date(parseInt(jsonDateString.replace('/Date(', '')));
    return "<span class='datetime'>" + d.getHours() + ":" + d.getMinutes() + "</span>" + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}


$(function () {
    $(".refreshPage").click(function () {
        document.location.reload(true);
    });

    /* oturumun dusmemesı için 2 dk bir istek at */
    var reloadOturum = setInterval(function () {
        $.get("/OturumServices/ReloadSession");
        console.log("oturum");
    }, 120000);
})

var GetAnyOturum = function (_masaID) {
    $.ajax({
        type: 'POST',
        url: "/SiparisServices/GetAnyOturum",
        data: { masaID: _masaID },
        success: function (response) {
            console.log("ajax");
            return response.Data;
        },
        /* "Oturum Açma Sırasında Bir Hata Oluştu!" */
        async: false
    });
}

var NotifyModal = function (notify) {
    var bildirimTuru = BildirimTuru[notify.BildirimTuru];
    $("#BildirimModal").remove();
    var domNodeContainer = $(' <div class="modal fade" id="BildirimModal" tabindex="-1" role="dialog" aria-labelledby="BildirimModalLabel"></div>');
    var domDialog = $(' <div class="modal-dialog" role="document"></div>').appendTo(domNodeContainer);
    var domNodeContent = $('<div class="modal-content notification-details"></div>').appendTo(domDialog);
    var domHeader = $('<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="BildirimModalLabel">Bildirim</h4>' +
                '</div>').appendTo(domNodeContent);
    var domBody = $('<div class="modal-body">' +
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
        $('<div class="modal-footer"><button type="button" class="btn bgm-' + closeBtnColor + '" data-dismiss="modal">Kapat</button></div>').appendTo(domNodeContent);
    }

    var domFooter = $('<div class="modal-footer"></div>').appendTo(domNodeContent);

    if (bildirimTuru.BtnIptalClick) {
        var domIptalBtn = $('<button type="button" class="btn bgm-bluegray" id="btnBildirimIptal">İptal</button>').appendTo(domFooter);
        domIptalBtn.click(function () {
            bildirimTuru.BtnIptalClick(notify, { modal: domNodeContainer, dom: { setModalBody: setModalBody, btn: domIptalBtn } });
        });
    }
    if (bildirimTuru.BtnOnayClick) {
        var domOnayBtn = $('<button type="button" class="btn bgm-pink" id="btnBildirimOnay">' + (bildirimTuru.BtnOnayText || "Onayla") + '</button>').appendTo(domFooter);
        domOnayBtn.click(function () {
            bildirimTuru.BtnOnayClick(notify, { modal: domNodeContainer, dom: { setModalBody: setModalBody, btn: domOnayBtn } });
        });
    }

    if (bildirimTuru.HesapContent) {
        /* Modal da hesap listesi getirme */
        var siparisTable = $('<table class="table SiparisNotifTable"></table>');
        var siparisThead = $('<thead><tr> <th>Ürün Adı</th> <th>Adet</th> <th>Fiyat</th> </tr></thead>').appendTo(siparisTable);
        var siparisTbody = $('<tbody></tbody>').appendTo(siparisTable);
        Bildirim.GetHesap(notify.LineID, function (notifyList) {
            $.each(notifyList, function (index) {
                var _data = notifyList[index];
                $('<tr> <td>' + _data.Urun.UrunAdi + '</td> <td>' + _data.Adet + '</td> <td>' + _data.Fiyat + '</td>' + '</tr>').appendTo(siparisTbody);
            });
        }, function (e) { console.error(e); });

        siparisTable.appendTo(domBody);
    }

    domNodeContainer.modal("show");
    return {
        modal: domNodeContainer,
        close: function () {
            domNodeContainer.modal("hide");

        }
    };
}

var NotifyListItem = function (notify) {
    notify["listitem"] = this;
    this.notify = notify;
    this.domNode = $('<li class="media"></li>');
    this.domLink = $('<a href="#"></a>').appendTo(this.domNode);
    this.domMasaAd = $('<span class="tvh-user pull-left"></span>').appendTo(this.domLink);
    this.domMediaBody = $('<div class="media-body"></div>').appendTo(this.domLink);
    this.domTur = $('<strong></strong>').appendTo(this.domMediaBody);
    this.domTarih = $('<span class="c-gray"></span>').appendTo(this.domMediaBody);
    this.domMessage = $('<div></div>').appendTo(this.domMediaBody);

    this.setNotifyHtml(notify);
}
NotifyListItem.prototype.setNotifyHtml = function (notifyItem) {
    var _self = this;
    this.domMasaAd.text(notifyItem.MasaAdi);
    this.domTur.text(BildirimTuru[notifyItem.BildirimTuru].TurAdi);
    this.domTarih.html(parseJsonDate(notifyItem.Tarih));
    this.domMessage.text(notifyItem.MasaAdi + ' Numaralı Masa, ' + BildirimTuru[notifyItem.BildirimTuru].Text);
    this.getMasa().bildirimEkle();

    $(this.domLink).on("click", function () {
        _self.modal = NotifyModal(notifyItem);
    })
}
NotifyListItem.prototype.closeModal = function () {
    if (this.modal) {
        this.modal.close();
        this.modal = null;
    }
}
NotifyListItem.prototype.getNotifyHtml = function () {
    return this.domNode;
}
NotifyListItem.prototype.remove = function () {
    this.getMasa().bildirimCikar();
    return $(this.domNode).remove();
}
NotifyListItem.prototype.getMasa = function () {
    return MasaListManager.getMasaListItem(this.notify.MasaID);
}
var NotifyListManager = function () {
    var $counterDom = $(".header-notifications").find(".tmn-counts");
    var _setCount = function (count) {
        $(".header-notifications").find(".tmn-counts").text(count);
    }
    var _addNotify = function (notifyData) {
        var notiftyItem = new NotifyListItem(notifyData);
        console.log(notiftyItem);
        $(".tvc-lists").append(notiftyItem.getNotifyHtml());
        return notiftyItem;
    }

    return {
        setCount: _setCount,
        addNotify: _addNotify
    }
}();

var MasaDetailsPageManager = function () {
    var _containerDom = null;
    var _getContainer = function () {
        if (_containerDom == null) { _containerDom = $("#kasiyerMasaDetayModal"); }
        return _containerDom;
    }

    var _masaHesapListDom = null;
    var _getMasaHesapList = function () {
        if (_masaHesapListDom == null) _masaHesapListDom = _getContainer().find(".masa-hesap-list")
        return _masaHesapListDom;
    }
    var _setMasaHesapList = function (d) {

        _getMasaHesapList().show();
        _getMasaHesapList().html(d);
    }
    var _clearMasaHesapList = function () {
        _getMasaHesapList().hide();
        _getMasaHesapList().html("");
    }
    var _masaOturumListDom = null;// _container.find(".masa-oturum-list");
    var _getMasaOturumList = function () {
        if (_masaOturumListDom == null) _masaOturumListDom = _getContainer().find(".masa-oturum-list")
        return _masaOturumListDom;
    }
    var _setMasaOturumList = function (d) {
        _getMasaOturumList().show();
        _getMasaOturumList().html(d);
    }
    var _clearMasaOturumList = function () {
        _getMasaOturumList().hide();
        _getMasaOturumList().html("");
    }
    //masa-hesap-list
    //masa-oturum-list
    //kasiyerSiparisEkle

    var _clearAll = function () {
        _clearMasaHesapList();
        _clearMasaOturumList();
    }
    return {
        getMasaHesapList: _getMasaHesapList,
        setMasaHesapList: _setMasaHesapList,
        clearMasaHesapList: _clearMasaHesapList,
        getMasaOturumList: _getMasaOturumList,
        setMasaOturumList: _setMasaOturumList,
        clearMasaOturumList: _clearMasaOturumList,
        clearAll: _clearAll,
    }
}();

var MasaListItem = function (masa) {
    masa["_masalistitem"] = this;
    this._masa = masa;
    this.domNode = $('<li data-id="' + masa.ID + '" class="oturum-' + masa.OturumDurum + '" data-bolgeid="' + masa.MasaBolgeID + '"></li>');
    if (masa.MasaBolge.isDefault == false) {
        this.domNode.addClass("hidden");
    }
    //this.domLink = $('<a  href="/MekanMasa/MasaDetay/' + masa.ID + '" id="masa' + masa.ID + '" class="load-modal" data-modal-type="modal-lg"></a>').appendTo(this.domNode);
    this.domLink = $('<a  href="#" type="button" class=""></a>').appendTo(this.domNode);
    /*this.domLink = $('<a  href="#" type="button" class="" data-toggle="modal" data-target="#kasiyerMasaDetayModal"></a>').appendTo(this.domNode);*/

    this.domLinkSpan = $('<div class="label-masa-adi"></div>').appendTo(this.domLink);
    this.domBolge = $('<div  class="label-bolge-adi" style="font-size:10px; line-height:10px;"></div>').appendTo(this.domLink);
    this.domNotfiyIcon = $('<span class="d-none" ></span>').appendTo(this.domLink);
    this.domNotfiyCount = $('<small></small>').appendTo(this.domNotfiyIcon);
    this.setMasaHtml(masa);
}
MasaListItem.prototype.openDetails = function () {
    MasaDetailsPageManager.clearAll();
    if (this._masa.OturumDurum == true) {
        $("#kasiyerMasaDetayModal").modal("show");
        console.log("MASA ID", this._masa.ID);
        KasiyerMasaSiparis.GetList(this._masa.ID, function () { });
        KasiyerMasaOturum.GetList(this._masa.ID);
    }
}

MasaListItem.prototype.setMasaHtml = function (masaItem) {
    console.log("Masa Item", masaItem);
    this.domLinkSpan.text(masaItem.MasaAdi);
    this.domBolge.text(masaItem.MasaBolge.Ad);
    this.domNotfiyCount.text("");
    var _self = this;
    $(this.domLink).on("click", function () {
        if ($(this).parents("li").hasClass("oturum-true")) {
            _self.openDetails();
        }
        else {
            swal({
                title: masaItem.MasaAdi + " Oturum Açma",
                text: masaItem.MasaAdi + " masada açık oturum bulunmadığından sanal oturum açmak ister misiniz?",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Sanal Oturum Aç",
                cancelButtonText: "Kapat",
                closeOnConfirm: true,
                closeOnCancel: true
            },
          function (isConfirm) {
              if (isConfirm) {
                  GetAnyOturum(masaItem.ID);
                  $("#kasiyerMasaDetayModal").modal("show");
                  KasiyerMasaSiparis.GetList(this._masa.ID);
                  KasiyerMasaOturum.GetList(this._masa.ID);
              }
          });
        }
        $("#kasiyerMasaDetayModalLabel").text(masaItem.MasaAdi || "Masa Detayı");
    })
}
MasaListItem.prototype.getMasaHtml = function () {
    return this.domNode;
}
MasaListItem.prototype.oturumHub = function (oturumBildirimi) {
    if (oturumBildirimi.OturumAdet > 0) {
        this._masa.OturumDurum = true;
        this.domNode.addClass("oturum-true");
        this.domNode.removeClass("oturum-false");
    }
    else {
        this._masa.OturumDurum = false;
        this.domNode.addClass("oturum-false");
        this.domNode.removeClass("oturum-true");
    }
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
MasaListItem.prototype.detayAc = function () {
    $(this.domLink).loadModal();
}
var MasaListManager = function () {
    var $bolge = $(".menu-btn-container");
    $bolge.html("");
    var $masa = $(".masalar");
    $(document).ready(function () {
        $bolge = $(".menu-btn-container");
        $bolge.html("");
        $masa = $(".masalar");
    });
    /*
        var $counterDom = $(".header-notifications").find(".tmn-counts");
        var _setCount = function (count) {
            $(".header-notifications").find(".tmn-counts").text(count);
        }
    */
    var _masaListesi = {};
    var _masaItemInstances = {};
    var _addBolge = function (bolge) {
        var _btn = $('<a href="#" class="btn menu-btn">' + bolge.Ad + '<span> (0)</span></a>');
        if (bolge.isDefault) _btn.addClass("active");
        $bolge.append(_btn);
        if (bolge.Masalar) {
            _btn.find("span").html(" (" + bolge.Masalar.length + ")");
            $.each(bolge.Masalar, function (indexBolge) {
                var _masa = bolge.Masalar[indexBolge];
                _masa["MasaBolge"] = bolge;
                var masaItem = _addMasa(_masa);
            });
        }
        _btn.click(function () {
            $masa.find("li").addClass("hidden");
            $(".menu-btn", $bolge).removeClass("active");
            $masa.find("li[data-bolgeid='" + bolge.ID + "']").removeClass("hidden");
            _btn.addClass("active");
            return false;
        });
    }
    var _addMasa = function (masaData) {
        _masaListesi["masa_" + masaData.ID] = masaData;
        var masaItem = new MasaListItem(masaData);
        _masaItemInstances["masa_" + masaData.ID] = masaItem;
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
        oturumHub: function (params) {
            return _masaItemInstances["masa_" + params.MasaID].oturumHub(params);
        },
        addBolge: _addBolge,
        addMasa: _addMasa,
        getMasa: _getMasa,
        getMasaListItem: _getMasaListItem
    }
}();




var Bildirim = (function () {

    /* Masa Listeleme */
    var GetMasa = function (callback, errorback) {
        $.post("/MasaServices/GetMekanBolge").done(function (response) {
            if (response.State == 0) {
                $.each(response.Data, function (index) {

                    var _bolge = response.Data[index];
                    if (index == 0) { _bolge["isDefault"] = true; } else { _bolge["isDefault"] = false; }
                    MasaListManager.addBolge(_bolge);
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
            console.log(response);
            if (response.State == 0) {
                var notify = $(".tvc-lists");
                $(".header-notifications").find(".tmn-counts").text(response.Data.length);
                $.each(response.Data, function (index) {
                    var _data = response.Data[index];
                    NotifyListManager.addNotify(_data);
                    var iconNotfy = $("#masa" + _data.MasaID + " span");
                    iconNotfy.addClass("d-block").removeClass("d-none");
                    iconNotfy.find("small").text(parseInt(iconNotfy.find("small").text()) + 1);
                });
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Bildirim Alma Sırasında Bir Hata Oluştu!") });
    };

    /* genel sipariş durumu düzenleme*/
    var SiparisDurumDuzenle = function (_siparisID, _durum) {
        $.post("/SiparisServices/SiparisDurumDuzenle2", { id: _siparisID, durum: _durum }).done(function (response) {
            console.log(response);
            if (response.State == 0) {
                console.log("sipariş durumu degiştirildi");
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Hesap Bilgisi Alınamadı! Lütfen Tekrar Deneyiniz") });
    }


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

    var SiparisGor = function () {

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
        GetHesap: GetHesap,
        SiparisGor: SiparisGor,
        HesapIstemeOnay: HesapIstemeOnay,
        HesapIstemeIptal: HesapIstemeIptal,
        SiparisDurumDuzenle: SiparisDurumDuzenle
    }
})();

var Garson = (function () {

    GetGarsonList = function () {
        $.post("/UserServices/GetMekanGarsonList").done(function (response) {
            if (response.State == 0) {
                console.log("Garson list : ", response.Data);
                var tbody = $('<tbody></tbody>').appendTo($("#mekanGarsonDurum table"));
                $.each(response.Data, function (index, item) {
                    var tr = $('<tr></tr>').appendTo(tbody);
                    var td = $('<td>' + item.User.AdSoyad + '</td>').appendTo(tr);
                    var td = $('<td style="width:40px"></td>').appendTo(tr);
                    var label = $('<label class="switch"></label>').appendTo(td);
                    var status = '';
                    if (item.User.Status == 0) {
                        status = 'checked="checked"';
                    }
                    var checkbox = $('<input type="checkbox" class="success garson-online-check" ' + status + '/>').click(function () {
                        GarsonStatusCahnge(item.User.ID, $(this).prop("checked"));
                    }).appendTo(label);
                    var span = $('<span class="slider round"></span>').appendTo(label);
                });
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { alert("Garson Listesi Getirilemedi"); });
    };

    GarsonStatusCahnge = function (userID, status) {
        var userStatus = status ? "Aktif" : "KasiyerPasif";
        $.post("/UserServices/UserStatusChange", { userID: userID, durum: userStatus }).done(function (response) {
            if (response.State == 0) {
                alert("Durum degiştirme başarılı");
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Durum degiştirme Başarısız!") });

    };

    return {
        GetGarsonList: GetGarsonList
    }

})();

var KasiyerMasaSiparis = (function () {

    var SiparisDurum = {
        0: { "Durum": "Sipariş Verildi" },
        1: { "Durum": "Hesap Ödendi" },
        2: { "Durum": "Siparişiniz Onaylandı" },
        3: { "Durum": "Sepete Eklendi" },
        4: { "Durum": "İptal Edildi" },
        5: { "Durum": "Hesap İstiyor" },
        6: { "Durum": "Müşteri İptal" },
        /**/
        18: { "Durum": "Mutfak" },
        19: { "Durum": "Siparişiniz Hazirlaniyor" },
        20: { "Durum": "Siparişiniz Hazir" },
        21: { "Durum": "Mutfak İptal Edildi" }
    }

    var MasaSahibiMi = {
        "0": "Misafir Kullanıcı",
        "1": "Masa Yöneticisi",
        "2": "Sanal Kullanıcı"
    };


    // all selected checkbox
    /*
    var selectList;
    function allSelectedCheckbox() {
        selectList = [];
        if ($(".all-selected-checkbox").prop("checked")) {
            var c = $("input[type='checkbox'][name='check']").prop("checked", true);
            c.each(function () {
                selectList.push($(this).val());
            });
        }
        else {
            var c = $("input[type='checkbox'][name='check']").prop("checked", false);
            c.each(function () {
                var index = selectList.indexOf($(this).val());
                if (index !== -1)
                    selectList.splice(index, 1);
            });
        }
    }*/

    var SelectedSiparisListManager = (function () {
        /* Hesap Listesi */
        var siparisList = [];
        var getSiparisList = function () {
            return siparisList;
        };
        var setSiparisList = function (_siparisList) {
            siparisList = _siparisList;
        };
        var findSiparisItem = function (id) {
            for (var i = 0; i < siparisList.length; i++) {
                if (id == siparisList[i].ID) {
                    return siparisList[i];
                }
            }
        };
        var addSiparisList = function (item) {
            removeSiparisList(item.ID);
            siparisList.push(item);
        };
        var removeSiparisList = function (id) {
            for (var i = 0; i < siparisList.length; i++) {
                if (id == siparisList[i].ID) {
                    siparisList.splice(i, 1);
                    break;
                }
            }
        };
        /* Hesap Listesi */

        /* seçilen item */
        var selectedList = [];
        var getSelectedList = function () {
            return selectedList;
        }

        var setSelectedList = function (_selectedList) {
            selectedList = _selectedList;
        };

        var addSelected = function (id) {
            selectedList.push(id);
            console.log(selectedList);
        };

        var removeSelected = function (id) {
            for (var i = 0; i < selectedList.length; i++) {
                if (id == selectedList[i]) {
                    selectedList.splice(i, 1);
                    break;
                }
            }
        };

        var allSelected = function () {

        };

        var clearSelectedList = function () {
            setSelectedList([]);
        };

        var selectedPrice = function () {

        };

        /* seçilen item */
        return {
            findSiparisItem: findSiparisItem,
            addSiparisList: addSiparisList,
            getSiparisList: getSiparisList,
            setSiparisList: setSiparisList,
            getSelectedList: getSelectedList,
            setSelectedList: setSelectedList,
            addSelected: addSelected,
            removeSelected: removeSelected,
            allSelected: allSelected,
            selectedPrice: selectedPrice
        }
    })();

    /* siparis hesap listesi manager */
    var SiparisTableItemManager = function () {
        var getTbody = function () {
            return $(".masa-hesap-list table>tbody");
        };

        var Get = function (siparisID, callback) {
            $.post("/SiparisServices/GetMasaSiparisItem", { siparisID: siparisID }).done(function (response) {
                if (response.State == 0) {
                    console.log(response);
                }
                callback(response);
            });
        };

        var GetItemTutar = function (_data) {
            var _sepetTutar = 0;
            var _hesapTutar = 0;
            var secenekFiyatToplam = 0;
            for (var i = 0; i < _data.SiparisUrunSecenekList.length; i++) {
                if (_data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.Fiyat > 0) {
                    secenekFiyatToplam += _data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.Fiyat;
                }
            }
            if (_data.Durum == 0) {
                _sepetTutar = (_data.Fiyat + secenekFiyatToplam) * _data.KalanOdeme;
            }
            else if (_data.Durum == 2 || _data.Durum == 5) {
                _hesapTutar = (_data.Fiyat + secenekFiyatToplam) * _data.KalanOdeme;
            }
            return {
                sepet: _sepetTutar,
                hesap: _hesapTutar,
                secenekToplam: secenekFiyatToplam
            }
        };


        var CreateTr = function (_data) {
            console.log(_data);
            var _tr = $('<tr data-siparisid="' + _data.ID + '"></tr>');
            var _tdSec = $('<td></td>').appendTo(_tr);
            if (_data.Durum != 1) { // Durum:1 Hesap Ödendi
                var _sec = $('<input type="checkbox" name="check" value="' + _data.KalanOdeme + '" data-id="' + _data.ID + '" class="checkbox-lg" />').appendTo(_tdSec).click(function () {
                    if (this.checked) {
                        SelectedSiparisListManager.addSelected($(this).data("id"), $(this).val());
                    }
                    else {
                        SelectedSiparisListManager.removeSelected($(this).data("id"));
                    }
                });
            }

            if (_data.Urun.GosterimDurumu == 4) { // İndirim 
                var _indirimTd = $('<td colspan="7" class="indirimTd"><span>' + -1 * (_data.Fiyat) + ' ₺</span> tutarında İndirim</td>').appendTo(_tr);
                var _indirimDurum = $('<td class="siparisdurum' + _data.Durum + '">' + SiparisDurum[_data.Durum].Durum + '</td>').appendTo(_tr);
                var _indirimTarih = $('<td>' + parseJsonDate(_data.SiparisTarihi) + '</td>').appendTo(_tr);
                return _tr;
            }

            var _masaSahiniMi = $('<td>' + MasaSahibiMi[_data.Oturum.MasaSahibiMi] + '</td>').appendTo(_tr);
            var _urunAdi = $('<td>' + _data.Urun.UrunAdi + '</td>').appendTo(_tr);
            var siparissecenek = $('<ul class="sepetUrunSecenekList"></ul>').appendTo(_urunAdi);
            var secenekFiyatToplam = 0;
            for (var i = 0; i < _data.SiparisUrunSecenekList.length; i++) {
                var secenekFiyat = "";
                if (_data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.Fiyat > 0) {
                    secenekFiyatToplam += _data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.Fiyat;
                    secenekFiyat = _data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.Fiyat + " ₺";
                }
                var urunSecenekItem = $("<li>" + _data.SiparisUrunSecenekList[i].UrunSecenekGrupRel.UrunSecenek.Ad + " " + secenekFiyat + "</li>").appendTo(siparissecenek);
            }
            var siparisNotu = $('<p class="siparis-notu">' + (_data.SiparisNotu || "") + '</p>').appendTo(_urunAdi);
            var _adet = $('<td>' + _data.Adet + '</td>').appendTo(_tr);
            var _kalanAdet = $('<td>' + _data.KalanOdeme + '</td>').appendTo(_tr);
            var _odenenAdettd = $('<td class="siparisOdenenAdet"></td>').appendTo(_tr);
            if (_data.Durum == 2 || _data.Durum == 5) { //Durum 2:Siparis Onaylandı 5:Hesap İsteme, 
                var _odenenAdetMinute = $('<a class="btn btn-error" data-id="' + _data.ID + '">-</a>').appendTo(_odenenAdettd).click(function () {
                    if (_odenenAdet.val() > 0)
                        _odenenAdet.val(parseInt(_odenenAdet.val()) - 1);
                    var item = SelectedSiparisListManager.findSiparisItem($(this).data("id"));
                    item.OdenenAdet = parseInt(_odenenAdet.val());
                    SelectedSiparisListManager.addSiparisList(item);
                });
                var _odenenAdet = $('<input type="number" name="OdenenTutar" id="OdenenTutar" value="' + _data.KalanOdeme + '" disabled/>').appendTo(_odenenAdettd);
                var _odenenAdetPlus = $('<a class="btn btn-success" data-id="' + _data.ID + '">+</a>').appendTo(_odenenAdettd).click(function () {
                    if (_odenenAdet.val() < _data.KalanOdeme)
                        _odenenAdet.val(parseInt(_odenenAdet.val()) + 1);
                    var item = SelectedSiparisListManager.findSiparisItem($(this).data("id"));
                    item.OdenenAdet = parseInt(_odenenAdet.val());
                    SelectedSiparisListManager.addSiparisList(item);
                    console.log(SelectedSiparisListManager.getSiparisList());
                });
            }
            if (_data.Durum == 1) // Durum 1:Hesap odenedi sipariş tammalandı
            {
                _odenenAdettd.text(_data.OdenenAdet);
            }
            var _fiyat = $('<td>' + _data.Urun.Fiyat + ' ₺</td>').appendTo(_tr);
            var _tutar = $('<td>' + (_data.ToplamTutar + secenekFiyatToplam) + ' ₺</td>').appendTo(_tr);
            var _durum = $('<td class="siparisdurum' + _data.Durum + '">' + SiparisDurum[_data.Durum].Durum + '</td>').appendTo(_tr);
            var _siparisTarihi = $('<td>' + parseJsonDate(_data.SiparisTarihi) + '</td>').appendTo(_tr);
            return _tr;
        }

        var Add = function (siparisID) {
            Get(siparisID, function (response) {
                CreateTr(response.Data).appendTo(getTbody());
            });
        }

        var Update = function (siparisID) {
            Get(siparisID, function (response) {
                var eskiTr = getTbody().find("tr[data-siparisid='" + siparisID + "']");
                eskiTr.html(CreateTr(response.Data).html());
            });
        }

        var Remove = function (siparisID) {
            getTbody().find("tr[data-siparisid='" + siparisID + "']").remove();
        }

        return {
            createTr: CreateTr,
            GetItemTutar: GetItemTutar,
            //update:Update,
            factory: function (siparisNotify) {
                console.log(siparisNotify);
                //  ActionType = splt[0],
                //SiparisID = Convert.ToInt32(splt[1]),
                //MekanID = Convert.ToInt32(splt[2]),
                //MasaID = Convert.ToInt32(splt[3])
                if ($("table[data-masaid='" + siparisNotify.MasaID + "']").length > 0) {
                    if (siparisNotify.ActionType == "INSERT") {
                        Add(siparisNotify.SiparisID);
                    }
                    if (siparisNotify.ActionType == "UPDATE") {
                        Update(siparisNotify.SiparisID);
                    }
                    if (siparisNotify.ActionType == "DELETE") {
                        Remove(siparisNotify.SiparisID);
                    }
                }
            }
        }
    }();

    /* Masa Sipariş listesini getirir */
    var GetList = function (_masaID, callback) {
        MasaDetailsPageManager.clearMasaHesapList();
        $.post("/SiparisServices/GetMasaSiparisList", { masaID: _masaID }).done(function (response) {
            if (response.State == 0) {
                CreateSiparisList(_masaID, response.Data);
                SelectedSiparisListManager.setSiparisList(response.Data);
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    /* Sipariş Listesi eklranı oluşturma */
    var CreateSiparisList = function (_masaID, siparisList) {
        selectList = [];
        var _sepetTutar = 0;
        var hesapTutar = 0;
        var _masaHesapList = $('<div></div>');

        /* btn grup */
        var _masaHesapListBtnGroup = $('<p class="masaHesapListBtnGroup"></p>').appendTo(_masaHesapList);
        /* Siparis Onaylama */
        var _btnOnayla = $('<button class="btn btn-xs bgm-green btnSiparisOnay">Seçilenleri Onayla</button>').appendTo(_masaHesapListBtnGroup).click(function () {
            SiparisDurumDuzenle(selectList, 2);
        });
        /* Siparis İptal */
        var _btnIptalEt = $('<button class="btn btn-xs bgm-red btnSiparisIptal">Seçilenleri İptal Et</button>').appendTo(_masaHesapListBtnGroup).click(function () {
            SiparisDurumDuzenle(selectList, 4);
        });
        /* Sipariş Verildi */
        var _btnSiparisVerme = $('<button class="btn btn-xs bgm-blue btnHesapOdendi">Sipariş Verildi</button>').appendTo(_masaHesapListBtnGroup).click(function () {
            SiparisDurumDuzenle(selectList, 0);
        });
        /* Sepete Eklendi */
        var _btnMutfak = $('<button class="btn btn-xs bgm-lightgreen btnHesapOdendi">Mutfağa Gönder</button>').appendTo(_masaHesapListBtnGroup).click(function () {
            SiparisDurumDuzenle(selectList, 18);
        });
        /* Hesap İstiyor */
        var _btnHesapIsteme = $('<button class="btn btn-xs bgm-deeppurple btnHesapOdendi">Hesap İstiyor</button>').appendTo(_masaHesapListBtnGroup).click(function () {
            SiparisDurumDuzenle(selectList, 5);
        });
        /* btn grup */

        var _hesapTable = $('<table class="table" data-masaid="' + _masaID + '"></table>').appendTo(_masaHesapList);
        var _hesapHead = $('<thead><tr><th>Seç<input type="checkbox" name="check" value="" class="all-selected-checkbox checkbox-lg" onchange="allSelectedCheckbox()" /></th> <th>Siparişi Veren</th> <th>Ürün Adı</th> <th>Adet</th> <th>Kalan Adet</th> <th style="width:170px">Ödenen Adet</th> <th>Fiyat</th> <th>Tutar</th> <th>Durum</th> <th>Sipariş Tarihi</th> </tr></thead>').appendTo(_hesapTable);

        var _hesapTableBody = $('<tbody></tbody>').appendTo(_hesapTable);

        CreateIndirim().appendTo(_masaHesapList);

        $.each(siparisList, function (index, item) {
            var _data = siparisList[index];
            SiparisTableItemManager.createTr(_data).appendTo(_hesapTableBody);
            var fiyatItem = SiparisTableItemManager.GetItemTutar(_data);
            hesapTutar += fiyatItem.hesap;
        });

        var _hesap = $('<div class="masaHesapListPrice"></div>').appendTo(_masaHesapList);
        var _secilenHasapTutari = $('<span class="secilenHesapTutar">Seçilen Hesap Tutarı = 0 ₺</span>').appendTo(_hesap);
        var _hesapTutari = $('<span>Hesap Tutarı = 0 ₺</span>').appendTo(_hesap);

        /* Hesap Ödeme */
        var _btnHesap = $('<div class="btnHesap"></div>').appendTo(_hesap);
        var _btnHesapAdisyon = $('<a class="btn bgm-bluegray kasyerHesapAdisyon" href="/Siparis/HesapAdisyon?masaID=' + _masaID + '" target="popup"">Hesap Adisyon</a>').appendTo(_btnHesap).click(function () {
            window.open("/Siparis/HesapAdisyon?masaID=" + _masaID, "Adisyon", "width=400,height=600");
        });
        var _btnHesapOdeme = $('<button class="btn bgm-pink btnHesapOdendi">Hesap Ödeme</button>').appendTo(_btnHesap).click(function () {
            SiparisHesapOdeme(selectList);
        });
        var _btnHesapOdeme = $('<button class="btn bgm-green btnHesapOdendi">Öde ve Oturumları Kapat</button>').appendTo(_btnHesap).click(function () {
            SiparisHesapOdeOturumKapat(_masaID);
        });

        MasaDetailsPageManager.setMasaHesapList(_masaHesapList);
    }

    /* İndirim kısmını oluşturma */
    var CreateIndirim = function () {
        var container = $('<div class="kasiyer-indirim-container"></div>');
        var h4 = $('<h5>İndirim Ekle</h5>').appendTo(container);
        var row = $('<div class="row"></div>').appendTo(container);
        var col_9 = $('<div class="col-xs-9 col-md-9"></div>').appendTo(row);
        var input = $('<input type="text" name="Indirim" id="Indirim" class="form-control" placeholder="0.00"/>').appendTo(col_9);
        var col_3 = $('<div class=" col-xs-3 col-md-3"></div>').appendTo(row);
        var btn = $('<a class="btn btn-block bgm-bluegray">İndirim Ekle</a>').appendTo(col_3).click(function () {
            $.post("/SiparisServices/IndirimEkle", { indirim_fiyat: input.val() }).done(function (response) {
                if (response.State == 0) {
                    input.val("");
                }
                else {
                    alert(response.ErrorMessage);
                }
            }).fail(function () { alert("İndirim Eklenemedi. Lütfen Tekrar Deneyiniz"); });
        });
        return container;
    }


    /* seçilen listeyi odemme POST */
    var SiparisHesapOdeme = function (_siparisHesapOdemeList) {
        $.post("/SiparisServices/SiparisHesapOdeme", { siparisHesapOdemeList: _siparisHesapOdemeList }).done(function (response) {
            if (response.State == 0) {
                alert("Hesap Ödeme Başarılı");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    /* masanın tüm hesabını ode ve oturumları kapat */
    var SiparisHesapOdeOturumKapat = function (masaID) {
        $.post("/SiparisServices/SiparisHesapOdeOturumKapat", { masaID: masaID }).done(function (response) {
            if (response.State == 0) {
                if (response.Data == true)
                    alert("Hesap Ödeme Başarılı");
                $("#kasiyerMasaDetayModal").modal("hide");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    /* secilen listenin durumunu geiştiren POST */
    var SiparisDurumDuzenle = function (_selectList, _durum) {
        var _list = [];
        for (var i = 0; i < _selectList.length; i++) {
            _list.push(_selectList[i].ID);
        }
        $.post("/SiparisServices/SiparisDurumDuzenle", { siparislistesi: _list, durum: _durum }).done(function (response) {
            if (response.State == 0) {
                alert("Sipariş Durumu Düzenleme Başarılı");
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };

    return {
        GetList: GetList,
        NotifyFactory: SiparisTableItemManager.factory
    }
})();

var KasiyerMasaOturum = (function () {

    var SiparisDurum = {
        0: { "Durum": "Sipariş Verildi" },
        1: { "Durum": "Hesap Ödendi" },
        2: { "Durum": "Siparişiniz Onaylandı" },
        3: { "Durum": "Sepete Eklendi" },
        4: { "Durum": "İptal Edildi" },
        5: { "Durum": "Hesap İstiyor" },
        6: { "Durum": "Müşteri İptal" },
        /**/
        18: { "Durum": "Mutfak" },
        19: { "Durum": "Siparişiniz Hazirlaniyor" },
        20: { "Durum": "Siparişiniz Hazir" }
    }

    var MasaSahibiMi = {
        "0": "Misafir Kullanıcı",
        "1": "Masa Yöneticisi",
        "2": "Sanal Kullanıcı"
    };

    var GetList = function (_masaID, callback) {
        MasaDetailsPageManager.clearMasaOturumList();
        $.post("/OturumServices/MasaOturumList", { masaID: _masaID }).done(function (response) {
            if (response.State == 0) {
                var _hesapTable = $('<table class="table"></table>');
                var _hesapHead = $('<thead><tr><th>Masa Yöneticisi</th><th>Ad Soyad</th><th>Oturum Talep Tarihi</th><th>Oturum Açma Tarihi</th><th>İşlemler</th></tr></thead>').appendTo(_hesapTable);
                var _hesapTableBody = $('<tbody></tbody>').appendTo(_hesapTable);
                $.each(response.Data, function (index) {
                    var _data = response.Data[index];
                    var _tr = $('<tr></tr>').appendTo(_hesapTableBody);
                    var _masaSahiniMi = $('<td>' + MasaSahibiMi[_data.MasaSahibiMi] + '</td>').appendTo(_tr);
                    var _urunAdi = $('<td>' + _data.User.AdSoyad + '</td>').appendTo(_tr);
                    var _adet = $('<td>' + parseJsonDate(_data.OturumTalepTarihi) + '</td>').appendTo(_tr);
                    var _fiyat = $('<td>' + parseJsonDate(_data.OturumAcmaTarihi) + '</td>').appendTo(_tr);
                    var _tdBtn = $('<td></td>').appendTo(_tr);
                    var _btnOturumuKapat = $('<a href="#" class="btn btn-xs bgm-pink">Oturumu Kapat</a>').appendTo(_tdBtn);
                    _btnOturumuKapat.click(function () {
                        GetList(_masaID, OturumKapat(_data.ID));
                    });
                    if (_data.MasaSahibiMi == 1 || _data.MasaSahibiMi == 2) {
                        KasiyerSiparisEkle.GetMenuKategori(_data.ID);
                    }
                    $("#MasaID").val(_masaID);
                });
                MasaDetailsPageManager.setMasaOturumList(_hesapTable);
            }
            else {
                alert(response.ErrorMessage);
            }
        }).fail(function () { });
    };


    var OturumKapat = function (_oturumID) {
        $.post("/OturumServices/OturumKapat", { id: _oturumID }).done(function (response) {
            if (response.State == 0) {
                console.log("Oturum Kapatma İşlemi Başarılı");
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Oturum Kapatma Sırasında Hata Oldu! Lütfen Tekrar Deneyiniz") });
    };

    return {
        OturumKapat: OturumKapat,
        GetList: GetList
    }
})();

var KasiyerSiparisEkle = (function () {
    var masaID = 0;
    var urun = null;
    var _sepetSiparis = null;
    var _siparisUrunSecenekList = [];
    var siparisUrunSecenekListManager = function () {
        var _update = function (siparisUrunSecenekItem) {
            for (var i = 0; i < _siparisUrunSecenekList.length; i++) {
                if (_siparisUrunSecenekList.UrunSecenekGrupRelID == siparisUrunSecenekItem.UrunSecenekGrupRelID) {
                    _siparisUrunSecenekList[i] = siparisUrunSecenekItem;
                    return true;
                }
            }
            return false;
        }
        var _remove = function (urunSecenekGrupRelID) {
            for (var i = 0; i < _siparisUrunSecenekList.length; i++) {
                if (_siparisUrunSecenekList[i].UrunSecenekGrupRelID == urunSecenekGrupRelID) {
                    _siparisUrunSecenekList.splice(i, 1);
                    return true;
                    break;
                }
            }
            return false;
        }

        var _find = function (urunSecenekGrupRelID) {
            for (var i = 0; i < _siparisUrunSecenekList.length; i++) {
                if (_siparisUrunSecenekList[i].UrunSecenekGrupRelID == urunSecenekGrupRelID) {
                    return true;
                }
            }
            return false;
        }
        return {
            add: function (siparisUrunSecenekItem) {
                if (!_update(siparisUrunSecenekItem)) {
                    _siparisUrunSecenekList.push(siparisUrunSecenekItem);
                }
            },
            update: _update,
            remove: _remove,
            find: _find
        }
    }();

    var GetMenuKategori = function (_oturumID) {
        $('#OturumID').val(_oturumID);
        var selectMenuKategori = $("#MenuKategoriID").change(function () {
            GetMenuUrun($(this).val());
            $("#UrunID").html("");
        });

        $.post("/MenuServices/GetKasiyerMenuKategori").done(function (response) {
            if (response.State == 0) {
                selectMenuKategori.html("<option>Menu Kategorisi Seçiniz</option>");
                $.each(response.Data, function (i, item) {
                    selectMenuKategori.append('<option value="' + item.ID + '">' + item.KategoriAdi + '</option>');
                });
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Hata Oldu! Menü Kategorileri Getirilemiyor. Lütfen Tekrar Deneyiniz") });
    };



    var GetMenuUrun = function (kategoriid) {
        var selectMenuUrun = $("#UrunID").change(function () {
            GetMenuUrunSecenek($(this).val());

            var gosterimDurumu = $('#UrunID option:selected').data('type');
            var fiyat = $('#UrunID option:selected').data('value');
            if (gosterimDurumu == 2 || gosterimDurumu == 3) {
                UrunFiyat(fiyat);
            }
        });
        $.post("/MenuServices/GetKasiyerMenuUrun", { kategoriid: kategoriid }).done(function (response) {
            selectMenuUrun.html("");
            if (response.State == 0) {
                $('<option>Ürün Seçiniz</option>').appendTo(selectMenuUrun);
                $.each(response.Data, function (i, item) {
                    var opt = $('<option value="' + item.ID + '" data-type="' + item.GosterimDurumu + '" data-value="' + item.Fiyat + '">' + item.UrunAdi + ' - ' + item.Fiyat + ' TL</option>').appendTo(selectMenuUrun);
                });
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Hata Oldu! Menü Kategorileri Getirilemiyor. Lütfen Tekrar Deneyiniz") });
    };

    var UrunFiyat = function (_fiyat) {
        var formGroup = $('<div class="form-group"></div>');
        var label = $('<label class="control-label col-md-2 col-xs-2 text-left" for="urunFiyat">Fiyat</label>').appendTo(formGroup);
        var md10 = $('<div class="col-md-10 col-xs-10"></div>').appendTo(formGroup);
        var fiyat = $('<div class="urunFiyat"></div>').appendTo(md10);
        var input = $('<input type="text" name="Fiyat" id="Fiyat" value="' + _fiyat + '" class="form-control" />').appendTo(fiyat);
        $("body").find(".urun-fiyat").html(formGroup);
    };

    var GetMenuUrunSecenek = function (urunID) {
        $.post("/MenuServices/UrunGetir", { id: urunID }).done(function (response) {
            if (response.State == 0) {
                var _urunSecenek = $(".UrunSecenek").html("");
                var urun = response.Data;
                console.log(urun);
                UrunSecenekGrupBuilder(urun.UrunSecenekGrups).appendTo(_urunSecenek);
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("İşlem Sırasında Hata Oldu! Menü Kategorileri Getirilemiyor. Lütfen Tekrar Deneyiniz") });
    };

    var SiparisEkle = function (_siparis, gosterimDurumu) {

        var _urunid = $("#UrunID").val();
        var _adet = $(".urunSiparisAdet").val();
        var _siparisNotu = $(".siparisNotu").val();
        var _masaID = $("#MasaID").val();

        $.post("/SiparisServices/KasiyerUrunEkle", { siparis: _siparis, gosterimDurumu: gosterimDurumu, masaID: _masaID, headers: { 'Content-Type': 'application/json' } }).done(function (response) {
            if (response.State == 0) {
                console.log("Urun Ekleme DAta", response.Data);
                alert("Ürün Eklendi");
                KasiyerMasaSiparis.GetList(_siparis.MasaID);
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Ürün Ekleme Sırasında Hata Oldu! Lütfen Tekrar Deneyiniz") });
    };

    var MutfagaGonder = function (_siparis) {

        var _urunid = $("#UrunID").val();
        var _adet = $(".urunSiparisAdet").val();
        var _siparisNotu = $(".siparisNotu").val();
        debugger;
        $.post("/SiparisServices/KasiyerUrunMutfak", { siparis: _siparis }).done(function (response) {
            if (response.State == 0) {
                alert("Ürün Mutfağa Gönderildi");
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Ürün Mutfağa Gönderme Sırasında Hata Oldu! Lütfen Tekrar Deneyiniz") });
    };


    var UrunSecenekGrupBuilder = function (urunSecenekGrups) {
        var _container = $('<div class="urun-secenek-grups"></div>');
        for (var i = 0; i < urunSecenekGrups.length; i++) {
            var urunSecenekGrupsItem = urunSecenekGrups[i];
            var panelCollapse = $('<div class="panel panel-collapse"></div>').appendTo(_container);
            var panelCollapseHeader = $('<div class="panel-heading" role="tab" id="heading' + i + '"></div>').appendTo(panelCollapse);
            var panelCollapseTitle = $('<h4 class="panel-title"></h4>').appendTo(panelCollapseHeader);
            var panelCollapseTitleLink = $('<a data-toggle="collapse" data-parent="#accordion" href="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i + '" class="collapsed"></a>').appendTo(panelCollapseTitle);
            var panelCollapsHeeaderText = $('<b>' + urunSecenekGrupsItem.Ad + '</b>').appendTo(panelCollapseTitleLink);
            var panelCollapseBody = $('<div id="collapse' + i + '" class="collapse in" role="tabpanel" aria-labelledby="heading' + i + '" aria-expanded="false" ></div>').appendTo(panelCollapse);
            var panelCollapsePanelBody = $('<div class="panel-body"></div>').appendTo(panelCollapseBody);
            var grup = $('<div></div>').appendTo(panelCollapsePanelBody);
            UrunSecenekGrupRelBuilder(urunSecenekGrupsItem).appendTo(grup);
        }
        return _container;
    }
    var UrunSecenekGrupRelBuilder = function (urunGrup) {
        var _content = $('<div class="urun-secenek-grup" data-id="' + urunGrup.ID + '"></div>');
        var UrunSecenekGrupHidden = $('<input type="hidden" value="' + urunGrup.ID + '" name="UrunSecenekGrupRelID" />').appendTo(_content);
        var SingleAdd = function (urunSecenekGrupRelsItem) {
            siparisUrunSecenekListManager.add({
                ID: null,
                UrunSecenekGrupRelID: urunSecenekGrupRelsItem.ID,
                Fiyat: urunSecenekGrupRelsItem.Fiyat,
                Adet: 1,
                SiparisDurum: "?"
            });
            console.log("hi");
        }
        var MultipleAdd = function (urunSecenekGrupRelsID, urunSecenekGrupRels) {
            var urunSecenekGrupRelsItem = null;
            for (var i = 0; i < urunSecenekGrupRels.length; i++) {
                siparisUrunSecenekListManager.remove(urunSecenekGrupRels[i].ID)
                if (urunSecenekGrupRels[i].ID == urunSecenekGrupRelsID) urunSecenekGrupRelsItem = urunSecenekGrupRels[i];
            }
            if (urunSecenekGrupRelsItem)
                siparisUrunSecenekListManager.add({
                    ID: null,
                    UrunSecenekGrupRelID: urunSecenekGrupRelsItem.ID,
                    Fiyat: urunSecenekGrupRelsItem.Fiyat,
                    Adet: 1,
                    SiparisDurum: "?"
                });
            console.log("hi");
        }
        var checkboxInputAction = function (input, urunSecenekGrupRelsItem) {
            input.click(function () {
                if (input.is(':checked')) {
                    SingleAdd(urunSecenekGrupRelsItem);
                } else {
                    siparisUrunSecenekListManager.remove(urunSecenekGrupRelsItem.ID)
                }
            });
        }
        var selectInputAction = function (input, urunSecenekGrupRels) {
            input.change = function () {
                MultipleAdd(input.val(), urunSecenekGrupRels)
            }
        }
        var radioInputAction = function (input, urunSecenekGrupRels) {
            console.log("radioInputAction", input);
            input.find("input").change(function () {
                MultipleAdd($(this).val(), urunSecenekGrupRels);
            });
        }
        /*Aktif Pasif*/
        if (urunGrup.GorunumTipi == 0) {
            for (var i = 0; i < urunGrup.UrunSecenekGrupRels.length; i++) {
                var urunSecenekGrupRelsItem = urunGrup.UrunSecenekGrupRels[i];
                var urun_secenek = $('<div class="urun-secenek switch-item text-left" ></div>').appendTo(_content);
                var title = $('<b>' + urunSecenekGrupRelsItem.UrunSecenek.Ad + '</b>').appendTo(urun_secenek);
                var label = $('<label class="switch ">').appendTo(urun_secenek);
                var durum = '';
                if (urunSecenekGrupRelsItem.DefaultDeger) {
                    durum = 'checked="checked"'
                };
                var input = $('<input type="checkbox"  ' + durum + ' class="success" value="' + urunSecenekGrupRelsItem.ID + '" name="SiparisUrunSecenek[]" />').appendTo(label);
                var span = $('<span class="slider round"></span>').appendTo(label);
                checkboxInputAction(input, urunSecenekGrupRelsItem);
            }
        }
        if (urunGrup.GorunumTipi == 1) {
            var urunSecenekRadio = $('<div class="urun-secenek-radio"></div>').appendTo(_content);
            for (var i = 0; i < urunGrup.UrunSecenekGrupRels.length; i++) {
                var urunSecenekGrupRelsItem = urunGrup.UrunSecenekGrupRels[i];
                var radio = $('<div class="radio"></div>').appendTo(urunSecenekRadio);
                var label = $('<label></label>').appendTo(radio);
                var durum = '';
                if (urunSecenekGrupRelsItem.DefaultDeger) {
                    durum = 'checked="checked"'
                };
                var input = $('<input type="radio" ' + durum + ' value="' + urunSecenekGrupRelsItem.ID + '" name="SiparisUrunSecenek[]" />').appendTo(label);
                var cr = $('<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>').appendTo(label);
                var fiyat = "";
                if (urunGrup.UrunSecenekGrupRels[i].Fiyat != 0) { fiyat = '(' + urunGrup.UrunSecenekGrupRels[i].Fiyat + ' ₺)' }
                var titlr = $('<span>' + urunGrup.UrunSecenekGrupRels[i].UrunSecenek.Ad + ' ' + fiyat + '</span>').appendTo(label);
                radioInputAction(radio, urunGrup.UrunSecenekGrupRels);
            }
        }

        if (urunGrup.GorunumTipi == 2) {
            var urunSecenekChekbox = $('<div class="urun-secenek-checkbox"></div>').appendTo(_content);
            for (var i = 0; i < urunGrup.UrunSecenekGrupRels.length; i++) {
                var urunSecenekGrupRelsItem = urunGrup.UrunSecenekGrupRels[i];
                var checkbox = $('<div class="checkbox"></div>').appendTo(urunSecenekChekbox);
                var label = $('<label></label>').appendTo(checkbox);
                var durum = '';
                if (urunSecenekGrupRelsItem.DefaultDeger) {
                    durum = 'checked="checked"'
                };
                var input = $('<input type="checkbox" value="' + urunSecenekGrupRelsItem.ID + '" ' + durum + ' name="SiparisUrunSecenek[]"/>').appendTo(label);
                var cr = $('<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>').appendTo(label);
                var fiyat = "";
                if (urunGrup.UrunSecenekGrupRels[i].Fiyat != 0) { fiyat = '(' + urunGrup.UrunSecenekGrupRels[i].Fiyat + ' ₺)' }
                var titlr = $('<span>' + urunGrup.UrunSecenekGrupRels[i].UrunSecenek.Ad + ' ' + fiyat + '</span>').appendTo(label);
                checkboxInputAction(input, urunSecenekGrupRelsItem);
            }
        }
        if (urunGrup.GorunumTipi == 3) {
            var select = $('<select class="form-control" name="SiparisUrunSecenek[]"></select>').appendTo(_content);
            for (var i = 0; i < urunGrup.UrunSecenekGrupRels.length; i++) {
                var urunSecenekGrupRelsItem = urunGrup.UrunSecenekGrupRels[i];
                var durum = '';
                if (urunSecenekGrupRelsItem.DefaultDeger) {
                    durum = 'selected'
                };
                var option = $('<option ' + durum + ' value="' + urunSecenekGrupRelsItem.ID + '">' + urunSecenekGrupRelsItem.UrunSecenek.Ad + '</option>').appendTo(select);
            }
            selectInputAction(select, urunGrup.UrunSecenekGrupRels);
        }
        if (urunGrup.GorunumTipi == 4) {
            var urunSecenek = $('<div class="urun-secenek"></div>').appendTo(_content);
            var badge = $('<div class="badge-checkboxes"></div>').appendTo(_content);
            var title = $('<label>Lütfen istediğiniz ürünleri seçiniz</label>').appendTo(badge);
            var badge_content = $('<div></div>').appendTo(badge);

            for (var i = 0; i < urunGrup.UrunSecenekGrupRels.length; i++) {
                var urunSecenekGrupRelsItem = urunGrup.UrunSecenekGrupRels[i];
                var label = $('<label class="checkbox-inline"></label>').appendTo(badge_content);
                var durum = '';
                if (urunSecenekGrupRelsItem.DefaultDeger) {
                    durum = 'checked="checked"'
                };
                var input = $('<input type="checkbox" ' + durum + ' value="' + urunSecenekGrupRelsItem.ID + '"  name="SiparisUrunSecenek" />').appendTo(label);
                var span = $('<span class="badge">Ketçap</span>').appendTo(label);
                checkboxInputAction(input, urunSecenekGrupRelsItem);
            }
        }
        return _content;
    }

    return {
        GetMenuKategori: GetMenuKategori,
        GetMenuUrun: GetMenuUrun,
        SiparisEkle: SiparisEkle,
        MutfagaGonder: MutfagaGonder,
        UrunFiyat: UrunFiyat
    }
})();