import React from 'react'
import UserPofile from '../UserPofile/UserPofile'
import InstitutionProfile from '../InstitutionProfile/InstitutionProfile'

const Profile = () => {
  return (
    <div>
        {true ? <UserPofile/> : <InstitutionProfile/>}
    </div>
  )
}

export default Profile