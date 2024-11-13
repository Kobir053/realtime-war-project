import React from 'react';
import useForm from '../../hooks/useForm';
import { IDF, Terorists } from '../../types/frontendTypes';

const Register: React.FC = () => {

    const onSubmit = () => {

    }

    const { formValues, handleChange, handleSubmit } = useForm({username: "",password: "",organization: "",location: ""}, onSubmit);

  return (
    <div className='register'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name='username' value={formValues.username}/>
            <input type="text" name='password' value={formValues.password}/>
            <select name="organization" value={formValues.organization} onChange={handleChange}>
                {Object.values(Terorists).map((val, ind) => {return <option key={ind} value={val}>{val}</option>})}
                <option value="IDF">IDF</option>
            </select>
            <select value={formValues.location} onChange={handleSubmit} disabled={formValues.organization !== "IDF"} style={{display: formValues.organization == "IDF"? "block": "none"}}>
                {Object.values(IDF).map((val, ind) => {return <option key={ind} value={val}>{val}</option>})}
            </select>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register