/* eslint-disable no-underscore-dangle */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMessageResource } from 'pages/MessageResource';
import VCDialog, { VCDialogPusher } from 'components/VCDialog';
import styled from 'styled-components';
import { Buttons } from 'components/Buttons';

const alert = {};
const SimpleAlert = ({
  content,
  onOk,
  okText,
  titleText,
  onClose,
  OkButtonProps,
}) => {
  const t = useMessageResource();
  const _okText = useMemo(() => {
    return okText || t('common.ok');
  }, [okText, t]);

  const _titleText = useMemo(() => {
    return titleText || t('common.just_checking');
  }, [titleText, t]);

  const _onOk = useCallback(
    (e) => {
      onClose();
      onOk(e);
    },
    [onOk, onClose],
  );

  const _onClose = useCallback(
    (e) => {
      onClose(e);
      // onOk(e);
    },
    [onOk, onClose],
  );

  return (
    <VCDialog
      itemProp="simple-alert-dialog"
      open
      onClose={_onClose}
      className="tailwind-react"
    >
      <VCDialog.ClosableTitle onClose={onClose}>
        {_titleText}
      </VCDialog.ClosableTitle>
      <VCDialog.Content className="rp-5" style={{ width: '500px' }}>
        <ContentWrapper>
          {/* <img
            alt="questionMark"
            src={questionMark}
            style={{ width: '100px', height: '100px' }}
          /> */}
          <div itemProp="simple-alert-content" className="rpx-2">
            {content}
          </div>
        </ContentWrapper>
      </VCDialog.Content>
      <VCDialog.Actions className="flex justify-center">
        <Buttons
          capitalize
          size="small"
          btnType="secondary"
          text={_okText}
          onClick={_onOk}
          itemProp="simple-alert-btn-ok"
          {...OkButtonProps}
        />
      </VCDialog.Actions>
    </VCDialog>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

SimpleAlert.propTypes = {
  content: PropTypes.any,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  titleText: PropTypes.string,
  onClose: PropTypes.func,
  OkButtonProps: PropTypes.object,
};
SimpleAlert.defaultProps = {
  onOk: (f) => f,
  onClose: (f) => f,
  OkButtonProps: {},
};

alert.simpleAlert = (props) =>
  VCDialogPusher.ref.push(({ doClose }) => {
    return <SimpleAlert onClose={doClose} {...props} />;
  });
export default alert;
