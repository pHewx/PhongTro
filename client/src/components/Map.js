import React from "react";
import GoogleMapReact from "google-map-react";
import icons from "../ultils/icons";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap({ coords }) {
  const { HiLocationMarker } = icons;

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAZUfNCb9pYD-duM2Oq09tQDAtpxt9n2sE" }}
        defaultCenter={defaultProps.center}
        defaultZoom={11}
        center={coords}
      >
        <AnyReactComponent
          lat={coords.lat}
          lng={coords.lng}
          text={<HiLocationMarker color="red" size={24} />}
        />
      </GoogleMapReact>
    </div>
  );
}
