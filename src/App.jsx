import { useState, useEffect, useRef } from 'react'

import Logo from '/static/images/super-shoes.png';
import ChevronIco from '/static/images/216151_right_chevron_icon.png';

import './App.css'

const Card =({item}) => {
  return (
    <div className="item">
      <div className="image">
        <img src={item.image} alt="Shoe" />
      </div>
      <div className="info">
        <span className='name'>{item.name}</span>
        <span className='oldPrice'>{`U$ ${item.oldPrice}`}</span>
        <span className='price'>{`U$ ${item.price}`}</span>
      </div>
    </div>
  )
}

function App() {
  const [data, setData] = useState([]);
  const carousel = useRef(null);

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5173//static/shoes.json')
      .then(resp => resp.json())
      .then(resp => setData(resp));
  }, [])

  return (
    <div className="App">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Super Shoes Logo" />
        </div>
        
        <div className="carousel" ref={carousel}>
          {
            data.length && 
            data.map(item => <Card key={item.id} item={item}/>)
          }
        </div>
        <div className="buttons">
          <button
            onClick={(e) => handleLeftClick(e)}
          ><img src={ChevronIco} alt="Scroll left" /></button>
          <button
            onClick={(e) => handleRightClick(e)}
          ><img src={ChevronIco} alt="Scroll right" /></button>
        </div>
      </div>
    </div>
  )
}

export default App
