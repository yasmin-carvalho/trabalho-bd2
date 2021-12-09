import { useState } from "react";

export const useAerodromes = () => {
  const [searchType, setSearchType] = useState("region");
  const [aerodromesData, setAerodromesData] = useState([]);

  const [selectedAerodromes, setSelectedAerodromes] = useState([]);
  const [mapRegionSelected, setSelectedArea] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);

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
  };
};
