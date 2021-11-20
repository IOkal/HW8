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
        <div class = "container">
            <div class = "row center-align">
                <div class="col s6 offset-s3">
                    <Formik
                        initialValues={{username: '', password: ''}}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log(values)
                            setCreds({username: values.email, password: values.password})
                        }}>
                        {props => (
                            <div class="row">
                                <h4>Sign In to Your Account</h4>
                                <div class="divider"></div>
                                <div class="section">
                                    <div class="input-field col s12">
                                        <input
                                            placeholder='Username'
                                            onChangeText={props.handleChange('username')}
                                            onBlur={props.handleBlur('username')} 
                                            value={props.values.username}
                                        />
                                    </div>
                                    <div>
                                        {props.touched.username && props.errors.username}
                                    </div>
                                    <div class="input-field col s12">
                                        <input
                                            placeholder='Password'
                                            onChangeText={props.handleChange('password')}
                                            onBlur={props.handleBlur('password')} 
                                            value={props.values.password}
                                        />
                                    </div>
                                    <div>
                                        {props.touched.password && props.errors.password}
                                    </div>
                                    <div class = "section">
                                        <button class="btn waves-effect waves-light" type="submit" name="action" onClick={props.handleSubmit}>Log In</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Login