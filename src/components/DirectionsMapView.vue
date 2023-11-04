<script>
import { EventBus } from '../../EventBus.js';

export default {
  mounted() {
    const map = new google.maps.Map(this.$el, {
      center: { lat: 25.0330, lng: 121.5654 },
      zoom: 15,
      mapTypeId: 'roadmap',
    });
    const directionsService = new google.maps.DirectionsService();
    EventBus.on('routes-data', (routes) => {
    const newMap = new google.maps.Map(this.$el, {
      center: { lat: 25.0330, lng: 121.5654 },
      zoom: 15,
      mapTypeId: 'roadmap',
    });

      routes.forEach((data) => {
        directionsService.route({
          origin: `${data.Origin.lat},${data.Origin.lng}`,
          destination: `${data.Destination.lat},${data.Destination.lng}`,
          travelMode: "DRIVING",
        }, (response, status) => {
          if (status === 'OK') {
            const directionsRenderer = new google.maps.DirectionsRenderer(
              {
                suppressMarkers: true,
                directions: response,
                map: newMap,
                polylineOptions: {
                  strokeColor: data.color,
                  strokeWeight: 8,
                }
              }
            );
            this.createInfoWindowWith(data.Origin, "marker alternate icon", newMap)
            this.createInfoWindowWith(data.Destination, "flag outline icon", newMap)
            
            const overviewPath = response.routes[0].overview_path;
            const middleIndex = parseInt(overviewPath.length / 2);
            const middleLoc = overviewPath[middleIndex];

            const distanceDurationLabel = new google.maps.InfoWindow({
              content: `<i class="icon car"></i>${data.distanceText} - ${data.durationText}`,
              position: new google.maps.LatLng(middleLoc.lat(), middleLoc.lng())
            });
            distanceDurationLabel.open(newMap,  null);

            this.createPolylineWith([
                {lat: data.Origin.lat, lng: data.Origin.lng},
                {lat: overviewPath[0].lat(), lng: overviewPath[0].lng()},
              ], data.color, newMap)
            this.createPolylineWith([
                {lat: data.Destination.lat, lng: data.Destination.lng},
                {lat: overviewPath[overviewPath.length - 1].lat(), lng: overviewPath[overviewPath.length - 1].lng()},
              ], data.color, newMap)
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      })
    });
  },
  methods: {
    createInfoWindowWith(location, icon, map){
      const infoWindow = new google.maps.InfoWindow({
              content: `<i class="${icon}"></i>${location.name}`,
              position: new google.maps.LatLng(location.lat, location.lng)
            });
            infoWindow.open(map,  null);
    },
    createPolylineWith(path, color, map){
      new google.maps.Polyline({
        path,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 8,
        map
      })
    }
  }
}
</script>
<template>
  <section class="map"></section>
</template>
<style scoped>
.map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: turquoise;
}
.gm-style-iw button{
  display: none !important;
}
.gm-style .gm-style-iw-c{
  padding: 5px !important;
}
</style>