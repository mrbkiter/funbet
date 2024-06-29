import { useNavigate } from 'react-router-dom';

export const navigateSpa = (path, mouseEvent, forceBlank) => {
  if (
    forceBlank ||
    (mouseEvent &&
      (mouseEvent.ctrlKey || mouseEvent.metaKey || mouseEvent.button === 1))
  ) {
    window.open(path, '_blank');
  } else {
    const browser = window.location;
    const pageTarget = window.location.pathname.includes('reactapp.do')
      ? `${browser.origin}${browser.pathname}#${path}`
      : `${browser.origin}/#${path}`;
    browser.assign(pageTarget);
  }
};

export const navigateMicro = (path, mouseEvent, forceBlank) => {
  if (
    forceBlank ||
    (mouseEvent &&
      (mouseEvent.ctrlKey || mouseEvent.metaKey || mouseEvent.button === 1))
  ) {
    window.open(path, '_blank');
  } else {
    const pageTarget = `${window.location.origin}/${path}`;
    window.location.assign(pageTarget);
  }
};

export const navigate = (path) => {
  const history = useNavigate();
  return path && history.push(path);
};

export const redirectTo = (url) => {
  return window.location.replace(url);
};
