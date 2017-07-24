// Core Modules
import React from 'react';

// Third-Party Modules
import PropTypes from 'prop-types';

// Internal Modules
import { withLoading } from '../Loading';

// Misc Files
import './index.css';

const Button = ({ onClick, className, children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    { children }
  </button>

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}
Button.defaultProps = {
  className: '',
}

const ButtonWithLoading = withLoading(Button);

export default Button;
export { ButtonWithLoading };