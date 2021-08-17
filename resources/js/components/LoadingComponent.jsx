import React from 'react'
import PropTypes from "prop-types"

function LoadingComponent({text,size, type, color, textClass}) {
  return (
    <div className="p-5 text-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <span className={`${type  === 'grow' ? 'spinner-grow' : 'spinner-border' } ${color}`} style={{ width:size, height:size }}></span>
          <p className={`${color} ${textClass} my-1`}>{text}</p>
        </div>
    </div>
  )
}


LoadingComponent.defaultProps = {
  text: 'loading data',
  size: 50,
  color: 'text-primary',
  type: 'grow',
  textClass: ''
}


LoadingComponent.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.oneOf(['grow', 'border']),
  textClass: PropTypes.string
}

export default LoadingComponent
