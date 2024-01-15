import { Col, Container, Row } from 'react-bootstrap';
import { Bottle } from '../../types';
import Tile from '../Tile/Tile';

type ListBottlesProps = {
  filter: string
  bottles: Bottle[]
  onDelete?: ((bottle: Bottle) => void)
}

export default function ListBottles(props: ListBottlesProps) {
  console.log('ListBottles ');


  const applyFilter = (filter: string): Bottle[] => {
    return props.bottles
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((bottle: Bottle) => {
        return (
          filter.toLowerCase() === ''
            ? bottle
            : bottle.name.toLowerCase().includes(filter.toLowerCase())
        )
          ||
          (
            filter.toLowerCase() === ''
              ? bottle
              : bottle.note.toString().toLowerCase().includes(filter.toLowerCase())
          )
      })
  }

  const deleteBottle = async (bottle: Bottle) => {
    props.onDelete && props.onDelete(bottle);
  }

  return (
    <Container fluid style={{ color: 'var(--c-wishky)' }}>
      <Row>
        {
          applyFilter(props.filter).map((bottle: Bottle) => (
            <Col key={bottle.id} className='col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-2' style={{ maxWidth: '80%', zIndex: '1000' }} >
              <Tile bottle={bottle} onDelete={deleteBottle} />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};
