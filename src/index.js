import 'normalize.css/normalize.css';

import 'styles/App.scss';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRndWFuIiwiYSI6ImNpcG50N2s4NDAwNGRmbG5jeXZtMHkxMW4ifQ.ubiXybBxhpidF83H-Zvz7Q';
const map = new mapboxgl.Map({
    container: 'app',
    style: 'mapbox://styles/mapbox/streets-v10'
});

map.on('load', () => {
  map.addSource('pointsSource', {
    type: 'geojson',
    data: {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': [
              112.1484375,
              36.03133177633187
            ]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: 'points',
    source: 'pointsSource',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': 'skyblue'
    }
  });
});
