import React from 'react'
import PropTypes from "prop-types"
import { useHistory } from 'react-router-dom'

function BackButton({title,color, size, block, icon, onNavigate}) {
  let history = useHistory()

  function goBack() {
    if(onNavigate) {
      onNavigate()
    }
    history.goBack()
  }

  return (
    <button className={`btn btn-${size} btn-${color} ${block ? 'btn-block' : ''}`} onClick={goBack} type="button">
      <span className={`fa fa-${icon} mr-1`}></span>
      <span>{title}</span>
    </button>
  )
}

BackButton.defaultProps = {
  title: "Back",
  color: "dark",
  size: "sm",
  block: true,
  icon: "arrow-circle-left"
}

BackButton.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  icon: PropTypes.string,
  onNavigate: PropTypes.func
}

export default BackButton
