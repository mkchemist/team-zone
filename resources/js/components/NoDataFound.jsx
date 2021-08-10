import React from 'react'
import PropTypes from 'prop-types'
import { imgUrl } from '../utils/utils'

function NoDataFound({className, text, textClass}) {
  return (
    <div className={className}>
      <img src={imgUrl("no-results.png")} alt="No result found" className="icon-img-5xl" />
      <p className={textClass}>{text}</p>
    </div>
  )
}


NoDataFound.defaultProps = {
  className: "text-center",
  text: "No Results",
  textClass: "lead font-weight-bold text-primary"
}

NoDataFound.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  textClass: PropTypes.string
}

export default NoDataFound

