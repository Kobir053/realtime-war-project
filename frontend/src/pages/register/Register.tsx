import React from 'react';
import './register.css';
import useForm from '../../hooks/useForm';
import { IDF, IRegister, Terorists } from '../../types/frontendTypes';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { registerWarrior } from '../../store/features/warriorSlice';

const Register: React.FC = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const nev = useNavigate();

    const onSubmit = () => {
        if(formValues.username == "" || formValues.password == ""){
            alert("please enter your details");
            return;
        }
        const data: IRegister = {
            username: formValues.username,
            password: formValues.password,
            organization: formValues.organization,
            location: formValues.organization == "IDF"? formValues.location: null
        };
        dispatch(registerWarrior(data));
        nev("/login");
    }

    const { formValues, handleChange, handleSubmit } = useForm({username: "",password: "",organization: Object.values(Terorists)[0],location: "North"}, onSubmit);

  return (
    <div className='register'>
        <div className='register-container'>        
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name='username' value={formValues.username} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name='password' value={formValues.password} onChange={handleChange}/>
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
                    <select name='location' value={formValues.location} onChange={handleChange} disabled={formValues.organization !== "IDF"}>
                        {Object.values(IDF).map((val, ind) => {return <option key={ind} value={val}>{val}</option>})}
                    </select>
                </div>
                <button type='submit'>Register</button>
            </form>
            <span>Already Have An Account? <span onClick={() => nev("/login")} style={{textDecoration: "underline"}}>Sign In</span></span>
        </div>
    </div>
  )
}

export default Register