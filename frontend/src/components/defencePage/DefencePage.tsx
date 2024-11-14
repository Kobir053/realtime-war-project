import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './defencePage.css';

const DefencePage: React.FC = () => {

    const { warrior } = useSelector((state: RootState) => state.warrior);

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

export default DefencePage;