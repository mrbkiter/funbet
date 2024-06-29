import React from 'react';
import PropTypes from 'prop-types';
import VCDialog, { VCDialogPusher } from 'components/VCDialog';
import VCAlert, { VCAlertPusher } from 'components/VCAlert';
import { AwesomeIcon } from 'components/AwesomeIcon';
import { SaveSuccess } from 'components/Notifications';
import { Buttons } from 'components/Buttons';

const notication = {};
const DialogInfo = ({ callback, onClose, doClose }) => {
  return (
    <VCDialog open onClose={onClose} className="tailwind-react">
      <VCDialog.ClosableTitle onClose={onClose} />
      <VCDialog.Content style={{ width: '500px' }}>
        {callback({ doClose })}
      </VCDialog.Content>
      <VCDialog.Actions className="flex justify-center">
        <Buttons
          capitalize
          size="small"
          btnType="secondary"
          text={'Close'}
          onClick={onClose}
        />
      </VCDialog.Actions>
    </VCDialog>
  );
};
DialogInfo.propTypes = {
  callback: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  doClose: PropTypes.func,
};

notication.dialogInfo = (callback, params) =>
  VCDialogPusher.ref.push(({ doClose }) => {
    const onClose = () => {
      doClose();
      if (params && params.onClosed) {
        params.onClosed();
      }
    };
    return (
      <DialogInfo onClose={onClose} callback={callback} doClose={doClose} />
    );
  }, params);

notication.success = (callback, params = {}) => {
  VCAlertPusher.ref.push(
    ({ doClose }) => {
      return (
        <VCAlert
          onClose={doClose}
          severity="success"
          vertical={params.vertical}
          horizontal={params.horizontal}
          icon={
            <AwesomeIcon
              iconName={'fal fa-check-circle'}
              size={33}
              color="var(--button-success-color)"
            />
          }
        >
          {callback({ doClose })}
        </VCAlert>
      );
    },
    { ...params, staticAlert: true },
  );
};

notication.error = (callback, params = {}) => {
  VCAlertPusher.ref.push(
    ({ doClose }) => {
      return (
        <VCAlert
          severity="error"
          onClose={doClose}
          vertical={params.vertical}
          horizontal={params.horizontal}
          icon={
            <AwesomeIcon
              iconName={'fal fa-exclamation-circle'}
              size={33}
              color="var(--negative-button)"
            />
          }
        >
          {callback({ doClose })}
        </VCAlert>
      );
    },
    { ...params, staticAlert: true },
  );
};

const SomeThingWentWrong = () => {
  return 'Something went wrong.';
};
notication.someThingWentWrong = () =>
  notication.error(() => <SomeThingWentWrong />);
notication.saveSuccess = () => notication.success(() => <SaveSuccess />);

export default notication;
