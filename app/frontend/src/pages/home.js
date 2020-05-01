import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Actions from '../redux/actions/session_actions'
import MobileHeader from '../components/mobile_header'
import MobileFooter from '../components/mobile_footer'

export default function Home() {
    
    return (
        <div>
            <MobileHeader/>
Home
            <MobileFooter page="home"/>
        </div >
    );
}
