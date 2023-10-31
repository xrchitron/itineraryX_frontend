<script>
import axios from 'axios';
export default {
  data(){
    return {
      routes:[]
    }
  },
created(){
  axios
  .post('http://localhost:3000/v1/maps/routes',{
    itineraryId: 1,
    date: "2023-01-01"
  })
  .then((res) => {
    if (res.status === 200) {
      this.routes =[...res.data.data];
    }
  })
  .catch((err) => {
    console.log(err);
  })
}
}
</script>
<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3 class="ui header">Route List</h3>
    </div>
    <div class="item" v-for="route in routes" :key="route.id">
      <div>{{ route.Origin.name }}</div>
      <div>{{ route.Destination.name }}</div>
      <div>{{ route.distanceText }}</div>
      <div>{{ route.durationText }}</div>
    </div>
  </section>
</template>
<style scoped>
.route-list-view {
  position: relative;
  z-index: 1;
  max-width: 250px;
  margin: 10px;
  background-color: white;
}
.route-list-view-header {
  padding: 10px;
}
.item{
  padding: 10px;
  cursor: pointer;
}
</style>