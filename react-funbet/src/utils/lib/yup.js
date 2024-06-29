import * as yup from 'yup';
import { i18n } from './i18n';
import { isValidPhoneNumber, parsePhoneNumber } from 'react-phone-number-input';
import { isEmptyValue } from 'utils/helper';

export const yupRefRegex = /^[a-z\d\-_.]*$/;

export const yupErrors = {
  required: 'required',
  numberExpected: 'numberExpected',
  invalidRef: 'invalidRef',
  invalidEmail: 'invalidEmail',
  invalidMinLength: 'invalidMinLength',
  minNumber: 'minNumber',
  maxNumber: 'maxNumber',
};

export const translateYupError = (errorKey) => {
  return i18n.t(`yup.errors.${errorKey}`);
};

export const translateLimitNumberYupError = (errorKey, num) => {
  return i18n.t(`yup.errors.${errorKey}`, { num });
};

export const getYupStringValidation = (required = false, isRef = false) => {
  let stringValidation = yup.string().nullable();

  if (required) {
    stringValidation = stringValidation.required(
      translateYupError(yupErrors.required),
    );
  }

  if (isRef) {
    stringValidation = stringValidation.matches(
      yupRefRegex,
      translateYupError(yupErrors.invalidRef),
    );
  }

  return stringValidation;
};

export const getYupNumberValidation = (
  required = false,
  min = undefined,
  max = undefined,
) => {
  let numberValidation = yup
    .number()
    .nullable()
    .typeError(translateYupError(yupErrors.numberExpected));

  if (required) {
    numberValidation = numberValidation.required(
      translateYupError(yupErrors.required),
    );
  }
  if (min) {
    numberValidation = numberValidation.min(
      min,
      translateLimitNumberYupError(yupErrors.minNumber, min),
    );
  }
  if (max) {
    numberValidation = numberValidation.max(
      max,
      translateLimitNumberYupError(yupErrors.maxNumber, max),
    );
  }

  return numberValidation;
};

export const getYupUniqueProperty = function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true;
    }

    if (
      this.parent
        .filter((v) => v !== value)
        .some((v) => v[propertyName] === value[propertyName])
    ) {
      throw this.createError({
        path: `${this.path}.${propertyName}`,
      });
    }

    return true;
  });
};

export const hasInvalidEmail = function (message) {
  return this.test('emails', message, (value) => {
    return value
      ? !value.filter((stringEl) => !yup.string().email().isValidSync(stringEl))
          .length
      : true;
  });
};

export const australiaRegexPhone =
  /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/;

export const validPhoneNumber = function (message) {
  return this.test('phoneNumber', message, (value) => {
    const phoneNumber = value ? parsePhoneNumber(value) : null;

    return phoneNumber
      ? isValidPhoneNumber(phoneNumber?.number) ||
          australiaRegexPhone.test(phoneNumber?.number)
      : false;
  });
};

const p = function (word, num) {
  return num === 1 ? word : `${word}s`;
};

export const minUppercase = function (length = 1, message) {
  const msg =
    message ||
    `\${path} must contain at least \${length} uppercase ${p(
      'letter',
      length,
    )}`;

  return this.test({
    name: 'minUppercase',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return !value || (value.match(/[A-Z]/g) || []).length >= length;
    },
  });
};

export const minNumber = function (length = 1, message) {
  const msg =
    message ||
    `\${path} must contain at least \${length} ${p('number', length)}`;
  return this.test({
    name: 'minNumber',
    exclusive: true,
    message: msg,
    params: { length },
    test(value) {
      return !value || (value.match(/[0-9]/g) || []).length >= length;
    },
  });
};
