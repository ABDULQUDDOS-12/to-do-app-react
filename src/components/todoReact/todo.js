import React,{useState,useEffect} from 'react';
import "./style.css"
//get the local storage data back
const getLocalData = ()=>{
  const Lists = localStorage.getItem("mytodoList")
  if(Lists){
    return JSON.parse(Lists);
  }
  else{
    return[];
  }
}
const Todo = () => {
  const [inputdata,setInputData] = useState("");
  const [items,setItems] = useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("")
  const [toggleButton,setToggleButton] = useState(false)
  // add the items function
  const addItem = () =>{
    if(!inputdata){
      alert("please fill the data")
    }
      else if(inputdata && toggleButton)
      {
           setItems(
            items.map((curElem)=>{
              if(curElem.id===isEditItem){
                return{...curElem,name:inputdata}
              }
              return curElem;
            })
           )
           setInputData([])
      setIsEditItem(null)
      setToggleButton(false)
      }
    
    else{
      const myNewData = {
        id:new Date().getTime().toString(),
        name:inputdata,
      };
      setItems([...items,myNewData])
      setInputData("")
    }
  }
//how to delete items section
const deleteItem = (index)=>{
   const updatedItem = items.filter((currElem)=>{
     return currElem.id !== index;
   })
   setItems(updatedItem)
}
//remove all the elements
   const removeAll = () =>{
    setItems([])
   }
   //adding localstorage
   useEffect(()=>{
    localStorage.setItem("mytodoList",JSON.stringify(items))
   })
   //edit items
   const editItem=(index)=>{
    const item_todo_edited = items.find((curElem)=>{
       return curElem.id===index;
    })
      setInputData(item_todo_edited.name)
      setIsEditItem(index)
      setToggleButton(true)
   }
  return (
    <>
    <div className='main-div'>
        <div className="child-div">
        <figure>
            <img src="./images/todolist.png" alt="todologo" />
        <figcaption>Add your list here ✌</figcaption>
        </figure>
        <div className="addItems">
        <input type="text" name="" id="" placeholder='✍ add item' className='form-control'value={inputdata}
          onChange={(event)=>setInputData(event.target.value)}/>
        {toggleButton?<i className="far fa-edit add-btn" onClick={addItem}></i>:<i className="fa fa-plus add-btn" onClick={addItem}></i>}
        </div>
        <div className="showItems">
          {items.map((currElem)=>{
              return(
            <div className="eachItem" key={currElem.id}>
            <h3>{currElem.name}</h3>
            <div className="todo-btn">
            <i className="far fa-edit add-btn" onClick={()=>editItem(currElem.id)}></i>
            <i className="far fa-trash-alt add-btn" onClick={()=>{
              deleteItem(currElem.id)
            }}></i>
            </div>
            </div>
              )
          })}
          
            
            </div>
        <div className="showItems">
          <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
          <span>Check List</span>
          </button></div>
        </div>
    </div>
  </>
  )
}

export default Todo