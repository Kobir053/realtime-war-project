import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Missile } from '../../../backend/src/models/missilesModel';
import { ILaunched } from '../../../backend/src/types/projectTypes';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addToCurrentLaunches, exploationOfMissile, removeLaunchFromCurrentLaunches, setWarriorRoom } from '../store/features/warriorSlice';
import { IExploation } from '../types/frontendTypes';

const SERVER_URL = 'http://localhost:3001';

export function useSocket() {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();

    const {warrior} = useSelector((state: RootState) => state.warrior);

    const [socket, setSocket] = useState<Socket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const [missile, setMissile] = useState<Missile | null>(null);
    const [room, setRoom] = useState<string>(''); // Keep track of the current room
    const [sesion, setSession] = useState<ILaunched | null>(null);

    useEffect(() => {
        const socketInstance = io(SERVER_URL);
        setSocket(socketInstance);

        socketInstance.on('connect', () => {
            console.log('Connected:', socketInstance.id);
            setConnected(true);
        });

        socketInstance.on('disconnect', (reason: string) => {
            console.log('Disconnected:', reason);
            setConnected(false);
        });

        socketInstance.on('launched', (rocket: Missile) => {
            console.log('Room recieved launch of: ', rocket.name);
            setMissile(rocket);
            dispatch(addToCurrentLaunches(rocket));
        });

        socketInstance.on('intercepted', (rocket: Missile) => {
            console.log('Room recieved launch of: ', rocket.name);
            setSession({rocket: rocket.name, status: "Intercepted"});
            const exploation: IExploation = {status: sesion?.status!,attacker: sesion?.status! , warriorId: warrior?._id!};
            dispatch(exploationOfMissile(exploation));
            dispatch(removeLaunchFromCurrentLaunches(rocket));
        });

        socketInstance.on('hitted', (rocket: Missile) => {
            console.log('Room recieved launch of: ', rocket.name);
            setSession({rocket: rocket.name, status: "Hit"});
            const exploation: IExploation = {status: sesion?.status!,attacker: sesion?.status! , warriorId: warrior?._id!};
            dispatch(exploationOfMissile(exploation));
            dispatch(removeLaunchFromCurrentLaunches(rocket));
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    function joinRoom(room: string) {
        if (socket) {
            socket.emit('join', room);
            setRoom(room);  // Update the current room state
            dispatch(setWarriorRoom(room));
            console.log(`Joining room: ${room}`);
        }
    }

    function leaveRoom(room: string) {
        if (socket) {
            socket.emit('leave', room);
            setRoom('');  // Reset room state when leaving
            dispatch(setWarriorRoom(""));
            console.log(`Leaving room: ${room}`);
        }
    }

    function sendLaunch(rocket: Missile) {
        if (socket && room) {
            socket.emit('launch-rocket', room, rocket);
            console.log(`launching rocket ${rocket.name} to room ${room}`);
        }
    }

    function interceptedRocket(rocket: Missile) {
        if (socket && room) {
            socket.emit('intercept-rocket', room, rocket);
            console.log(`intercepting rocket ${rocket.name} in room: ${room}`);
            // setSession({rocket: rocket.name, status: "Intercepted"});
        }
    }

    function hittedRocket(rocket: Missile) {
        if (socket && room) {
            socket.emit('hit-rocket', room, rocket);
            console.log(`rocket ${rocket.name} hitted in room: ${room}`);
            // setSession({rocket: rocket.name, status: "Hit"});
        }
    }

    return {
        connected,
        missile,
        room,
        sesion,
        joinRoom,
        leaveRoom,
        sendLaunch,
        hittedRocket,
        interceptedRocket,
    };
}