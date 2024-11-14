import React from 'react';
import useForm from '../../hooks/useForm';
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store/store';
import { loginWarrior } from '../../store/features/warriorSlice';
import './login.css';

const Login: React.FC = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const nev = useNavigate();

    const onSubmit = async() => {
        if(formValues.username == "" || formValues.password == ""){
            alert("please enter the details");
            return;
        }
        await dispatch(loginWarrior(formValues as {username: string, password: string}));
        nev("/war");
    }

    const { formValues, handleChange, handleSubmit } = useForm({username: "", password: ""}, onSubmit);

  return (
    <div className='login'>
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name='username' value={formValues.username} onChange={handleChange}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="text" name='password' value={formValues.password} onChange={handleChange}/>
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login