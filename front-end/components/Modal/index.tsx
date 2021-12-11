const Modal = ({ searchData, setSearchData }) => {
  const modal = document.getElementById("myModal");
  window.onclick = function (event) {
    if (event.target == modal) {
      setSearchData(null);
    }
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
                      {Object.values(item).map((val) => (
                        <td>{val}</td>
                      ))}
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
