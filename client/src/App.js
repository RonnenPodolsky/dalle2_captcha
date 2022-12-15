import './App.css';

import { useEffect, useState, useRef, useCallback} from "react";

function App() {
  const [loading, setLoading] = useState(true)
  const [image, setImage] = useState(null);
  const [options, setOptions] = useState(null);
  const [valid, setValid] = useState(null);
  const [status, setStatus] = useState(false);
  const [bla, setBla] = useState(false);
  const isCancelled = useRef(false);

  const checkIfRobot = (e) => {
    if (e.target.classList[0] === valid) {
      setStatus(true)
    }
    else {
      setStatus(false)
    }
  }
  const getAnother = () => {
    setBla(prev => !prev)
    setLoading(true)
  }
  const getData = useCallback(async () => {
    const dataJson = await fetch("/api");
    const dataObj = await dataJson.json();
    console.log(dataObj)
    setValid(dataObj.valid)
    setOptions(dataObj.options)
    setImage(dataObj.image)
    setLoading(false)
  }, [])

  useEffect(() => {
    console.log('mounted')
    if (isCancelled.current) {
      getData();
    }
    return () => {
      console.log('unmounted')
      isCancelled.current = true;
    }
  }, [getData, bla]);

  
  return (
    <div className="App">
      <header className="App-header">

        <h1>Are you a Robot?</h1>
        <h2>What is the following image?</h2>
        {loading ? <h2>loading...</h2> : 
        <div>
                  {<img src={image} alt={options[valid]} />}
                  <div className='options'>
                    {options?.map((option) => {
                      return <div onClick={checkIfRobot} className={option} key={option}>{option}</div>
                    })}
          
                  </div> 
                  {status ? <h3> not a robot!</h3> : <h3>robot?</h3>}
                  <button onClick={getAnother}>another image</button>
        </div>}


      </header>
    </div>
  )
}

export default App;
