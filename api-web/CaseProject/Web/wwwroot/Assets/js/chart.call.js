// Modular doughnut
helpers = Chart.helpers;
var canvas = document.getElementById('modular-doughnut');

var moduleData = [
    {
        value: 4,
        color: "#d30000",
        highlightColor: "#d30000",
        label: "- dangerous species (4)"
    },

    {
        value: 464,
        label: "- undagerous species (464)",
        highlightColor: "#2b8be9",
        color: "#2b8be9"
    }

];

if(jQuery().appear && jQuery("body").hasClass("withAnimation")) {
    jQuery('.chart').appear(function () {
        //
        var moduleDoughnut = new Chart(canvas.getContext('2d')).Doughnut(moduleData, { tooltipTemplate : "<%= value %> species", responsive: true});
        //
        var legendHolder = document.createElement('div');
        legendHolder.innerHTML = moduleDoughnut.generateLegend();
        // Include a html legend template after the module doughnut itself
        helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
            helpers.addEvent(legendNode, 'mouseover', function(){
                var activeSegment = moduleDoughnut.segments[index];
                activeSegment.save();
                activeSegment.fillColor = activeSegment.highlightColor;
                moduleDoughnut.showTooltip([activeSegment]);
                activeSegment.restore();
            });
        });
        helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
            moduleDoughnut.draw();
        });
        canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

    });
}else{
    //
    var moduleDoughnut = new Chart(canvas.getContext('2d')).Doughnut(moduleData, { tooltipTemplate : "<%= value %> species", responsive: true});
    //
    var legendHolder = document.createElement('div');
    legendHolder.innerHTML = moduleDoughnut.generateLegend();

    // Include a html legend template after the module doughnut itself
    helpers.each(legendHolder.firstChild.childNodes, function(legendNode, index){
        helpers.addEvent(legendNode, 'mouseover', function(){
            var activeSegment = moduleDoughnut.segments[index];
            activeSegment.save();
            activeSegment.fillColor = activeSegment.highlightColor;
            moduleDoughnut.showTooltip([activeSegment]);
            activeSegment.restore();
        });
    });
    helpers.addEvent(legendHolder.firstChild, 'mouseout', function(){
        moduleDoughnut.draw();
    });
    canvas.parentNode.parentNode.appendChild(legendHolder.firstChild);

}
