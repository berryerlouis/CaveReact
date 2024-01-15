import Header from '../layout/Header/Header.tsx'
import List from '../layout/List/List.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import '../index.css'
import { Line } from '../components/Line.tsx';
import { useEffect, useState } from 'react';
import { Bottle } from '../types.tsx';
import Axios from 'axios';
import { removeBottle } from '../Utils/utils.ts';

export default function App() {
  const [search, setSearch] = useState('');
  let [bottles, setBottles] = useState<Bottle[]>([]);

  const fetchBottles = async () => {
    const { data } = await Axios.get(
      'http://127.0.0.1:3000/bottles/'
    );
    setBottles(data);
  };

  useEffect(() => {
    fetchBottles();
  }, []);

  console.log('App ');
  function newSearch(value: string): void {
    setSearch(value)
  }
  function newBottle(bottle: Bottle): void {
    setBottles((bottles) => {
      return bottles.concat(bottle);
    })
  }

  const deleteBottle = async (bottle: Bottle) => {
    setBottles((bottles) => {
      removeBottle(bottle,(success:boolean) => {
        
      })
      return bottles.filter(item => item.id !== bottle.id)
    })
  }
  return (
    <div className="app" data-bs-theme="dark">
      <Header newSearch={newSearch} submitNewBottle={newBottle} />
      <Line />
      <List bottles={bottles} filter={search} onDelete={deleteBottle} />
    </div>
  )
}