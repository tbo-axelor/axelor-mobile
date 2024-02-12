import React, {useCallback} from 'react';

import {
  displayItemName,
  useDispatch,
  useSelector,
  useTranslator,
} from '@axelor/aos-mobile-core';
import {AutoCompleteSearch} from '@axelor/aos-mobile-ui';

import {fetchClients} from '../../features/clientSlice';

const ClientSearchBar = ({
  placeholderKey = 'Training_Clients',
  defaultValue = '',
  onChange = () => {},
  showDetailsPopup = true,
  navigate = false,
  oneFilter = false,
}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {clientList, loading, moreLoading, isListEnd} = useSelector(
    state => state.clientTraining,
  );

  const fetchClientSearchBarAPI = useCallback(
    ({page = 0, searchValue}) => {
      dispatch(fetchClients({page, searchValue}));
    },
    [dispatch],
  );

  return (
    <AutoCompleteSearch
      objectList={clientList}
      value={defaultValue}
      onChangeValue={onChange}
      fetchData={fetchClientSearchBarAPI}
      displayValue={displayItemName}
      placeholder={I18n.t(placeholderKey)}
      showDetailsPopup={showDetailsPopup}
      loadingList={loading}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
      navigate={navigate}
      oneFilter={oneFilter}
    />
  );
};

export default ClientSearchBar;
