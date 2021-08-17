import React from 'react'
import PropTypes from 'prop-types'
import { imgUrl } from '../utils/utils'

function ErrorHandlingComponent({text, textClass}) {
  return (
    <div className="text-center">
      <img src={imgUrl("error.png")} alt=""  className="img-fluid" width="350" />
      <p className={`${textClass} my-3`}>{text}, try again later</p>
    </div>
  )
}

ErrorHandlingComponent.defaultProps = {
  text: 'We have some problems right now',
  textClass: 'text-dark font-weight-bold lead '
}

ErrorHandlingComponent.propTypes = {
  text: PropTypes.string,
  textClass: PropTypes.string
}

export default ErrorHandlingComponent
