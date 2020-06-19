import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { TopNavActivity } from '../components/top_nav'
import BottomNav from '../components/bottom_nav'
import { NoNotifications } from '../components/no-content-placeholders';
import { sessionActions, sessionSelector } from '../redux/slice/session_slice';
import { PostNotificationListItem, FollowNotificationListItem } from '../components/user_list_item';

export default function Activity() {
    const notifications = useSelector(sessionSelector.getNotifications())
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sessionActions.getNotifications())
    }, [])

    const notificationItems = []
    if (notifications.length > 0) {
        notifications.reverse().forEach(note => {
            if (note.source_post_id) {
                notificationItems.push(<PostNotificationListItem key={note.id} notification={note} />)
            }
            else {
                notificationItems.push(<FollowNotificationListItem key={note.id} notification={note} />)
            }
        });
    }
    else {
        notificationItems.push(<NoNotifications key="1" />)
    }

    return (
        <div className="activity-page">
            <TopNavActivity />
            {notificationItems}
            <BottomNav />
        </div>
    );
}
