import React, { useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVzc2FpbjUzMjUiLCJhIjoiY2xlOW8xcXU3MGh1bDNvbW9pdnQxaXdxMCJ9.qkS4CNQ3jiNr6JBz0z84Xw'

function Map(props) {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/hussain5325/cleaxabb1007y01q9sszn8o1d',
      center: [props.lon, props.lat],
      zoom: 12,
    })
    map.addControl(new mapboxgl.NavigationControl())

    const marker = new mapboxgl.Marker({
      color: '#ff0000',
      size: 'large',
      icon: 'marker',
    })
      .setLngLat([props.lon, props.lat])

      .addTo(map)

    return () => {
      map.remove()
    }
  }, [])

  return <div id='map-container' />
}

export default Map
