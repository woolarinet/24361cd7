import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Header from './components/Header.jsx';
import ActivityPage from "./ActivityPage.jsx";
import ActivityDetail from "./ActivityDetail.jsx";

const App = () => {
    return (
        <div className='container'>
            <Header/>
            <Routes>
                <Route path="/" element={<ActivityPage />} />
                <Route path="/detail/:id" element={<ActivityDetail />} />
            </Routes>
        </div>
    );
};

ReactDOM.render(<Router>
    <App/>
</Router>, document.getElementById('app'));

export default App;
