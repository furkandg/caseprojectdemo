var Mutfak = (function () {


    getList = function () {
        var str = $.cookie("mutfakkategorilistesix");
        try {
            return JSON.parse(str);
        } catch (e) {
            return [];
        }
    }
    clearList = function () {
        $.cookie("mutfakkategorilistesix", null, { expires: -1 });
    }

    saveList = function (list) {
        clearList();
        $.cookie("mutfakkategorilistesix", JSON.stringify(list), { expires: 7 });
    }

    add = function (kategoriID) {
        var list = getList() || [];
        remove(kategoriID);
        list.push(kategoriID);
        saveList(list);
    }
    remove = function (kategoriID) {
        var list = getList();
        try {
            for (var i = 0; i < list.length; i++) {
                if (kategoriID == list[i]) {
                    list.splice(i, 1);
                    break;
                }
            }
            saveList(list);
        } catch (e) { }
    }

    var GetMekanKategori = function () {
        var mekanKategoriDom = $(".mekanKategorileriModal");
        $.post("/MenuServices/GetKasiyerMenuKategori").done(function (response) {
            if (response.State == 0) {
                var content = "";
                $.each(response.Data, function (index) {
                    _data = response.Data[index];
                    var _menukategori = $('<div class="checkbox col-md-6"></div>').appendTo(mekanKategoriDom);
                    var _checkboxLabel = $('<label></label>').appendTo(_menukategori).text(_data.KategoriAdi);

                    var _checked = "";
                    if (getList().indexOf(_data.ID.toString()) != -1) {
                        _checked = 'checked="checked"';
                    }

                    var _checkbox = $('<input type="checkbox" id="' + _data.ID + '" ' + _checked + '>').appendTo(_checkboxLabel).click(function () {
                        if ($(this).prop("checked")) {
                            add($(this).attr("id"));
                            console.log("add");
                        }
                        else {
                            remove($(this).attr("id"));
                            console.log("remove");
                        }
                    });
                    var _checkboxIcon = $('<span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>').appendTo(_checkboxLabel);
                });
            }
            else
                alert(response.ErrorMessage);
        }).fail(function () { alert("Menü Kategorileri Getirilemedi") });
    }


    //var mutfakSiparisListDom = function () { return $('.mutfak-siparis-list') };

    var LoadSiparisItem = function (Siparis) {
        console.log(Siparis);

        var _tabContent = $(".mutfak-siparis-list-" + Siparis.Durum);
        var _eskiMedia = _tabContent.find('[data-id="' + Siparis.ID + '"]');
        if (_eskiMedia.length > 0) {
            var _media = _eskiMedia;
            _media.html("");
        }
        else {
            var _media = $('<div class="media mutfak-durum-' + Siparis.Durum + '" data-id="' + Siparis.ID + '"></div>').appendTo(_tabContent);
        }

        var _mediaLeft = $('<div class="media-left" style="background-image:url(\'https://web.cepgarson.com' + Siparis.Urun.FotografPath + '\')"></div>').appendTo(_media);

        var _mediaBody = $('<div class="media-body">').appendTo(_media);
        var _mediaHeading = $('<h2 class="media-heading">' + Siparis.Adet + ' Adet - ' + Siparis.Urun.UrunAdi + '</h2>').appendTo(_mediaBody);
        var _secenekList = $('<ul></ul>').appendTo(_mediaBody);
        for (var j = 0; j < Siparis.SiparisUrunSecenekList.length; j++) {
            var urunSecenekList = Siparis.SiparisUrunSecenekList[j];
            var _secenek = $('<li>' + urunSecenekList.UrunSecenekGrupRel.UrunSecenek.Ad + '</li>').appendTo(_secenekList);
        }
        var siparisNotu = $('<p class="siparisNotu">' + (Siparis.SiparisNotu || "") + '</p>').appendTo(_mediaBody);
        var _time = $('<div><b>' + Siparis.Oturum.Masa.MasaAdi + '</b> - ' + parseJsonDate(Siparis.SiparisTarihi) + '</div>').appendTo(_mediaBody);
        var _meadiRight = $('<div class="media-right">').appendTo(_media);

        if (Siparis.Durum == 4) {
            _media.addClass("mutfak-durum-4");
            var _h = $('<h4>İptal Edildi<h4>').appendTo(_meadiRight);
            var _btnKapat = $('<a href="#" class="btn bgm-white" data-id="' + Siparis.ID + '"><i class="zmdi zmdi-close zmdi-hc-fw"></i> Kapat</a>').appendTo(_meadiRight).click(function () {
                _media.remove();
            });
        }
        else {
            if (Siparis.Durum != 21)
                var _btnIptal = $('<a href="#" class="btn bgm-red" data-id="' + Siparis.ID + '"><i class="zmdi zmdi-close zmdi-hc-fw"></i> İptal</a>').appendTo(_meadiRight).click(function () {
                    Bildirim.SiparisDurumDuzenle($(this).data("id"), 21);
                    $(this).parents(".media").remove();
                });

            if (Siparis.Durum != 19)
                var _btnHazirlaniyor = $('<a href="#" class="btn bgm-blue" data-id="' + Siparis.ID + '"><i class="zmdi zmdi-timer zmdi-hc-fw"></i> Hazırlanıyor</a>').appendTo(_meadiRight).click(function () {
                    Bildirim.SiparisDurumDuzenle($(this).data("id"), 19);
                    $(this).parents(".media").attr("class", "media mutfak-durum-19").remove().prependTo($(".mutfak-siparis-list-19"));

                });

            if (Siparis.Durum != 20)
                var _btnHazir = $('<a href="#" class="btn bgm-green" data-id="' + Siparis.ID + '"><i class="zmdi zmdi-check zmdi-hc-fw"></i> Hazır</a>').appendTo(_meadiRight).click(function () {
                    Bildirim.SiparisDurumDuzenle($(this).data("id"), 20);
                    $(this).parents(".media").remove();
                    // MutfakOnay(Siparis.ID);
                });
        }
    }

    /* Mutfak Onay */
    var MutfakOnay = function (_id) {
        $.post("/SiparisServices/MutfakSiparisHazir", { id: _id }, function (response) {
            console.log(response);
        }).fail(function () { alert("Mutfak onaylama sırasında hata oldu"); });
    }
    /* Mutfak Onay */


    /* Bildirimleri Listeleme */
    var LoadMutfakSiparisList = function (Durums) {
        var kategoriIDs = getList();
        $.post("/SiparisServices/GetMutfakSiparisList", { Durums: Durums, kategoriIDs: kategoriIDs }, function (response) {
            $.each(response.Data, function (i, siparis) {
                LoadSiparisItem(siparis);
            });
        });
    }

    var LoadMutfakSiparisItem = function (ID) {
        $.post("/SiparisServices/FindMutfakSiparis", { id: ID }, function (response) {
            if (getList().length == 0 || getList().indexOf(String(response.Data.Urun.MenuKategoriID)) != -1) {
                LoadSiparisItem(response.Data);
            }
        });
    }

    var SiparisBildirimFactory = function (siparisBildirim) {
        /*if (siparisBildirim.YeniDurum == 4) {
            //sipariş verilmiş yada hazırlana sipariş iptal edilince
            LoadMutfakSiparisItem(siparisBildirim.SiparisID);
        }
        else if (siparisBildirim.YeniDurum==2) {
            LoadMutfakSiparisItem(siparisBildirim.SiparisID);
        }
        else if (siparisBildirim.YeniDurum == 18 || siparisBildirim.YeniDurum == 19) {
            LoadMutfakSiparisItem(siparisBildirim.SiparisID);
        }
        else if (siparisBildirim.YeniDurum == 20) {
            LoadMutfakSiparisItem(siparisBildirim.SiparisID);
        }
        else if (siparisBildirim.YeniDurum == 21) {
            LoadMutfakSiparisItem(siparisBildirim.SiparisID);
        }*/
         LoadMutfakSiparisItem(siparisBildirim.SiparisID);
    }
    return {
        LoadMutfakSiparisList: LoadMutfakSiparisList,
        GetMekanKategori: GetMekanKategori,
        getList: getList,
        clearList: clearList,
        remove: remove,
        SiparisBildirimFactory: SiparisBildirimFactory

    }

})();