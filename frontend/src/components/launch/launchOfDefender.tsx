import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Missile } from '../../../../backend/src/models/missilesModel';
import { exploationOfMissile, launchMissile } from '../../store/features/warriorSlice';

interface LaunchOfDefenderProps {
    timeToHit: number;
    rocketName: string;
}

const launchOfDefender: React.FC<LaunchOfDefenderProps> = ({ timeToHit, rocketName }) => {

    const {warrior} = useSelector((state: RootState) => state.warrior);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const checkAbillityForInterception = (): boolean => {
        let flag = false;
        for(let i = 0;i < warrior!.resources.length; i++){
            for(let j = 0;j < warrior!.resources[i].missile.intercepts.length;j++){
                if(warrior!.resources[i].missile.intercepts[j] == rocketName && warrior!.resources[i].amount > 0){
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

    const [time, setTime] = useState<number>(timeToHit);
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
        const data = {warriorId: warrior!._id!.toString(), missileId: interceptor?.id};
        dispatch(launchMissile(data));

        // socket call to update if was intercepted or hitted
        if(interceptor!.speed! <= time){
            setTimeout(() => {
                // socket for update that it was intercepted
                const dataForExploation = {
                    warriorId: warrior?._id!,
                    status: "Intercepted",
                    attacker: rocketName
                };
                dispatch(exploationOfMissile(dataForExploation));
                setExploaded(true);
                clearInterval(intervalOfAttacker);
            }, interceptor!.speed);
        }
        else{
            setTimeout(() => {
                // socket for update that it was hitted
                const dataForExploation = {
                    warriorId: warrior?._id!,
                    status: "Hitted",
                    attacker: rocketName
                };
                dispatch(exploationOfMissile(dataForExploation));
                setExploaded(true);
                clearInterval(intervalOfAttacker);
            }, interceptor!.speed);
        }
    }



  return (
    <tr className='launch' style={{display: exploaded? "none": "block"}}>
        <td>{rocketName}</td>
        <td>{time}s</td>
        <td>Launched<span onClick={handleIntercepting}>{showInterceptSign? " ❌": ""}</span></td>
    </tr>
  )
}

export default launchOfDefender;