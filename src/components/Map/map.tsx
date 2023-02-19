import { useMemo, useState } from 'react';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import Marker from 'react-google-maps/lib/components/Marker';
import Polygon from 'react-google-maps/lib/components/Polygon';

const options = { closeBoxURL: '', enableEventPropagation: true };

interface GuessCoords {
  lat?: number;
  lng?: number;
}

const optionsPolyline = {
  strokeColor: 'red',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#085daa',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};

const Map = () => {
  const centerMap = useMemo(() => ({ lat: 21.027763, lng: 106 }), []);
  const [guessCoords, setGuessCoords] = useState<
    | GuessCoords[]
    | google.maps.MVCArray<google.maps.LatLng>
    | (google.maps.LatLng | google.maps.LatLngLiteral)[]
    | undefined
    | any
  >([]);

  const handleMapClick = (e: google.maps.KmlMouseEvent | google.maps.IconMouseEvent | any) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    setGuessCoords((prev: any) => [...prev, { lat, lng }]);
  };

  return (
    <div>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 21.027763, lng: 106 }}
        center={centerMap}
        mapTypeId="roadmap"
        onClick={(e: google.maps.KmlMouseEvent | google.maps.IconMouseEvent) => handleMapClick(e)}
        options={{ streetViewControl: false }}
      >
        {guessCoords &&
          guessCoords.map((position: any, index: any) => (
            <div>
              <Marker position={new window.google.maps.LatLng(position)} key={index}>
                <InfoBox options={options} key={index}>
                  <>
                    <div style={{ backgroundColor: 'green', color: 'white', borderRadius: '1em', padding: '0.2em' }}>
                      {position.label}
                    </div>
                  </>
                </InfoBox>
              </Marker>
            </div>
          ))}
        <Polygon path={guessCoords} options={optionsPolyline} />
      </GoogleMap>
    </div>
  );
};

export default withScriptjs(withGoogleMap(Map));
