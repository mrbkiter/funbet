// import { api } from 'utils/helper';
import { teams, user } from '_mock/teams';

export const getAllTeams = () => {
  return teams;
  // return api
  //   .get({
  //     url: `/bet`,
  //   })
  //   .then((response) => response.data);
};
export const getForecastList = () => {
  return user;
};

// export const saveDistributionList = (payload) => {
//   return api
//     .post({
//       url: `/distributionList/saveContactGroup.do`,
//       data: payload,
//     })
//     .then((response) => response.data);
// };
