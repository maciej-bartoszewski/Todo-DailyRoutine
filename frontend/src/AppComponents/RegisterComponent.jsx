import { Formik, Field, Form } from 'formik';
import { isUsernameFree, addNewUser } from './API/UserApiService';
import { useState } from 'react';

export default function RegisterComponent(){
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    async function onSubmit(values) {
        try {
            const errors = await validate(values);
            setValidationErrors(errors);

            if (Object.keys(errors).length === 0) {
                const user = {
                    id: 0,
                    username: values.username,
                    password: values.password
                };
                await addNewUser(user);
                setRegistrationSuccess(true); 
            } else {
                setRegistrationSuccess(false);
            }
        } catch (error) {
            console.log(error);
            setRegistrationSuccess(false);
        }
    }

    async function validate(values) {
        let errors = {};
    
        if (values.username.length < 5 || values.username.length > 20) {
            errors.username = 'Username should have 5 - 20 characters';
        }
    
        try {
            await isUsernameFree(values.username);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                errors.username = 'User already exists';
            } else {
                console.log(error);
            }
        }
    
        if (values.password.length < 5 || values.password.length > 20) {
            errors.password = 'Password should have 5 - 20 characters';
        }
    
        if (values.password !== values.passwordR) {
            errors.passwordR = 'Passwords are different';
        }
    
        return errors;
    }

    return(
        <div className="component">
            <h2 className='info'>Sign up to App</h2>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    passwordR: ''
                }}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                <Form className='form'>
                    {(validationErrors.username || validationErrors.password || validationErrors.passwordR) && (
                        <div className="alert alert-warning">
                            {validationErrors.username && <div>{validationErrors.username}</div>}
                            {validationErrors.password && <div>{validationErrors.password}</div>}
                            {validationErrors.passwordR && <div>{validationErrors.passwordR}</div>}
                        </div>
                    )}
                    {registrationSuccess && <div className="alert alert-success">You have been registered!</div>}
                    <fieldset className="form-group">
                        <label>Username</label>
                        <Field className="form-control" name="username" placeholder="Enter username" type="text"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Password</label>
                        <Field className="form-control" name="password" placeholder="Enter password" type="password"/>
                    </fieldset>
                    <fieldset className="form-group">
                        <Field className="form-control" name="passwordR" placeholder="Repeat password" type="password"/>
                    </fieldset>
                    <div >
                        <button type="submit" className="btn btn-dark mt-3">Sign up</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}
