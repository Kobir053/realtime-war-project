import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Terorists } from '../../types/frontendTypes';
import './attackPage.css';
import { useSocket } from '../../hooks/useSocket';
import { ILaunched, IMissileResource } from '../../../../backend/src/types/projectTypes';
import { Missile } from '../../../../backend/src/models/missilesModel';
import { useNavigate } from 'react-router';
import { launchMissile } from '../../store/features/warriorSlice';
import LaunchOfAttacker from '../launch/LaunchOfAttacker';

const AttackPage: React.FC = () => {

    const { joinRoom, sendLaunch } = useSocket();

    const nev = useNavigate();

    const { warrior } = useSelector((state: RootState) => state.warrior);

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const [destination, setDestination] = useState<string>(Object.values(Terorists)[0]);

    const renderWeapons = () => {
        return warrior!.resources.map((r: IMissileResource) => {
            return <span onClick={() => handleAttack(r.missile)}>{r.missile.name} x {r.amount}</span> // need to add onclick
        });
    }

    const handleAttack = (missile: Missile) => {
        const data = {warriorId: warrior!._id!.toString(), missileName: missile.name};
        dispatch(launchMissile(data));
        sendLaunch(missile);
    }

    const renderCurrentLaunches = () => {
        if(warrior!.currentLaunches == null || warrior!.currentLaunches?.length == 0) return;
        return warrior!.currentLaunches.map((m: Missile) => {
            return <LaunchOfAttacker rocket={m}/>
        });
    }

    const renderHistoryOfLaunches = () => {
        if(warrior!.launchHistory == null || warrior!.launchHistory.length == 0) return;
        return warrior!.launchHistory.map((l: ILaunched) => {
            return <td>
                    <tr>{l.rocket}</tr>
                    <tr>0s</tr>
                    <tr style={{color: l.status == "Hit"? "green": "red"}}>{l.status}</tr>
                </td>
        })
    }

    const destinationChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        setDestination(e.target.value);
    }

    useEffect(() => {
        joinRoom(destination);
    }, [destination]);

  return (
    <div className='attack-page'>
        <div className='title'>
            <h1>Organization: {warrior!.organization}</h1>
        </div>

        <nav>
            <div className='nav-title'>
                <h3>Available Ammo</h3>
            </div>
            <div className='nav-info'>
                <select name="destination" value={destination} onChange={destinationChanged}>
                    {Object.values(Terorists).map((val, ind) => {
                        return <option key={ind} value={val}>{val}</option>
                    })}
                </select>
                <div className='weapons'>
                    {renderWeapons()}
                </div>
                <button onClick={() => nev("/login")}>LogOut</button>
            </div>
        </nav>
        <h2>Launched Rockets</h2>
        <table>
            <thead>
                <tr>
                    <td>Rocket</td>
                    <td>Time To Hit</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {renderCurrentLaunches()}
                {renderHistoryOfLaunches()}
            </tbody>
        </table>
    </div>
  )
}

export default AttackPage