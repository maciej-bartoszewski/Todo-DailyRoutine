import { Formik, Form, ErrorMessage , Field} from "formik"
import { useAuth } from "./Security/Auth"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { FindTask, addTask } from "./API/TodoApiService"
import { useEffect } from "react"

export default function TodoComponent(){
    const {username} = useAuth()
    const navigate = useNavigate()
    const parms = useParams()
    const id = parseInt(parms.id)

    const[name, setName] = useState('')
    const[targetDate, setTargetDate] = useState('')

    useEffect( () => retrieveTodo(), [id] )

    function retrieveTodo(){
        if(id != 0) {
            FindTask(id)
            .then(response => {
                setName(response.data.name)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    async function onSubmit(values){
        const todo = {
            id: id,
            username: username,
            name: values.name,
            targetDate: values.targetDate,
            isDone: false,
            out_of_date: false
        }

        try {
            await addTask(todo)
            navigate(`/todos/${username}`)
        } catch (error) {
            console.log(error);
        }
    }

    function validate(values) {
        let errors = {}

        if(values.name.length<3) {
            errors.name = 'Enter atleast 3 characters'
        }

        if(values.targetDate === '') {
            errors.targetDate = 'Enter Target Date'
        }

        return errors
    }

    return(
        <div className="component">
            {id === 0 ? <h3 className="title">Add new todo!</h3> : <h3 className="title">Update your todo!</h3>}

            <Formik initialValues={ { name, targetDate } } 
                    enableReinitialize = {true}
                    onSubmit = {onSubmit}
                    validate = {validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                {
                    (props) => (
                        <Form className='form'>
                            <ErrorMessage 
                                name="name"
                                component="div"
                                className = "alert alert-warning"
                            />
                            <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className = "alert alert-warning"
                            />

                            <fieldset className="form-group">
                                <label>Name</label>
                                <Field type="text" className="form-control" name="name" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <div>
                                <button className="btn btn-dark" type="submit">Save</button>
                            </div>
                        </Form>
                    )
                }
                </Formik>
        </div>
    )
}