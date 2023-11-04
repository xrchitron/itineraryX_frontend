<script>
import axios from 'axios';
import {EventBus} from '../../EventBus.js';
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
    date: "2023-01-01",
    sort: {
      key: 'distance',
      order: 'asc'
    }
  })
  .then((res) => {
    if (res.status === 200) {
      this.routes =[...res.data.data];
    }
  })
  .catch((err) => {
    console.log(err);
  })
},
methods:{
  sortRoute(e){
    const sort = e.target.value;
    const [key, order] = sort.split('-');
    axios
    .post('http://localhost:3000/v1/maps/routes',{
    itineraryId: 1,
    date: "2023-01-01",
    sort: {
      key,
      order
    }
  })
  .then((res) => {
    if (res.status === 200) {
      this.routes =[...res.data.data];
    }
  })
  .catch((err) => {
    console.log(err);
  })
  },
  routeItemPressed(route){
    EventBus.emit('routes-data', [route]); // emit event
  },
  showAllRoutesButtonPressed(){
    EventBus.emit('routes-data', this.routes); // emit event
  }
}
}
</script>
<template>
  <section class="route-list-view">
    <div class="route-list-view-header">
      <h3 class="ui header">Route List</h3>
      <select @change="sortRoute($event)">
        <option selected disable>Sort</option>
        <optgroup label="Distance">
          <option value="distance-asc">short</option>
          <option value="distance-desc">long</option>
        </optgroup>
        <optgroup label="Duration">
          <option value="duration-asc">fast</option>
          <option value="duration-desc">slow</option>
        </optgroup>
      </select>
      <button class="ui button show-all" @click="showAllRoutesButtonPressed">Show All</button>
    </div>
    <div class="item" v-for="route in routes" :key="route.id" @click="routeItemPressed(route)" :style="{'background-color':route.color}">
      <div><i class="marker alternate icon"></i>{{ route.Origin.name }}</div>
      <div><i class="flag checkered icon"></i>{{ route.Destination.name }}</div>
      <div class="ui label small">{{ route.distanceText }}</div>
      <div class="ui label small">{{ route.durationText }}</div>
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
.item:hover{
  background-color: rgba(0,0,0,.1);
}
.show-all{
  padding: 4px 10px;
}
</style>