import Multiselect from "multiselect-react-dropdown";

const SelectFields = ({ setSelectedFields }) => {
  return (
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
              borderBottom: "3px solid rgb(17, 10, 10)",
              borderRadius: "8px",
              background: "white",
              cursor: "pointer",
            },
          }}
        />
      </div>
    </div>
  );
};

export default SelectFields;
