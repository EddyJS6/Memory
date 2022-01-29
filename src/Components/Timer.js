import {useState, useEffect} from 'react';

function Timer(props) {

  const [timer, setTimer] = useState(1);

  useEffect(() => {
    
   const intervalId = setInterval(() => {
      setTimer(timer => timer + 1);
       
    }, 1000);

    return() => {
      clearInterval(intervalId);
    }

  }, []);

 if (timer === 90) {
    props.gameOver();
 }

  return (
    <>
    <p className='text-center' style={{color:"#fff", fontWeight:"bold"}}>90 secondes pour trouver les paires !</p>
    <div className='progress timer-cadre'>
      <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="90" style={{width:timer+"px", }}><span className='timer'>{timer}</span>
      </div>
    </div>
  </>
  );
}

export default Timer;
