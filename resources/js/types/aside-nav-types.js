import PropTypes from "prop-types"


export default {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string,
    label: PropTypes.string
  })).isRequired
}
