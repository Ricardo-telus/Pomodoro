import React ,{ useState, useEffect }from "react";
import "./styles.css";
import { Howl } from "howler"
import shortSound from './sounds/short.mp3'
import longSound from './sounds/long.mp3'
import taskSound from './sounds/task.mp3'
//https://pomofocus.io/
function PomodoroApp() {
  //hooks for get times
  const [totalTime, setTotalTime]=useState(25)
  const [shortRest, setShortRest]=useState(5)
  const [longRest, setLongRest]=useState(15)
  //hooks for get and control the arrayTask
  const [arrayTask, setArrayTask]=useState([])
  const [task, setTask]=useState("")
  const [rep, setRep]=useState(1)
  const [update, setUpdate]=useState(-1)
  //hooks to controling the timer
  const [rounds, setRounds]=useState(1)
  const [counterForLongRest, setCounterForLongRest ]=useState(1)
  const [status, setStatus]=useState("Time")
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(totalTime*60*1000);  
  const [totalTaks, setTotalTaks]=useState(0) 

  
//code for play sounds
const playSound = (src)=>{
  const sound = new Howl({
    src,
    html5:true
  });
  sound.play();
};

  //code for tasks
  const addTask = () => {
    if(task===""){
      alert("you have not entered a task")
    }else{
      var tasks2=arrayTask
      tasks2.push({task:task, rep:rep, complete:0})
      setArrayTask(tasks2)
      calculateTask(tasks2)
      setTask('')
      setRep(1) 
      const data=JSON.stringify(arrayTask)
      window.localStorage.setItem("tasks",data)    
    }
  }
  const updateTask=(event)=>{
    event.preventDefault();  
    var tempArray=[]
    if (parseInt(update)>parseInt(-1)) {
      tempArray=arrayTask
      tempArray[update].task=task
      tempArray[update].rep=rep
      setArrayTask(tempArray)
      setTask('')
      setRep(1)
      setUpdate(-1)
    } else {    
      arrayTask.forEach((element,index)=>(
        parseInt(index)!==parseInt(event.target.value)&&(tempArray.push(element) )      
      ))
      setArrayTask(tempArray) 
      calculateTask(tempArray)
    } 
    const newData=JSON.stringify(tempArray)
    window.localStorage.setItem("tasks",(newData))   
  }
  const taskToUpdate=(event)=>{
    setTask(arrayTask[event.target.value].task)
    setRep(arrayTask[event.target.value].rep)
    setUpdate(event.target.value)
  }
  const resetAll=()=>{
    setArrayTask([])
    setCounterForLongRest(1)
    setIsActive(false)
    setIsPaused(false)
    setRep(1)
    setRounds(1)
    setTask("")
    setTime(totalTime*60*1000)
    setTotalTaks(0)
    setUpdate(-1)
    setStatus("Time")
    window.localStorage.removeItem("tasks")
  }
  const calculateTask=(tasks)=>{
    let calcuate=0
    for (let index = 0; index < tasks.length; index++) {
      calcuate=parseInt(tasks[index].rep)+calcuate 
    } 
    //let timeToFinish=(calcuate*totalTime)+(calcuate*shortRest)+((calcuate/3))
    setTotalTaks(calcuate)
  }
// code for handle the timer
  const handleStart = () => {
    if (String(arrayTask)!=="") {
      setIsActive(true);
      setIsPaused(false);
      setStatus("On task")
    } else {
      alert("Add a task first")
    }    
  };

  const handlePauseResume = () => {
    if (rounds!==(totalTaks*2)) {
      setIsPaused(!isPaused);
    }else{
      alert("There is no more task to do")
    }
    
  };
  const handleRest = (duration, typeBreak) => {
    setStatus(typeBreak)
    if (typeBreak==="On task") {
      playSound(taskSound)
    }
    if (typeBreak==="Short break") {
      playSound(shortSound)
    }
    if (typeBreak==="Long break") {
      playSound(longSound)
    }
    setIsActive(true);
    setIsPaused(false);
    setTime(duration);
  };

  //effects 
    //code for determinate rounds of work
    useEffect(()=>{    
      if (rounds<=(totalTaks*2) && isActive===true) { //total task is always the double
        if ((rounds%2)===0) {//number impoar for tasks and par to breaks
          if (rounds===(totalTaks*2)) {//detect the las rounds to say bye
            console.log("All it's completed")
           setStatus("All it's completed")
           playSound(longSound)
          } else {
            if (counterForLongRest===3) {//counter for the long brak is the third break, the variable counter get reset after the logn break
              console.log("Long break"+rounds) 
              handleRest(longRest*60*1000, "Long break") 
              setCounterForLongRest(1)
              } else {
                handleRest(shortRest*60*1000, "Short break")
                console.log('short'+rounds) 
                setCounterForLongRest(counterForLongRest=>counterForLongRest+1)
                console.log(counterForLongRest)
              }           
          }        
        } else {//is number impair so is task
          handleRest(totalTime*60*1000, "On task")        
          console.log('work'+rounds)
          let task2=arrayTask
          for (let index = 0; index < task2.length; index++) {// code for mark the tasks complete
            if (task2[index].complete<task2[index].rep) {        
              task2[index].complete=task2[index].complete+1
              index=task2.length
              const data=JSON.stringify(task2)
              window.localStorage.setItem("tasks",data)
            }
          } 
          console.log(task2)
        }
      }
    },[arrayTask, isActive, rounds, totalTaks])
  
    //code for watch
    useEffect(() => {
      let interval = null;    
      if (isActive && isPaused === false) {   
        interval = setInterval(() => {
          setTime((time) =>{return(
              time===690&&(setIsPaused(true)),
              time===690&&(setRounds(rounds=>rounds+1)),
              time - 10)});
        }, 10);
      } else {
        clearInterval(interval);
      }
      return () => {
        clearInterval(interval);
      };
    }, [isActive, isPaused]);
    //useffect to get data from local storage if there is any
    useEffect(() => {
      console.log("here")
      var content=JSON.parse(window.localStorage.getItem("tasks"))
      if (content!==null) {
        setArrayTask(content)
        calculateTask(content)
      }
    }, []);
  return (
    <div id="bod" className="text-white align-items-center mw-100 mh-100 text-white py-5" 
    style={{
      backgroundColor: (status==="Time"||status==="On task")?('#FFE53B')
                       :(status==="Short break"?('0093E9'):('0093E9')),
      backgroundImage: (status==="Time"||status==="On task")?('linear-gradient(147deg, #FFE53B 0%, #FF2525 74%)')
                       :(status==="Short break"?('linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)'):
                        ('radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% )')),
    }}>
      <div className="row">
        <div className="col-12 text-center">
          <h1>Pomodoro App</h1>
        </div>        
      </div> 
      <div className="row align-items-center mt-5">
        <div id="assignmentp"  className="col-10 col-md-4 offset-1 text-center py-5 mb-3">          
          <h3>Tasks:</h3>
          <br/>
          {
          parseInt(update)<=parseInt(-1)?(
            <>
            <input type="text" className="form-control w-50 d-inline mx-2" placeholder="Add task" value={task} onChange={(e)=>setTask(e.target.value)}/>
            <input type="number" id="cant" className="form-control d-inline mx-2" value={rep} min="1" onChange={(e)=>setRep(e.target.value)}/>
            <button type="submit" className="btn btn-sm btn-success d-inline mx-2" disabled={status==="Time"?(false):(true)} onClick={addTask}>+</button><br/>
            </>
          ):(
            <>
            <input type="text" className="form-control w-50 d-inline mx-2" placeholder="update task" value={task} onChange={(e)=>setTask(e.target.value)}/>
            <input type="number" id="cant" className="form-control d-inline mx-2" value={rep} min="1" onChange={(e)=>setRep(e.target.value)}/>
            <button type="submit" className="btn btn-sm btn-primary d-inline mx-2"disabled={status==="Time"?(false):(true)}  onClick={updateTask}>Update</button><br/>
          </>          
          )}          
          <center>          
          <table id="tasks" className="table table-borderless w-100 mt-4 ">
          <tbody>         
            {
              arrayTask.length> 0&&(
                arrayTask.map((element,index)=>{ return(
                  <tr key={index}>
                  <td class="overflow-visible">{element.task}</td>
                  <td>{element.complete}/{element.rep}</td>
                  <td id="but">
                    <button 
                    type="submit" 
                    onClick={updateTask} 
                    value={index} 
                    disabled={status==="Time"?(false):(true)}
                    className="btn btn-sm btn-danger mx-2 w-25">
                      -
                      </button>
                    <button 
                    type="submit" 
                    onClick={taskToUpdate} 
                    value={index} 
                    disabled={status==="Time"?(false):(true)}
                    className="btn btn-sm btn-secondary w-25">
                      *
                      </button>
                  </td>
                  </tr> 
                )})
              )             
            }
          </tbody>
        </table>
        {arrayTask.length> 0&&(<button className="btn btn-warning" onClick={resetAll}>Reset</button>)}        
        </center>
        </div>        
        <div id="assignmentp"  
        className={String(arrayTask)===""?("col-10 offset-1 col-md-4 offset-md-2 text-center py-5"):("col-10 offset-1 col-md-4 offset-md-2 text-center pt-5")}
        >
          <h3>{status}</h3>
          <Timer time={time} />
          <ControlButtons
            active={isActive}
            isPaused={isPaused}
            handleStart={handleStart}
            handlePauseResume={handlePauseResume}
          />
          <br/>
          {
            arrayTask.length>0?(
            <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: (rounds*100/(totalTaks*2))+'%'}} aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            ):(
              <>
            <input type="range" id="total" value={totalTime} onChange={(e)=>setTotalTime(e.target.value)}/>{totalTime} For Task<br/>
            <input type="range" id="short" value={shortRest} onChange={(e)=>setShortRest(e.target.value)}/>{shortRest} Short rest<br/>
            <input type="range" id="long" value={longRest} onChange={(e)=>setLongRest(e.target.value)}/>{longRest} Long rest<br/>
            </>)
          }
        </div>        
      </div>    
    </div>
  );
}

export default PomodoroApp;

function Timer(props) {
  return (
    <div className="timer">
      <span id="timer" className="digits">
        {('0' + Math.floor((props.time / 60000) % 60)).slice(-2)}:
      </span>
      <span id="timer" className="digits">
        {('0' + Math.floor((props.time / 1000) % 60)).slice(-2)}
      </span>    
    </div>
  );
}

function ControlButtons(props) {
  const StartButton = (
    <div className="btn btn-lg btn-success mx-3" onClick={props.handleStart}>
      Start
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-lg btn-warning mx-3" onClick={props.handlePauseResume}>
        {props.isPaused ? 'Resume' : 'Pause'}
      </div>
    </div>
  );

  return (
    <div className="Control-Buttons">
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
}
