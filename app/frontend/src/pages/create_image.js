import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import ImageEditor from '../components/image_editor'
import TopNav from '../components/top_nav/top_nav_create_photo'

export default function Signup(props) {
    const [loadedImg, setLoadedImg] = React.useState(null);
    const [newImg, newLoadedImg] = React.useState('');

    let photoInput;

    const removePhoto = (e) => {
        e.preventDefault()
    }

    const uploadPhoto = (e) => {
        e.preventDefault()
        photoInput.click()
    }

    const uploadPhotoSelected = (e) => {
        const file = e.target.files[0]
        const img = new Image()
        const fr = new FileReader();

        fr.onload = () => {
            img.onload = () => {
                setLoadedImg(img)
            }
            img.src = fr.result;
        }
        fr.readAsDataURL(file);
    }

    const imageSaved = (img) => {
        console.log("save new image")
        newLoadedImg(img)
    }

    return (
        <div>
            <TopNav />
            <div>
                <input
                    style={{ display: 'none' }}
                    ref={i => photoInput = i}
                    type='file'
                    accept="image"
                    onChange={uploadPhotoSelected}
                />
                <p><a href='' onClick={uploadPhoto}>Upload Profile Photo</a></p>
                <p><a href='' onClick={removePhoto}>Remove Profile Photo</a></p>
            </div>
            <ImageEditor img={loadedImg} saveImage={imageSaved} />
            <h2>Saved Image</h2>
            <img src={newImg}></img>
        </div>
    );
}
