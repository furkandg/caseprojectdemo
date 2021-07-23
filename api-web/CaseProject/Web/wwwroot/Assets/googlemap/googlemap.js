var GoogleMap = function (params) {
    //var domNode = params.domNode || document.getElementById('map');
    this.container = $(params.container);
    var domNode = $(`<div id="map" style="clear:both;"></div>`).appendTo(this.container);
    domNode.css(params.style || { width: "100%", height: "400px" });
    //
    this.map = new google.maps.Map(domNode[0], {
        center: { lat: params.lat, lng: params.long },
        zoom: params.zoom || 13,
        mapTypeId: params.basemap || 'roadmap'
    });
    this.markers = [];
    if (params.searchBoxOptions) {
        this.ActivateSearchBox(params.searchBoxOptions);
    }
    if (params.formOptions) {
        this.ActivateFormEdit(params.formOptions);
    }

}
GoogleMap.Location = function (params) {
    return new google.maps.LatLng(params.lat, params.long);/* {
            lat: function () {
                return params.lat;
            },
            lng: function () {
                return params.long;
            }

        }*/
}
GoogleMap.prototype.OnClick = function (callback) {
    google.maps.event.addListener(this.map, 'click', callback);
}
GoogleMap.prototype.ClearMarkers = function () {
    for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
    }
    this.markers = [];
}

GoogleMap.prototype.AddMarker = function (location, options) {
    var marker = new google.maps.Marker({
        position: location,
        map: this.map
    });
    if (options) {
        if (options.zoom) {
            this.map.setZoom(options.zoom);
            this.map.panTo(marker.position);
        }

    }
    this.markers.push(marker);
}
GoogleMap.prototype.ActivateSearchBox = function (params) {
    var _self = this;
    var $input = $(' <input id="pac-input" class="controls" type="text" placeholder="Arama Yap">').appendTo(this.container);
    var input = $input[0];
    var searchBox = new google.maps.places.SearchBox(input);
    _self.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    _self.map.addListener('bounds_changed', function () {
        searchBox.setBounds(_self.map.getBounds());
    });
    var markers = [];
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: _self.map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        _self.map.fitBounds(bounds);
    });
}
GoogleMap.prototype.ActivateFormEdit = function (params) {
    var _self = this;
    var mevcut = {
        lat: parseFloat(params.latInput.value.replace(",",".")),
        long: parseFloat(params.longInput.value.replace(",", "."))
    };
    console.log(mevcut);
    _self.AddMarker(GoogleMap.Location(mevcut), {
        zoom: 17
    });
    //_self.AddMarker();
    this.OnClick(function (evt) {
        _self.ClearMarkers();
        _self.AddMarker(evt.latLng);
        //console.log(evt.latLng.lat())
        params.latInput.value = evt.latLng.lat().toString().replace('.',',');
        params.longInput.value = evt.latLng.lng().toString().replace('.', ',');
    });
}
GoogleMap.Ready = function (params, callback) {

    if ($("#googleScript").length == 0) {
        GoogleMap.initMap = callback;
        var script = $('<script async defer src="https:\/\/maps.googleapis.com/maps/api/js?key=' + params.key + '&libraries=places&callback=GoogleMap.initMap" type="text/javascript" id="googleScript"><\/script>').appendTo("head");

    }
    else callback();
}
GoogleMap.getLocation = function (callback) {
    $.get("https://ipapi.co/json", function (d) {
        return callback({
            lat: d.latitude,
            long: d.longitude
        });
    });
    //
}