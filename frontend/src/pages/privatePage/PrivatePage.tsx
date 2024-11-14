import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import DefencePage from '../../components/defencePage/DefencePage';
import AttackPage from '../../components/attackPage/AttackPage';
import { setCurrentLaunches, validateWarrior } from '../../store/features/warriorSlice';

const PrivatePage: React.FC = () => {

    const nev = useNavigate();

    const { warrior } = useSelector((state: RootState) => state.warrior);

    console.log("private page: ", warrior?.username);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const validWarrior = () => {
        const tokenInLS = JSON.parse(localStorage.getItem("warriorToken")!);
        if(!tokenInLS){
            alert("you don't have any token please log in");
            nev("/login");
            return;
        }
        if(!warrior){
            dispatch(validateWarrior());
            if(JSON.parse(localStorage.getItem("currentLaunches")!) != null){
                dispatch(setCurrentLaunches(JSON.parse(localStorage.getItem("currentLaunches")!)));
            }
        }
    }

    useEffect(() => {
        validWarrior();
    }, []);

  return (
    <div>
        {warrior?.location == null? <AttackPage/>: <DefencePage/> }
    </div>
  )
}

export default PrivatePage