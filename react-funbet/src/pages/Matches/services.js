// import { api } from 'utils/helper';
import { matches } from '_mock/matches';
import { bet } from '_mock/bet';

export const getAllMatches = () => {
  return matches;
  // return api
  //   .get({
  //     url: `/bet`,
  //   })
  //   .then((response) => response.data);
};
export const getMatchesShortList = () => {
  return bet;
};

// export const saveDistributionList = (payload) => {
//   return api
//     .post({
//       url: `/distributionList/saveContactGroup.do`,
//       data: payload,
//     })
//     .then((response) => response.data);
// };
