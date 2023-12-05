import { useState, useEffect } from "react"
import { useAuth } from "./Security/Auth"
import { useNavigate } from "react-router-dom"
import { findAllTodo, deleteTask, updateTask } from "./API/TodoApiService"

export default function ListTodoComponent(){
    const [activeTodo, setActiveTodo] = useState([])
    const [finishedTodo, setFinishedTodo] = useState([])
    const [outOfDateTodo, setOutOfDateTodo] = useState([])
    const {username} = useAuth()
    const [showTable1, setShowTable1] = useState(true);
    const [showTable2, setShowTable2] = useState(false);
    const [showTable3, setShowTable3] = useState(false);
    const navigate = useNavigate()

    const handleActiveClick = () => {
        if(showTable1) setShowTable1(false);
        else setShowTable1(true)
    };

    const handleFinishedClick = () => {
        if(showTable2) setShowTable2(false);
        else setShowTable2(true)
    };

    const handleOutOfDateClick = () => {
        if(showTable3) setShowTable3(false);
        else setShowTable3(true)
    };

    useEffect ( () => refreshTodo(), [])

    function refreshTodo(){
        findAllTodo(username)
        .then(response => {
            const finished = [] 
            const active = [] 
            const outOfDate = [] 

            response.data.forEach(dataItem => {
                if (dataItem.isDone === true) {
                    finished.push(dataItem);
                } 
                else if(dataItem.outOfDate === true){
                    outOfDate.push(dataItem);
                }
                else{
                    active.push(dataItem)
                }
              });

            setActiveTodo(active)
            setFinishedTodo(finished)
            setOutOfDateTodo(outOfDate)
        })
        .catch(error => console.log(error))
    }

    async function deleteTodo(id){
        try {
            await deleteTask(id);
            refreshTodo();
        } catch (error) {
            console.log(error);
        }
    }

    async function updateDaily(id, isDone){
        try {
            await updateTask(id, isDone);
            refreshTodo();
        } catch (error) {
            console.log(error);
        }
    }

    function addNewTodo(){
        navigate(`/todos/${username}/0`)
    }

    function updateTodo(id){
        navigate(`/todos/${username}/${id}`)
    }

    return(
        <div className="TodoComponent">
            <div className="component mb-0">
                <h4 className="tableName" onClick={handleActiveClick}>Active Todos!</h4>
                {showTable1 && <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{ width: '20%' }}>Target Date</th>
                            <th style={{ width: '10%' }}>Update</th>
                            <th style={{ width: '10%' }}>Done</th>
                            <th style={{ width: '10%' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            activeTodo.map(
                                action => (
                                    <tr key={action.id}>
                                        <td>{action.name}</td>
                                        <td>{action.targetDate}</td>
                                        <td><button className="btn btn-secondary" onClick={() => updateTodo(action.id)}>Update</button></td>
                                        <td><button className="btn btn-secondary" onClick={() => updateDaily(action.id, true)} >Done</button></td>
                                        <td><button className="btn btn-light" onClick={() => deleteTodo(action.id)}><span aria-hidden="true">&times;</span></button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                }
                <button className="btn btn-dark" onClick={addNewTodo}>Add new</button>
            </div>
            <div className="tables">
                <div>
                    <h4 className="tableName" onClick={handleFinishedClick}>Finished!</h4> 
                    {showTable2 && <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{ width: '20%' }}>Target Date</th>
                                <th style={{ width: '10%' }}>Undone</th>
                                <th style={{ width: '10%' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                finishedTodo.map(
                                    action => (
                                        <tr key={action.id}>
                                            <td>{action.name}</td>
                                            <td>{action.targetDate}</td>
                                            <td><button className="btn btn-secondary" onClick={() => updateDaily(action.id, false)}>Undone</button></td>
                                            <td><button className="btn btn-light" onClick={() => deleteTodo(action.id)}><span aria-hidden="true">&times;</span></button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    }
                </div>
                <div>
                    <h4 className="tableName" onClick={handleOutOfDateClick}>Out of date!</h4>
                    {showTable3 && <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th style={{ width: '20%' }}>Target Date</th>
                                <th style={{ width: '10%' }}>Update</th>
                                <th style={{ width: '10%' }}>Done</th>
                                <th style={{ width: '10%' }}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                outOfDateTodo.map(
                                    action => (
                                        <tr key={action.id}>
                                            <td>{action.name}</td>
                                            <td>{action.targetDate}</td>
                                            <td><button className="btn btn-secondary" onClick={() => updateTodo(action.id)}>Update</button></td>
                                            <td><button className="btn btn-secondary" onClick={() => updateDaily(action.id, true)}>Done</button></td>
                                            <td><button className="btn btn-light" onClick={() => deleteTodo(action.id)}><span aria-hidden="true">&times;</span></button></td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </div>
    )
}