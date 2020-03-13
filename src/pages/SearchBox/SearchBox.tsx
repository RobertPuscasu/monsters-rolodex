
import './style.css'
import * as React from 'react';
import { ChangeEvent } from 'react';

interface ISearchBoxProps {
	placeholder: string,
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void

}
const SearchBox: React.FC<ISearchBoxProps> = ({placeholder, handleChange}) => {

	return (<input className='search' type="search" placeholder={placeholder} onChange={handleChange} />)
}

export default SearchBox