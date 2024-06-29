/* eslint-disable no-underscore-dangle */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useMessageResource } from 'pages/MessageResource';
import VCDialog, { VCDialogPusher } from 'components/VCDialog';
import styled from 'styled-components';
import { Buttons } from 'components/Buttons';

const confirm = {};
const SimpleConfirm = ({
  content,
  contentSize = 500,
  onYes,
  onNo,
  yesText,
  noText,
  titleText,
  onClose,
  showDefaultImg = true,
  NoButtonProps,
  YesButtonProps,
  customClassName = 'rpx-2',
  onClick,
}) => {
  const t = useMessageResource();

  const _yesText = useMemo(() => {
    return yesText || t('common.yes');
  }, [yesText, t]);
  const _noText = useMemo(() => {
    return noText || t('common.no');
  }, [noText, t]);
  const _titleText = useMemo(() => {
    return titleText || t('common.just_checking');
  }, [titleText, t]);
  const _onNo = useCallback(
    (e) => {
      onNo(e);
      onClose();
    },
    [onNo, onClose],
  );
  const _onYes = useCallback(
    (e) => {
      onYes(e);
      onClose();
    },
    [onYes, onClose],
  );

  const _onClick = useCallback(
    (e) => {
      onClick(e);
    },
    [onClick],
  );

  return (
    <VCDialogStyled
      itemProp="simple-confirm-dialog"
      open
      onClose={onClose}
      className={`tailwind-react`}
      onClick={_onClick}
    >
      <VCDialogStyled.ClosableTitle onClose={onClose}>
        {_titleText}
      </VCDialogStyled.ClosableTitle>
      <VCDialogStyled.Content className="rp-5" style={{ width: contentSize }}>
        <ContentWrapper>
          {/* {showDefaultImg && (
            <img
              alt="questionMark"
              src={questionMark}
              style={{ width: '100px', height: '100px' }}
            />
          )} */}
          <div
            itemProp="simple-confirm-dialog-content"
            className={customClassName}
          >
            {content}
          </div>
        </ContentWrapper>
      </VCDialogStyled.Content>
      <VCDialogStyled.Actions className="flex justify-center">
        <Buttons
          capitalize
          btnType="secondary"
          text={_noText}
          onClick={_onNo}
          itemProp="simple-confirm-dialog-no"
          style={{ minWidth: '96px', minHeight: '40px' }}
          {...NoButtonProps}
        />
        <Buttons
          capitalize
          text={_yesText}
          onClick={_onYes}
          itemProp="simple-confirm-dialog-yes"
          style={{ minWidth: '96px', minHeight: '40px' }}
          {...YesButtonProps}
        />
      </VCDialogStyled.Actions>
    </VCDialogStyled>
  );
};

const VCDialogStyled = styled(VCDialog)`
  &.MuiDialog-root {
    z-index: var(
      --zindex-confirm-dialog,
      var(--zindex-custom, 12000)
    ) !important;
  }

  &.mobile-dialog-ui {
    .MuiDialog-paper {
      margin: var(--padding-default-1x);
      width: 100%;
      .MuiDialogContent-root {
        padding: var(--padding-default-1x) !important;
        width: calc(100% - 2 * var(--padding-default-1x)) !important;
        *[itemprop='simple-confirm-dialog-content'] {
          width: 100%;
        }
      }
    }
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

SimpleConfirm.propTypes = {
  content: PropTypes.any,
  contentSize: PropTypes.number,
  onYes: PropTypes.func,
  onNo: PropTypes.func,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  titleText: PropTypes.string,
  onClose: PropTypes.func,
  NoButtonProps: PropTypes.object,
  YesButtonProps: PropTypes.object,
  customClassName: PropTypes.string,
  showDefaultImg: PropTypes.bool,
  zIndex: PropTypes.string,
  onClick: PropTypes.func,
};
SimpleConfirm.defaultProps = {
  onClick: (f) => f,
  onYes: (f) => f,
  onNo: (f) => f,
  onClose: (f) => f,
  NoButtonProps: {},
  YesButtonProps: {},
};

confirm.simpleConfirm = (props) =>
  VCDialogPusher.ref.push(({ doClose }) => {
    return <SimpleConfirm onClose={doClose} {...props} />;
  });
export default confirm;
