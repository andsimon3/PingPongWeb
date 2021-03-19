declare var require: any

import * as React from 'react';
var ReactDOM = require('react-dom');
import { Phone } from './ClientSide/Phone/Phone';
import ServerListenerPhone from './ClientSide/Phone/ServerListener';
import { Host } from './ClientSide/Host/Host';
import ServerListenerHost from './ClientSide/Host/ServerListener';

export function Main(props) {
    function phoneGo() {
        ServerListenerPhone.connect();
        setAppRole(<Phone />);
    }
    function hostGo() {
        ServerListenerHost.connect();
        setAppRole(<Host />);
    }
    const [appRole, setAppRole] = React.useState(< div >
        <h1>Welcome to React!!</h1>
        <button onClick={(e) => phoneGo()}>Управление </button>
        <button onClick={(e) => hostGo()}>Host </button>
    </div >);
    return (
        <div>
            {appRole}
        </div>
    );

}

ReactDOM.render(<Main />, document.getElementById('root'));