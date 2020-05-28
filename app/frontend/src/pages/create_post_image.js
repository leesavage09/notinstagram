import { useHistory } from "react-router-dom";
import React from 'react';
import ImageEditor from '../components/image_editor'
import {TopNavCreatePhoto} from '../components/top_nav'

export default function CreateImage() {

    const history = useHistory();
    return (
        <div>
            <TopNavCreatePhoto title="New Photo Post" button_title="Next" button_action={()=>{
                history.push("/create-post")
            }}  />
            <ImageEditor maxRes='1080' />
        </div>
    );
}