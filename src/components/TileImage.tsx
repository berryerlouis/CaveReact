import { useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';

type TileImageProps = {
    src: string
    width?: string
    size?: string
}

export default function TileImage(props: TileImageProps) {
    const [loading, setLoading] = useState(true);
    return (
        <div className="d-flex justify-content-center align-items-center"
            style={
                {
                    width: props.width ? props.width : "100%",
                }
            } >

            <Card.Img variant="top" style={{
                display: loading ? "none" : "block",
                aspectRatio: props.src.includes('.png') ? '1' : 'none'
            }}
            src={props.src} onLoad={() => { setLoading(false) }} />
            <Spinner className='my-5' animation="border" role="status" style={{
                display: loading ? "block" : "none",
                fontSize: props.size ? props.size : "24px",
                color: "var(--c-wishky)"
            }} />
        </div>)
}