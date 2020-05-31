import React from 'react'
import 'ol/ol.css';
import { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM'
import Stamen from 'ol/source/Stamen'
import {fromLonLat} from 'ol/proj';
import LayerSwitcher from './switcher/layerswitcher'
import {defaults as defaultControls,Attribution} from 'ol/control';


var attribution = new Attribution({
  collapsible: true
});

const MapHook= ()=>{

  const [zoom,setZoom] = useState(6) 
  const [center,setCenter] = useState([ 32.229763,36.647894])


  const map = new Map({
    controls: defaultControls({attribution: false}).extend([attribution]),
    layers: [
      new TileLayer({
        source: new Stamen({
          layer: 'terrain',
        }),
        title: 'Terrain',
        type: 'base'
      }),
      new TileLayer({
        source: new OSM({
          "url": "http://{a-c}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
        }),
        title: 'Carto',
        type: 'base'
      }),
      new TileLayer({
        source: new OSM({
          "url": "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
        }),
        title: 'Wikimedia',
        type: 'base'
      }),
      new TileLayer({
        source: new OSM({
          "url": "https://maps-cdn.salesboard.biz/styles/klokantech-3d-gl-style/{z}/{x}/{y}.png"
        }),
        title: 'Klokantech',
        type: 'base'
      }),
      new TileLayer({
        source: new OSM(),
        title: 'Open Street',
        type: 'base'
      })
    ],
    view: new View({
        center: fromLonLat(center),
        zoom: zoom,
    })

})
map.addControl(new LayerSwitcher());

    useEffect(() => {
      map.setTarget('map')
        map.on(['click'], function(event) { 
          console.log(event)
          // vectorLayer.getFeatures(event.pixel).then(function(features) { 
          //   console.log('feaure' , features)
          //   var feature = features[0];
          //   if(!feature) return
          //   var fid = feature.values_.NAME;
          //   console.log(fid)
          //   // vectorLayer.changed()
          // })
        })
    }, []);


    
    return (
        <div id="map" className="map" style={{height:'500px', with:'100%'}}></div>

)
}

export default MapHook