mapboxgl.accessToken = 'pk.eyJ1IjoidGF0c2lhbmEtYml2b2luYSIsImEiOiJja3VtbjI2bHYxdDMwMnBuNm45d3ZlaTNjIn0.oTa0fm3ugB-qn3tkb-KQwQ';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center:  [2.3364, 48.86091],
  zoom: 16,
});

const marker1 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([2.3364, 48.86091])
.addTo(map);

const marker2 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3333, 48.8602])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3397, 48.8607])
.addTo(map);


const marker4 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3330, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'gray'})
.setLngLat([2.3365, 48.8625])
.addTo(map);
  
map.addControl(new mapboxgl.NavigationControl());