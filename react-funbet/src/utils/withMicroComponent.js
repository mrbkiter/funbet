/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

const appBootrapNode = document.getElementById('reactSharingComponent');
const memo = {};

const registerWebComponent = (tagName) => {
  if (memo[tagName]) {
    return true;
  }
  class CustomWebComponent extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      appBootrapNode?.dispatchEvent(
        new window.CustomEvent(`${tagName}-did-mount`, { detail: tagName }),
      );
    }

    disconnectedCallback() {
      appBootrapNode?.dispatchEvent(
        new window.CustomEvent(`${tagName}-will-unmounting`, {
          detail: tagName,
        }),
      );
    }
  }

  window.customElements.define(tagName, CustomWebComponent);
  memo[tagName] = true;
};

const withMicroFEByPortal = (Component, { tagName }) => {
  return () => {
    const [shouldRender, setShouldRender] = useState(false);
    const ref = useRef();

    const checkNodeExistToRender = useCallback(() => {
      ref.current = document.querySelector(tagName);
      if (ref.current) {
        setShouldRender(true);
      } else {
        setShouldRender(false);
      }
    }, []);

    useEffect(() => {
      if (appBootrapNode) {
        registerWebComponent(tagName);
        checkNodeExistToRender();
      }
    }, []);

    useEffect(() => {
      if (appBootrapNode) {
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
      }
    }, []);

    if (!shouldRender) {
      return null;
    }

    return ReactDOM.createPortal(<Component />, ref.current);
  };
};

export default withMicroFEByPortal;
