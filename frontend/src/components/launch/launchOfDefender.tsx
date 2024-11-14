import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Missile } from '../../../../backend/src/models/missilesModel';
import { exploationOfMissile, launchMissile, removeLaunchFromCurrentLaunches } from '../../store/features/warriorSlice';
import { useSocket } from '../../hooks/useSocket';

interface LaunchOfDefenderProps {
    rocket: Missile;
}

const LaunchOfDefender: React.FC<LaunchOfDefenderProps> = ({ rocket }) => {

    const {warrior} = useSelector((state: RootState) => state.warrior);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const { hittedRocket, interceptedRocket } = useSocket();

    const checkAbillityForInterception = (): boolean => {
        let flag = false;
        for(let i = 0;i < warrior!.resources.length; i++){
            for(let j = 0;j < warrior!.resources[i].missile.intercepts.length;j++){
                if(warrior!.resources[i].missile.intercepts[j] == rocket.name && warrior!.resources[i].amount > 0){
                    flag = true;
                    setInterceptor(warrior!.resources[i].missile);
                    break;
                }
            }
            if(flag == true)
                break;
        }
        return flag;
    }

    const [time, setTime] = useState<number>(rocket.speed);
    const [exploaded, setExploaded] = useState<boolean>(false);
    const [showInterceptSign, setShowInterceptSign] = useState<boolean>(checkAbillityForInterception());
    const [interceptor, setInterceptor] = useState<Missile | null>(null);
    const [firstEntry, setFirstEntry] = useState<boolean>(true);
    const [intervalOfAttacker, setIntervalOfAttacker] = useState<number>();

    function settingIntervalForAttacker(){
        // if(!firstEntry){
        //     return;
        // }
        const intervalId =  setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        setFirstEntry(false);
        setIntervalOfAttacker(intervalId);
    }

    firstEntry && settingIntervalForAttacker();

    const handleIntercepting = () => {

        setShowInterceptSign(false);

        // API request for substract the amount of missile with the missileId
        const data = {warriorId: warrior!._id!.toString(), missileName: interceptor!.name};
        dispatch(launchMissile(data));

        // socket call to update if was intercepted or hitted
        if(interceptor!.speed! <= time){
            setTimeout(() => {
                // socket for update that it was intercepted
                hittedRocket(rocket);
                const dataForExploation = {
                    warriorId: warrior?._id!,
                    status: "Intercepted",
                    attacker: rocket.name
                };
                dispatch(exploationOfMissile(dataForExploation));
                setExploaded(true);
                clearInterval(intervalOfAttacker);
            }, interceptor!.speed);
        }
        else{
            setTimeout(() => {
                // socket for update that it was hitted
                interceptedRocket(rocket);
                const dataForExploation = {
                    warriorId: warrior?._id!,
                    status: "Hitted",
                    attacker: rocket.name
                };
                dispatch(exploationOfMissile(dataForExploation));
                // dispatch(removeLaunchFromCurrentLaunches(rocket));
                setExploaded(true);
                clearInterval(intervalOfAttacker);
            }, interceptor!.speed);
        }
    }



  return (
    <tr className='launch' style={{display: exploaded? "none": "block"}}>
        <td>{rocket.name}</td>
        <td>{time}s</td>
        <td>Launched<span onClick={handleIntercepting} style={{display: showInterceptSign? "block": "none"}}>{showInterceptSign? " ❌": ""}</span></td>
    </tr>
  )
}

export default LaunchOfDefender;