import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import TopNav from '../components/top_nav/top_nav_options'
import BottomNav from '../components/mobile_footer'

export default function Options() {

    return (
        <div>
            <TopNav />
            Options
            <BottomNav />
        </div>
    );
}
