import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { logToApp } from './API/UserApiService';
import { useAuth } from './Security/Auth';
import { useState } from 'react';

export default function LoginComponent(){
    const { login } = useAuth()
    const authContext = useAuth()
    const [username, setUsername] = useState()
    const navigate = useNavigate()

    async function handleSubmit(){
        await login()
        navigate(`/welcome/${username}`)
    }

    async function validate(values){
        let errors = {}

        const user = {
            id: 0,
            username: values.username,
            password: values.password
        }
        setUsername(values.username)

        try {
            await logToApp(user)
            authContext.setUsername(user.username)
        } catch (error) {
            if(error.response && error.response.status === 401) {
                errors.username = 'Check you username or password'
            } else{
                console.log(error);
            }
        }
        
        return errors
    }

    return(
        <div className="component">
            <h2 className='info'>Sign in to App</h2>
            <Formik initialValues={
                {
                    username: '',
                    password: ''
                }}
                enableReinitialize = {true}
                validate = {validate}
                onSubmit={handleSubmit}
                validateOnChange = {false}
                validateOnBlur = {false}
                >
                <Form className='form'>
                        <ErrorMessage 
                            name="username"
                            component="div"
                            className = "alert alert-warning"
                        />

                    <fieldset className="form-group">
                        <label>Username</label>
                        <Field className="form-control" name="username" placeholder="Enter username" type="text"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <Field className="form-control" name="password" placeholder="Enter password" type="password"/>
                    </fieldset>
                    <div >
                        <button type="submit" className="btn btn-dark mt-3">Sign in</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}