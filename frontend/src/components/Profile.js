import React, { useContext } from 'react' 
import UserContext from '../helpers/UserContext' 
import ProfileForm from './ProfileForm'

const Profile = () => {
    const { currentUser } = useContext(UserContext)
    return (
        <>
        {currentUser.username ? (
            <ProfileForm currentUser={currentUser} /> 
        ) : (
            <p>Loading...</p>
        )}
        </>
    )
}

export default Profile 