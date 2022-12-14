import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Ground from './components/ground';

function App() {

  const sizeRef = useRef();
  const [size, setSize] = useState(9);

  // const amtOfMines = 10;
  // const amtOfMinesRef = useRef();
  const [amtOfMines, setamtOfMines] = useState(10);
  const [exploded, setExploded] = useState(false)
  const [win, setWin] = useState(false)
  const [score, setScore] = useState(0)
  let groundArr = [];
  const [ground, setGround] = useState(groundArr)

  // const resize = () => {
  //   console.log(sizeRef.current.value)
  //   setSize(sizeRef.current.value)
  //   groundArr = [];
  //   console.log('size ===', size);

  //   makeField()
  //   console.log('groundArr.length ===', groundArr.length);
  // }

  const makeField = (s) => {
    // groundArr = []
    console.log('groundArr === in make field1', groundArr);
    for (let index = 0; index < s ** 2; index++) {
      const cell = {
        mine: 0,
        clicked: 0,
        neighbouringMines: 0,
      }
      groundArr.push(cell)
    }
    // setGround(groundArr)
    console.log("ground= in make field", ground)
    console.log('groundArr === in make field2', groundArr);


  }
  const resize = () => {
    // const groundCopy = [...ground];
    // groundCopy.filter(() => false)
    const groundCopy = []
    console.log('groundCopy ===', groundCopy);
    setGround(groundCopy);
    console.log("ground= in resize po uznulinimo ", ground)
    console.log('sizeRef:', sizeRef.current.value)
    setSize(sizeRef.current.value);
    console.log('size:', size)
    makeField(sizeRef.current.value);
    setGround(groundArr)
    console.log("ground= in resize", ground)
    console.log('groundArr === in resize', groundArr);

    // placeMine(amtOfMines)
  }




  //  updateGround(size);
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function placeMine(times) {
    const groundCopy = [...ground]
    groundCopy.forEach(e => e.mine = 0)
    setGround(groundCopy)
    let arr = []
    while (arr.length < times) {
      let rand = getRandomInt(0, size ** 2 - 1);
      if (arr.indexOf(rand) === -1) arr.push(rand)
    }
    for (let index = 0; index < arr.length; index++) {
      const groundCopy = [...ground];
      groundCopy[arr[index]].mine = 1;
      setGround(groundCopy)
      console.log('one mine placed')
    }
  }
  const setClicked = (index) => {
    if (exploded || win) return;
    if (ground[index].clicked === 0) setScore(score + 1)
    if (score === size ** 2 - amtOfMines) {
      setWin(true)
      return
    }

    const groundCopy = [...ground];
    groundCopy[index].clicked = 1;
    setGround(groundCopy)
    if (ground[index].mine === 1) setExploded(true);

    // console.log(index)
    // console.log(ground[index])
  }
  const setNeighbouringMines = (m, i) => {
    const groundCopy = [...ground];
    groundCopy[i].neighbouringMines = m;
    setGround(groundCopy)
  }

  const countNeighbouringMines = (array, index) => {

    let minesArround = 0;
    if (index === 0) {
      minesArround = array
        .filter((e, i) => i === index + 1 || i === index + size || i === index + size + 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }

    if (index === size - 1) {
      minesArround = array
        .filter((e, i) => i === index - 1 || i === index + size || i === index + size - 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    if (index === size * size - size) {
      minesArround = array
        .filter((e, i) => i === index + 1 || i === index - size || i === index - size + 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    if (index === (size * size) - 1) {
      minesArround = array
        .filter((e, i) => i === index - 1 || i === index - size || i === index - size - 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    if (index > 0 && index < (size - 1)) {
      minesArround = array
        .filter((e, i) => i === index + 1 || i === index - 1 || i === index + size || i === index + size + 1 || i === index + size - 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }

    if (index > size * size - size && index < (size * size - 1)) {
      minesArround = array
        .filter((e, i) => i === index + 1 || i === index - 1 || i === index - size || i === index - size + 1 || i === index - size - 1)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }
    if (index % size === 0 && index < size * size - size && index > 0) {
      minesArround = array
        .filter((e, i) => i === index + size || i === index - size || i === index + 1 || i === index + 1 + size || i === index + 1 - size)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }

    if ((index + 1) % size === 0 && index < size * size - 1 && index > size - 1) {
      minesArround = array
        .filter((e, i) => i === index + size || i === index - size || i === index - 1 || i === index - 1 + size || i === index - 1 - size)
        .reduce((sum, { mine }) => sum + mine, 0)
      setNeighbouringMines(minesArround, index)
      return;
    }

    minesArround = array
      .filter((e, i) =>
        i === index - 1 || i === index - 1 - size || i === index - 1 + size || i === index - size || i === index + size || i === index + 1 || i === index + 1 + size || i === index + 1 - size)
      .reduce((sum, { mine }) => sum + mine, 0)
    setNeighbouringMines(minesArround, index)
    return;
  }

  makeField(size)
  // useEffect(() => makeField(size));
  useEffect(() => placeMine(amtOfMines), [size]);
  useEffect(() => ground.forEach((e, i, arr) => {
    countNeighbouringMines(arr, i)
  }), []);


  return (


    <div className="App">
      {/* <input ref={sizeRef} type="text" placeholder='Enter field size' />
      <button onClick={() => resize()}> Enter </button> */}


      {/* <input ref={amtOfMinesRef} type="text" placeholder='??veskite lauko dyd??' />
      <button onClick={setamtOfMines(amtOfMinesRef.current.value)}> Enter </button> */}
      <h2>Minesweeper</h2>
      <div className='center'>
        <Ground ground={ground} sideSize={size} setClicked={setClicked} />
      </div>
      {<h3> Score: {score} of {size ** 2 - amtOfMines}</h3>}
      {exploded && <h3> Game over :( </h3>}
      {win && <h3> Its a victory !!!</h3>}

    </div>
  );
}

export default App;
