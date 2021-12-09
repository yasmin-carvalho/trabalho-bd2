import { useFields } from "../../hooks/useFields";

const SortFields = () => {
  const {
    setType1,
    setType2,
    setType3,
    setType4,
    setSort1,
    setSort2,
    setSort3,
    setSort4,
  } = useFields();

  return (
    <div className="fields">
      <h1 className="aero-title">Selecione a ordenação</h1>
      <div className="sortContainer">
        <div className="selectSortField">
          <select
            onChange={(event) => {
              if (event.target.value !== "") {
                setType1(event.target.value);
              } else {
                setType1(null);
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
      </div>{" "}
    </div>
  );
};

export default SortFields;
