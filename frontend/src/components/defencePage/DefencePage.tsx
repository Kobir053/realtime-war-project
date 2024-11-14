import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './defencePage.css';
import { Missile } from '../../../../backend/src/models/missilesModel';
import LaunchOfDefender from '../launch/LaunchOfDefender';
import { useSocket } from '../../hooks/useSocket';
import { ILaunched, IMissileResource } from '../../../../backend/src/types/projectTypes';

const DefencePage: React.FC = () => {

    const { warrior, room } = useSelector((state: RootState) => state.warrior);

    const {joinRoom} = useSocket();

    const renderWeapons = () => {
        return warrior!.resources.map((r: IMissileResource) => {
            return <span>{r.missile.name} x {r.amount}</span>
        });
    }

    const renderCurrentLaunches = () => {
        if(warrior!.currentLaunches == null || warrior!.currentLaunches?.length == 0) return;
        return warrior!.currentLaunches.map((m: Missile) => {
            return <LaunchOfDefender rocket={m}/>
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

    useEffect(() => {
        joinRoom(room!);
    });

  return (
    <div className='defence-page'>
        <div className='title'>
            <h1>Organization: {warrior? `${warrior!.organization} - ${warrior!.location}`: "IDF - North"}</h1>
        </div>

        <nav>
            <div className='nav-title'>
                <h3>Available Ammo</h3>
            </div>
            <div className='nav-info'>
                <div className='weapons'>
                    {renderWeapons()}
                </div>
                <button>LogOut</button>
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

export default DefencePage;