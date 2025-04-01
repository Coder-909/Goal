import React, { useEffect, useState } from 'react'
import './Main.css'
import svg from '../assets/add.svg'
import Tasklist from './tasklist.jsx'
import axios from 'axios'
import Popup from './Popup'

const Main = ({timeFilter,navbarShow,complete,incomplete}) => {
  const [tasks , settasks]=useState([])
  const [popupShow, setPopupShow] = useState(false);

  const currentDate = new Date();

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

  const isDateInCurrentWeek = (date,month) => {
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Set to Sunday

    const lastDayOfWeek = new Date(currentDate);
    lastDayOfWeek.setDate(currentDate.getDate() + (6 - currentDate.getDay())); // Set to Saturday
    console.log(date,firstDayOfWeek.getMonth());
    if(firstDayOfWeek.getMonth() === lastDayOfWeek.getMonth()){
      return date >= firstDayOfWeek.getDate() && date <= lastDayOfWeek.getDate();
    }else if(firstDayOfWeek.getMonth() < month){
      return date <= firstDayOfWeek.getDate() && date <= lastDayOfWeek.getDate();
    }else if (month < lastDayOfWeek.getMonth()){
      return date>= firstDayOfWeek.getDate() && date >= lastDayOfWeek.getDate();
    }
  };
  
  useEffect(() => {
    const handleRender = async() => {
      let response= await axios.get('http://localhost:3000/api/readtask') 
      const data= response.data;
      let renderData = data.data.filter(task => 
        ((complete && task.isDone) || (incomplete && !task.isDone)) || (!complete && !incomplete)
      )
      if(timeFilter==="Today"){
        renderData = renderData.filter(task => {
          let deadline = new Date(task.deadline);
          let date = deadline.getDate();
          let month = deadline.getMonth();
          let year = deadline.getFullYear();
          if(date === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()){
            return task;
          }
        })
      }else if(timeFilter === "This week"){
        renderData = renderData.filter(task => {
          let deadline = new Date(task.deadline);
          let date = deadline.getDate();
          let month = deadline.getMonth();
          let year = deadline.getFullYear();
          if(isDateInCurrentWeek(date,month) && year === currentDate.getFullYear()){
            return task;
          }
        })
      }else if(timeFilter === "This month"){
        renderData = renderData.filter(task => {
          let deadline = new Date(task.deadline);
          let month = deadline.getMonth();
          let year = deadline.getFullYear();
          if(month === currentDate.getMonth() && year === currentDate.getFullYear()){
            return task;
          }
        })
      }
      settasks(renderData);
    };
    handleRender();
  },[complete,incomplete,timeFilter])

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
          return <Tasklist 
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    id={elem._id} 
                    data={elem}/>
          
        })}
      </div>
    </div>
  )
}

export default Main
