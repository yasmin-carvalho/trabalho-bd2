import { useEffect } from "react";

import Services from "../../services";

import NameAndRegion from "../NameAndRegion";
import SortFields from "../SortFields";
import SelectFields from "../SelectFields";
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
    searchData,
    setSearchData,
    limit,
    setLimit,
    searchAdhoc,
  } = useAerodromes();

  const { metarField, tafField, setMetarField, setTafField } = useFields();

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

          <SelectFields setSelectedFields={setSelectedFields} />

          <SortFields />

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
