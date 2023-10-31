<script>
import axios from 'axios';
export default{
  
  data (){
    return {
      routes: {
        origin: {
        data: {}
        },
        destination: {
        data: {}
        },
        distance: {},
        duration: {}
      },
      error: "",
      spinner: false
    }
  },
  mounted() {
    for (let ref in this.$refs) {
      const autoComplete = new google.maps.places.Autocomplete(
        this.$refs[ref],
        {
          bounds: new google.maps.LatLngBounds(
            new google.maps.LatLng(25.0330, 121.5654)
          ),
        }
      );
      autoComplete.addListener('place_changed', () => {
        const place = autoComplete.getPlace();
        this.routes[ref].data = {
          name: place.name,
          placeId: place.place_id,
          address: place.formatted_address,
          rating: place.rating,
          url: place.url,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
        console.log(place);
      });
    }
  },
  methods: {
    calculateBtn() {
      this.spinner = true;
      const origin = this.routes.origin.data;
      const destination = this.routes.destination.data;
      console.log(origin, destination);
      axios.post('http://localhost:3000/v1/maps/distanceMatrix', {
        origin,
        destination
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
        this.spinner = false;
      }).catch((err) => {
        console.log(err.message);
        this.error = "No results found";
        this.spinner = false;
      })
    }
  }
}
</script>

<template>
  <section class="origin-destination-form">
    <div class="ui form">
      <div class="ui message red small">{{ error }}</div>
      <div class="two fields">
        <div class="field">
          <div class="ui left icon input">
            <i class="marker alternate icon"></i>
            <input type="text" placeholder="Origin" ref="origin">
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <i class="flag outline icon"></i>
            <input type="text" placeholder="Destination" ref="destination">
          </div>
        </div>
        <button class="ui button small blue" :class="{loading: spinner}" @click="calculateBtn">Generate</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.origin-destination-form {
  position: relative;
  z-index: 1;
  max-width: 650px;
  margin: 10px;
}
</style>