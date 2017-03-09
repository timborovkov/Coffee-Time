var silverMapStyle = [
          {
            elementType: 'geometry',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{color: '#f5f5f5'}]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{color: '#bdbdbd'}]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#ffffff'}]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{color: '#757575'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#dadada'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#616161'}]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{color: '#e5e5e5'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#eeeeee'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#c9c9c9'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9e9e9e'}]
          }
      ];   

function loaded () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            function loadMap() {
                    var currentLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
                    var map = new google.maps.Map(document.getElementById('map'), {
                        center: currentLocation,
                        zoom: 10,
                        disableDefaultUI: true
                    });
                    mapIsReady(map);
            }
            loadMap()
        });

//////////////////////////////////////////////
        setTimeout(function(){
            var currentLocation = {lat: 60.23221, lng: 24.75370};
            var map = new google.maps.Map(document.getElementById('map'), {
                center: currentLocation,
                zoom: 10,
                disableDefaultUI: true
            });
            mapIsReady(map);  
        },500);          
//////////////////////////////////////////////
    
    } else {
        // No geolocation access
        // For Coffee Time to work properly, we need to access your geolocation
        alert("No geolocation access", "For Coffee Time to work properly, we need to access your geolocation")
    }

    function mapIsReady (map) {
        db.ref("cafes").on('value', function(snapshot){
            var val = snapshot.val();
            for (cafeId in val) {
                if (val.hasOwnProperty(cafeId)) {
                    var cafe = val[cafeId];
                    var marker = new google.maps.Marker({
                        position: {lat: parseFloat(cafe.lat), lng: parseFloat(cafe.lng)},
                        map: map,
                        title: cafe.name,
                        icon: "img/pin.png"
                    });
                    marker.addListener('click', function(){
                        map.setCenter(this.getPosition());
                        for (cafeId in val) {
                            if (val.hasOwnProperty(cafeId)) {
                                var lat = parseFloat(val[cafeId].lat);
                                if (val[cafeId].name == this.getTitle()) {
                                    window.mapClick(val[cafeId]);
                                }
                            }
                        }
                    });
                    marker.setMap(map);
                }
            }
        });
        map.setOptions({styles: silverMapStyle});
    } 
}


if(window.addEventListener){
  window.addEventListener('load', loaded);
}else{
  window.attachEvent('onload', loaded);
}