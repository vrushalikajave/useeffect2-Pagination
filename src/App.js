import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// function App() {
// useEffect(()=>{
// const getTodo =async ()=>{
//   let r=await fetch("http://localhost:8080/todos");
//   let data= await r.json();
//   console.log(data);
// }
// getTodo();
// },[])

//   return (
//     <div className="App">
//       Hi...*********
//     </div>
//   );
// }

// export default App;


function App() {
  const [todos, setTodos]=useState([]);
   const[page, setPage]=useState(1);
   const[totalCount, setTotalCount]= useState(0)
   const[limit, setLimit]=useState(5);
  useEffect(()=>{
  const getTodo =async ()=>{
    let r=await axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`);
    // console.log(r);
    console.log(r.data);
    setTodos(r.data)
    setTotalCount(Number(r.headers["x-total-count"]))
  }
  getTodo();
  },[page, limit])
  
    return (
      <div className="App">
         <button disabled={page<=1}  onClick={()=>{ if(page>1) {setPage(page-1)}}}>{"<"}</button>
         {/* <input type="number" value={limit} min={0} max={totalCount}  onChange={({target})=> setLimit(Number(target.value))}/> */}
       <select onChange={(e)=> setLimit(Number(e.target.value))}>
         <option value="5">5</option>
         <option value="10">10</option>
         <option value="20">20</option>
       </select>
       <button disabled={totalCount < page*limit} onClick={()=>setPage(page+1)}>{">"}</button>

       {todos.map((todo)=>(
         <div key={todo.id}>{todo.id} { " : "  }{todo.value}</div>
       )
      )}

      
      </div>
    );
  }
export default App;