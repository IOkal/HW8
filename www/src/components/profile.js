import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [name, setName] = useState({firstName: '', lastName: ''})
    const [restrictionList, setRestrictionList] = useState([{ restriction: ""}]);
    const [preferenceList, setPreferenceList] = useState([{ preference: ""}]);

    // useEffect(() => {

    // }, [])

    // handle input change
    const handlePreferenceChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...setPreferenceList];
        list[index][name] = value;
        setPreferenceList(list);
    };

    const handleRestrictionChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...restrictionList];
        list[index][name] = value;
        setRestrictionList(list);
      };
   
    // handle click event of the Add button
    const handleAddRestriction = () => {
        setRestrictionList([...restrictionList, { restriction: "" }]);
    };

    // handle click event of the Add button
    const handleAddPreference = () => {
        setPreferenceList([...preferenceList, { preference: "" }]);
    };

    const handleNameChange = (e) => {
        const {name, value} = e.target
        setName(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div class = "container">
            <div class = "row center-align">
                <div class="col s12">
                    <form class="col s6 offset-s3">
                        <h3>Update Profile</h3>
                        <div class="divider"></div>
                        <div class="row">
                            <div class="section">
                                <div class="input-field col s6">
                                    <input
                                        name="firstName"
                                        placeholder="First Name"
                                        value={name.firstName}
                                        onChange={e => handleNameChange(e)}
                                    />
                                </div>
                                <div class="input-field col s6">
                                    <input
                                        name="lastName"
                                        placeholder="Enter Last Name"
                                        value={name.lastName}
                                        onChange={e => handleNameChange(e)}
                                    />
                                </div>
                                <div>
                                    <></>
                                </div>
                            </div>

                            <div class="section" style = {{marginTop: "100px"}}>
                                <h5>Dietary Preferences</h5>
                                {preferenceList.map((x, i) => {
                                    return (
                                        <div class="input-field col s12">                                
                                            <input
                                                name="preference"
                                                placeholder="Enter preference"
                                                value={x.preference}
                                                onChange={e => handlePreferenceChange(e, i)}
                                            />
                                        </div>
                                    );
                                })}
                                <div>
                                    <a class="btn-floating btn-small waves-effect waves-light red" onClick={handleAddPreference}><i class="material-icons">add</i></a>
                                </div>
                            </div>

                            <div class="section">
                                <h5>Dietary Restrictions</h5>
                                {restrictionList.map((x, i) => {
                                    return (
                                        <div class="input-field col s12">                                
                                            <input
                                                name="restriction"
                                                placeholder="Enter restriction"
                                                value={x.restriction}
                                                onChange={e => handleRestrictionChange(e, i)}
                                            />
                                        </div>
                                    );
                                })}
                                <div>
                                    <a class="btn-floating btn-small waves-effect waves-light red" onClick={handleAddRestriction}><i class="material-icons">add</i></a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
       
    )
}

export default Profile