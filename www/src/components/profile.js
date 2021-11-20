import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [name, setName] = useState({firstName: '', lastName: ''})
    const [restrictionList, setRestrictionList] = useState([{ restriction: ""}]);
    const [preferenceList, setPreferenceList] = useState([{ preference: ""}]);

    // handle input change
    const handlePreferenceChange = (e, index) => {
      const { name, value } = e.target;
      const list = [...setPreferenceList];
      list[index][name] = value;
      setPreferenceList(list);
    };

    const handleRestrictionChange = (e, index) => {
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
        <div>
            {/* <form onSubmit = {this.handleSubmit}> */}
                <input
                    name="firstName"
                    placeholder="Enter first Name"
                    value={name.firstName}
                    onChange={e => handleNameChange(e)}
                />
                <input
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={name.lastName}
                    onChange={e => handleNameChange(e)}
                />
                {preferenceList.map((x, i) => {
                    return (
                        <div className="box">
                            <input
                                name="preference"
                                placeholder="Enter preference"
                                value={x.preference}
                                onChange={e => handlePreferenceChange(e, i)}
                            />
                        </div>
                    );
                })}
                <div className="btn-box">
                    <button onClick={handleAddPreference}>+</button>
                </div>

                {restrictionList.map((x, i) => {
                    return (
                        <div className="box">
                            <input
                                name="restriction"
                                placeholder="Enter restriction"
                                value={x.restriction}
                                onChange={e => handleRestrictionChange(e, i)}
                            />
                        </div>
                    );
                })}
                <div className="btn-box">
                    <button onClick={handleAddRestriction}>+</button>
                </div>
            {/* </form> */}
        </div>
    )
}

export default Profile