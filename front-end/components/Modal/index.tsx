import { Modal as ResultModal, Table } from "react-bootstrap";

const Modal = ({ searchData, setSearchData }) => {
  return (
    <ResultModal
      show={searchData}
      dialogClassName="modal-90w"
      onHide={() => setSearchData(null)}
    >
      <ResultModal.Header closeButton>
        <ResultModal.Title id="contained-modal-title-vcenter">
          Resultados da pesquisa
        </ResultModal.Title>
      </ResultModal.Header>
      <ResultModal.Body>
        {searchData && searchData.length > 0 && (
          <Table striped bordered hover>
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
          </Table>
        )}
      </ResultModal.Body>
    </ResultModal>
  );
};

export default Modal;
