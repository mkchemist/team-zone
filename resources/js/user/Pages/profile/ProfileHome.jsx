import React from 'react'
import { useSelector } from 'react-redux'
import BackButton from '../../../components/BackButton'

function ProfileHome() {
  let UserStore = useSelector(state => state.UserStore)
  return (
    <div className="p-2">
      <p className="lead">
        <span className="far fa-user mr-1 text-success"></span>
        <span>{UserStore.data.name} Profile</span>
      </p>
      <hr />
      <div className="p-2">
        <form>
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input type="text" placeholder="User name" className="form-control form-control-sm" />
          </div>
          <div className="form-group">
            <label htmlFor="">Email</label>
            <input type="email" placeholder="User email"  className="form-control form-control-sm"/>
          </div>
          <div className="form-group">
            <p>Email verified <span className="fa fa-check-circle text-success"></span></p>
          </div>
          <hr />
          <div className="form-group text-right">
            <BackButton block={false} size={""} />
            <button type="submit" className="btn btn-success mx-1">
              <span className="fa fa-save mx-1"></span>
              <span>Update</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileHome
