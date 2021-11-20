import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { LoginSchema } from '../schemas/loginSchema';

const Login = () => {
    const [creds, setCreds] = useState({})

    //Fire whenever credentials field is updated
    useEffect(() => {
        if (creds !== undefined) {
        
        }
    }, [creds])

    return (
        <div>
            <Formik
                initialValues={{username: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                    console.log(values)
                    setCreds({username: values.username, password: values.password})
                }}>
                {props => (
                    <div>
                        <input
                            placeholder='Username'
                            onChangeText={props.handleChange('username')}
                            onBlur={props.handleBlur('username')} 
                            value={props.values.username}
                        />
                        {props.touched.username && props.errors.username}

                        <input
                            placeholder='Password'
                            onChangeText={props.handleChange('password')}
                            onBlur={props.handleBlur('password')} 
                            value={props.values.password}
                        />
                        {props.touched.password && props.errors.password}
                        <button onClick={props.handleSubmit}>Create Account</button> 
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default Login