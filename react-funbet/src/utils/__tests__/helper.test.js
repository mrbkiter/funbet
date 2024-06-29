import {
  stripHtmlTags,
  sprintf,
  entityHelper,
  reConfigStringToLink,
  plainTextHelper,
  convert2MB,
  isEmptyValue,
  inIframe,
  plusDateInst,
  minusDateInst,
  formatDate,
  lastOfMonth,
  dateStartOfMonth,
  dateValueForFilter,
  getAge,
  withCommas,
  utcFormatDateTime,
  localStore,
  filterObjectHasValue,
  removeKeyInObject,
  getItemsNotExistingList,
} from '../helper';

describe('Util helper > functions', () => {
  it('stripHtmlTags', () => {
    const stripHtmlTagsResult = stripHtmlTags(
      "<a href='access.com'>Access</a>",
    );
    expect(stripHtmlTagsResult).toEqual(' Access ');
  });

  it('sprintf', () => {
    const sprintfResult = sprintf('%01.2f', 123.1);
    expect(sprintfResult).toEqual('123.10');

    const sprintfResult2 = sprintf('[%10s]', 'monkey');
    expect(sprintfResult2).toEqual('[    monkey]');

    const sprintfResult3 = sprintf("[%'#10s]", 'monkey');
    expect(sprintfResult3).toEqual('[####monkey]');

    const sprintfResult4 = sprintf('%d', 123456789012345);
    expect(sprintfResult4).toEqual('123456789012345');
  });

  it('reConfigStringToLink', () => {
    const reConfigStringToLinkResult = reConfigStringToLink('example.com');
    expect(reConfigStringToLinkResult).toBe('http://example.com');
  });
  it('plainTextHelper', () => {
    const plainTextHelperResult = plainTextHelper(' ACCESS   ');
    expect(plainTextHelperResult).toBe('access');
  });
  it('convert2MB', () => {
    const convert2MBResult = convert2MB('999999999');
    expect(convert2MBResult).toBe('954MB');
  });
  it('isEmptyValue', () => {
    const isEmptyValueResult = isEmptyValue('2443');
    expect(isEmptyValueResult).toBe(false);
  });
  it('inIframe', () => {
    const inIframeResult = inIframe('2443');
    expect(inIframeResult).toBe(false);
  });
  it('withCommas', () => {
    const withCommasResult = withCommas('with123Commas');
    expect(withCommasResult).toBe('with,123Commas');
  });
  it('getAge', () => {
    const today = new Date('2023-06-06');
    const getAgeResult = getAge(new Date('2010-11-11'), today);
    expect(getAgeResult).toEqual(12);
  });
  it('filterObjectHasValue', () => {
    const fromVal = { a: 'xxx', b: 'yyy', c: undefined };
    const toVal = { a: 'xxx', b: 'yyy' };
    expect(filterObjectHasValue(fromVal)).toEqual(toVal);
  });
  it('removeKeyInObject', () => {
    const fromVal = { a: 'xxx', b: 'yyy', c: undefined };
    const toVal = { a: 'xxx' };
    expect(removeKeyInObject(fromVal, 'b', 'c')).toEqual(toVal);
  });
  it('getItemsNotExistingList', () => {
    const nums = [
      [1, 3, 5, 7],
      [4, 6, 8],
    ];
    expect(getItemsNotExistingList(nums, 3)).toEqual([[4, 6, 8]]);
  });
});

describe('Util helper > localStore', () => {
  // either of these lines will work, different syntax that does the same thing:
  jest.spyOn(Storage.prototype, 'setItem');
  jest.spyOn(Storage.prototype, 'getItem');
  Storage.prototype.setItem = jest.fn(() => null);
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.removeItem = jest.fn(() => null);
  Storage.prototype.clear = jest.fn(() => null);

  afterAll(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });
  it('set', () => {
    expect(localStore.set('xxx', '111')).toBeNull();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('get', () => {
    expect(localStore.get('xxx')).toBeNull();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('remove', () => {
    localStore.remove('xxx');
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('removeKeys', () => {
    localStore.removeKeys(['xxx']);
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it('clear', () => {
    localStore.clear(['xxx']);
    expect(localStorage.clear).toHaveBeenCalled();
  });
});

describe('Util helper > Date', () => {
  it('plusDateInst', () => {
    const plusDateInstResult = plusDateInst('2023-11-11');
    expect(plusDateInstResult).toEqual(1699632000000);
  });

  it('minusDateInst', () => {
    const minusDateInstResult = minusDateInst('2023-11-11');
    expect(minusDateInstResult).toEqual(1699632000000);
  });

  it('formatDate', () => {
    const formatDateResult = formatDate('2023-11-11');
    expect(formatDateResult).toEqual('2023-11-11');
  });

  it('lastOfMonth', () => {
    const lastOfMonthResult = lastOfMonth(1, '2023-11-11');
    expect(lastOfMonthResult).toEqual('2023-10-11');
  });

  it('dateStartOfMonth', () => {
    const dateStartOfMonthResult = dateStartOfMonth();
    const myExpectation = formatDate(new Date(), 'YYYY-MM');
    expect(dateStartOfMonthResult).toEqual(`${myExpectation}-01`);
  });

  it('dateValueForFilter', () => {
    const dateValueForFilterResult = dateValueForFilter('2023-11-11');
    expect(dateValueForFilterResult).toEqual('2023-11-11');
  });

  it('utcFormatDateTime', () => {
    expect(utcFormatDateTime(1698984000000, 'YYYY-MM-DD')).toEqual(
      '2023-11-03 04:00',
    );
  });
});

describe('Util helper > entityHelper', () => {
  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('getAvatarHref', () => {
    windowSpy.mockImplementation(() => ({
      location: {
        hostname: 'example.com',
        origin: 'https://example.com',
      },
    }));

    const getAvatarHref1 = entityHelper.getAvatarHref('candidate', 'a.png');
    expect(getAvatarHref1).toBe(
      'http://localhost/ws/download/candidate_photo/a.png',
    );

    const getAvatarHref2 = entityHelper.getAvatarHref('contact', 'a.png');
    expect(getAvatarHref2).toBe(
      'http://localhost/ws/download/contact_photo/a.png',
    );

    const getAvatarHref3 = entityHelper.getAvatarHref('company', 'a.png');
    expect(getAvatarHref3).toBe(
      'http://localhost/ws/download/company_photo/a.png',
    );

    const getAvatarHref4 = entityHelper.getAvatarHref('job', 'a.png');
    expect(getAvatarHref4).toBe('');
  });

  it('getPhotoHref', () => {
    const getPhotoHref1 = entityHelper.getPhotoHref('candidate', 12345);
    expect(getPhotoHref1).toBe('/ws/download/candidate_photo/12345');

    const getPhotoHref2 = entityHelper.getPhotoHref('contact', 12345);
    expect(getPhotoHref2).toBe('/ws/download/contact_photo/12345');

    const getPhotoHref3 = entityHelper.getPhotoHref('company', 12345);
    expect(getPhotoHref3).toBe('/ws/download/company_photo/12345');

    const getPhotoHref4 = entityHelper.getPhotoHref('job', 12345);
    expect(getPhotoHref4).toBe('');
  });

  it('getProfileHref', () => {
    const getProfileHref1 = entityHelper.getProfileHref('candidate', 12345);
    expect(getProfileHref1).toBe('/candidateProfile.do?id=12345');

    const getProfileHref2 = entityHelper.getProfileHref('contact', 12345);
    expect(getProfileHref2).toBe('/contactDetails.do?id=12345');

    const getProfileHref3 = entityHelper.getProfileHref('company', 12345);
    expect(getProfileHref3).toBe('/companyDetails.do?board=0&id=12345');

    const getProfileHref4 = entityHelper.getProfileHref('job', 12345);
    expect(getProfileHref4).toBe('/jobDetail/loadJobDetail.do?id=12345');

    const getProfileHref5 = entityHelper.getProfileHref('position', 12345);
    expect(getProfileHref5).toBe('/jobDetail/loadJobDetail.do?id=12345');

    const getProfileHref6 = entityHelper.getProfileHref('deal', 12345);
    expect(getProfileHref6).toBe('/deal/profile.do?id=12345');

    const getProfileHref7 = entityHelper.getPhotoHref('', 12345);
    expect(getProfileHref7).toBe('');
  });

  it('getDashboadHref', () => {
    const getDashboadHref1 = entityHelper.getDashboadHref('candidate', 12345);
    expect(getDashboadHref1).toBe('/candidateDashboard.do?tabId=1&id=12345');

    const getDashboadHref2 = entityHelper.getDashboadHref('contact', 12345);
    expect(getDashboadHref2).toBe('/contact.do?contactId=12345');

    const getDashboadHref3 = entityHelper.getDashboadHref('company', 12345);
    expect(getDashboadHref3).toBe('/company.do?companyId=12345');

    const getDashboadHref4 = entityHelper.getDashboadHref('job', 12345);
    expect(getDashboadHref4).toBe('/candidateDashboard.do?tabId=0&id=12345');

    const getDashboadHref5 = entityHelper.getDashboadHref('position', 12345);
    expect(getDashboadHref5).toBe('/candidateDashboard.do?tabId=0&id=12345');

    const getDashboadHref6 = entityHelper.getDashboadHref('deal', 12345);
    expect(getDashboadHref6).toBe('/deal/loadChevron.do?board=6&id=12345');

    const getDashboadHref7 = entityHelper.getPhotoHref('', 12345);
    expect(getDashboadHref7).toBe('');
  });
});
