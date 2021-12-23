import NameAndRegion from "../NameAndRegion";
import SelectFields from "../SelectFields";
import Modal from "../Modal";

import { useAerodromes } from "../../hooks/useAerodromes";

export default function Map() {
  const {
    searchType,
    aerodromesData,
    mapRegionSelected,
    setSearchType,
    setSelectedAerodromes,
    setSelectedArea,
    setSelectedFields,
    searchData,
    setSearchData,
    limit,
    setLimit,
    searchAdhoc,
    metarField,
    tafField,
    setMetarField,
    setTafField,
    setType,
    setSort,
  } = useAerodromes();

  return (
    <div className="out-container">
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

          <SelectFields setSelectedFields={setSelectedFields} />

          <div className="fields">
            <h1 className="aero-title">Selecione a ordenação</h1>
            <div className="sortContainer">
              <div className="selectSortField">
                <select
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setType(event.target.value);
                    } else {
                      setType(null);
                    }
                  }}
                  id="select-one"
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
                      setSort(event.target.value);
                    } else {
                      setSort(null);
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
            <button type="button" onClick={() => searchAdhoc()}>
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
