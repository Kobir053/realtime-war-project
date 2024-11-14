import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import DefencePage from '../../components/defencePage/DefencePage';
import AttackPage from '../../components/attackPage/AttackPage';

const PrivatePage: React.FC = () => {

    const nev = useNavigate();

    const { token, warrior } = useSelector((state: RootState) => state.warrior);

    const validWarrior = () => {
        const tokenInLS = JSON.parse(localStorage.getItem("warriorToken")!);
        if(!tokenInLS || !token){
            alert("you don't have any token please log in");
            nev("/login");
            return;
        }
    }

    useEffect(() => {
        validWarrior();
    }, []);

  return (
    <div>
        {warrior?.location? <DefencePage/>: <AttackPage/>}
    </div>
  )
}

export default PrivatePage