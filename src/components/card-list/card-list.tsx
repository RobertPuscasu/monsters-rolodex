import * as React from 'react'
import './card-list.css'
import { IMonster } from '../../interfaces/models/monster.model';

import Card from '../../pages/Card/Card'

interface CardListProps {
	monsters: IMonster[]
}
const CardList: React.FC<CardListProps> = ({monsters}) => { 
	return (<div className='card-list'>{
		monsters.map(monster => (
			<Card key={monster.id} monster = {monster}></Card>
		))
	}</div>);
}

export default CardList