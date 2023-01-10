import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  HeaderContainer,
  Screen,
  ScrollList,
  useThemeColor,
  getCommonStyles,
  ToggleSwitch,
} from '@aos-mobile/ui';
import {
  useTranslator,
  useSelector,
  ScannerAutocompleteSearch,
  useDispatch,
} from '@aos-mobile/core';
import {fetchClients} from '../../features/clientSlice';
import {PartnerCard} from '../../components';

const CLientsListScreen = ({navigation}) => {
  const {userId} = useSelector(state => state.auth);
  const {loadingClient, moreLoading, isListEnd, clientList} = useSelector(
    state => state.client,
  );
  const [filteredList, setFilteredList] = useState(clientList);
  const [assigned, setAssigned] = useState(false);
  const [client, setClient] = useState(null);
  const [filter, setFilter] = useState(null);
  const I18n = useTranslator();
  const Colors = useThemeColor();
  const dispatch = useDispatch();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  const fetchClientAPI = useCallback(
    page => {
      dispatch(fetchClients({searchValue: filter, page: page}));
    },
    [dispatch, filter],
  );

  const fetchClientFilter = useCallback(
    searchValue => {
      setFilter(searchValue);
      dispatch(fetchClients({searchValue: searchValue, page: 0}));
    },
    [dispatch],
  );

  const filterOnUserAssigned = useCallback(
    list => {
      if (list == null || list === []) {
        return list;
      } else {
        if (assigned) {
          return list?.filter(item => item?.user?.id === userId);
        } else {
          return list;
        }
      }
    },
    [assigned, userId],
  );

  useEffect(() => {
    setFilteredList(filterOnUserAssigned(clientList));
  }, [filterOnUserAssigned, clientList]);

  return (
    <Screen removeSpaceOnTop={true}>
      <HeaderContainer
        expandableFilter={false}
        fixedItems={
          <View style={styles.headerContainer}>
            <ToggleSwitch
              styleContainer={[commonStyles.filter, commonStyles.filterSize]}
              styleToogle={styles.toggle}
              leftTitle={I18n.t('Crm_All')}
              rightTitle={I18n.t('Crm_AssignedToMe')}
              onSwitch={() => setAssigned(!assigned)}
            />
            <ScannerAutocompleteSearch
              objectList={clientList}
              value={client}
              onChangeValue={item => setClient(item)}
              fetchData={fetchClientFilter}
              placeholder={I18n.t('Crm_Clients')}
              oneFilter={true}
              selectLastItem={false}
            />
          </View>
        }
      />
      <ScrollList
        loadingList={loadingClient}
        data={filteredList}
        renderItem={({item}) => (
          <PartnerCard
            style={styles.item}
            partnerFullName={item.simpleFullName}
            partnerReference={item.partnerSeq}
            partnerAdress={item.mainAddress?.fullName}
            partnerFixedPhone={item.fixedPhone}
            partnerEmail={item['emailAddress.address']}
            partnerPicture={item.picture}
            onPress={() =>
              navigation.navigate('ClientDetailsScreen', {
                client: item,
              })
            }
          />
        )}
        fetchData={fetchClientAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
      />
    </Screen>
  );
};
const styles = StyleSheet.create({
  item: {
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headerContainer: {
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    width: '90%',
    height: 40,
  },
  toggle: {
    width: '54%',
    height: 38,
    borderRadius: 13,
  },
});

export default CLientsListScreen;