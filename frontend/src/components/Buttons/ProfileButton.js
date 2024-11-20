import kind from '@enact/core/kind';
import Button from '@enact/ui/Button';
import PropTypes from 'prop-types';

const ProfileButton = kind({
  name: "ProfileButton",

  propTypes: {
    onClick: PropTypes.func,
    children: PropTypes.string,
    bgColor: PropTypes.string,
  },

  defaultProps: {
    bgColor: 'red',
  },

  render: ({onClick, children, bgColor}) => {
    <Button icon="profile" color={bgColor} onClick={onClick}>
      {children}
    </Button>
  }
});

export default ProfileButton;