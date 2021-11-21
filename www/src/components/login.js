import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { LoginSchema } from '../schemas/loginSchema';
import { logIn } from '../controller/auth';
import Menu from './menu';

const Login = (props) => {
    const [phone, setPhone] = useState('')
    const {authStatus} = props;

    //Fire whenever credentials field is updated
    useEffect(() => {
        if (phone !== '') {
            logIn(phone)
        }
    }, [phone])

    return (
        <div>
            {
                !authStatus ? (
                    <div class = "container">
                        <div class = "row center-align">
                            <div class="col s6 offset-s3">
                                <Formik
                                    initialValues={{phone: ''}}
                                    validationSchema={LoginSchema}
                                    onSubmit={(values) => {
                                        console.log(values)
                                        setPhone(values.phone)
                                    }}>
                                    {props => (
                                        <div class="row">
                                            <h4>Sign Back In</h4>
                                            <div class="section">
                                                <div class="input-field col s12">
                                                    <input
                                                        placeholder='Phone Number'
                                                        onChange={props.handleChange('phone')}
                                                        onBlur={props.handleBlur('phone')}
                                                        value={props.values.phone}  
                                                    />
                                                </div>
                                            </div>
                                            <div class = "section">
                                                <button class="btn waves-effect waves-light" type="submit" onSubmit={props.handleSubmit}>Sign in</button>
                                            </div>
                                        </div>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Menu/>
                )
            }
        </div>
    )
}

export default Login