import './App.css';
import Viewer from './component/Viewer';
import Controller from "./component/Controller";
import React,{ useRef,useEffect,useState ,useReducer, useCallback} from 'react';
import Even from "./component/Even"

export const TodoContext = React.createContext();


function reducer(state, action){
    switch(action.type){
      case "SET":
        {
          return action.data;
        
        }
        default:
          return state;
    }
    
  
}

function App() {
   //const [count,setCount] = useSate(0) 

  const [count,dispatch] = useReducer(reducer,0);
  const [text,setText] = useState("");
 
 /* const handleSetCount = (value) => {
    
    setCount(value);
  };*/
  
  const handleSetCount=useCallback((value) => {
    dispatch({
      type: "SET",
      data: value,

      
    });
  },[]);
  
  const handleChangeText = (e) => {
    setText(e.target.value);
  }
  const didMountRef = useRef(false);
  useEffect(() => {
    if(!didMountRef.current){   //current --> 객체
      didMountRef.current=true;
      return;
    }

    else{
    //  console.log("업데이트!",text,count);
    }
    });

    useEffect(() => {
    //  console.log("컴포넌트 마운트");
    },[]);

    useEffect(() => {
      const intervalID = setInterval(()=> {
    //console.log("깜빡");
      },1000);

      return () => {
       // console.log("클린업");
        clearInterval(intervalID);
      };

    });
    

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input value={text} onChange={handleChangeText} />
      </section>
      <TodoContext.Provider value={{ count, handleSetCount }}>
    <section>
      <Viewer />
      {count % 2 === 0 && <Even />}
    </section>
    <section>
      <Controller  />
    </section>
    </TodoContext.Provider>
    </div>
  );
}

export default App;
