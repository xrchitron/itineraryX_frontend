<script setup>
import OriginDestinationForm from '../components/OriginDestinationForm.vue';
import DirectionsMapView from '../components/DirectionsMapView.vue';
import RouteList from '../components/RouteList.vue';

</script>
<template>
  <main>
    <OriginDestinationForm />
    <RouteList />
    <DirectionsMapView />
  </main>
</template>