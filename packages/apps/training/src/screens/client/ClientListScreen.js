import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {
  ChipSelect,
  HeaderContainer,
  Screen,
  useThemeColor,
  ScrollList,
  MultiValuePicker,
} from '@axelor/aos-mobile-ui';
import {useDispatch, useSelector, useTranslator} from '@axelor/aos-mobile-core';

import ClientSearchBar from '../../components/ClientSearchBar/ClientSearchBar';
import ClientCard from '../../components/ClientCard/ClientCard';
import Type from '../../types/type';
import {fetchClients, fetchClientsCategories} from '../../features/clientSlice';
import BottomBar from '../../components/BottomBar/BottomBar';

const ClientListScreen = ({navigation}) => {
  const I18n = useTranslator();
  const dispatch = useDispatch();
  const Colors = useThemeColor();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const {loadingClientList, moreLoading, isListEnd, categories, clientList} =
    useSelector(state => state.clientTraining);

  useEffect(() => {
    dispatch(fetchClientsCategories());
    categories.map((cat, index) => console.log('Cat:', index, cat.name));
  }, []);

  const listItems = useMemo(() => {
    return categories?.map((categorie, index) => {
      return {color: Colors?.infoColor, key: index, title: categorie.name};
    });
  }, [Colors, categories]);

  const filteredClients = useMemo(() => {
    if (!Array.isArray(clientList) || clientList.length === 0) {
      return [];
    } else {
      if (selectedCategories.length > 0) {
        return clientList?.filter(client =>
          selectedCategories.find(
            categorie => categorie.title === client?.partnerCategory?.name,
          ),
        );
      } else {
        return clientList;
      }
    }
  }, [clientList, selectedCategories]);

  const fetchClientAPI = useCallback(
    page => {
      console.log('CALL FETCH');
      dispatch(fetchClients({page: page}));
    },
    [dispatch],
  );

  return (
    <Screen removeSpaceOnTop>
      <HeaderContainer
        expandableFilter={true}
        chipComponent={
          <ChipSelect
            mode="switch"
            selectionItems={[
              {
                key: 'company',
                title: Type.getTypeTitle(1, I18n),
                color: Type.getTypeColor(1, Colors),
              },
              {
                key: 'individual',
                title: Type.getTypeTitle(2, I18n),
                color: Type.getTypeColor(2, Colors),
              },
            ]}
          />
        }
        fixedItems={
          <View style={styles.headerContainer}>
            <ClientSearchBar
              showDetailsPopup={false}
              oneFilter={true}
              placeholderKey="Search"
            />
          </View>
        }>
        <MultiValuePicker
          style={styles.picker}
          title={I18n.t('Category')}
          listItems={listItems}
          onValueChange={values => setSelectedCategories(values)}
        />
      </HeaderContainer>
      <ScrollList
        loadingList={loadingClientList}
        data={filteredClients}
        renderItem={({item}) => (
          <ClientCard
            style={styles.item}
            clientName={item.simpleFullName}
            clientReference={item.partnerSeq}
            clientAddress={item.mainAddress?.fullName}
            clientPhone={item.fixedPhone}
            clientEmail={item.emailAddress?.address}
            clientPicture={item.picture}
            clientCategory={item.partnerCategory?.name}
            clientType="Type"
          />
        )}
        fetchData={fetchClientAPI}
        moreLoading={moreLoading}
        isListEnd={isListEnd}
        translator={I18n.t}
      />
      <BottomBar
        listItems={[
          {icon: '123', title: 'Traininnng', onPress: null},
          {icon: 'chat-fill', title: 'Chat', onPress: null, iconColor: 'red'},
          {icon: 'box-fill', title: 'Stock', onPress: null, titleColor: 'blue'},
          {icon: 'people-fill', title: 'CRM', onPress: null},
          // {icon: 'chat-fill', title: 'Chat', onPress: null},
          // {icon: 'chat-fill', title: 'Chat', onPress: null},
          // {icon: 'chat-fill', title: 'Chat', onPress: null},
          // {icon: 'chat-fill', title: 'Chat', onPress: null},
          // {icon: 'chat-fill', title: 'Chat', onPress: null},
        ]}
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
  picker: {
    alignSelf: 'center',
    marginHorizontal: 12,
  },
});

export default ClientListScreen;
