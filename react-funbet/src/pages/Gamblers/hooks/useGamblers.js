import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllGamblersSelector,
  getAccountGamblerSelector,
} from '../selectors';
import { getAllGamblersSlice, getUserAccountSlice } from '../reducer';

const useGamblers = () => {
  const dispatch = useDispatch();
  const { data, loaders } = useSelector(getAllGamblersSelector);
  const { data: dataAccount } = useSelector(getAccountGamblerSelector);

  const getAllGamblersAction = bindActionCreators(
    {
      getAllGamblers: getAllGamblersSlice.actions.getRequest,
      getUserAccount: getUserAccountSlice.actions.getRequest,
    },
    dispatch,
  );

  return {
    data: {
      allGamblers: data,
      accountGambler: dataAccount,
    },
    loaders,
    actions: getAllGamblersAction,
  };
};

export default useGamblers;
