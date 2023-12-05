import { Formik, Form, ErrorMessage , Field} from "formik"
import { useAuth } from "./Security/Auth"
import { useNavigate } from "react-router-dom"
import { addTask } from "./API/DailyApiService"

export default function NewDailyComponent(){
    const {username} = useAuth()
    const navigate = useNavigate()

    async function onSubmit(values){
        const daily = {
            id: 0,
            username: username,
            name: values.dname,
            isDone: false,
            dailyDate: new Date()
        }

        try {
            await addTask(daily)
            navigate(`/daily/${username}`)
        } catch (error) {
            console.log(error);
        }
    }

    function validate(values) {
        let errors = {}

        if(values.dname.length<3) {
            errors.dname = 'Enter atleast 3 characters'
        }
        return errors
    }

    return(
        <div className="component">
            <h3 className="title">Add new daily!</h3> 
            <Formik initialValues={ {dname: ''} } 
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
                                name="dname"
                                component="div"
                                className = "alert alert-warning"
                            />
                            
                            <fieldset className="form-group">
                                <label>Name</label>
                                <Field type="text" className="form-control" name="dname"  placeholder="Enter new daily"/>
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