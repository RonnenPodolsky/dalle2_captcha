import './App.css';

import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(null);
  const [valid, setValid] = useState(null);
  const [status, setStatus] = useState(false);

  const checkIfRobot = (e) => {
    if (e.target.classList[0] === valid) {
      setStatus(true)
    }
    else {
      setStatus(false)
    }
  }

  const getData = async () => {
    const dataJson = await fetch("/api");
    const dataObj = await dataJson.json();
    console.log(dataObj)
    setValid(dataObj.valid)
    setOptions(dataObj.options)
    setImage(dataObj.image)
    setLoading(false)
  }

  useEffect(() => {
    let isCancelled = true;
    if (isCancelled) {
      getData();
    }
    return () => {
      console.log('s')
      isCancelled = false;
    }
  }, []);

  if (loading) return <h2>loading...</h2>
  
  return (
    <div className="App">
      <header className="App-header">

        <h1>Are you a Robot?</h1>
        <h2>What is the following image?</h2>
        {image && <img src={image} alt={options[valid]} />}
        <div className='options'>
          {options?.map((option) => {
            return <div onClick={checkIfRobot} className={option} key={option}>{option}</div>
          })}

        </div>
        {status ? <h3> not a robot!</h3> : <h3>robot?</h3>}
      </header>
    </div>
  )
}

export default App;
