import { apiUrl, localStore } from './helper';

export const COMMON = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  USER_PROFILE: 'USER_PROFILE',
};

export const TABLET_MOBILE_WIDTH = 767;

const languageCode = localStore.get('userCurrentLanguage') || 'en';

let tinymceIsEnableSpellChecker = true;
if (
  typeof userProfile !== 'undefined' &&
  languageCode !== '' &&
  (languageCode === 'ja' || languageCode === 'zh_CN')
) {
  tinymceIsEnableSpellChecker = false;
}

const tinyMCEFontFamily =
  'Arial=Arial;Calibri=Calibri;Century=Century;Century Gothic=Century Gothic;Courier=Courier;Courier New=Courier New;Helvetica=Helvetica;ＭＳ Ｐゴシック (MS PGothic)=MS PGothic;Tahoma=Tahoma;Times New Roman=Times New Roman;Trebuchet=Trebuchet;Verdana=Verdana;メイリオ (Meiryo)=Meiryo;宋体 (SimSun)=SimSun;Lora=Lora;';

const tinyMCEPlugin = [
  'advlist autolink lists link image charmap print preview anchor hr',
  'searchreplace visualblocks code fullscreen textcolor colorpicker',
  'insertdatetime media table contextmenu powerpaste tinymcespellchecker pagebreak advcode togglecontextmenu',
];

const tinyToolbar =
  'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor | fontselect fontsizeselect | styleselect | hr | table | link image | code | spellchecker togglecontextmenu';

const tinymceConfig = {
  visual: false,
  branding: false,
  language: 'en_GB',
  plugins: [].concat(tinyMCEPlugin),
  menubar: false,
  convert_urls: true,
  relative_urls: false,
  remove_script_host: false,
  powerpaste_allow_local_images: false,
  powerpaste_word_import: 'prompt',
  powerpaste_html_import: 'merge',
  powerpaste_block_drop: true,
  paste_data_images: false,
  paste_block_drop: true,
  font_formats: tinyMCEFontFamily,
  fontsize_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px',
  browser_spellcheck: true,
  spellchecker_active: tinymceIsEnableSpellChecker,
  spellchecker_rpc_url: 'https://tinymce-srv.vincere.io/ephox-spelling',
  valid_children: '+body[style]',
  toolbar_mode: 'sliding',
  contextmenu: localStorage.getItem('tinyContextMenu') || false,
  code_dialog_height: 500,
  code_dialog_width: 600,
};

export const tinyMCESetting = {
  ...tinymceConfig,
  toolbar: tinyToolbar,
  external_plugins: {
    imagebrowser: `${apiUrl}/scripts/vendor/tinymce/js/plugins/imagebrowser/plugin.min.js`,
    togglecontextmenu: `${apiUrl}/scripts/vendor/tinymce/js/plugins/togglecontextmenu/plugin.min.js`,
  },
};

export const tinyMCESettingEmailTemplate = {
  ...tinyMCESetting,
  imagebrowser_title: 'image',
  imagebrowser_listUrl: '/emailTemplate/getImageInfoJson.do',
  imagebrowser_folderName: 'email_template_image',
};

export const tinyMCESettingSimple = {
  ...tinyMCESetting,
  toolbar:
    'bold italic underline | bullist numlist | link spellchecker togglecontextmenu',
  content_style: `
    .mce-content-body[data-mce-placeholder] {
      font-style: italic;
    }
    .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
      color: #b9b9b9;
    }
    .mce-content-body {
      font-size: 13px;
    }
  `,
};

export const VIN_DEFAULT_URL = {
  CRM_COMPANY: '/company.do?board=0&status=0',
  CRM_CONTACT: '/contact.do?board=1&status=0',
  ATS_CANDIDATE: '/candidateDashboard.do?tabId=1',
  JOB_CANDIDATE: '/candidateDashboard.do?tabId=0',
};

export const VIN_ENTITY_ENUM = {
  CANDIDATE: 'candidate',
  CONTACT: 'contact',
  COMPANY: 'company',
  JOB: 'job',
  DEAL: 'deal',
  PLACEMENT: 'placement',
  TIMESHEET: 'timesheet',
};

export const VIN_ENTITY_TAB_ENUM = {
  SUMMARY: 'summary',
};

export const VIN_ENTITY_MESSAGE_RESOURCE = {
  [VIN_ENTITY_ENUM.CANDIDATE]: 'candidateDetail',
  [VIN_ENTITY_ENUM.CONTACT]: 'contactDetail',
  [VIN_ENTITY_ENUM.COMPANY]: 'companyDetail',
  [VIN_ENTITY_ENUM.JOB]: 'jobDetail',
  [VIN_ENTITY_ENUM.DEAL]: 'dealDetail',
};

export const VIN_HISTORY_ENUM = {
  ALL: 0,
  HISTORY: 1,
  SEARCH: 2,
};

export const DEFAULT_PAGE_SIZE = 25;
export const EMAIL_REGEX =
  /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`’{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
export const DOCUMENT_TYPE_LINK_CODE = 'save_link_document';
export const SIGN_REQUEST_CODE = 'sign_request';
export const SIGN_REQUEST_LOG_CODE = 'sign_request_log';
export const DateTimeFormat = {
  serverDate: 'YYYY-MM-DD',
};

export const KENDO_GRID_PAYLOAD = {
  take: DEFAULT_PAGE_SIZE,
  skip: 0,
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  sort: null,
  filter: null,
};

export const QV_TABLE_MIN_HEIGHT = 450;
export const QV_IFRAME_MIN_HEIGHT = 500;
export const QV_TABLE_HEADER_N_FOOTER_HEIGHT = 120;
export const QV_ICON_CLASS_NAME =
  'fal fa-id-card sb-font sb-font-2x sb-font-quickview';

export const listResetFilter = (t) => {
  return [
    t('common.resetFilters'),
    t('common.resetSearch'),
    t('common.resetAll'),
  ];
};

export const JOB_POSITION_TYPE_ENUM = {
  PERMANANT: 1,
  CONTRACT: 2,
  TEMP_TO_PERM: 3,
  GRADUATE: 4,
  PART_TIME: 5,
};

export const POSITION_SUB_TYPE = {
  CONTINGENT: 1,
  RETAINED: 2,
  EXCLUSIVE: 3,
};

export const SALARY_TYPE = {
  ANNUAL: 1,
  MONTHLY: 2,
};

export const ONCOST_AMOUNT_TYPE = {
  NUMBER: 0,
  PERCENTAGE: 1,
};

export const INVOICE_STATUS = {
  DRAFT: 0,
  APPROVED_NOT_SENT: 1,
  APPROVED_AND_SENT: 3,
  CANCELLED: 7,
};

export const PAY_CALCULATION_TYPE = {
  PAYG: 5,
  PAYE: 7,
  LTD_CO: 6, // SUB_CONTRACTOR
  EMPLOYEE: 8,
  UMBRELLA: 4,
  FORM_1099: 3,
  FORM_W2: 2,
};

export const CONTRACT_RATE_TYPE = {
  HOURLY: 1,
  DAILY: 2,
  WEEKLY: 3,
  MONTHLY: 4,
  YEARLY: 5,
  QUARTERLY: 6, // enum value from BE, but it's excluded from response
};

export const CHARGE_RATE_TYPE = {
  PROFIT: 'profit',
  MARGIN: 'margin',
  MARKUP: 'markup',
  CHARGE_RATE: 'chargeRate',
};

export const TIME_SHEET_TYPE = {
  NONE: -1,
  MANUAL: 0,
  TIMETEMP: 1,
  ASTUTE_PAYROLL: 2,
  FASTTRACK360_PAYROLL: 3,
};

export const AUSTRALIA_COUNTRY_CODE = 'AU';
export const US_COUNTRY_CODE = 'US';
export const UK_COUNTRY_CODE = 'GB';
export const JAPAN_COUNTRY_CODE = 'JP';
export const INDONESIA_COUNTRY_CODE = 'ID';
export const NEW_ZEALAND_COUNTRY_CODE = 'NZ';
export const EUROPE_COUNTRY_CODE = '06';
export const CANADA_COUNTRY_CODE = 'CA';
export const SINGAPORE_COUNTRY_CODE = 'SG';
export const GERMANY_CODE = 'DE';
export const NETHERLANDS_CODE = 'NL';

export const ONLY_SHOW_STATES_FOR_THESE_COUNTRIES = Object.freeze({
  [US_COUNTRY_CODE]: true,
  [CANADA_COUNTRY_CODE]: true,
  [JAPAN_COUNTRY_CODE]: true,
  [AUSTRALIA_COUNTRY_CODE]: true,
});

export const mapCountryToPayType = {
  [UK_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.PAYE,
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.LTD_CO,
  ],
  [NEW_ZEALAND_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.PAYE,
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.LTD_CO,
  ],
  [AUSTRALIA_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.PAYG,
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.LTD_CO,
  ],
  [US_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.FORM_W2,
    PAY_CALCULATION_TYPE.FORM_1099,
  ],
  [CANADA_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.EMPLOYEE,
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.LTD_CO,
  ],
  [SINGAPORE_COUNTRY_CODE]: [
    PAY_CALCULATION_TYPE.EMPLOYEE,
    PAY_CALCULATION_TYPE.UMBRELLA,
    PAY_CALCULATION_TYPE.LTD_CO,
  ],
};

export const mapOtherCountryToPayType = [
  PAY_CALCULATION_TYPE.EMPLOYEE,
  PAY_CALCULATION_TYPE.LTD_CO,
];

export const defaultPayTypeByCountry = {
  [AUSTRALIA_COUNTRY_CODE]: PAY_CALCULATION_TYPE.PAYG,
  [UK_COUNTRY_CODE]: PAY_CALCULATION_TYPE.PAYE,
  [US_COUNTRY_CODE]: PAY_CALCULATION_TYPE.FORM_W2,
  [NEW_ZEALAND_COUNTRY_CODE]: PAY_CALCULATION_TYPE.PAYE,
};

export const defaultPayTypeByOtherCountry = PAY_CALCULATION_TYPE.EMPLOYEE;

export const ConfigurableFieldTypes = {
  TEXT_BOX: 'TEXT_BOX', // should use TEXT_FIELD instead
  TEXT_FIELD: 'TEXT_FIELD',
  DATE_PICKER: 'DATE_PICKER',
  TIME_PICKER: 'TIME_PICKER',
  MULTIPLE_SELECTION: 'MULTIPLE_SELECTION',
  MULTIPLE_SELECTION_COLOR: 'MULTIPLE_SELECTION_COLOR',
  TEXT_AREA: 'TEXT_AREA',
  CUSTOM_LIST: 'CUSTOM_LIST',
  CHECK_BOX: 'CHECK_BOX', // BE data is not consistent,  should be CHECK_BOXES
  CHECK_BOXES: 'CHECK_BOXES',
  COMBO_BOX: 'COMBO_BOX', // should use DROP_DOWN instead
  DROP_DOWN: 'DROP_DOWN',
  RADIO_BUTTON: 'RADIO_BUTTON',
  CURRENCY: 'CURRENCY',
  NUMERIC: 'NUMERIC',
  FLOAT: 'FLOAT',
  HYPERLINK: 'HYPERLINK',
  INDUSTRY_GROUP: 'INDUSTRY_GROUP',
  FUNCTIONAL_EXPERTISE_GROUP: 'FUNCTIONAL_EXPERTISE_GROUP',
  COMPANY_STAGE: 'COMPANY_STAGE',
  OWNERS: 'OWNERS',
  COMPANY_DEPARTMENT_GROUP: 'COMPANY_DEPARTMENT_GROUP',
  COMPANY_INDUSTRY_GROUP: 'COMPANY_INDUSTRY_GROUP',
  COMPANY_LOCATION_GROUP: 'COMPANY_LOCATION_GROUP',
  COMPANY_PARENT: 'COMPANY_PARENT',
  COMPANY_FASTTRACK360_GROUP: 'COMPANY_FASTTRACK360_GROUP',
  AGE: 'AGE',
  PHONES: 'PHONES',
  TAG: 'TAG',
  SINGLE_PHONE_FIELD: 'SINGLE_PHONE_FIELD',
  CONTACT_PRIMARY_EMAIL: 'CONTACT_PRIMARY_EMAIL',
  LINKEDIN: 'LINKEDIN',
  EMAIL: 'EMAIL',
  LOCATION: 'LOCATION',
  CONTACT_COMPANY_NAME: 'CONTACT_COMPANY_NAME',
  CONTACT_FUNCTIONAL_EXPERTISE_GROUP: 'CONTACT_FUNCTIONAL_EXPERTISE_GROUP',
  CONTACT_SUB_FUNCTIONAL_EXPERTISE: 'CONTACT_SUB_FUNCTIONAL_EXPERTISE',
  CONTACT_FUNCTIONAL_EXPERTISE: 'CONTACT_FUNCTIONAL_EXPERTISE',
  SWITCHBOARD_GROUP: 'SWITCHBOARD_GROUP',
  CONTACT_INDUSTRY_GROUP: 'CONTACT_INDUSTRY_GROUP',
  CONTACT_OWNER: 'CONTACT_OWNER',
  CONTACT_DISTRIBUTION_LIST_GROUP: 'CONTACT_DISTRIBUTION_LIST_GROUP',
  CONTACT_STAGE: 'CONTACT_STAGE',
  CONTACT_REPORT_TO: 'CONTACT_REPORT_TO',
  CONTACT_INDUSTRY: 'CONTACT_INDUSTRY',
  CONTACT_SUB_INDUSTRY: 'CONTACT_SUB_INDUSTRY',
  CONTACT_EMAIL_PERMISSION_GROUP: 'CONTACT_EMAIL_PERMISSION_GROUP',
  CONTACT_COMPANY_INFORMATION: 'CONTACT_COMPANY_INFORMATION',
  CONTACT_WORK_ADDRESS: 'CONTACT_WORK_ADDRESS',
  CONTACT_FASTTRACK360_GROUP: 'CONTACT_FASTTRACK360_GROUP',
  PREFERRED_TIME_GROUP: 'PREFERRED_TIME_GROUP',
};

export const ConfigFieldCategories = {
  STATIC_FIELD: 'static_field',
  CUSTOM_FIELD: 'custom_field',
  SUB_HEADING: 'sub_heading',
};

export const ConfigFieldPrefix = 'configurable_form_field_';

export const MultiSelectFieldKey = {
  INDUSTRY_GROUP: {
    key: 'key',
    name: 'value',
  },
  FUNCTIONAL_EXPERTISE_GROUP: {
    key: 'key',
    name: 'value',
  },
  OWNERS: {
    key: 'key',
    name: 'value',
  },
  MULTIPLE_SELECTION: {
    key: 'key',
    name: 'value',
  },
  MULTIPLE_SELECTION_COLOR: {
    key: 'key',
    name: 'value',
  },
  COMPANY_DEPARTMENT_GROUP: {
    key: 'key',
    name: 'value',
  },
  COMPANY_INDUSTRY_GROUP: {
    key: 'key',
    name: 'value',
  },
  COMPANY_LOCATION_GROUP: {
    key: 'key',
    name: 'value',
  },
  CHECK_BOXES: {
    key: 'key',
    name: 'value',
  },
  CONTACT_WORK_ADDRESS: {
    key: 'key',
    name: 'value',
  },
};

export const CURRENCY_LOCALE = {
  LIKE_US: 'like-us',
  LIKE_DE: 'like-de',
  LIKE_FR: 'like-fr',
  LIKE_CH: 'like-ch',
};

export const COUNTRY_CURRENCY_MAP = Object.freeze({
  [AUSTRALIA_COUNTRY_CODE]: 'aud',
  [US_COUNTRY_CODE]: 'usd',
  [UK_COUNTRY_CODE]: 'pound',
  [JAPAN_COUNTRY_CODE]: 'yen',
  [INDONESIA_COUNTRY_CODE]: 'idr',
  [NEW_ZEALAND_COUNTRY_CODE]: 'nzd',
  [EUROPE_COUNTRY_CODE]: 'euro',
  [GERMANY_CODE]: 'euro',
  [NETHERLANDS_CODE]: 'euro',
});

export const DOCUMENT_TYPE_INVOICE_CODE = 'invoice';

export const JOB_UPLOAD_FILE_EXTENSIONS = [
  '.doc',
  '.docx',
  '.pdf',
  '.rtf',
  '.xls',
  '.xlsx',
  '.html',
  '.htm',
  '.msg',
  '.mht',
];

export const UPLOAD_ALLOWED_FILE_TYPES = [
  ...JOB_UPLOAD_FILE_EXTENSIONS,
  '.ppt',
  '.pptx',
  '.csv',
  '.png',
  '.jpeg',
  '.jpg',
  '.bmp',
  '.jng',
  '.gif',
];

export const UPPY_DEFAULT_CONFIG = {
  restrictions: {
    maxFileSize: UPLOAD_MAX_FILE_SIZE,
    maxNumberOfFiles: UPLOAD_MAX_NUMBER_OF_FILES,
    allowedFileTypes: UPLOAD_ALLOWED_FILE_TYPES,
  },
  autoProceed: false,
  logger: {
    debug: () => {},
    warn: () => {},
    error: () => {},
  },
};

export const UPLOAD_MAX_FILE_SIZE = 36700160; // 35 MB
export const UPLOAD_MAX_NUMBER_OF_FILES = 100;

export const ALLOWED_EXTENSIONS = [
  'doc',
  'docx',
  'pdf',
  'rtf',
  'xls',
  'xlsx',
  'html',
  'htm',
  'msg',
  'mht',
  'ppt',
  'pptx',
  'csv',
  'png',
  'jpeg',
  'jpg',
  'bmp',
  'jng',
  'gif',
];

export const COMPLIANCE_LEVEL = {
  MANDATORY: '10',
  WARNING: '20',
  NICETOHAVE: '30',
};

export const GAP_SPACE = 8;

export const UPLOAD_FILE_EXTENTIONS = {
  extensions: UPLOAD_ALLOWED_FILE_TYPES,
  mineTypes: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf',
    'application/rtf',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/html',
    'application/msg',
    'application/mht',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/csv',
    'image/png',
    'image/jpeg',
    'image/bmp',
    'image/gif',
  ],
};

export const APPLICATION_DROPDOWN_CHEVRON = [
  {
    // This is APPLICATION_DROPDOWN_CHEVRON[0], which using to default value of the chevron application dropdown. Please consider when moving to another position
    value: '-1',
    text: 'Application - All',
  },
  {
    value: '3',
    text: 'Last 3 months',
  },
  {
    value: '6',
    text: 'Last 6 months',
  },
];
