import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { SignupSchema } from '../schemas/signupSchema';

const Signup = () => {
    const [creds, setCreds] = useState()

    //Fire whenever credentials field is updated
    useEffect(() => {
        if (creds !== undefined) {
        
        }
    }, [creds])

    return (
        <div>
            <Formik
                initialValues={{email: '', password: '', username: ''}}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    console.log(values)
                    setCreds({email: values.email, password: values.password, username: values.username})
                }}>
                {props => (
                    <div>
                        <input
                            placeholder='Email'
                            onChangeText={props.handleChange('email')}
                            onBlur={props.handleBlur('email')} 
                            value={props.values.email}
                        />
                        {props.touched.email && props.errors.email}

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

export default Signup