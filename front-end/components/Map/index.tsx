import { useEffect, useState } from "react";

import Multiselect from "multiselect-react-dropdown";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import Services from "../../services";

import NameAndRegion from "../NameAndRegion";
import Modal from "../Modal";

import { useAerodromes } from "../../hooks/useAerodromes";
import { useFields } from "../../hooks/useFields";

export default function Map() {
  const {
    searchType,
    aerodromesData,
    selectedAerodromes,
    mapRegionSelected,
    selectedFields,
    setSearchType,
    setAerodromesData,
    setSelectedAerodromes,
    setSelectedArea,
    setSelectedFields,
  } = useAerodromes();

  const {
    type1,
    type2,
    type3,
    type4,
    sort1,
    sort2,
    sort3,
    sort4,
    metarField,
    tafField,
    setMetarField,
    setTafField,
    setType1,
    setType2,
    setType3,
    setType4,
    setSort1,
    setSort2,
    setSort3,
    setSort4,
  } = useFields();

  const [limit, setLimit] = useState(0);

  const [searchData, setSearchData] = useState(null);

  const handleFormControl = (event) => {
    if (event.target.value !== "") {
      setType1(event.target.value);
    } else {
      setType1(null);
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
    if (type1 && sort1) {
      orders.push(type1 + "," + sort1);
    }
    if (type2 && sort2) {
      orders.push(type2 + "," + sort2);
    }
    if (type3 && sort3) {
      orders.push(type3 + "," + sort3);
    }
    if (type4 && sort4) {
      orders.push(type4 + "," + sort4);
    }

    if (orders.length > 0) {
      params.order = orders.join(";");
    }

    params.metar = metarField;
    params.taf = tafField;

    params.limit = limit;

    const response = await Services.redemet.getAdHoc(params);
    setSearchData(response.data);
  };

  useEffect(() => {
    //getAerodromesList();
  }, []);

  return (
    <div className="relative h-screen">
      <h1 className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/235/235861.png"
          alt=""
        />
        REDEMET
        <img
          src="https://cdn-icons-png.flaticon.com/512/235/235861.png"
          alt=""
        />
      </h1>
      <h1 className="sub-header">
        Relatórios Ad-Hoc gerados dinamicamente para a base de dados analisada
        :)
      </h1>
      <div className="container">
        <div className="wrapper">
          <NameAndRegion
            setSearchType={setSearchType}
            setSelectedArea={setSelectedArea}
            setSelectedAerodromes={setSelectedAerodromes}
            searchType={searchType}
            aerodromesData={aerodromesData}
            mapRegionSelected={mapRegionSelected}
          />

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
                    "border-bottom": "3px solid rgb(17, 10, 10)",
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

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Curved_Arrow.svg/1200px-Curved_Arrow.svg.png"
                  alt=""
                />

                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setSort1(event.target.value);
                    } else {
                      setSort1(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>

              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setType2(event.target.value);
                    } else {
                      setType2(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Curved_Arrow.svg/1200px-Curved_Arrow.svg.png"
                  alt=""
                />
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setSort2(event.target.value);
                    } else {
                      setSort2(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>

              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setType3(event.target.value);
                    } else {
                      setType3(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>

                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Curved_Arrow.svg/1200px-Curved_Arrow.svg.png"
                  alt=""
                />

                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setSort3(event.target.value);
                    } else {
                      setSort3(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="asc">Crescente</option>
                  <option value="desc">Decrescente</option>
                </select>
              </div>

              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setType4(event.target.value);
                    } else {
                      setType4(null);
                    }
                  }}
                >
                  <option value="">Selecione</option>
                  <option value="code">Código</option>
                  <option value="name">Nome</option>
                  <option value="latitude">Latitude</option>
                  <option value="longitude">Longitude</option>
                </select>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Curved_Arrow.svg/1200px-Curved_Arrow.svg.png"
                  alt=""
                />

                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setSort4(event.target.value);
                    } else {
                      setSort4(null);
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
                  checked={metarField}
                  onChange={(event) => setMetarField(event.target.checked)}
                />
                <label htmlFor="metar">METAR</label>
              </div>
              <div className="message-fields-inputs">
                <input
                  type="checkbox"
                  id="taf"
                  checked={tafField}
                  onChange={(event) => setTafField(event.target.checked)}
                />
                <label htmlFor="taf">TAF</label>
              </div>
            </div>
          </div>

          <div className="fields">
            <h1 className="aero-title">Selecione o limite</h1>

            <div className="limit-input-wrapper">
              <b>--{" >"}</b>
              <input
                type="text"
                placeholder="Digite o limite"
                value={limit}
                onChange={(event) => setLimit(+event.target.value)}
              />
              <b>{" <"}--</b>
            </div>
          </div>

          <div className="fields button-wrapper">
            <button
              type="button"
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
              Consultar
            </button>
          </div>
        </div>

        <Modal searchData={searchData} setSearchData={setSearchData} />

        <h1 className="footer">
          Feito por: Rodrigo Luz, Yasmin Karolyne, Guilherme M. Bortolleto,
          Guilherme de Assis Mello e Luiz Fernando de Souza
        </h1>
      </div>
    </div>
  );
}
