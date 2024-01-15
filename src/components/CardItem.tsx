import { Col } from "react-bootstrap";

type CardItemProps = {
    name: string,
    property:string
}

export function CardItem ( props:CardItemProps) {
    return (
        
        <div className='w-100 d-flex align-items-baseline'>
            <Col className="p-0 col-6">
                <div className="text-capitalize text-truncate text-nowrap px-1" style={{ color: 'var(--c-wishky-text)', fontSize: '0.8rem' }}>{props.name}: </div>
            </Col>
            <Col className='p-0 col-6'>
                <div className="text-capitalize text-wrap ps-1" style={{ color: 'var(--c-wishky)', fontSize: '0.9rem'}}>{props.property ? props.property : "?"}</div>
            </Col>
        </div>
    );
}