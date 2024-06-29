/* eslint-disable */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const appBootrapNode = document.querySelector('#reactSharingComponent');
const tagMemo = {};

const registerWebComponent = (
  tagName,
  { connectedCallback, disconnectedCallback },
) => {
  if (tagMemo[tagName]) {
    return true;
  }
  class CustomWebComponent extends HTMLElement {
    connectedCallback() {
      appBootrapNode?.dispatchEvent(
        new window.CustomEvent(`${tagName}-did-mount`, { detail: tagName }),
      );
      connectedCallback && connectedCallback(this);
    }

    disconnectedCallback() {
      appBootrapNode?.dispatchEvent(
        new window.CustomEvent(`${tagName}-will-unmounting`, {
          detail: tagName,
        }),
      );
      disconnectedCallback && disconnectedCallback(this);
    }
  }
  window.customElements?.define(tagName, CustomWebComponent);
  tagMemo[tagName] = true;
  return tagMemo[tagName];
};

const withWCPortalHasChild = (Component, {
  tagName,
  defaultProps,
  connectedCallback,
  disconnectedCallback = () => {},
}) => {
  const WCPortal = () => {
    const ref = useRef();
    const injected = useRef();
    const [props, setProps] = useState(defaultProps || {});
    const [shouldRender, setShouldRender] = useState(false);
    const [innerHTML, setInnerHTML] = useState('');

    const checkNodeExistToRender = useCallback(() => {
      ref.current = document.querySelector(tagName);
      if (ref.current) {
        setShouldRender(true);
        setInnerHTML(ref.current.innerHTML)
        ref.current.innerHTML = '';
      } else {
        setShouldRender(false);
      }
    }, [ref, setShouldRender]);

    // check wc in Real DOM to render Vitural DOM
    useEffect(() => {
      const _disconnectedCallback = (event) => {
          setProps({});
          disconnectedCallback(event);
      }
  
      registerWebComponent(tagName, {
        connectedCallback,
        disconnectedCallback: _disconnectedCallback,
      });
      checkNodeExistToRender();
    }, [checkNodeExistToRender]);
  
    useEffect(() => {
      appBootrapNode?.addEventListener(
        `${tagName}-did-mount`,
        checkNodeExistToRender,
      );
      appBootrapNode?.addEventListener(
        `${tagName}-will-unmounting`,
        checkNodeExistToRender,
      );

      return () => {
        appBootrapNode?.removeEventListener(
          `${tagName}-did-mount`,
          checkNodeExistToRender,
        );
        appBootrapNode?.removeEventListener(
          `${tagName}-will-unmounting`,
          checkNodeExistToRender,
        );
      };
    }, [checkNodeExistToRender]);

    // wc instance
    useEffect(() => {
      const wcNode = document.querySelector(tagName);
      if (wcNode) {
        wcNode._ref = {
          input: {
            props,
            setProps: (_props) => {
              setProps((prev) => {
                return {
                  ...prev,
                  ..._props
                };
              });
            },
            setPureProps: setProps,
          },
          injected,
        };
      }
    });

    if (!shouldRender) {
      return null;
    }
    return (
      <>
        {ref.current &&
        ReactDOM.createPortal(
          <Component {...props} ref={injected}>{innerHTML}</Component>,
          ref.current,
        )}
      </>
    );
  };

  WCPortal.propTypes = {};
  WCPortal.defaultProps = {};
  return WCPortal;
};

export default withWCPortalHasChild;