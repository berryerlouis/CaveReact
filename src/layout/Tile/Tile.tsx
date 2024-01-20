import { Bottle } from '../../types'
import { Button, Card, Stack } from 'react-bootstrap';
import { Line } from '../../components/Line';
import { useState } from 'react';
import { ModalBottle } from '../../components/ModalBottle';
import { Search, Star, StarFill } from 'react-bootstrap-icons';
import { CardItem } from '../../components/CardItem';
import TileImage from '../../components/TileImage';
import Axios from 'axios';
import { jsonserver } from '../../Utils/utils';

type BottleProps = {
    bottle: Bottle
    onDelete?: ((bottle: Bottle) => void)
}

export default function Tile(propsBottle: BottleProps) {
    const [bottle, setBottle] = useState<Bottle>(() => { return propsBottle.bottle; });
    const [modalShow, setModalShow] = useState(false);

    const stars = [1, 2, 3, 4, 5];
    console.log('Tile ' + bottle.name);

    function displayYear(age: string) {
        if (age === "") return "?";
        if (parseInt(age) > 0) return age + " ans";
        return age + " an";
    }

    const updateBottle = async (bottle: Bottle) => {
        await Axios.put(
            'http://'+jsonserver+':3004/bottles/' + bottle.id,
            bottle
        );
        setBottle(bottle);
    };

    const deleteBottle = async (bottle: Bottle) => {
        propsBottle.onDelete && propsBottle.onDelete(bottle);
    }

    return (
        <Card className='mt-3 flex-column'>
            <ModalBottle onValidSubmit={bottle => updateBottle(bottle)} bottle={bottle} show={modalShow} onHide={() => setModalShow(false)} onDelete={bottle => deleteBottle(bottle)} />
            <TileImage src={bottle.photo} ></TileImage>
            <Card.Body className='d-flex flex-column justify-content-between gap-3 flex-nowrap p-2'>
                <Card.Title className='text-capitalize text-justify text-break mb-0 w-100' style={{ color: 'var(--c-wishky-text)' }}>
                    <h4 style={{ color: 'var(--c-wishky)' }}>{bottle.name}</h4>
                </Card.Title>
                <div className='w-100 p-0'>
                    <CardItem name={'Distillerie'} property={bottle.distillerie} />
                    <CardItem name={'Age'} property={displayYear(bottle.age.toString())} />
                </div>
                <div className='d-flex flex-column justify-content-around gap-3 flex-nowrap'>
                    <Line />
                    <CardItem name={'Quantité'} property={bottle.qty.toString()} />
                    <Stack direction="horizontal" className='flex-wrap justify-content-center' gap={1}>
                        {stars.map((star: number) => (
                            <div className='p-0' key={star}>
                                {star <= bottle.note ?
                                    <StarFill role="button" className='' style={{ color: 'var(--c-wishky)' }} />
                                    :
                                    <Star role="button" style={{ color: 'var(--c-wishky)' }} />}
                            </div>
                        ))}
                    </Stack>
                </div>
            </Card.Body>
            <Card.Footer className='text-center'>
                <Button variant="dark" onClick={() => setModalShow(true)} >
                    <Search />
                </Button>
            </Card.Footer>
        </Card>
    )
}