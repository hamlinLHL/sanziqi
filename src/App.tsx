import React from 'react';
import './App.scss';
import Game from "./component/Game";

class App extends React.Component{
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <Game/>
            </div>
        );
    }
};

export default App;
