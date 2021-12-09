import { useState } from "react";

export const useFields = () => {
  const [type1, setType1] = useState(null);
  const [type2, setType2] = useState(null);
  const [type3, setType3] = useState(null);
  const [type4, setType4] = useState(null);
  const [sort1, setSort1] = useState(null);
  const [sort2, setSort2] = useState(null);
  const [sort3, setSort3] = useState(null);
  const [sort4, setSort4] = useState(null);

  const [metarField, setMetarField] = useState(false);
  const [tafField, setTafField] = useState(false);

  return {
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
  };
};
