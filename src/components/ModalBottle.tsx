import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Bottle } from '../types';
import { Col, Form } from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import FormItem from './FormItem';
import WebcamCapture from './WebCamCapture';

type BottleProps = {
  onHide: (() => void);
  onDelete?: ((bottle: Bottle) => void)
  show: boolean;
  bottle: Bottle
  newBottle?: boolean
  onValidSubmit: ((bottle: Bottle) => void);
}


export function ModalBottle({ ...bottleProps }: BottleProps) {
  const [validated, setValidated] = useState(false);
  let [bottle, setBottle] = useState<Bottle>(() => { return bottleProps.bottle; });

  const onModalShow = () => {
    setValidated(false);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    bottleProps.onValidSubmit(bottle);
    setValidated(true);
    bottleProps.onHide();
  };


  return (
    <Modal
      key={bottle.id}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={bottleProps.show}
      onShow={onModalShow}
      onHide={bottleProps.onHide}
      style={{ backgroundColor: 'dark' }}
      className='overflow-none'
    >
      <Form validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{bottle.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Col id={"Form-photo"} className='d-flex w-100 align-items-center gap-3 justify-content-center mb-3' xs={6} md={4}>
            <WebcamCapture onSrcChanged={src => { src && setBottle({ ...bottle, photo: src }) }} src={bottle.photo.toString()} />
          </Col>
          {
            <div className='overflow-auto pe-2 pt-2' style={{ height: '40vh' }}>
              <FormItem
                key={"Form-" + "name"}
                name={"Nom"}
                fieldChanged={val => setBottle({ ...bottle, name: val })}
                type={'input'}
                required={true}
                value={bottle.name.toString()} />

              <FormItem
                key={"Form-" + "qty"}
                name={"Quantité"}
                fieldChanged={val => setBottle({ ...bottle, qty: parseInt(val) })}
                type={'number'}
                required={true}
                value={bottle.qty.toString()} />

              <FormItem
                key={"Form-" + "age"}
                name={"Age"}
                fieldChanged={val => setBottle({ ...bottle, age: parseInt(val) })}
                type={'number'}
                required={true}
                value={bottle.age.toString()} />

              <FormItem
                key={"Form-" + "note"}
                name={"Note"}
                fieldChanged={val => setBottle({ ...bottle, note: parseInt(val) })}
                type={'note'}
                required={true}
                value={bottle.note.toString()} />

              <FormItem
                key={"Form-" + "genre"}
                name={"genre"}
                fieldChanged={val => setBottle({ ...bottle, genre: val })}
                type={'input'}
                value={bottle.genre.toString()} />

              <FormItem
                key={"Form-" + "pays"}
                name={"pays"}
                fieldChanged={val => setBottle({ ...bottle, pays: val })}
                type={'input'}
                value={bottle.pays.toString()} />

              <FormItem
                key={"Form-" + "distillerie"}
                name={"distillerie"}
                fieldChanged={val => setBottle({ ...bottle, distillerie: val })}
                type={'input'}
                value={bottle.distillerie.toString()} />
              <FormItem
                key={"Form-" + "address"}
                name={"address"}
                fieldChanged={val => setBottle({ ...bottle, address: val })}
                type={'input'}
                value={bottle.address.toString()} />
              <FormItem
                key={"Form-" + "zip"}
                name={"zip"}
                fieldChanged={val => setBottle({ ...bottle, zip: val })}
                type={'input'}
                value={bottle.zip.toString()} />
              <FormItem
                key={"Form-" + "nez"}
                name={"nez"}
                setAs={"textarea"}
                fieldChanged={val => setBottle({ ...bottle, nez: val })}
                type={'input'}
                value={bottle.nez.toString()} />
              <FormItem
                key={"Form-" + "bouche"}
                name={"bouche"}
                setAs={"textarea"}
                fieldChanged={val => setBottle({ ...bottle, bouche: val })}
                type={'input'}
                value={bottle.bouche.toString()} />
              <FormItem
                key={"Form-" + "final"}
                name={"final"}
                setAs={"textarea"}
                fieldChanged={val => setBottle({ ...bottle, final: val })}
                type={'input'}
                value={bottle.final.toString()} />
              <FormItem
                key={"Form-" + "message"}
                name={"message"}
                setAs={"textarea"}
                fieldChanged={val => setBottle({ ...bottle, message: val })}
                type={'input'}
                value={bottle.message.toString()} />
            </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {
          !bottleProps.newBottle &&
            <Button variant="danger" className='me-auto' onClick={e => bottleProps.onDelete && bottleProps.onDelete(bottle)}>
              Delete
            </Button>
          }
          <Button type="submit" variant="success">
            Save
          </Button>
          <Button variant="secondary" onClick={bottleProps.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}