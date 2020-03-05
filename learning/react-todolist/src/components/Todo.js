import React, {useState ,useEffect } from 'react';
import './Todo.css';

function CreateTask({addtask}){
    const[value,setValue]=useState("");
    const handleSubmit=e=>{
     e.preventDefault();
     if(!value) return;
     addtask(value);
     setValue("");
    }
    return(
        <form onSubmit={handleSubmit}>
        <input type="text"
        className="input"
        value={value}
        placeholder="Add a New task"
        onChange={e=> setValue(e.target.value)}/>
        </form>
    );
}

function Task ({task,index,completedtask,removetask}){
    return (
        <div
            className="task" style={{ textDecoration: task.completed ? "line-through" : "" }}>
            {task.title}
            <button style={{background:"red"}} onClick={()=> removetask(index)}>X</button>
            <button onClick={()=> completedtask(index)}>completed</button>
        </div>
    );
}
function Todo() {
    const [tasksremaining,setTasksRemaining]=useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Grab some Pizza",
            completed: true
        },
      
        {
            title: "Hangout with friends",
            completed: false
        }
    ]);

    useEffect(()=> {
            setTasksRemaining(tasks.filter(task=>!task.completed).length)
                });

    const addtask=title=>{
        const newtask=[...tasks,{title,completed:false}];
        setTasks(newtask);
    }
  
    const completedtask= index =>{
    const newtask=[...tasks];
    newtask[index].completed=true;
    setTasks(newtask);
    }

    const removetask=index =>{
    const newtask=[...tasks];
    newtask.splice(index,1);
    setTasks(newtask);
    }

    return(
            <div className="todo-container">
                <div className="header">Pending Tasks ({tasksremaining})</div>
                <div className="tasks">
                  {tasks.map((task, index) => (
                    <Task
                        task={task}
                        index={index}
                        completedtask={completedtask}
                        removetask={removetask}
                        key={index}
                    />
                ))}
                </div>
                <div className="create-task">
                    <CreateTask  addtask={addtask}/>
                </div>
            </div> 
           );
}
export default Todo;