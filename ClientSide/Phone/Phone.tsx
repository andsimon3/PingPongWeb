declare var require: any

import * as React from 'react';
var ReactDOM = require('react-dom');
import ServerListener from './ServerListener';

let speedNow = {
    x: 0,
    y: 0,
    z: 0
};
function newCord(acc, timer) {
    speedNow.z = (speedNow.x + acc.x) / timer;
    speedNow.y = (speedNow.y + acc.y) / timer;
    speedNow.x = (speedNow.z + acc.z) / timer;
    return speedNow;
}

export function Phone(props) {
    const [str, setStr] = React.useState('0 0 0');
    try { DeviceOrientationEvent.requestPermission(); } catch (e) { };
    try { DeviceMotionEvent.requestPermission(); } catch (e) { };
    window.addEventListener('deviceorientation', (event) => {
        ServerListener.sendPos('rotation', event.gamma.toFixed(2), event.alpha.toFixed(2), event.beta.toFixed(2));
    });
    window.addEventListener('devicemotion', (event) => {
        let coord = newCord(event.acceleration, event.interval);
        ServerListener.sendPos('position', coord.x, coord.y, coord.z);
        setStr(event.rotationRate.alpha + "\n " + event.rotationRate.beta + "\n " + event.rotationRate.gamma);
        //setStr(coord.x.toFixed(2) + "\n " + coord.y.toFixed(2) + "\n " + coord.z.toFixed(2));
    });
    return (
        <div>
            <h1>Phone</h1>
            {str}
        </div>
    );
}