import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TopNavActivity } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { NoNotifications } from '../components/no-content-placeholders';
import { sessionActions, sessionSelector } from '../redux/slice/session_slice';


export default function Activity() {
    const notifications = useSelector(sessionSelector.getNotifications())
    const dispatch = useDispatch()
    console.log({ notifications })

    useEffect(() => {
        dispatch(sessionActions.getNotifications())
    },[])

    return (
        <div className="activity-page">
            <TopNavActivity />
            <NoNotifications />
            <BottomNav />
        </div>
    );
}
