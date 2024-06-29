// import { api } from 'utils/helper';
import { gamblers } from '_mock/gamblers';

export const getAllGamblers = () => {
  return gamblers;
  // return api
  //   .get({
  //     url: `/bet`,
  //   })
  //   .then((response) => response.data);
};

export const getUserAccount = () => {
  return {
    id: 23,
    role: 'USER',
    email: 'steven.duong',
    name: 'Dragon Killer',
    lock: null,
    lastUpdateTimestamp: null,
    timezone: 'Asia/Saigon',
  };
};
