import { useEffect, useState } from "react";

import Services from "../services";

export const useAerodromes = () => {
  const [searchType, setSearchType] = useState("region");
  const [aerodromesData, setAerodromesData] = useState([]);

  const [selectedAerodromes, setSelectedAerodromes] = useState([]);
  const [mapRegionSelected, setSelectedArea] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

  const [limit, setLimit] = useState(0);

  const [searchData, setSearchData] = useState(null);
  const [metarField, setMetarField] = useState(false);
  const [tafField, setTafField] = useState(false);

  const [type, setType] = useState(null);
  const [sort, setSort] = useState(null);

  const searchAdhoc = async () => {
    const orders = [];

    const params = {} as any;

    if (searchType === "region") {
      params.region = mapRegionSelected.map((item) => item.join(",")).join(";");
    } else {
      params.codes = selectedAerodromes.join(",");
    }

    params.fields = selectedFields.join(",");

    if (type && sort) {
      orders.push(type + "," + sort);
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
    getAerodromesList();
  }, []);

  return {
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
    setMetarField,
    setTafField,
    metarField,
    tafField,
    type,
    sort,
    setType,
    setSort,
  };
};
