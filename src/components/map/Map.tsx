import { MAP_DEFAULT_LATITUDE, MAP_DEFAULT_LONGITUDE } from '@/config'
import {

  useTheme,
} from '@mui/material'
import { Map as LeafletMap } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { memo, useEffect, useRef, useState } from 'react'
import { MapContainer, Polyline, TileLayer } from 'react-leaflet'

type MapProps = {
  center?: [number, number]
  zoom?: number
  mapHeight?: number | string
}

const Map = ({
  center,
  zoom,
  mapHeight,
}: MapProps) => {
  const theme = useTheme()
  const [mapRef, setMapRef] = useState<LeafletMap | null>(null)
  const [isPopperOpen, setIsPopperOpen] = useState(false)
  const filtersButtonRef = useRef(null)
  useEffect(() => {
    if (!mapRef) return

    const mapContainer = mapRef.getContainer()

    const handleResize = () => {
      mapRef.invalidateSize()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(mapContainer)

    return () => {
      resizeObserver.disconnect()
    }
  }, [mapRef])

  return (
    <MapContainer
      center={center || [MAP_DEFAULT_LATITUDE, MAP_DEFAULT_LONGITUDE]}
      zoom={zoom || 6}
      scrollWheelZoom={true}
      style={{
        height: mapHeight || 'calc(100% - 80px)',
        minHeight: '400px',
        width: '100%',
      }}
      ref={setMapRef}
    >
 
      <TileLayer
        attribution='&copy; <a href="https://www.openaip.net/">openAIP Data</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-NC-SA</a>)'
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
      />

    </MapContainer>
  )
}

export default memo(Map)
