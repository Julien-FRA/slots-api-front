import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import GlobalModal from '../Container/Modal';

function BtnDelete(props: any) {
  //debugger;
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <Button variant="outline-danger" onClick={() => setModalShow(true)}>
        Delete
      </Button>
      
      <GlobalModal
        type="deleteModal"
        show={modalShow}
        onHide={() => setModalShow(false)}
        idShop={props.idShop}
        setHasShop={props.setHasShop}
      />
    </>
  );
}

export default BtnDelete;