import GoogleMapReact from 'google-map-react'
import { CiLocationOn } from "react-icons/ci";

const MapLocation = ({location, zoomLevel = 3}) => {
  return (
    <div className='w-[4/5] h-[350px] rounded-md overflow-hidden'>
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDWTx7bREpM5B6JKdbzOvMW-RRlhkukmVE' }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
        >
            <CiLocationOn lat={location.lat} lng={location.lng} text={"location"}/>
        </GoogleMapReact>
    </div>
  )
}

export default MapLocation;