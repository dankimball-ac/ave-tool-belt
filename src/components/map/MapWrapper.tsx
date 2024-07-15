import dynamic from 'next/dynamic'
import { Skeleton } from '@mui/material'
import { memo, useMemo } from 'react'

type MapWrapperProps = {
  center?: [number, number]
  zoom?: number
  mapHeight?: number | string
  route?: number[][]
}

const MapWrapper = ({
  center,
  zoom,
  mapHeight,
  route,
}: MapWrapperProps) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map/Map'), {
        loading: () => (
          <Skeleton variant="rectangular" height={mapHeight ?? 400} />
        ),
        ssr: false,
      }),
    [mapHeight]
  )

  const mapProps = useMemo(
    () => ({
      center,
      zoom,
      mapHeight,
      route,
    }),
    [center, zoom, mapHeight, route]
  )

  return <Map {...mapProps} />
}

export default memo(MapWrapper)
