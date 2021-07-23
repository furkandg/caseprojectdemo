var cacheManager = function () {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
    } else {
        // Sorry! No Web Storage support..
    }

    return {
        add: function (name, data) {
            localStorage.setItem(name, JSON.stringify(data));
        },
        get: function (name) {
            if (this.any(name))
                return JSON.parse(localStorage.getItem(name));
            else {
                return null;
            }
        },
        any: function (name) {
            return (localStorage.getItem(name) != null);
        },
        remove: function (name) {
            localStorage.removeItem(name);
        }

    }
}();
jQuery.fn.extend({
    FormFactory: function (params) {
        var ajaxPost = function (ajax, callback, errorback) {
            var _data = JSON.parse(JSON.stringify(ajax.data));
            loadingLoader.start();
            $.ajax({
                type: ajax.type || "POST",
                //crossDomain: true,
                //processData: true,
                //contentType: "application/json; charset=utf-8",
                url: ajax.url,
                data: _data,
                dataType: "json",
                success: function (msg) {
                    var response = msg.hasOwnProperty("d") ? msg.d : msg;
                    console.info(response);
                    if (response.State == "0") {
                        if (callback) {
                            loadingLoader.stop();
                            return callback(response.Data);
                        }

                    } else {
                        loadingLoader.stop();
                        if (errorback)
                            return errorback(response.ErrorMessage);
                    }
                },
                error: function (xhr) {

                    loadingLoader.stop();
                    if (errorback)
                        return errorback(xhr.message);
                    alertScreenError(xhr.status + " - " + xhr.statusText);
                    console.error(xhr, ajax);
                }
            });
        }

        if (params.validations) {
            for (validationIndex in params.validations) {
                $("#" + validationIndex).rules("remove");
                $("#" + validationIndex).rules("add", params.validations[validationIndex]);
            }
        }

        var ajax = params.ajax || undefined;
        if (params.url) {
            ajax = { url: params.url };
        }

        $(this).submit(function (evt) {
            evt.preventDefault();
            var postData = $(this).serializeForm();
            if (!$(this).valid()) {
                console.info($(this).data("validator"), postData);
                return false;
            }
            if (params.customValidation) {
                var customValid = params.customValidation(postData);
                if (!customValid) {
                    return false;
                }
            }
            if (params.addExtraData) {
                var valid = params.addExtraData(postData);
                if (valid != undefined) {
                    if (!valid) {
                        console.info(postData);
                        return false;
                    }
                }
            }

            if (ajax) {
                ajax.data = postData;
                ajaxPost(ajax, (params.callback || undefined), (params.errorback || undefined));
            }
            else
                if (params.callback)
                    return params.callback(postData);
        });
    }
});
function notify(params) {
    $.growl({
        icon: params.icon || "fa fa-comments",
        title: params.title || "",
        message: params.message || "",
        url: ''
    }, {
        element: 'body',
        type: params.type || "inverse",
        allow_dismiss: true,
        placement: {
            from: params.from || "top",
            align: params.align || "left"
        },
        offset: {
            x: 20,
            y: 140
        },
        spacing: 10,
        z_index: 1031,
        delay: params.delay || 10000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: params.animIn || "",
            exit: params.animOut || ""
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
                        '<button type="button" class="close" data-growl="dismiss">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '<span class="sr-only">Close</span>' +
                        '</button>' +
                        '<span data-growl="icon"></span>' +
                        '<span data-growl="title"></span>' +
                        '<span data-growl="message"></span>' +
                        '<a href="#" data-growl="url"></a>' +
                    '</div>'
    });
};
var ilceManager = function () {
    var ilcelerAll = [
         {
             "attributes": {
                 "OBJECTID": 23,
                 "ILCE_ID": 1,
                 "ILCE_ADI": "ADALAR",
                 "ILCE_UAVT": 1103,
                 "NUFUS": 14552,
                 "BASKAN": "Atilla AYKAÇ",
                 "BELEDIYE_ADRES": "Büyükada Semti Altınordu Cad. No:21  ADALAR X",
                 "BELEDIYE_TELEFON": "(216) 382 7850 - Fax:(216) 382 6785",
                 "KAYMAKAM": "Mevlüt KURBAN",
                 "KAYMAKAM_ADRES": "Büyükada Semti Çankaya Cad. Albayrak Sok. No:44 ADALAR",
                 "KAYMAKAM_TELEFON": "(216) 382 6017-5005 - Fax:(216) 382 6017",
                 "OBJE_ADI": 483,
                 "COORDX": 424042.43910462,
                 "COORDY": 4526827.8292547,
                 "YAKA": 1,
                 "SHAPE_Length": 58207.33231799839,
                 "SHAPE_Area": 11283903.68549796
             }
         },
         {
             "attributes": {
                 "OBJECTID": 36,
                 "ILCE_ID": 33,
                 "ILCE_ADI": "ARNAVUTKÖY",
                 "ILCE_UAVT": 2048,
                 "NUFUS": 206299,
                 "BASKAN": "A.Haşim BALTACI",
                 "BELEDIYE_ADRES": "Merkez Mah. Genç Osman Cad.No:19 ARNAVUTKÖY",
                 "BELEDIYE_TELEFON": "(212) 597 1464-65 - Fax:(212) 597 0057",
                 "KAYMAKAM": "Hürrem AKSOY",
                 "KAYMAKAM_ADRES": "Merkez Arnavutköy Mah.Yıldırım Beyazit Cad. No:37 Kat:4  ARNAVUTKÖY",
                 "KAYMAKAM_TELEFON": "(212) 597 2487 - Fax:(212) 597 4685",
                 "OBJE_ADI": 483,
                 "COORDX": 388034.21695062,
                 "COORDY": 4566611.85278451,
                 "YAKA": 2,
                 "SHAPE_Length": 212730.72041430112,
                 "SHAPE_Area": 450354956.2463151
             }
         },
         {
             "attributes": {
                 "OBJECTID": 24,
                 "ILCE_ID": 34,
                 "ILCE_ADI": "ATAŞEHİR",
                 "ILCE_UAVT": 2049,
                 "NUFUS": 395758,
                 "BASKAN": "Battal İLGEZDİ",
                 "BELEDIYE_ADRES": "İçerenköy Mah. Kayışdağı  Cad. No :143 Küçükbakkalköy - ATAŞEHİR",
                 "BELEDIYE_TELEFON": "(216) 570 5000 - Fax:(216) 455 4559",
                 "KAYMAKAM": "Turgut ÇELENKOĞLU",
                 "KAYMAKAM_ADRES": "Küçük Bakkalköy Mah. Merdiven Köyü Yolu Sok. No:5 Kat:2  ATAŞEHİR ",
                 "KAYMAKAM_TELEFON": "(216) 577 5114 - Fax:(216) 577 5112",
                 "OBJE_ADI": 483,
                 "COORDX": 426610.65802227,
                 "COORDY": 4539604.42541148,
                 "YAKA": 1,
                 "SHAPE_Length": 28992.10356337021,
                 "SHAPE_Area": 25197706.188200496
             }
         },
         {
             "attributes": {
                 "OBJECTID": 25,
                 "ILCE_ID": 2,
                 "ILCE_ADI": "AVCILAR",
                 "ILCE_UAVT": 2003,
                 "NUFUS": 395274,
                 "BASKAN": "Handan TOPRAK BENLİ",
                 "BELEDIYE_ADRES": "Merkez Mah. Marmara Cad. No.1/2 AVCILAR",
                 "BELEDIYE_TELEFON": "(212) 695 6200 - Fax:(212) 590 4982",
                 "KAYMAKAM": "İsmail GÜNDÜZ",
                 "KAYMAKAM_ADRES": "Cihangir Mah. Reşitpaşa Cad.Bebe Sokak No:5 Kat :4 AVCILAR",
                 "KAYMAKAM_TELEFON": "(212) 590 2890 - Fax:(212) 695 1420",
                 "OBJE_ADI": 483,
                 "COORDX": 391922.22153066,
                 "COORDY": 4544601.16845218,
                 "YAKA": 2,
                 "SHAPE_Length": 53163.29638334007,
                 "SHAPE_Area": 42020915.9709479
             }
         },
         {
             "attributes": {
                 "OBJECTID": 15,
                 "ILCE_ID": 4,
                 "ILCE_ADI": "BAĞCILAR",
                 "ILCE_UAVT": 2004,
                 "NUFUS": 749024,
                 "BASKAN": "Lokman ÇAĞIRICI",
                 "BELEDIYE_ADRES": "Güneşli Mahallesi  Kirazlı Caddesi No:1  34200   BAĞCILAR",
                 "BELEDIYE_TELEFON": "(0212) 410 06 00",
                 "KAYMAKAM": "Erdal ÇAKIR",
                 "KAYMAKAM_ADRES": "İnönü Mahallesi Mehmet Akif Bulvarı 26/10A Sokak No:2  BAĞCILAR",
                 "KAYMAKAM_TELEFON": "(0212) 433 41 76-77",
                 "OBJE_ADI": 483,
                 "COORDX": 402063.145,
                 "COORDY": 4546122.798,
                 "YAKA": 2,
                 "SHAPE_Length": 24240.926307912974,
                 "SHAPE_Area": 22364591.029982608
             }
         },
         {
             "attributes": {
                 "OBJECTID": 8,
                 "ILCE_ID": 5,
                 "ILCE_ADI": "BAHÇELİEVLER",
                 "ILCE_UAVT": 2005,
                 "NUFUS": 600162,
                 "BASKAN": "Osman DEVELİOĞLU",
                 "BELEDIYE_ADRES": "Şirinevler Semti Barbaros Cad. BAHÇELİEVLER",
                 "BELEDIYE_TELEFON": "(212) 441 9453 - Fax:(212) 441 9484",
                 "KAYMAKAM": "Şevket CİNBİR",
                 "KAYMAKAM_ADRES": "Şirinevler Semti Saray Cad. No:1   BAHÇELİEVLER",
                 "KAYMAKAM_TELEFON": "(212) 442 1515-16 - Fax:(212) 442 1717",
                 "OBJE_ADI": 483,
                 "COORDX": 402514.94930082,
                 "COORDY": 4542232.51313326,
                 "YAKA": 2,
                 "SHAPE_Length": 21104.279962640514,
                 "SHAPE_Area": 16618739.569730008
             }
         },
         {
             "attributes": {
                 "OBJECTID": 26,
                 "ILCE_ID": 3,
                 "ILCE_ADI": "BAKIRKÖY",
                 "ILCE_UAVT": 1166,
                 "NUFUS": 221336,
                 "BASKAN": "Bülent KERİMOĞLU",
                 "BELEDIYE_ADRES": "İncirli Semti Şükran Çiftliği Sok. No:1 BAKIRKÖY",
                 "BELEDIYE_TELEFON": "(212) 542 0283 - Fax:(212) 583 1316",
                 "KAYMAKAM": "Dursun Ali ŞAHİN",
                 "KAYMAKAM_ADRES": "Kartaltepe Mah. İncirli Cad. Özgürlük Meydanı No:3 BAKIRKÖY",
                 "KAYMAKAM_TELEFON": "(212) 571 6033 - Fax:(212) 543 8794",
                 "OBJE_ADI": 483,
                 "COORDX": 401880.29762102,
                 "COORDY": 4539193.88821852,
                 "YAKA": 2,
                 "SHAPE_Length": 40678.97765117077,
                 "SHAPE_Area": 29643646.07179176
             }
         },
         {
             "attributes": {
                 "OBJECTID": 27,
                 "ILCE_ID": 35,
                 "ILCE_ADI": "BAŞAKŞEHİR",
                 "ILCE_UAVT": 2050,
                 "NUFUS": 316176,
                 "BASKAN": "Mevlüt UYSAL",
                 "BELEDIYE_ADRES": "Bahçeşehir 2. Kısım Mah. Şehit Gaffar Okan Cad. 34358 BAŞAKŞEHİR",
                 "BELEDIYE_TELEFON": "(212) 692 5500-6000 - Fax:(212) 692 5585",
                 "KAYMAKAM": "Cevdet CAN",
                 "KAYMAKAM_ADRES": "Kanuni Sultan Süleyman Cad. Hükümet Konağı 5.Etap 2. Kısım BAŞAKŞEHİR",
                 "KAYMAKAM_TELEFON": "(212) 488 4940 - Fax:(212) 488 4943",
                 "OBJE_ADI": 483,
                 "COORDX": 395850.55149214,
                 "COORDY": 4552404.9228646,
                 "YAKA": 2,
                 "SHAPE_Length": 62471.49707957042,
                 "SHAPE_Area": 104300135.0358499
             }
         },
         {
             "attributes": {
                 "OBJECTID": 30,
                 "ILCE_ID": 6,
                 "ILCE_ADI": "BAYRAMPAŞA",
                 "ILCE_UAVT": 1886,
                 "NUFUS": 269774,
                 "BASKAN": "Atila AYDINER",
                 "BELEDIYE_ADRES": "Yenidoğan Mah. Abdi İpekçi Cad. No:2 BAYRAMPAŞA",
                 "BELEDIYE_TELEFON": "(212) 467 1900 - Fax:(212) 467 1918",
                 "KAYMAKAM": "Abdülkadir YAZICI",
                 "KAYMAKAM_ADRES": "Yenidoğan Mah. Abdi Ipekçi Cad. Özel İdare İş Merkezi Kat:5 No:150 BAYRAMPAŞA",
                 "KAYMAKAM_TELEFON": "(212) 544 9696-97 - Fax:(212) 544 7404",
                 "OBJE_ADI": 483,
                 "COORDX": 407482.90766092,
                 "COORDY": 4546780.00210128,
                 "YAKA": 2,
                 "SHAPE_Length": 16704.18612359391,
                 "SHAPE_Area": 9607811.805313878
             }
         },
         {
             "attributes": {
                 "OBJECTID": 9,
                 "ILCE_ID": 7,
                 "ILCE_ADI": "BEŞİKTAŞ",
                 "ILCE_UAVT": 1183,
                 "NUFUS": 186067,
                 "BASKAN": "Murat HAZİNEDAR",
                 "BELEDIYE_ADRES": "Nispetiye Mah. Aytar Cad. Bağlık Sokak. No:1  LEVENT",
                 "BELEDIYE_TELEFON": "(212) 444 4455 - Fax:(212) 319 4270",
                 "KAYMAKAM": "Sadettin YÜCEL",
                 "KAYMAKAM_ADRES": "Vişnezade Mah. Dolmabahçe Cad. Çöp İskelesi Sok. No:77 BEŞİKTAŞ",
                 "KAYMAKAM_TELEFON": "(212) 327 3310 - Fax:(212) 327 3311",
                 "OBJE_ADI": 483,
                 "COORDX": 417818.180656,
                 "COORDY": 4549050.65433902,
                 "YAKA": 2,
                 "SHAPE_Length": 27171.88424313011,
                 "SHAPE_Area": 18012413.17707962
             }
         },
         {
             "attributes": {
                 "OBJECTID": 29,
                 "ILCE_ID": 36,
                 "ILCE_ADI": "BEYLİKDÜZÜ",
                 "ILCE_UAVT": 2051,
                 "NUFUS": 229115,
                 "BASKAN": "Ekrem İMAMOĞLU",
                 "BELEDIYE_ADRES": "Büyükşehir Mah.Enver Adakan Cad.No:2 BEYLİKDÜZÜ",
                 "BELEDIYE_TELEFON": "(212) 866 7000 - Fax:(212) 873 0114",
                 "KAYMAKAM": "Yusuf ODABAŞ",
                 "KAYMAKAM_ADRES": "Yakuplu Merkez Mah. Hürriyet Bulvarı No:50 BEYLİKDÜZÜ",
                 "KAYMAKAM_TELEFON": "(212) 876 9966-67 - Fax:(212) 876 9968",
                 "OBJE_ADI": 483,
                 "COORDX": 386077.05487582,
                 "COORDY": 4540013.21405926,
                 "YAKA": 2,
                 "SHAPE_Length": 39055.1587832379,
                 "SHAPE_Area": 37783207.41864833
             }
         },
         {
             "attributes": {
                 "OBJECTID": 28,
                 "ILCE_ID": 8,
                 "ILCE_ADI": "BEYKOZ",
                 "ILCE_UAVT": 1185,
                 "NUFUS": 246352,
                 "BASKAN": "Yücel ÇELİKBİLEK",
                 "BELEDIYE_ADRES": "Gümüşsuyu Mah. Kelle İbrahim Cad.No:43 34820 BEYKOZ",
                 "BELEDIYE_TELEFON": "(216) 322 2504 - Fax:(216) 331 0523",
                 "KAYMAKAM": "Aydın ERGÜN",
                 "KAYMAKAM_ADRES": "Gümüşsuyu Mah. Gümüşsuyu Cad.  Hükümet Konağı BEYKOZ",
                 "KAYMAKAM_TELEFON": "(216) 322 1420 - Fax:(216) 322 1416",
                 "OBJE_ADI": 483,
                 "COORDX": 432704.57749196,
                 "COORDY": 4557343.06301813,
                 "YAKA": 1,
                 "SHAPE_Length": 139535.04559636212,
                 "SHAPE_Area": 310357144.7011854
             }
         },
         {
             "attributes": {
                 "OBJECTID": 31,
                 "ILCE_ID": 9,
                 "ILCE_ADI": "BEYOĞLU",
                 "ILCE_UAVT": 1186,
                 "NUFUS": 246152,
                 "BASKAN": "A.Misbah DEMİRCAN",
                 "BELEDIYE_ADRES": "Şahkulu Mah. Meşrutiyet cad. No:121 Tünel - BEYOĞLU",
                 "BELEDIYE_TELEFON": "(212) 252 7755 - Fax:(212) 252 1100",
                 "KAYMAKAM": "Hasan ŞENSES",
                 "KAYMAKAM_ADRES": "Kuloğlu Mah. İstiklal Cad. No:133 BEYOĞLU",
                 "KAYMAKAM_TELEFON": "(212) 293 6332 - Fax:(212) 293 2039",
                 "OBJE_ADI": 483,
                 "COORDX": 413111.01601229,
                 "COORDY": 4545723.56717678,
                 "YAKA": 2,
                 "SHAPE_Length": 18627.708607341774,
                 "SHAPE_Area": 8908330.575219337
             }
         },
         {
             "attributes": {
                 "OBJECTID": 32,
                 "ILCE_ID": 29,
                 "ILCE_ADI": "BÜYÜKÇEKMECE",
                 "ILCE_UAVT": 1782,
                 "NUFUS": 201077,
                 "BASKAN": "Dr. Hasan AKGÜN",
                 "BELEDIYE_ADRES": "Fatih Mah. Şehremini Sok. No:1 BÜYÜKÇEKMECE",
                 "BELEDIYE_TELEFON": "(212) 444 0340 - Fax:(212) 883 6968",
                 "KAYMAKAM": "İsmail GÜNDÜZ",
                 "KAYMAKAM_ADRES": "Dizdariye Mah. Enver Paşa Cad. No:1 BÜYÜKÇEKMECE",
                 "KAYMAKAM_TELEFON": "(212) 883 1008 - Fax:(212) 883 1005",
                 "OBJE_ADI": 483,
                 "COORDX": 376397.85011162,
                 "COORDY": 4548086.11256276,
                 "YAKA": 2,
                 "SHAPE_Length": 114905.39539598468,
                 "SHAPE_Area": 139168104.67823794
             }
         },
         {
             "attributes": {
                 "OBJECTID": 33,
                 "ILCE_ID": 32,
                 "ILCE_ADI": "ÇATALCA",
                 "ILCE_UAVT": 1237,
                 "NUFUS": 63467,
                 "BASKAN": "Cem KARA",
                 "BELEDIYE_ADRES": "Ferhatpaşa Mah. Ferhatpaşa Cad. No:1 ÇATALCA",
                 "BELEDIYE_TELEFON": "(212) 789 1042-1669-1379 - Fax:(212) 789 1106",
                 "KAYMAKAM": "Yüksel AYHAN",
                 "KAYMAKAM_ADRES": "Kaleiçi Mah.Cumhuriyet Meydanı Hükümet Konağı ÇATALCA",
                 "KAYMAKAM_TELEFON": "(212) 789 1020-5757 - Fax:(212) 789 6262",
                 "OBJE_ADI": 483,
                 "COORDX": 361184.33556221,
                 "COORDY": 4579503.54599807,
                 "YAKA": 2,
                 "SHAPE_Length": 260338.58413474567,
                 "SHAPE_Area": 1115128971.8831367
             }
         },
         {
             "attributes": {
                 "OBJECTID": 34,
                 "ILCE_ID": 37,
                 "ILCE_ADI": "ÇEKMEKÖY",
                 "ILCE_UAVT": 2052,
                 "NUFUS": 193182,
                 "BASKAN": "Ahmet POYRAZ",
                 "BELEDIYE_ADRES": "Merkez Mah. Köroğlu Cad. No:13 ÇEKMEKÖY",
                 "BELEDIYE_TELEFON": "(216) 641 2000 - Fax:(216) 641 2001",
                 "KAYMAKAM": "Mehmet ARSLAN",
                 "KAYMAKAM_ADRES": "Çamlık Mah. Gaziler Cad. No:2 ÇEKMEKÖY",
                 "KAYMAKAM_TELEFON": "(216) 642 9797 - Fax:(216) 641 6563",
                 "OBJE_ADI": 483,
                 "COORDX": 439535.61811125,
                 "COORDY": 4549281.09240026,
                 "YAKA": 1,
                 "SHAPE_Length": 88310.01629474417,
                 "SHAPE_Area": 148091673.67501152
             }
         },
         {
             "attributes": {
                 "OBJECTID": 1,
                 "ILCE_ID": 27,
                 "ILCE_ADI": "ESENLER",
                 "ILCE_UAVT": 2016,
                 "NUFUS": 458694,
                 "BASKAN": "M.Tevfik GÖKSU",
                 "BELEDIYE_ADRES": "Fevzi Çakmak Mah. Fevzi Çakmak Cad.No:71 ESENLER",
                 "BELEDIYE_TELEFON": "(212) 440 1111 - Fax:(212) 568 3443",
                 "KAYMAKAM": "Nazım MADENOĞLU",
                 "KAYMAKAM_ADRES": "Yavuz Selim Mah.İstanbul Cd.No.23 K.5 ESENLER",
                 "OBJE_ADI": 483,
                 "COORDX": 404810.67109293,
                 "COORDY": 4548332.82295239,
                 "YAKA": 2,
                 "SHAPE_Length": 28611.048682854438,
                 "SHAPE_Area": 18432454.414994184
             }
         },
         {
             "attributes": {
                 "OBJECTID": 11,
                 "ILCE_ID": 38,
                 "ILCE_ADI": "ESENYURT",
                 "ILCE_UAVT": 2053,
                 "NUFUS": 553369,
                 "BASKAN": "Necmi KADIOĞLU",
                 "BELEDIYE_ADRES": "Merkez Esenyurt Mah. Doğan Araslı Bulvarı ESENYURT",
                 "BELEDIYE_TELEFON": "(212) 622 0333 - Fax:(212) 622 0399",
                 "KAYMAKAM": "Halil UYUMAZ",
                 "KAYMAKAM_ADRES": "Merkez Mah. Doğan Araslı Bulvarı No:145  ESENYURT",
                 "KAYMAKAM_TELEFON": "(212) 699 7799 - Fax:(212) 620 8401",
                 "OBJE_ADI": 483,
                 "COORDX": 387250.21454337,
                 "COORDY": 4546389.56530879,
                 "YAKA": 2,
                 "SHAPE_Length": 32218.20845965494,
                 "SHAPE_Area": 43127760.70471648
             }
         },
         {
             "attributes": {
                 "OBJECTID": 37,
                 "ILCE_ID": 11,
                 "ILCE_ADI": "EYÜP",
                 "ILCE_UAVT": 1325,
                 "NUFUS": 356512,
                 "BASKAN": "Remzi AYDIN",
                 "BELEDIYE_ADRES": "Nişanca Mah. Feshane Cad. No:42 EYÜP",
                 "BELEDIYE_TELEFON": "(212) 440 3000 - Fax:(212) 440 0449",
                 "KAYMAKAM": "Osman KAYMAK",
                 "KAYMAKAM_ADRES": "İslambey Mah. Kalenderhane Cad. No:49 EYÜP",
                 "KAYMAKAM_TELEFON": "(212) 612 5273-74 - Fax:(212) 612 5275",
                 "OBJE_ADI": 483,
                 "COORDX": 406318.04512098,
                 "COORDY": 4563045.11301489,
                 "YAKA": 2,
                 "SHAPE_Length": 114176.35197883204,
                 "SHAPE_Area": 228313600.44585225
             }
         },
         {
             "attributes": {
                 "OBJECTID": 17,
                 "ILCE_ID": 12,
                 "ILCE_ADI": "FATİH",
                 "ILCE_UAVT": 1327,
                 "NUFUS": 428857,
                 "BASKAN": "Mustafa DEMİR",
                 "BELEDIYE_ADRES": "Akşemsettin Mah. Adnan Menderes Vatan Bulvarı No:54 FATİH",
                 "BELEDIYE_TELEFON": "(212) 453 1453-00 - Fax:(212) 532 5371",
                 "KAYMAKAM": "Hasan KARAKAŞ",
                 "KAYMAKAM_ADRES": "Karagümrük Mah. Vatan Cad.Orduevi Karşısı  FATİH",
                 "KAYMAKAM_TELEFON": "(212) 631 3964 - Fax:(212) 521 2064",
                 "OBJE_ADI": 483,
                 "COORDX": 411587.99058865,
                 "COORDY": 4542731.00222722,
                 "YAKA": 2,
                 "SHAPE_Length": 25746.742620330137,
                 "SHAPE_Area": 16118755.338821072
             }
         },
         {
             "attributes": {
                 "OBJECTID": 22,
                 "ILCE_ID": 13,
                 "ILCE_ADI": "GAZİOSMANPAŞA",
                 "ILCE_UAVT": 1336,
                 "NUFUS": 488258,
                 "BASKAN": "Hasan Tahsin USTA",
                 "BELEDIYE_ADRES": "Merkez Mah. Ordu Cad. Cumhuriyet Meydanı No:20 GAZİOSMANPAŞA",
                 "BELEDIYE_TELEFON": "(212) 453 5000 - Fax:(212) 545 4530",
                 "KAYMAKAM": "Ferhat ÇAĞLAR",
                 "KAYMAKAM_ADRES": "Merkez Mah. Çukurçeşme Cad.Hükümet Konağı Kat:4 GAZİOSMANPAŞA",
                 "KAYMAKAM_TELEFON": "(212) 418 1338 - Fax:(212) 564 0693",
                 "OBJE_ADI": 483,
                 "COORDX": 408142.91515885,
                 "COORDY": 4549547.04946349,
                 "YAKA": 2,
                 "SHAPE_Length": 19758.602329496287,
                 "SHAPE_Area": 11762294.2042032
             }
         },
         {
             "attributes": {
                 "OBJECTID": 35,
                 "ILCE_ID": 14,
                 "ILCE_ADI": "GÜNGÖREN",
                 "ILCE_UAVT": 2010,
                 "NUFUS": 307573,
                 "BASKAN": "Ş.Yücel KARAMAN",
                 "BELEDIYE_ADRES": "Güven Mah. Marmara Cad. Belde Sok.No:38 GÜNGÖREN",
                 "BELEDIYE_TELEFON": "(212) 449 5500 - Fax:(212) 553 7995",
                 "KAYMAKAM": "Seyfettin AZİZOĞLU",
                 "KAYMAKAM_ADRES": "Merkez Mah. Fevzi Çakmak Cad. No:1  GÜNGÖREN",
                 "KAYMAKAM_TELEFON": "(212) 506 6364 - Fax:(212) 504 3485",
                 "OBJE_ADI": 483,
                 "COORDX": 405771.57077083,
                 "COORDY": 4543449.20284109,
                 "YAKA": 2,
                 "SHAPE_Length": 17334.01055863751,
                 "SHAPE_Area": 7213493.086118258
             }
         },
         {
             "attributes": {
                 "OBJECTID": 18,
                 "ILCE_ID": 15,
                 "ILCE_ADI": "KADIKÖY",
                 "ILCE_UAVT": 1421,
                 "NUFUS": 521005,
                 "BASKAN": "Aykurt NUHOĞLU",
                 "BELEDIYE_ADRES": "Hasanpaşa Mah. Kurbağalı Dere Cad. KADIKÖY",
                 "BELEDIYE_TELEFON": "(216) 542 5000 - Fax:(216) 414 3856",
                 "KAYMAKAM": "Hasan KARAHAN",
                 "KAYMAKAM_ADRES": "Caferağa Mah. Bahariye Cad. Kuzukestanesi Sok. No:1 KADIKÖY",
                 "KAYMAKAM_TELEFON": "(216) 338 5290 - Fax:(216) 349 5542",
                 "OBJE_ADI": 483,
                 "COORDX": 421080.85319915,
                 "COORDY": 4538960.87065189,
                 "YAKA": 1,
                 "SHAPE_Length": 41816.52202647767,
                 "SHAPE_Area": 25093342.732300293
             }
         },
         {
             "attributes": {
                 "OBJECTID": 19,
                 "ILCE_ID": 16,
                 "ILCE_ADI": "KAĞITHANE",
                 "ILCE_UAVT": 1810,
                 "NUFUS": 421356,
                 "BASKAN": "Fazlı KILIÇ",
                 "BELEDIYE_ADRES": "Sadabad Hizmet Binası Merkez Mah. Silahtarağa Cad. KAĞITHANE",
                 "BELEDIYE_TELEFON": "(212) 444 2300 - Fax:(212) 294 2053",
                 "KAYMAKAM": "Ahmet NARİNOĞLU",
                 "KAYMAKAM_ADRES": "Merkez Mah.Sadabad Cad. No:36 KAĞITHANE",
                 "KAYMAKAM_TELEFON": "(212) 294 0754-55 - Fax:(212) 294 0765",
                 "OBJE_ADI": 483,
                 "COORDX": 414155.55832689,
                 "COORDY": 4550531.95309144,
                 "YAKA": 2,
                 "SHAPE_Length": 23413.111372898078,
                 "SHAPE_Area": 14868879.74473495
             }
         },
         {
             "attributes": {
                 "OBJECTID": 20,
                 "ILCE_ID": 17,
                 "ILCE_ADI": "KARTAL",
                 "ILCE_UAVT": 1449,
                 "NUFUS": 443293,
                 "BASKAN": "Altınok ÖZ",
                 "BELEDIYE_ADRES": "Karlıktepe Mah. Atatürk Bulvarı Elit Sok. No:3 KARTAL",
                 "BELEDIYE_TELEFON": "(216) 389 5910 - Fax:(216) 353 8580",
                 "KAYMAKAM": "Hasan BAĞCI ",
                 "KAYMAKAM_ADRES": "Kordonboyu Mah.Hükümet  Konağı Cad.Kat.4 KARTAL",
                 "KAYMAKAM_TELEFON": "(216) 389 5910 - Fax:(216) 306 0004",
                 "OBJE_ADI": 483,
                 "COORDX": 433283.8134857,
                 "COORDY": 4531435.03659065,
                 "YAKA": 1,
                 "SHAPE_Length": 35986.59928243495,
                 "SHAPE_Area": 38540471.70410249
             }
         },
         {
             "attributes": {
                 "OBJECTID": 21,
                 "ILCE_ID": 18,
                 "ILCE_ADI": "KÜÇÜKÇEKMECE",
                 "ILCE_UAVT": 1823,
                 "NUFUS": 721911,
                 "BASKAN": "Temel KARADENİZ",
                 "BELEDIYE_ADRES": "Kartaltepe Mah. Süvari Cad. No:16 KÜÇÜKÇEKMECE",
                 "BELEDIYE_TELEFON": "(212) 444 4 360 - Fax:(212) 411 0608",
                 "KAYMAKAM": "H.Osman EBİLOĞLU",
                 "KAYMAKAM_ADRES": "Kartaltepe Mah.Süvari Cad.No.19 KÜÇÜKÇEKMECE",
                 "KAYMAKAM_TELEFON": "(212) 425 2500 - Fax:(212) 425 5120",
                 "OBJE_ADI": 483,
                 "COORDX": 397493.41442824,
                 "COORDY": 4544603.28952252,
                 "YAKA": 2,
                 "SHAPE_Length": 44736.58157021438,
                 "SHAPE_Area": 37539426.47290206
             }
         },
         {
             "attributes": {
                 "OBJECTID": 13,
                 "ILCE_ID": 19,
                 "ILCE_ADI": "MALTEPE",
                 "ILCE_UAVT": 2012,
                 "NUFUS": 460955,
                 "BASKAN": "Ali KILIÇ",
                 "BELEDIYE_ADRES": "Feyzullah Mah. Bağdat Cad. No:52 MALTEPE",
                 "BELEDIYE_TELEFON": "(216) 458 9999 - Fax:(216) 399 7510",
                 "KAYMAKAM": "Ahmet OKUR",
                 "KAYMAKAM_ADRES": "Cevizli Mah. Orhangazi Cad. No:8 MALTEPE",
                 "KAYMAKAM_TELEFON": "(216) 388 7537-8587 - Fax:(216) 366 0710",
                 "OBJE_ADI": 483,
                 "COORDX": 429394.76659841,
                 "COORDY": 4535209.67287051,
                 "YAKA": 1,
                 "SHAPE_Length": 37777.98603273737,
                 "SHAPE_Area": 53992099.296297416
             }
         },
         {
             "attributes": {
                 "OBJECTID": 5,
                 "ILCE_ID": 20,
                 "ILCE_ADI": "PENDİK",
                 "ILCE_UAVT": 1835,
                 "NUFUS": 625797,
                 "BASKAN": "Salih Kenan ŞAHİN",
                 "BELEDIYE_ADRES": "Batı Mah. 23 Nisan Cad. No:11 34890 PENDİK",
                 "BELEDIYE_TELEFON": "444 81 80",
                 "KAYMAKAM": "Cafer ODABAŞ",
                 "KAYMAKAM_ADRES": "Çamçeşme Mah. Aydınlı Cad. Anafartalar Sok. No:2 PENDİK",
                 "KAYMAKAM_TELEFON": "0216 657 02 04 - Fax: 0216 657 02 02",
                 "OBJE_ADI": 483,
                 "COORDX": 445780.178,
                 "COORDY": 4537630.74,
                 "YAKA": 1,
                 "SHAPE_Length": 197195.7536125205,
                 "SHAPE_Area": 180038334.40320876
             }
         },
         {
             "attributes": {
                 "OBJECTID": 4,
                 "ILCE_ID": 39,
                 "ILCE_ADI": "SANCAKTEPE",
                 "ILCE_UAVT": 2054,
                 "NUFUS": 278998,
                 "BASKAN": "İsmail ERDEM",
                 "BELEDIYE_ADRES": "Meclis Mah. Atatürk Cad. No:111 SANCAKTEPE",
                 "BELEDIYE_TELEFON": "(216) 622 3333 - Fax:(216) 621 0306",
                 "KAYMAKAM": "Necmettin KALKAN",
                 "KAYMAKAM_ADRES": "İnönü Mah. Demokrasi Cad. No:12  Sarıgazi - SANCAKTEPE",
                 "KAYMAKAM_TELEFON": "(216) 622 7310 - Fax:(216) 622 7311",
                 "OBJE_ADI": 483,
                 "COORDX": 437993.37694508,
                 "COORDY": 4541869.10381168,
                 "YAKA": 1,
                 "SHAPE_Length": 64381.43806796622,
                 "SHAPE_Area": 62381819.85633102
             }
         },
         {
             "attributes": {
                 "OBJECTID": 14,
                 "ILCE_ID": 21,
                 "ILCE_ADI": "SARIYER",
                 "ILCE_UAVT": 1604,
                 "NUFUS": 289959,
                 "BASKAN": "Şükrü GENÇ",
                 "BELEDIYE_ADRES": "Büyükdere Mah. Çayırbaşı Cad. No:62  SARIYER",
                 "BELEDIYE_TELEFON": "(212) 242 7575 - Fax:(212) 242 9938",
                 "KAYMAKAM": "Ömer KARAMAN",
                 "KAYMAKAM_ADRES": "Ferahevler Mah. Muhtar Cad. No:6",
                 "KAYMAKAM_TELEFON": "(212) 223 4440 - fax:(212) 262 0506",
                 "OBJE_ADI": 483,
                 "COORDX": 417943.60677409,
                 "COORDY": 4562806.00375668,
                 "YAKA": 2,
                 "SHAPE_Length": 112868.68630231434,
                 "SHAPE_Area": 175385439.15252143
             }
         },
         {
             "attributes": {
                 "OBJECTID": 12,
                 "ILCE_ID": 31,
                 "ILCE_ADI": "SİLİVRİ",
                 "ILCE_UAVT": 1622,
                 "NUFUS": 150183,
                 "BASKAN": "Özcan IŞIKLAR",
                 "BELEDIYE_ADRES": "Alibey Mah. Turgut Özal Bulvarı No:87 SİLİVRİ",
                 "BELEDIYE_TELEFON": "(212) 727 2570-75 - Fax:(212) 727 2488",
                 "KAYMAKAM": "Ahmet Mesut DEMİRKOL",
                 "KAYMAKAM_ADRES": "Alibey Mah. Ali Çetinkaya Cad. No:33 SİLİVRİ",
                 "KAYMAKAM_TELEFON": "(212) 727 1001 - Fax:(212) 727 9335",
                 "OBJE_ADI": 483,
                 "COORDX": 347566.16028013,
                 "COORDY": 4562409.49104859,
                 "YAKA": 2,
                 "SHAPE_Length": 170799.3711638117,
                 "SHAPE_Area": 869519960.6304272
             }
         },
         {
             "attributes": {
                 "OBJECTID": 6,
                 "ILCE_ID": 28,
                 "ILCE_ADI": "SULTANBEYLİ",
                 "ILCE_UAVT": 2014,
                 "NUFUS": 302388,
                 "BASKAN": "Hüseyin KESKİN",
                 "BELEDIYE_ADRES": "Abdurrahman Gazi Mah. Belediye Cad. No:4 SULTANBEYLİ",
                 "BELEDIYE_TELEFON": "(216) 564 1300 - Fax:(216) 398 4884",
                 "KAYMAKAM": "Mehmet CEYLAN",
                 "KAYMAKAM_ADRES": "Mehmet Akif Mah. Cami Cad. No:9 SULTANBEYLİ",
                 "KAYMAKAM_TELEFON": "(216) 398 7666 - Fax:(216) 496 1631",
                 "OBJE_ADI": 483,
                 "COORDX": 438928.79899497,
                 "COORDY": 4537060.56302526,
                 "YAKA": 1,
                 "SHAPE_Length": 24049.56647285277,
                 "SHAPE_Area": 29103980.669335157
             }
         },
         {
             "attributes": {
                 "OBJECTID": 10,
                 "ILCE_ID": 40,
                 "ILCE_ADI": "SULTANGAZİ",
                 "ILCE_UAVT": 2055,
                 "NUFUS": 492212,
                 "BASKAN": "Cahit ALTUNAY",
                 "BELEDIYE_ADRES": "Uğur Mumcu Mah. 2347 Sok.No:18 SULTANGAZİ",
                 "BELEDIYE_TELEFON": "(212) 459 3400-02 - Fax:(212) 459 3411",
                 "KAYMAKAM": "Yusuf Ziya ÇELİKKAYA",
                 "KAYMAKAM_ADRES": "Cebeci Mah. 2467 Sok. No.1 Kat:3  Cebeci 2. Ek Hizmet Binası  SULTANGAZİ",
                 "KAYMAKAM_TELEFON": "(212) 606 1870-15 - Fax:(212) 606 1842",
                 "OBJE_ADI": 483,
                 "COORDX": 405470.50264877,
                 "COORDY": 4554673.9813051,
                 "YAKA": 2,
                 "SHAPE_Length": 32323.610347473998,
                 "SHAPE_Area": 36303152.0375342
             }
         },
         {
             "attributes": {
                 "OBJECTID": 7,
                 "ILCE_ID": 30,
                 "ILCE_ADI": "ŞİLE",
                 "ILCE_UAVT": 1659,
                 "NUFUS": 30218,
                 "BASKAN": "Can TABAKOĞLU",
                 "BELEDIYE_ADRES": "Hacı Kasım Mah. Üsküdar Cad. No:1 ŞİLE",
                 "BELEDIYE_TELEFON": "(216) 712 1275-77 - Fax:(216) 711 3585",
                 "KAYMAKAM": "Şükrü GÖRÜCÜ",
                 "KAYMAKAM_ADRES": "Çavuş Mah. Üsküdar Cad. Eski Ağva  Şosesi  ŞİLE",
                 "KAYMAKAM_TELEFON": "(216) 712 1326 - Fax:(216) 711 4278",
                 "OBJE_ADI": 483,
                 "COORDX": 467768.36704809,
                 "COORDY": 4551673.09118131,
                 "YAKA": 1,
                 "SHAPE_Length": 319592.3817407555,
                 "SHAPE_Area": 781715453.51009
             }
         },
         {
             "attributes": {
                 "OBJECTID": 38,
                 "ILCE_ID": 22,
                 "ILCE_ADI": "ŞİŞLİ",
                 "ILCE_UAVT": 1663,
                 "NUFUS": 318217,
                 "BASKAN": "Hayri İNÖNÜ",
                 "BELEDIYE_ADRES": "Esentepe Mah. Büyükdere Cad. No:100-102 ŞİŞLİ",
                 "BELEDIYE_TELEFON": "(212) 288 7576 - Fax:(212) 347 4754",
                 "KAYMAKAM": "Mehmet ÖKLÜ",
                 "KAYMAKAM_ADRES": "Meşrutiyet Mah. Rumeli Cad. No:8 Nişantaşı ŞİŞLİ",
                 "KAYMAKAM_TELEFON": "(212) 232 5050 - Fax:(212) 241 7200",
                 "OBJE_ADI": 483,
                 "COORDX": 415333.50727017,
                 "COORDY": 4552805.80233835,
                 "YAKA": 2,
                 "SHAPE_Length": 20638.97519529934,
                 "SHAPE_Area": 10713025.710908016
             }
         },
         {
             "attributes": {
                 "OBJECTID": 16,
                 "ILCE_ID": 23,
                 "ILCE_ADI": "TUZLA",
                 "ILCE_UAVT": 2015,
                 "NUFUS": 197657,
                 "BASKAN": "Şadi YAZICI",
                 "BELEDIYE_ADRES": "Evliya Çelebi Mah. Hatboyu Cad. No:17 TUZLA",
                 "BELEDIYE_TELEFON": "(216) 446 8600 - Fax:(216) 446 8652",
                 "KAYMAKAM": "Mümin HEYBET",
                 "KAYMAKAM_ADRES": "Evliya Çelebi Mah. Hat Boyu Cad. No:3 TUZLA",
                 "KAYMAKAM_TELEFON": "(216) 395 7823-7999 - Fax:(216) 395 8320",
                 "OBJE_ADI": 483,
                 "COORDX": 446823.50419674,
                 "COORDY": 4528965.1950013,
                 "YAKA": 1,
                 "SHAPE_Length": 105352.74234286508,
                 "SHAPE_Area": 123626721.27704568
             }
         },
         {
             "attributes": {
                 "OBJECTID": 39,
                 "ILCE_ID": 25,
                 "ILCE_ADI": "ÜSKÜDAR",
                 "ILCE_UAVT": 1708,
                 "NUFUS": 535916,
                 "BASKAN": "Hilmi TÜRKMEN",
                 "BELEDIYE_ADRES": "Mimar Sinan Mah. Hakimiyeti Milliye Cad. No:35 ÜSKÜDAR",
                 "BELEDIYE_TELEFON": "(216) 531 3000 - Fax:(216) 531 3244",
                 "KAYMAKAM": "İzzettin KÜÇÜK",
                 "KAYMAKAM_ADRES": "Salacak İmrahor Sinanpaşa Mah. Doğancılar Parkı Karşısı No:182 ÜSKÜDAR",
                 "KAYMAKAM_TELEFON": "(216) 553 0368 - Fax:(216) 310 5466",
                 "OBJE_ADI": 483,
                 "COORDX": null,
                 "COORDY": null,
                 "YAKA": 1,
                 "SHAPE_Length": 37740.304186597656,
                 "SHAPE_Area": 35331579.26102907
             }
         },
         {
             "attributes": {
                 "OBJECTID": 3,
                 "ILCE_ID": 24,
                 "ILCE_ADI": "ÜMRANİYE",
                 "ILCE_UAVT": 1852,
                 "NUFUS": 645238,
                 "BASKAN": "Hasan CAN",
                 "BELEDIYE_ADRES": "Atatürk Mah. Alemdağ Cad. No:1 ÜMRANİYE",
                 "BELEDIYE_TELEFON": "(216) 443 5600 - Fax:(216) 335 3276",
                 "KAYMAKAM": "Mehmet Ali YILDIRIM",
                 "KAYMAKAM_ADRES": "Atatürk Mah. Fatih Sultan Mehmet Cad. Ümraniye Kaymakamlık Binası ",
                 "KAYMAKAM_TELEFON": "(216) 316 5254-2872 - Fax:(216) 344 3708",
                 "OBJE_ADI": 483,
                 "COORDX": 427019.18761548,
                 "COORDY": 4543603.65988753,
                 "YAKA": 1,
                 "SHAPE_Length": 34983.556558582015,
                 "SHAPE_Area": 45376993.26364997
             }
         },
         {
             "attributes": {
                 "OBJECTID": 2,
                 "ILCE_ID": 26,
                 "ILCE_ADI": "ZEYTİNBURNU",
                 "ILCE_UAVT": 1739,
                 "NUFUS": 292407,
                 "BASKAN": "Murat AYDIN",
                 "BELEDIYE_ADRES": "Kazlıçeşme Mah. Abay Cad.No:165 ZEYTİNBURNU",
                 "BELEDIYE_TELEFON": "(212) 413 1111 - 664 5555 - Fax:(212) 413 1212",
                 "KAYMAKAM": "Mustafa DÜNDAR",
                 "KAYMAKAM_ADRES": "Beştelsiz Mah. Semiha Şakir Cad. Adliye Binasi üstü ZEYTİNBURNU",
                 "KAYMAKAM_TELEFON": "(212) 582 1662 - Fax:(212) 546 0067",
                 "OBJE_ADI": 483,
                 "COORDX": 408174.45545438,
                 "COORDY": 4541913.58919158,
                 "YAKA": 2,
                 "SHAPE_Length": 19511.07153621594,
                 "SHAPE_Area": 11594089.953804497
             }
         }
    ];
    var ilceler = [];
    if ($_configData.loginedUserRole == "KurumAdministrator" || $_configData.loginedUserRole == "KurumUser") {
        for (var i = 0; i < ilcelerAll.length; i++) {
            var ilceItem = ilcelerAll[i];
            if ($_configData.loginedUserIlceRels.indexOf(ilceItem.attributes.ILCE_UAVT) != -1) {
                ilceler.push(ilceItem);
            }

        }
    } else {
        ilceler = ilcelerAll;
    }

    var _CheckBoxListFor = function (params) {

        var firstname = params.firstname;
        var lastname = params.lastname;
        var selectedSource = params.selectedSource || null;
        var elem = params.elem;

        var sayhidden = 0;
        var hiddens = $('<div class="hiddens"></div>');
        var _container = $('<div class="group-container"></div>');

        var rnd = Math.floor((Math.random() * 1000000000) + 1);
        var avrupaCount = 0;
        var avrupaPanel = $('<div class="panel panel-collapse"></div>').appendTo(_container);
        $('<div class="panel-heading" role="tab" id="heading1">' +
                        '<h4 class="panel-title">' +
                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse1' + rnd + '" aria-expanded="true" aria-controls="collapse1">' +
                             '   <label>Avrupa Yakası</label>' +
                            '</a>' +
                        '</h4>' +
                    '</div>').appendTo(avrupaPanel);

        var avrupaTabPanel = $('<div id="collapse1' + rnd + '" class="collapse" role="tabpanel" aria-labelledby="heading1"></div>').appendTo(avrupaPanel);
        var avrupaPanelBody = $(' <div class="panel-body"><input type="checkbox" class="select-all"><label>Tümünü Seç</label></div>').appendTo(avrupaTabPanel);

        var anadoluCount = 0;
        var anadoluPanel = $('<div class="panel panel-collapse"></div>').appendTo(_container);
        $('<div class="panel-heading" role="tab" id="heading1">' +
                        '<h4 class="panel-title">' +
                            '<a data-toggle="collapse" data-parent="#accordion" href="#collapse2' + rnd + '" aria-expanded="true" aria-controls="collapse2">' +
                             '   <label>Asya Yakası</label>' +
                            '</a>' +
                        '</h4>' +
                    '</div>').appendTo(anadoluPanel);

        var anadoluTabPanel = $('<div id="collapse2' + rnd + '" class="collapse" role="tabpanel" aria-labelledby="heading1"></div>').appendTo(anadoluPanel);
        var anadoluPanelBody = $(' <div class="panel-body"><input type="checkbox" class="select-all"><label>Tümünü Seç</label></div>').appendTo(anadoluTabPanel);

        for (index in ilceler) {
            var item = ilceler[index];
            var selectedText = "";
            if (item.Selected == true) {
                selectedText = "checked='checked'";
            }
            if (selectedSource != null) {
                var varmi = false;
                for (var i = 0; i < selectedSource.length; i++) {
                    var sourceItem = selectedSource[i].Value;
                    if (sourceItem == item.attributes.ILCE_UAVT) {
                        varmi = true;
                        break;
                    }
                }
                if (varmi) {
                    selectedText = "checked";
                    hiddens.append("<input type='hidden' id='" + firstname + "_" + lastname + "_" + index + "' name='" + firstname + "[" + sayhidden + "]." + lastname + "' value='" + item.attributes.ILCE_UAVT + "' />");
                    sayhidden = sayhidden + 1;
                }
            }

            var cboxItem = $('<label class="mvc-checkboxlistfor">' +
                    '<input type="checkbox" class="mvc-listcheckbox" data-firstname="' + firstname + '" data-yaka="' + item.attributes.YAKA + '" data-lastname="' + lastname + '" value="' + item.attributes.ILCE_UAVT + '" ' + selectedText + ' />' +
                    '<span class="lbl">' + item.attributes.ILCE_ADI + '</span>' +
                '</label>');

            if (item.attributes.YAKA == 1) {
                anadoluCount = anadoluCount + 1;
                anadoluPanelBody.append(cboxItem);

            } else {
                avrupaCount = avrupaCount + 1;
                avrupaPanelBody.append(cboxItem);
            }
            //_container.append(cboxItem);
        }
        _container.append(hiddens);
        $(elem).html(_container);
        if (avrupaCount > 0) {
            $(avrupaPanel).find(".select-all").click(function () {
                if (this.checked) {
                    avrupaPanel.find(".mvc-listcheckbox:unchecked").click();

                } else {
                    avrupaPanel.find(".mvc-listcheckbox:checked").click();
                }
            });
        }
        else {
            avrupaPanel.remove();
        }

        if (anadoluCount > 0) {
            $(anadoluPanel).find(".select-all").click(function () {
                if (this.checked) {
                    anadoluPanel.find(".mvc-listcheckbox:unchecked").click();

                } else {
                    anadoluPanel.find(".mvc-listcheckbox:checked").click();
                }
            });
        } else {
            anadoluPanel.remove();
        }



        _container.find(".mvc-listcheckbox").click(function () {

            var label = $(this).parent();
            var sahip = label.parent();

            var chkbox = $(this);
            var val = chkbox.val();
            var firstname = chkbox.attr("data-firstname");
            var lastname = chkbox.attr("data-lastname");
            adet = hiddens.find("input").length;
            if (chkbox.is(":checked")) {
                hiddens.append('<input type="hidden" id="' + firstname + '_' + lastname + '_' + adet + '" name="' + firstname + '[' + (adet) + '].' + lastname + '" value="' + val + '">');
            }
            else {
                hiddens.find("input[value='" + val + "']").remove();
                var news = "";

                $.each(hiddens.find("input"), function (ind, elem) {
                    news = news + '<input type="hidden" id="' + firstname + '_' + lastname + '_' + ind + '" name="' + firstname + '[' + (ind) + '].' + lastname + '" value="' + $(this).val() + '">';
                });
                hiddens.html(news);
            }
        });
    }

    var _DropdownListFor = function (params) {
        var _select = $('<select id="' + (params.id || "") + '" name="' + (params.name || "") + '"></select>');
        for (index in ilceler) {
            var item = ilceler[index];
            _select.append('<option value="' + item.attributes.ILCE_UAVT + '">' + item.attributes.ILCE_ADI + '</option>');
        }
        _select.attr("data-live-search", "true");
        _select.attr("data-live-search-liveSearchNormalize", "true");
        _select.attr("data-live-search-normalize", "true");
        _select.attr("data-live-search-placeholder", "İlçe Seçiniz");
        $(_select).selectpicker();
        return _select;
    }
    return {
        CheckBoxListFor: _CheckBoxListFor,
        DropdownListFor: _DropdownListFor
    }
}();
$(function () {
    //#region selectpicker load
    $(".selectpicker-live-search").attr("data-live-search", "true");
    $(".selectpicker-live-search").attr("data-live-search-liveSearchNormalize", "true");
    $(".selectpicker-live-search").attr("data-live-search-normalize", "true");
    $(".selectpicker-live-search").attr("data-live-search-placeholder", "Arama metnini giriniz.");

    $(".selectpicker-live-search").selectpicker();
    //#endregion

});
uploaderJsLoaded = false;
RequireUploaderJs = function (callback) {

    if (!uploaderJsLoaded) {
        $("head").append('<script src="/Assets/UploaderJS/UploaderJs.js"></script>');
        $("head").append('<link href="/Assets/UploaderJS/style.css" rel="stylesheet" />');
        $("head").append('<link href="/Assets/Template/MaterialTemp/vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css" rel="stylesheet">');
        $("head").append('<script src="/Assets/Template/MaterialTemp/vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js"></script>');
        uploaderJsLoaded = true;
    }

    if (callback) return callback();
}
var Pager = function () {
    this.container = $('<div class="card form-card"></div>');
    this.header = $('<div class="card-header ch-alt"></div>').appendTo(this.container);
    this.title = $("<h2></h2>").appendTo(this.header);
    this.subTitle = $('<small></small>').appendTo(this.header);
    this.headerActions = $('<ul class="actions"></ul>').appendTo(this.header);
    this.backButton = $('<a href="#"><i class="zmdi zmdi-arrow-back"></i></a>').appendTo(this.headerActions);
    this.toogleButton = $('<a href="#"><i class="zmdi zmdi-window-minimize"></i></a>').appendTo(this.headerActions);
    this.closeButton = $('<a href="#"><i class="zmdi zmdi-close"></i></a>').appendTo(this.headerActions);
    this.toolbar = $('<div class="card-toolbar"></div>').appendTo(this.container);
    this.body = $('<div class="card-body card-padding"></div>').appendTo(this.container);
    this.footer = $('<div class="card-footer text-center"></div>').appendTo(this.container);
    this.before = null;
    this.next = null;
};
var PageManager = function () {

    var before = null;
    var currentPage = null;
    var hiddens = $("<div></div>");
    var parentContainer = "#map";
    var pageContainer = 'form-container';
    var loadPage = function (page) {
        before = page;
        if ($(parentContainer).find("." + pageContainer).length > 0) {
            hiddens.append($(parentContainer).find("." + pageContainer + ">div"));
        }
        else {
            $(parentContainer).prepend('<div class="' + pageContainer + '"></div>');
        }
        $(parentContainer).find("." + pageContainer).html(page.container);
    }
    var loadBeforePage = function (page) {
        page.backButton.click(function () {
            before = page.before;
            $(parentContainer).find("." + pageContainer).html(page.before.container);
        });
    }
    var close = function () {
        before = null;
        hiddens.html("");
        try {
            map.editToolbar.deactivate();
        } catch (e) {

        }

        $(parentContainer).find("." + pageContainer).remove();
    }
    var open = function (params) {
        var page = new Pager();
        page.title.html(params.title || "");
        page.subTitle.html(params.subTitle || "");
        if (Array.isArray(params.headerActions)) {
            for (var i = 0; i < length; i++) {
                page.headerActions.append(params.headerActions[i]);
            }
        }
        page.body.html(params.body || "");
        if (params.toolbar)
            page.toolbar.html(params.toolbar);
        else
            page.toolbar.remove();
        page.footer.html(params.footer || "");
        page.closeButton.click(function () {

            if (params.onClose) {
                params.onClose();
            }

            close();
        });
        page.toogleButton.click(function () {
            $(parentContainer).find("." + pageContainer).toggleClass("page-minimize");
            $(this).find("i").toggleClass("zmdi-window-maximize zmdi-window-minimize ");
        });
        if (before != null) {
            page.before = before;
            loadBeforePage(page);
        }
        else {
            page.backButton.remove();
        }
        loadPage(page);
        return page;
    }
    var back = function () {
        if (before == null) close();
        else loadPage(before);
    }
    return {
        open: open,
        close: close,
        back: back
    }
}();
var CookieManager = function () {
    var Set = function (name, value) {
        var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
    }
    var Get = function (name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }
    var Remove = function (name) {
        document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
    }
    var Any = function (name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        return result != null;
    }
    return {
        Set: Set,
        Get: Get,
        Remove: Remove,
        Any: Any
    }
}();
var Credential = function () {
    this.Email = params.Email || "";
    this.Password = params.Password || "";
}
var Identy = function (params) {
    this.Id = params.Id || "";
    this.Email = params.Email || "";
    this.Name = params.Name || "";
    this.Roles = params.Role || "";
    this.Token = params.Token || "";
}
var ServiceResponse = function (params) {
    this.Data = params.Data || "";
    this.State = params.State || "";
    this.Code = params.Code || "";
    this.Description = params.Description || "";
    this.ErrorMessage = params.ErrorMessage || "";
    this.ValidationErrors = params.ValidationErrors || {};
}
ServiceResponse.prototype.OK = function () {
    return params.State == 0;
}
ServiceResponse.prototype.ERROR = function () {
    return params.State == 1;
}
var LoginManager = function () {
    var _getRoles = function () {
        //return ["administrator", "beyazmasa", "direkekip", "tabelaekip", "duvarekip", "tespit"];
    }
    var _getRole = function () {
        return $_configData.loginedUserRole;
    }
    var _loginControl = function () {
        return CookieManager.Any("login");
    }
    var _login = function (credential) {
        $.post(_LOGIN_SERVICE_URL + "/Login", credential, function (resp) {
            var response = new ServiceResponse(resp);
            if (response.OK()) {
                CookieManager.Set("login", new Identy(response.Data));
            }
            else {
                alert("hata");
            }
        });
    }
    var _logout = function () {
        return CookieManager.Remove("login");
    }
    var _getlogined = function () {
        return new Identy(CookieManager.Set("login"));
    }
    var _hasRole = function (roles, noadmin) {
        var role = _getRole();
        if (role == "administrator" && !noadmin) return true;
        if (!roles) { return false; }
        if (roles.length == 0) return false;
        if (indexOf(roles, "*") > -1) return true;
        return (indexOf(roles, role) > -1);
    }
    var getLoginedUserName = function () {
        return $_configData._LOGINED_USER.Name;
    }
    var getLoginedUserID = function () {
        return $_configData._LOGINED_USER.Id;
    }
    return {
        login: _login,
        getlogined: _getlogined,
        hasRole: _hasRole,
        control: _loginControl,
        getRole: _getRole,
        getLoginedUserName: getLoginedUserName,
        getLoginedUserID: getLoginedUserID

    }
}();
var RendererTemplateManager = function () {
    var rendererTemplates = [
       {
           key: "default",
           label: "Varsayılan"
       },
       {
           key: "kapitespit",
           label: "Kapı Tespit"
       },
       {
           key: "kapimontaj",
           label: "Kapı Çakım"
       },
       {
           key: "duvardirekmontaj",
           label: "Duvar Direk Çakım"
       },
       {
           key: "duvarmontaj",
           label: "Duvar Direk Çakım"
       },
       {
           key: "duvardirektespit",
           label: "Duvar Direk Tespit"
       },
      {
          key: "beyazmasa",
          label: "Beyaz Masa"
      }
    ];
   
    //Set edilir.
    if (!localStorage.getItem("rendererTemplate")) {
        localStorage.setItem("rendererTemplate", "default");
    }
    var _get = function () {
        return localStorage.getItem("rendererTemplate");
    }
    var _set = function (temp) {
        localStorage.setItem("rendererTemplate", temp);
    }
    var _has = function (arr) {
        var _template = _get();
        if (!arr) { return true; }
        if (_template == "default") return true;
        else if (Array.isArray(arr)) {
            return (arr.indexOf(_template) > -1)
        }
        else {
            return (arr == _template);
        }
        return false;
    }
    return {
        get: _get,
        set: _set,
        has: _has,
        getList: function () {
            return rendererTemplates;
        }
    }
}();
if (isMobile()) {
    var $getPageContainer = function () {
        return $('.card.form-card > .card-body');
    }
    var setScroll = function () {
        var $container = $getPageContainer();
        setTimeout(function () {
            $container.attr("style", "height:150px !important");
        }, 100);
        var _offset = $(this).parents(".form-group").offset();
        var toScroll = _offset.top - $container.offset().top + $container.scrollTop();
        $container.animate({
            scrollTop: toScroll
        }, 100);
    }
    var removeScroll = function () {
        $getPageContainer().removeAttr("style");
    }
    $(document).on("focus", ".card.form-card > .card-body input.form-control", setScroll);
    $(document).on("blur", ".card.form-card > .card-body input.form-control", removeScroll);
    $(document).on("focus", ".card.form-card > .card-body textarea.form-control", setScroll);
    $(document).on("blur", ".card.form-card > .card-body textarea.form-control", removeScroll);
}
$(document).on("keyup input", ".form-control", function (e) {
    if (e.which == 13) {
        var _next = $(this).parents(".form-group").nextAll('.form-group:first').find(".form-control");
        _next.focus();
    }
});
$(document).keydown(function (e) {

    if (e.keyCode == 113 && active_form_saveButton) {
        active_form_saveButton.click();

    }
});
$(document).on("focus", ".form-control", function () {
    // $(".form-group").removeClass("on-focus");
    $(this).parents(".form-group").addClass("on-focus");
});
$(document).on("blur", ".form-control", function () {
    //  $(".form-group").removeClass("on-focus");
    $(this).parents(".form-group").removeClass("on-focus");
});
$.fn.trUpperCase = function () {

   
    $(this).val(function () {
        return this.value.toLocaleUpperCase();
    });

    //dom.value = dom.value.replace(new RegExp('ğ', 'g'), 'Ğ');
    //dom.value = dom.value.replace(new RegExp('ü', 'g'), 'Ü');
    //dom.value = dom.value.replace(new RegExp('ş', 'g'), 'Ş');
    //dom.value = dom.value.replace(new RegExp('i', 'g'), 'İ');
    //dom.value = dom.value.replace(new RegExp('ö', 'g'), 'Ö');
    //dom.value = dom.value.replace(new RegExp('ç', 'g'), 'Ç');
    //dom.value = dom.value.replace(new RegExp('ı', 'g'), 'I');
    //dom.value = dom.value.toUpperCase();
};