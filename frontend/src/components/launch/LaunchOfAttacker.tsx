import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Missile } from '../../../../backend/src/models/missilesModel';
import { exploationOfMissile, launchMissile, removeLaunchFromCurrentLaunches } from '../../store/features/warriorSlice';
import { useSocket } from '../../hooks/useSocket';

interface LaunchOfAttackerProps {
    rocket: Missile;
}

const LaunchOfAttacker: React.FC<LaunchOfAttackerProps> = ({ rocket }) => {

    const {warrior} = useSelector((state: RootState) => state.warrior);

    // const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const [time, setTime] = useState<number>(rocket.speed);
    const [exploaded, setExploaded] = useState<boolean>(false);
    const [firstEntry, setFirstEntry] = useState<boolean>(true);
    const [myInterval, setMyInterval] = useState<number>();

    function settingIntervalForAttacker(){

        const intervalId =  setInterval(() => {
            setTime((prev) => prev - 1);
        }, 1000);
        setFirstEntry(false);
        setMyInterval(intervalId);
    }

    firstEntry && settingIntervalForAttacker();
    exploaded && clearInterval(myInterval);

    // const handleIntercepting = () => {

    //     // socket call to update if was intercepted or hitted
    //     if(interceptor!.speed! <= time){
    //         setTimeout(() => {
    //             // socket for update that it was intercepted
    //             hittedRocket(rocket);
    //             const dataForExploation = {
    //                 warriorId: warrior?._id!,
    //                 status: "Intercepted",
    //                 attacker: rocket.name
    //             };
    //             dispatch(exploationOfMissile(dataForExploation));
    //             setExploaded(true);
    //             clearInterval(myInterval);
    //         }, interceptor!.speed);
    //     }
    //     else{
    //         setTimeout(() => {
    //             // socket for update that it was hitted
    //             interceptedRocket(rocket);
    //             const dataForExploation = {
    //                 warriorId: warrior?._id!,
    //                 status: "Hitted",
    //                 attacker: rocket.name
    //             };
    //             dispatch(exploationOfMissile(dataForExploation));
    //             dispatch(removeLaunchFromCurrentLaunches(rocket));
    //             setExploaded(true);
    //             clearInterval(intervalOfAttacker);
    //         }, interceptor!.speed);
    //     }
    // }



  return (
    <tr className='launch' style={{display: exploaded? "none": "block"}}>
        <td>{rocket.name}</td>
        <td>{time}s</td>
        <td>Launched</td>
    </tr>
  )
}

export default LaunchOfAttacker;