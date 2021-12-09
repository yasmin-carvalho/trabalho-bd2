import { useEffect, useRef, useState } from "react";

import { LatLngExpression, LatLng } from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  MapConsumer,
  Marker,
  Popup,
  Polygon,
  Tooltip,
  Rectangle,
} from "react-leaflet";

import Multiselect from "multiselect-react-dropdown";

import { ButtonGroup, Button, Form, Modal } from "react-bootstrap";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Services from "../../services";

const defaultCenter: LatLngExpression = new LatLng(-22.4126781, -45.4520494);

export default function Map() {
  const [center, setCenter] = useState(defaultCenter);
  const [modal, setModal] = useState(false);
  const textRef = useRef(null);
  const latRef = useRef(null);
  const longRef = useRef(null);

  const [searchType, setSearchType] = useState("region");
  const [aerodromesData, setAerodromesData] = useState([]);

  const [selectedAerodromes, setSelectedAerodromes] = useState([]);
  const [mapRegionSelected, setSelectedArea] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

  const [order1, setOrder1] = useState(null);
  const [order2, setOrder2] = useState(null);
  const [order3, setOrder3] = useState(null);
  const [order4, setOrder4] = useState(null);
  const [asc1, setAsc1] = useState(null);
  const [asc2, setAsc2] = useState(null);
  const [asc3, setAsc3] = useState(null);
  const [asc4, setAsc4] = useState(null);

  const [extraMetar, setExtraMetar] = useState(false);
  const [extraTaf, setExtraTaf] = useState(false);

  const [limit, setLimit] = useState(100);

  const [searchData, setSearchData] = useState(null);

  function LocationMarker() {
    const map = useMapEvents({
      click(event) {
        console.log(event);
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

  const handleFormControl = (event) => {
    if (event.target.value !== "") {
      setOrder1(event.target.value);
    } else {
      setOrder1(null);
    }
  };

  const getAerodromesList = async () => {
    const response = await Services.redemet.getAerodromesList();
    setAerodromesData(
      response.data.slice(0, 1000).map((item) => ({
        label: item.code + " - " + item.name,
        code: item.code,
        latitude: item.latitude,
        longitude: item.longitude,
      }))
    );
  };

  const searchAdhoc = async () => {
    const params = {} as any;
    if (searchType === "nome") {
      params.codes = selectedAerodromes.join(",");
    } else {
      params.region = mapRegionSelected.map((item) => item.join(",")).join(";");
    }

    params.fields = selectedFields.join(",");

    const orders = [];
    if (order1 && asc1) {
      orders.push(order1 + "," + asc1);
    }
    if (order2 && asc2) {
      orders.push(order2 + "," + asc2);
    }
    if (order3 && asc3) {
      orders.push(order3 + "," + asc3);
    }
    if (order4 && asc4) {
      orders.push(order4 + "," + asc4);
    }

    if (orders.length > 0) {
      params.order = orders.join(";");
    }

    params.metar = extraMetar;
    params.taf = extraTaf;

    params.limit = limit;

    const response = await Services.redemet.getAdHoc(params);
    setSearchData(response.data);
  };

  useEffect(() => {
    //getAerodromesList();
  }, []);

  return (
    <div className="relative h-screen">
      <h1 className="header">REDEMET</h1>
      <h1 className="sub-header">
        Relatórios Ad-Hoc gerados dinamicamente para a base de dados analisada
        :)
      </h1>
      <div className="container">
        <div className="wrapper">
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
                />
              </div>
            )}

            {searchType === "region" && (
              <div className="selectRegion">
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

          <div className="fields">
            <h1 className="aero-title">Selecione os campos</h1>

            <div>
              <Multiselect
                options={[
                  { label: "Latitude", value: "latitude" },
                  { label: "Longitude", value: "longitude" },
                  { label: "Codigo", value: "code" },
                  { label: "Nome", value: "name" },
                ]}
                displayValue="label"
                placeholder="Escolha os campos"
                onSelect={(aerodromes) =>
                  setSelectedFields(aerodromes.map((item) => item.value))
                }
                onRemove={(aerodromes) =>
                  setSelectedFields(aerodromes.map((item) => item.value))
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
                    "border-bottom": "1px solid blue",
                    "border-radius": "8px",
                    background: "white",
                    cursor: "pointer",
                  },
                }}
              />
            </div>
          </div>

          <div className="fields">
            <h1 className="aero-title">Selecione a ordenação</h1>

            <div className="sortContainer">
              <div className="selectSortField">
                <select onChange={handleFormControl} id="select-one">
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>

                <span>-{">"}</span>

                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setAsc1(event.target.value);
                    } else {
                      setAsc1(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
              <b></b>
              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setOrder2(event.target.value);
                    } else {
                      setOrder2(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>
                <span>-{">"}</span>
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setAsc2(event.target.value);
                    } else {
                      setAsc2(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
              <b></b>
              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setOrder3(event.target.value);
                    } else {
                      setOrder3(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>
                <span>-{">"}</span>
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setAsc3(event.target.value);
                    } else {
                      setAsc3(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
              <b></b>
              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setOrder4(event.target.value);
                    } else {
                      setOrder4(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>
                <span>-{">"}</span>

                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setAsc4(event.target.value);
                    } else {
                      setAsc4(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>
            </div>
          </div>

          <div className="fields">
            <h1 className="aero-title">Selecione o tipo de mensagem</h1>

            <div className="message-fields">
              <div className="message-fields-inputs">
                <input
                  type="checkbox"
                  id="metar"
                  checked={extraMetar}
                  onChange={(event) => setExtraMetar(event.target.checked)}
                />
                <label htmlFor="metar">METAR</label>
              </div>
              <div className="message-fields-inputs">
                <input
                  type="checkbox"
                  id="taf"
                  checked={extraTaf}
                  onChange={(event) => setExtraTaf(event.target.checked)}
                />
                <label htmlFor="taf">TAF</label>
              </div>
            </div>
          </div>

          <div className="fields">
            <h1 className="aero-title">Selecione o limite</h1>

            <Form.Control
              type="text"
              placeholder="Limite"
              value={limit}
              onChange={(event) => setLimit(event.target.value)}
            />
          </div>

          <div className="fields">
            <Button
              variant="primary"
              onClick={() => searchAdhoc()}
              disabled={
                !(
                  (selectedAerodromes.length > 0 ||
                    mapRegionSelected.length === 2) &&
                  selectedFields.length > 0 &&
                  limit
                )
              }
            >
              Pesquisar
            </Button>
          </div>
        </div>

        <Modal
          show={searchData}
          dialogClassName="modal-90w"
          onHide={() => setSearchData(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Resultados da pesquisa
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {searchData && searchData.length > 0 && (
              <RB.Table striped bordered hover>
                <thead>
                  <tr key={"header"}>
                    {Object.keys(searchData[0]).map((key) => (
                      <th>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {searchData.map((item) => (
                    <tr key={item.id}>
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </RB.Table>
            )}
          </Modal.Body>
        </Modal>
        {/* <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom={false}
          className="h-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer> */}
        <h1 className="footer">
          Feito por: Rodrigo Luz, Yasmin Karolyne, Guilherme M. Bortolleto,
          Guilherme de Assis Mello e Luiz Fernando de Souza
        </h1>
      </div>
    </div>
  );
}
