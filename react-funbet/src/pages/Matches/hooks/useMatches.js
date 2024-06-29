import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getAllMatchesSelector,
  getMatchesShortListSelector,
} from '../selectors';
import { getAllMatchesSlice, getMatchesShortListSlice } from '../reducer';

const useMatches = () => {
  const dispatch = useDispatch();
  const { data, loaders } = useSelector(getAllMatchesSelector);
  const { data: dataMatchesShortList } = useSelector(
    getMatchesShortListSelector,
  );

  const getAllMatchesAction = bindActionCreators(
    {
      getAllMatches: getAllMatchesSlice.actions.getRequest,
      getMatchesShortList: getMatchesShortListSlice.actions.getRequest,
    },
    dispatch,
  );

  return {
    data: {
      getAllMatches: data,
      matchesShortList: dataMatchesShortList,
    },
    loaders,
    actions: getAllMatchesAction,
  };
};

export default useMatches;
