import React from 'react';
import { useEffect, useState } from 'react';

const Ground = ({ ground, sideSize, setClicked }) => {
  // const [color, setColor] = useState('ligthgray')
  // style={{ backgroundColor: color }}
  // useEffect(() => { if (ground > 10) { setColor('green') } })

  return (

    <div className='container' style={{
      width: `${sideSize * 20}px`, height: `${sideSize * 20}px`
    }} >

      {
        ground.map((x, i) => <div
          className={`cell ${x.mine === 1 && x.clicked === 1 ? "mined" : x.clicked === 1 ? "empty" : ""}`}
          onClick={() => setClicked(i)}> {x.neighbouringMines}
        </div>)
      }


    </div >

  );
};
export default Ground