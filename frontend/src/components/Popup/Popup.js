import kind from '@enact/core/kind';
import Alert from '@enact/sandstone/Alert';
import Button from '@enact/sandstone/Button';
import PropTypes from 'prop-types';

const Popup = kind({
  name: 'Popup',

  propTypes: {
    handlePopupClose: PropTypes.func.isRequired,
    isPopupOpen: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  },

  render: ({handlePopupClose, isPopupOpen, msg}) => {
    return (
      <Alert type="overlay" open={isPopupOpen} onClose={handlePopupClose}>
				<span>{msg}</span>
				<buttons>
					<Button
						size="small"
						onClick={handlePopupClose}
					>
						{'OK'}
					</Button>
				</buttons>
			</Alert>
    )
  }
});

export default Popup;