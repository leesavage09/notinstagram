import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import { Link } from "react-router-dom";
import * as Actions from '../redux/actions/session_actions'
import MobileHeader from '../components/protected_container'

export default function Home() {

    return (
        <MobileHeader>
            Explore
        </MobileHeader>
    );
}
