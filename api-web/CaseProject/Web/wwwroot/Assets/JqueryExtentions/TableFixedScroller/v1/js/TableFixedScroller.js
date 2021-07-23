$.fn.extend({
    TableFixedScroller: function (params) {

        var tableContainer = $(this);
        var wlist = new Array(); var wcheader;
        $(function () {
            tableContainer.find("thead tr th").each(function (i) {
                wlist.push($(".table thead tr th").eq(i).width());
            });
            wcheader = $(".fixed-card-header").width();
        })

        $(window).scroll(function () {
           
            var sTop = $("body").scrollTop();
            if (sTop > (40 || params.startTop)) {
                
                if ($(".card-header").hasClass("fixed-card-header"))
                {
                    $(".fixed-card-header").addClass("fixed-header")
                    tableContainer.find("thead tr").addClass("fixed-tr");//.css("top", sTop - 120);
                    $(".fixed-card-header").width(wcheader);
                }
                else
                {
                    tableContainer.find("thead tr").addClass("fixed-tr");//.css("top", sTop - 120);
                }
                $.each(wlist, function (index, item) {
                    tableContainer.find("thead tr th").eq(index).width(item);
                    tableContainer.find("tbody tr:first td").eq(index).width(item);
                });

            }
            else {
                tableContainer.find("thead tr").removeClass("fixed-tr");
                $(".fixed-card-header").removeClass("fixed-header")
            }
        });
    },
    TreeSelector: function (params) {
        var container = $(this);

        var options = params || {};
        var treeContainer = container.find(params.treeContainerClass || '.tree');
        treeContainer.find("label").click(function (e) {
            $(this).next('ul').fadeToggle();
            e.stopPropagation();
        });

        treeContainer.find("input[type=checkbox]").change(function (e) {

            $(this).siblings('ul').find("input[type='checkbox']").prop('checked', this.checked);
            $(this).parentsUntil('.all-district').children("input[type='checkbox']").prop('checked', this.checked);
            e.stopPropagation();
        });
        treeControlContainer = $(this).find(params.treeControlContainerClass || '.tree-controls');
        container.find(".getReport").click(function () {
            if (options.btncallback) options.btncallback(container);
        });
       
        treeControlContainer.find("a").on("click", function () {
            switch ($(this).text()) {
                case 'Kapat':
                    treeContainer.find('ul').fadeOut();
                    break;
                case 'Aç':
                    treeContainer.find('ul').fadeIn();
                    break;
                case 'Tümünü Seç':
                    treeContainer.find("input[type='checkbox']").prop('checked', true);
                    break;
                case 'Seçimleri Kaldır':
                    treeContainer.find("input[type='checkbox']").prop('checked', false);
                    break;
                default:
            }
        });
    }
});

