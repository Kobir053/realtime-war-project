import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Terorists } from '../../types/frontendTypes';
import './attackPage.css';

const AttackPage: React.FC = () => {

    const { warrior } = useSelector((state: RootState) => state.warrior);

    const [destination, setDestination] = useState<string>(Object.values(Terorists)[0]);

    const destinationChanged = (e: ChangeEvent<HTMLSelectElement>) => {
        setDestination(e.target.value);
    }

  return (
    <div className='attack-page'>
        <div className='title'>
            <h1>Organization: {warrior? `${warrior!.organization}`: "Terrorist"}</h1>
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
                    <span>Hetz-3 x 3</span>
                    <span>Hetz-3 x 3</span>
                    <span>Hetz-3 x 3</span>
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
                <tr>
                    <td>Qassam</td>
                    <td>20s</td>
                    <td>Launched</td>
                </tr>
                <tr>
                    <td>Qassam</td>
                    <td>20s</td>
                    <td>Launched</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default AttackPage