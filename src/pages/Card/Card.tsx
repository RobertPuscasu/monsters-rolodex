import * as React from 'react';
import { IMonster } from '../../interfaces/models/monster.model';
import './style.css';

interface ICardProps {
  monster: IMonster;
}

const Card: React.FC<ICardProps> = ({ monster }) => (
  <div className="card-container">
    <img
      alt="monster"
      src={`https://robohash.org/${monster.id}?set=set2&size=180x180`}
    />
    <h1 key={monster.id}> {monster.name} </h1>
    <p>{monster.email}</p>
  </div>
);

export default Card;
