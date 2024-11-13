import React from 'react';
import './register.css';
import useForm from '../../hooks/useForm';
import { IDF, Terorists } from '../../types/frontendTypes';

const Register: React.FC = () => {

    const onSubmit = () => {

    }

    const { formValues, handleChange, handleSubmit } = useForm({username: "",password: "",organization: "",location: ""}, onSubmit);

  return (
    <div className='register'>
        <div className='register-container'>        
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name='username' value={formValues.username}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name='password' value={formValues.password}/>
                </div>
                <div>
                    <label>Organization</label>
                    <select name="organization" value={formValues.organization} onChange={handleChange}>
                        {Object.values(Terorists).map((val, ind) => {return <option key={ind} value={val}>{val}</option>})}
                        <option value="IDF">IDF</option>
                    </select>
                </div>
                <div style={{display: formValues.organization == "IDF"? "flex": "none"}}>
                    <label>Location</label>
                    <select value={formValues.location} onChange={handleSubmit} disabled={formValues.organization !== "IDF"}>
                        {Object.values(IDF).map((val, ind) => {return <option key={ind} value={val}>{val}</option>})}
                    </select>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Register