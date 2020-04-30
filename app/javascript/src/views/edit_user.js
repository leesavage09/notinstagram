import { useSelector, useDispatch } from 'react-redux'
import React from 'react';
import * as Actions from '../redux/actions/user_actions'
import * as Selectors from '../redux/selectors/user_selectors'
import ImageEditor from '../components/image_editor'

export default function Signup(props) {
    const [loadedImg, setLoadedImg] = React.useState(null);
    const [newImg, newLoadedImg] = React.useState('');

    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    const user = useSelector(state => Selectors.loggedInUser(state))
    const errorsMessages = useSelector(state => Selectors.errorsMessages(state))
    const errorTypes = useSelector(state => Selectors.errorTypes(state))

    const nameInput = React.createRef();
    const usernameInput = React.createRef();
    const emailInput = React.createRef();
    const bioInput = React.createRef();

    let photoInput;


    const errorListItems = []
    errorsMessages.forEach((message, idx) => {
        errorListItems.push(<li key={idx}>{message}</li>)
    });

    const updateClicked = () => {
        const newUser = Object.assign(user, {
            username: usernameInput.current.value,
            name: nameInput.current.value,
            email: emailInput.current.value,
            bio: bioInput.current.value
        })
        dispatch(Actions.updateUser(newUser))
    }

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
        console.log("savge new imgaeg")
        newLoadedImg(img)
    }

    return (
        <div>
            <h1>Edit User!</h1>
            <div>
                <input className="hidden" ref={i => photoInput = i} type='file' accept="image" onChange={uploadPhotoSelected} />
                <p><a href='' onClick={uploadPhoto}>Upload Profile Photo</a></p>
                <p><a href='' onClick={removePhoto}>Remove Profile Photo</a></p>
            </div>
            <div>
                <label>Name</label>
                <input ref={nameInput}
                    type="name"
                    className={errorTypes.includes("name") ? "error" : ""}
                    defaultValue={user.name}
                    autoComplete="name"
                /></div>

            <div>
                <label>Username</label>
                <input ref={usernameInput}
                    type="username"
                    className={errorTypes.includes("username") ? "error" : ""}
                    defaultValue={user.username}
                    autoComplete="username"
                /></div>

            <div>
                <label>Email</label>
                <input ref={emailInput}
                    type="email"
                    className={errorTypes.includes("email") ? "error" : ""}
                    defaultValue={user.email}
                    autoComplete="email"
                /></div>

            <div>
                <label>Bio</label>
                <textarea ref={bioInput}
                    type="text"
                    defaultValue={user.bio}
                    className={errorTypes.includes("bio") ? "error" : ""}
                />
            </div>

            <button
                disabled={loading}
                onClick={updateClicked}
            >Submit</button>

            <ul>
                {errorListItems}
            </ul>

            <ImageEditor img={loadedImg} saveImage={imageSaved} />


            <img src={newImg}></img>
        </div>
    );
}
