import React, { useEffect, useState } from 'react'
import './Main.css'
import svg from '../assets/add.svg'
import Tasklist from './Tasklist.jsx';
import axios from 'axios'
import Popup from './Popup'

const Main = ({navbarShow,complete,incomplete}) => {
  const [tasks , settasks]=useState([])
  const [popupShow, setPopupShow] = useState(false);

  const handleDelete = (id) => {
    let newTasks = tasks.filter(task => task._id !== id);
    settasks(newTasks);
  }

  const handleUpdate = (id,newTask) => {
    let newTasks = tasks.map(elem => {
      if(elem._id == id){
        return newTask;
      }
      return elem;
    });
    settasks(newTasks);
  }

  const handleCreation = (newTask) => { 
    let newTasks = tasks;
    newTasks.push(newTask);
    settasks(newTasks);
  }

  useEffect(() => {
    const handleRender = async() => {
      let response= await axios.get('http://localhost:3000/api/readtask') 
      const data= response.data;
      let renderData = data.data.map((elem) => {
        if(elem.isDone === complete){
          return elem;
        }else if(elem.isDone === !incomplete){
          return elem;
        }else{
          return elem;
        }
      })
      console.log(renderData);
      settasks(renderData);
    };
    handleRender();
  },[complete,incomplete])

  const showPopup = () => {
    setPopupShow(true);
  }

  return (
    <div className='ma'>
      <Popup handleCreation={handleCreation} popupShow={popupShow} setPopupShow={setPopupShow}/>
      <div className='buttons'>
        <button onClick={showPopup} className='button add'><span>Add task</span><img className='plus' src={svg} alt="" /></button>
        {/* <button className='button edit'>Edit</button> */}
      </div>
      <div className={navbarShow ? 'tasksBox' : 'tasksBox long'}>
        {tasks.map((elem,idx)=>{
          if(complete && (elem.isDone)){
            return <Tasklist 
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                      id={elem._id} 
                      data={elem}/>
          }else if(incomplete && !(elem.isDone)){
            return <Tasklist 
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                      id={elem._id} 
                      data={elem}/>
          }else{
            return <Tasklist 
                      handleUpdate={handleUpdate}
                      handleDelete={handleDelete}
                      id={elem._id} 
                      data={elem}/>
          }
        })}
      </div>
    </div>
  )
}

export default Main
