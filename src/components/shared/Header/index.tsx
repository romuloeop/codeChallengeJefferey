import React, { useContext } from "react";

import { MessageContext } from "../../../modules/communication/MessageProvider";
import loading from '../../../assests/loading.svg';

export const Header: React.FC = () => {
    const context = useContext(MessageContext)
    return <header className="App-header">
        <img src={loading} className="App-logo" alt="Loading" />
        <h1>{context?.llave}</h1>
    </header>
}