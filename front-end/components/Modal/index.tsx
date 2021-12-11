import moment from "moment";

const Modal = ({ searchData, setSearchData }) => {
  const modal = document.getElementById("myModal");
  window.onclick = function (event) {
    if (event.target == modal) {
      setSearchData(null);
    }
  };

  const isDate = (_date) => {
    const _regExp = new RegExp(
      "^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$"
    );
    return _regExp.test(_date);
  };

  return (
    <>
      <div
        id="myModal"
        className={`modal-container ${searchData && "open-modal"}`}
      >
        <div className="modal-content">
          <span onClick={() => setSearchData(null)} className="close">
            &#8592; <b>Voltar</b>
          </span>

          <div className="result-container">
            <h1 className="aero-title">Resultado da consulta</h1>

            {searchData && searchData.length > 0 && (
              <table id="table">
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
                      {Object.values(item).map((val: any) => {
                        console.log(val);
                        return (
                          <td>
                            {isDate(val)
                              ? moment(val).format("MM/DD/YYYY")
                              : val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
