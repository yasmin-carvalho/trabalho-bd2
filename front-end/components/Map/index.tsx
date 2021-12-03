import { useEffect, useRef, useState } from "react";
import { LatLngExpression, LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Tooltip,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Services from "../../services";

const defaultCenter: LatLngExpression = new LatLng(-22.4126781, -45.4520494);

export default function Map() {
  const [markers, setMarkers] = useState([]);
  const [sigmet, setSigmet] = useState<any>([]);
  const [center, setCenter] = useState(defaultCenter);
  const [modal, setModal] = useState(false);
  const textRef = useRef(null);
  const latRef = useRef(null);
  const longRef = useRef(null);

  const getAerodromes = async () => {
    const response = await Services.redemet.getAerodromes();
    setMarkers(response.data);
  };

  const getSigmet = async () => {
    const response = await Services.redemet.getSigmet();
    setSigmet(response.data);
  };

  useEffect(() => {
    getAerodromes();
    getSigmet();
  }, []);

  return (
    <div className="relative h-screen">
      <h1 className="header">REDEMET</h1>
      <h1 className="sub-header">
        Tenha acesso de modo rápido e seguro a diversas informações
        meteorológicas com a API da REDEMET :)
      </h1>
      <div className="container">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers.map((marker, i) => (
            <Marker key={i} position={[marker.latitude, marker.longitude]}>
              <Popup>
                {marker.metar_message}
                <br />
                <br />
                {marker.taf_message}
              </Popup>
            </Marker>
          ))}
          {sigmet.map((element) => (
            <Polygon
              pathOptions={{ color: `${element.fenomeno_cor}` }}
              positions={element.lat_lon.lat_lon}
            >
              <Tooltip
                sticky
              >{`${element.fenomeno_comp} \u00A0 ${element.id_fir}`}</Tooltip>
            </Polygon>
          ))}
        </MapContainer>
        <h1 className="footer">
          Feito por: Rodrigo Luz, Yasmin Karolyne, Guilherme M. Bortolleto,
          Guilherme de Assis Mello e Luiz Fernando de Souza
        </h1>
      </div>
      <button
        className="rounded-full h-24 w-24 flex items-center justify-center absolute bottom-4 right-4 z-10 bg-gray-500 text-white font-sans font-bold text-lg"
        onClick={() => setModal(true)}
      >
        +
      </button>
      {modal && (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center h-12 rounded-full bg-green-100 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-indigo-500 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Novo ponto
                    </h3>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <label
                        htmlFor="latitude"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        Latitude
                      </label>
                      <input
                        type="text"
                        name="latitude"
                        id="latitude"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={latRef}
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="long"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        Longitude
                      </label>
                      <input
                        type="text"
                        name="long"
                        id="long"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={longRef}
                      />
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor="text"
                        className="block text-sm font-medium text-gray-700 text-left"
                      >
                        Mensagem
                      </label>
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md border-2 px-4 py-2"
                        ref={textRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row justify-between">
                <button
                  type="button"
                  className="flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-300 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="flex justify-center rounded-md border bg-blue-500 shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-white hover:text-indigo-500 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    const marker = {
                      metar_message: textRef.current.value,
                      latitude: latRef.current.value,
                      longitude: longRef.current.value,
                    };

                    setMarkers([{ marker, ...markers }]);
                    setModal(false);
                  }}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
