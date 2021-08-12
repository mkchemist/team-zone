import React from 'react'
import BackButton from '../../../components/BackButton'

function ProfilePasswordPage() {
  return (
    <div className="p-2">
      <p className="lead">
        <span className="fa fa-lock mr-1 text-primary"></span>
        <span>Change Password</span>
      </p>
      <div className="p-2">
        <form>
          <div className="form-group">
            <label htmlFor="">Old Password</label>
            <input type="password" placeholder="Enter Old password" className="form-control form-control-sm" />
          </div>
          <div className="form-group">
            <label htmlFor="">New Password</label>
            <input type="password" placeholder="Enter new password" className="form-control form-control-sm" />
          </div>
          <div className="form-group">
            <label htmlFor="">Password Confirmation</label>
            <input type="password" placeholder="Re-Enter password" className="form-control form-control-sm" />
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

export default ProfilePasswordPage
