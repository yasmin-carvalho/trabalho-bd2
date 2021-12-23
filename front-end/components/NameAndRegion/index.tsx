import { useState } from "react";

import { LatLngExpression, LatLng } from "leaflet";

import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Rectangle,
} from "react-leaflet";

import Multiselect from "multiselect-react-dropdown";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

const defaultCenter: LatLngExpression = new LatLng(-12.3815286, -53.7513932);

const NameAndRegion = ({
  setSearchType,
  setSelectedArea,
  setSelectedAerodromes,
  searchType,
  aerodromesData,
  mapRegionSelected,
}) => {
  const [center, setCenter] = useState(defaultCenter);

  function LocationMarker() {
    useMapEvents({
      click(event) {
        if (mapRegionSelected.length === 0) {
          setSelectedArea([[event.latlng.lat, event.latlng.lng]]);
          return;
        }

        if (mapRegionSelected.length === 1) {
          setSelectedArea([
            mapRegionSelected[0],
            [event.latlng.lat, event.latlng.lng],
          ]);
          return;
        }

        setSelectedArea([]);
      },
    });
    return null;
  }

  return (
    <div className="name-and-region">
      <h1 className="aero-title">Selecione os aeródromos</h1>

      <div className="button-container">
        <button
          type="button"
          onClick={() => {
            setSearchType("region");
            setSelectedArea([]);
          }}
          className="button-item"
        >
          Região no mapa
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchType("name");
            setSelectedAerodromes([]);
          }}
          className="button-item"
        >
          Nome
        </button>
      </div>
      {searchType === "name" && (
        <div className="selectName">
          <Multiselect
            options={aerodromesData}
            displayValue="label"
            placeholder="Nome do aeródromo"
            onSelect={(aerodromes) =>
              setSelectedAerodromes(aerodromes.map((item) => item.code))
            }
            onRemove={(aerodromes) =>
              setSelectedAerodromes(aerodromes.map((item) => item.code))
            }
            showCheckbox
            style={{
              chips: {
                background: "red",
              },
              multiselectContainer: {
                color: "red",
              },
              searchBox: {
                border: "3px solid rgb(17, 10, 10)",
                borderBottom: "3px solid rgb(17, 10, 10)",
                borderRadius: "8px",
                background: "white",
                cursor: "pointer",
              },
            }}
          />
        </div>
      )}

      {searchType === "region" && (
        <div className="selectRegion">
          <MapContainer
            center={center}
            zoom={4}
            scrollWheelZoom={false}
            className="h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker />

            {mapRegionSelected.length === 1 && (
              <Rectangle
                bounds={[mapRegionSelected[0], mapRegionSelected[0]]}
                pathOptions={{ color: "red" }}
              />
            )}
            {mapRegionSelected.length === 2 && (
              <Rectangle
                bounds={mapRegionSelected}
                pathOptions={{ color: "red" }}
              />
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default NameAndRegion;
