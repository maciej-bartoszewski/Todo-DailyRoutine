import { useState, useEffect } from "react"
import { findAllDaily, updateTask, deleteTask } from "./API/DailyApiService"
import { useAuth } from "./Security/Auth"
import { useNavigate } from "react-router-dom"

export default function DailyRoutineComponent(){
    const [dailyFinished, setDailyFinished] = useState([])
    const [daily, setDaily] = useState([])
    const [showTable1, setShowTable1] = useState(true);
    const [showTable2, setShowTable2] = useState(true);
    const {username} = useAuth()
    const navigate = useNavigate()

    const handleActiveClick = () => {
        if(showTable1) setShowTable1(false);
        else setShowTable1(true)
    };

    const handleFinishedClick = () => {
        if(showTable2) setShowTable2(false);
        else setShowTable2(true)
    };

    useEffect ( () => refreshDaily(), [])

    function refreshDaily(){
        findAllDaily(username)
        .then(response => {
            const finished = [] 
            const active = [] 

            response.data.forEach(dataItem => {
                if (dataItem.isDone === true) {
                  finished.push(dataItem);
                } else {
                  active.push(dataItem);
                }
              });

            setDaily(active)
            setDailyFinished(finished)
            } 
        )
        .catch(error => console.log(error))
    }

    async function updateDaily(id, isDone){
        try {
            await updateTask(id, isDone);
            refreshDaily();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteDaily(id){
        try {
            await deleteTask(id);
            refreshDaily();
        } catch (error) {
            console.log(error);
        }
    }

    function addNewDaily(){
        navigate(`/daily/${username}/0`)
    }

    return(
        <div className="tables">
            <div>
                <h4 className="tableName" onClick={handleActiveClick}>Your tasks for today!</h4> 
                {showTable1 &&<table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{ width: '15%' }}>Done</th>
                            <th style={{ width: '15%' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            daily.map(
                                action => (
                                    <tr key={action.id}>
                                        <td>{action.name}</td>
                                        <td><button className="btn btn-secondary" onClick={() => updateDaily(action.id, true)}>Done</button></td>
                                        <td><button className="btn btn-light" onClick={() => deleteDaily(action.id)}><span aria-hidden="true">&times;</span></button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                }
                <button className="btn btn-dark" onClick={addNewDaily}>Add new</button>
            </div>
            <div>
                <h4 className="tableName" onClick={handleFinishedClick}>Done for today!</h4>
                {showTable2 && <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th style={{ width: '15%' }}>Undone</th>
                            <th style={{ width: '15%' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dailyFinished.map(
                                action => (
                                    <tr key={action.id}>
                                        <td>{action.name}</td>
                                        <td><button className="btn btn-secondary" onClick={() => updateDaily(action.id, false)}>Undone</button></td>
                                        <td><button className="btn btn-light" onClick={() => deleteDaily(action.id)}><span aria-hidden="true">&times;</span></button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
                }
            </div>
        </div>
    )
}