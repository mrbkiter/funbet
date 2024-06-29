import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllTeamsSlice, getAllPredictsSlice } from '../reducer';
import { getAllTeamsSelector, getAllPredictsSelector } from '../selectors';

const usePredicts = () => {
  const dispatch = useDispatch();
  const { data, loaders } = useSelector(getAllTeamsSelector);
  const { data: dataPredicts } = useSelector(getAllPredictsSelector);

  const getAllMatchesAction = bindActionCreators(
    {
      getAllTeams: getAllTeamsSlice.actions.getRequest,
      getAllPredicts: getAllPredictsSlice.actions.getRequest,
    },
    dispatch,
  );

  return {
    data: {
      getAllTeams: data,
      getAllPredicts: dataPredicts,
    },
    loaders,
    actions: getAllMatchesAction,
  };
};

export default usePredicts;
