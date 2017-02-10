import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import gdpInfoList from './data/gdp.csv';
import countryCapitals from './data/countryCapitals.js';
import _ from 'lodash';

import 'normalize.css/normalize.css';
import 'styles/App.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

const FIRST_YEAR = 1961;
const LAST_YEAR = 2015;
const metaList = [];
// Data pipeline
_.forEach(gdpInfoList, d => {
  const res = _.find(countryCapitals, c => c.CountryName == d['Country Name']);
  if (res) {
    metaList.push({
      gdp: d,
      geo: [res.CapitalLongitude, res.CapitalLatitude]
    });
  };
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRndWFuIiwiYSI6ImNpcG50N2s4NDAwNGRmbG5jeXZtMHkxMW4ifQ.ubiXybBxhpidF83H-Zvz7Q';
const map = new mapboxgl.Map({
    container: 'app',
    style: 'mapbox://styles/mapbox/streets-v10',
    attributionControl: false
});

map.on('load', () => {
  const data = {
    'type': 'FeatureCollection',
    'features': []
  };
  map.addSource('pointsSource', {
    type: 'geojson',
    data
  });

  map.addLayer({
    id: 'points',
    source: 'pointsSource',
    type: 'circle',
    paint: {
      'circle-radius': {
        'property': 'radius',
        'type': 'identity'
      },
      'circle-color': 'red',
      'circle-opacity': 0.7
    }
  });

  let year = FIRST_YEAR;
  const yearIndicator = document.querySelector('h2');
  setInterval(function () {
    if (year <= LAST_YEAR) {
      yearIndicator.innerHTML = year;
      const data = {
        'type': 'FeatureCollection',
        'features': []
      };
      _.forEach(metaList, meta => {
        data.features.push({
          'type': 'Feature',
          'properties': {
            radius: meta.gdp[year] / 18036648000000.0 * 60
          },
          'geometry': {
            'type': 'Point',
            'coordinates': meta.geo
          }
        });
      });
      year++;

      map.getSource('pointsSource').setData(data);
    } else {
      setTimeout(function () {
        year = FIRST_YEAR;
      }, 10000);
    }
  }, 300);
});
