import { Form } from "react-bootstrap";
import Note from "./Note";
import { ElementType } from "react";

type FieldProps = {
    name: string,
    fieldChanged: (value: string) => void,
    type: string,
    value: string
    required?: boolean
    setAs?:ElementType<any>;
}

const Field = ({ name, fieldChanged, type, value, required, setAs }: FieldProps) => {
    return (
        <Form.Group className="mx-0 mb-3 row align-items-baseline" >
            <Form.Label htmlFor={"Form-" + name} className="col-4 text-capitalize" style={{ color: 'var(--c-wishky)' }}>{name !== 'qty'? name : "Quantité"}:</Form.Label>
            {
                type !== 'note' ?
                    <Form.Control
                        required={required || false}
                        as={ setAs && (setAs || 'input') }
                        type={type || 'text'}
                        min="0"
                        rows="5"
                        className="col w-50 fs-6"
                        defaultValue={value}
                        onChange={e => fieldChanged(e.target.value)}
                    />
                    :
                    <div className="col w-50 fs-6">
                        <Note
                            onNotationChange={note => fieldChanged(note.toString())}
                            notation={value}
                            canChangeNote={true} />
                    </div>

            }
        </Form.Group>
    );
};

export default Field;






