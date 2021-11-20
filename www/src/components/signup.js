import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { SignupSchema } from '../schemas/signupSchema';

const Signup = () => {
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
                        initialValues={{email: '', password: '', username: ''}}
                        validationSchema={SignupSchema}
                        onSubmit={(values) => {
                            console.log(values)
                            setCreds({email: values.email, password: values.password, username: values.username})
                        }}>
                        {props => (
                            <div class="row">
                                <h4>Create An Account</h4>
                                <div class="divider"></div>
                                <div class="section">
                                    <div class="input-field col s12">
                                        <input
                                            placeholder='Email'
                                            onChangeText={props.handleChange('email')}
                                            onBlur={props.handleBlur('email')} 
                                            value={props.values.email}
                                        />
                                    </div>
                                    {props.touched.email && props.errors.email}

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
                                        <button class="btn waves-effect waves-light" type="submit" name="action" onClick={props.handleSubmit}>Sign up</button>
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

export default Signup