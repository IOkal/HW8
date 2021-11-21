import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { SignupSchema } from '../schemas/signupSchema';
import { signUp } from '../controller/auth';
import {isUserAuthenticated, isUserSignedUp} from '../controller/auth'

const Signup = (props) => {
    const [creds, setCreds] = useState('')
    const [authStatus, setAuthStatus] = useState(props.authStatus)
    
    //Fire whenever credentials field is updated
    useEffect(() => {
        (async () => {
            if (creds !== '') {
                await signUp(creds)
                setAuthStatus(isUserAuthenticated())
            }
        })();
    }, [creds])

    return (
        <div>
             {
                !authStatus ? (
                        <div class = "container">
                            <div class = "row center-align">
                                <div class="col s6 offset-s3">
                                    <Formik
                                        initialValues={{phone: '', firstname: '', lastname: ''}}
                                        validationSchema={SignupSchema}
                                        onSubmit={(values) => {
                                            console.log(values)
                                            setCreds(values)
                                        }}>
                                        {props => (
                                            <div class="row">
                                                <h4>Create An Account</h4>
                                                <div class="section">
                                                    <div class="input-field col s12">
                                                        <input
                                                            placeholder='Phone Number'
                                                            onChange={props.handleChange('phone')}
                                                            onBlur={props.handleBlur('phone')} 
                                                            value={props.values.phone}
                                                        />
                                                    </div>
                                                    {props.touched.phone && props.errors.phone}
                
                                                    <div class="input-field col s12">
                                                        <input
                                                            placeholder='First Name'
                                                            onChange={props.handleChange('firstname')}
                                                            onBlur={props.handleBlur('firstname')} 
                                                            value={props.values.firstname}
                                                        />
                                                    </div>
                                                    <div>
                                                        {props.touched.firstname && props.errors.firstname}
                                                    </div>
                                                    <div class="input-field col s12">
                                                        <input
                                                            placeholder='Last Name'
                                                            onChange={props.handleChange('lastname')}
                                                            onBlur={props.handleBlur('lastname')} 
                                                            value={props.values.lastname}
                                                        />
                                                    </div>
                                                    <div>
                                                        {props.touched.lastname && props.errors.lastname}
                                                    </div>
                                                    <div class = "section">
                                                        <button class="btn waves-effect waves-light" type="submit" onClick={props.handleSubmit}>Sign up</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    ) : (
                    <Redirect to='/Profile'/>
                ) 
            }
        </div>
    )
}

export default Signup