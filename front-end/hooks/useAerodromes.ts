import { useState } from "react";
import { useFields } from "../hooks/useFields";

import Services from "../services";

export const useAerodromes = () => {
  const [searchType, setSearchType] = useState("region");
  const [aerodromesData, setAerodromesData] = useState([]);

  const [selectedAerodromes, setSelectedAerodromes] = useState([]);
  const [mapRegionSelected, setSelectedArea] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

  const [limit, setLimit] = useState(0);

  const [searchData, setSearchData] = useState(null);

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
  } = useFields();

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
  };
};
