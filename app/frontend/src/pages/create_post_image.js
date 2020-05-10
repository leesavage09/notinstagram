import { useHistory } from "react-router-dom";
import React from 'react';
import ImageEditor from '../components/image_editor'
import TopNav from '../components/top_nav/top_nav_create_photo'

export default function CreateImage() {

    const history = useHistory();
    return (
        <div>
            <TopNav title="New Photo Post" button_title="Next" button_action={()=>{
                history.push("/create-post")
            }}  />
            <ImageEditor maxRes='1080' />
        </div>
    );
}