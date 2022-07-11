import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Icon, Screen, Text} from '@/components/atoms';
import {Badge} from '@/components/molecules';
import {LocationsMoveCard} from '@/modules/stock/components/molecules';
import {useDispatch, useSelector} from 'react-redux';
import {AutocompleteSearch, PopUpOneButton} from '@/components/organisms';
import {displayItemTrackingNumber} from '@/modules/stock/utils/displayers';
import {filterTrackingNumber} from '@/modules/stock/features/trackingNumberSlice';
import StockMove from '@/modules/stock/types/stock-move';
import {useThemeColor} from '@/features/themeSlice';
import {StockMoveHeader} from '../../components/organisms';

const trackingScanKey = 'tracking_supplier-arrival-select';

const SupplierArrivalSelectTrackingScreen = ({route, navigation}) => {
  const Colors = useThemeColor();
  const supplierArrival = route.params.supplierArrival;
  const supplierArrivalLine = route.params.supplierArrivalLine;
  const product = route.params.product;
  const {trackingNumberList} = useSelector(state => state.trackingNumber);
  const [isVisible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const fetchTrackingAPI = useCallback(
    filter => {
      dispatch(
        filterTrackingNumber({productId: product.id, searchValue: filter}),
      );
    },
    [dispatch, product.id],
  );

  const handleTrackingNumberSelection = item => {
    if (item !== null) {
      if (
        supplierArrivalLine != null &&
        item.id !== supplierArrivalLine.trackingNumber?.id
      ) {
        setVisible(true);
      } else {
        navigation.navigate('SupplierArrivalLineDetailScreen', {
          supplierArrivalLine: supplierArrivalLine,
          supplierArrival: supplierArrival,
          product: product,
          trackingNumber: item,
        });
      }
    }
  };

  return (
    <Screen>
      <StockMoveHeader
        reference={supplierArrival.stockMoveSeq}
        status={supplierArrival.statusSelect}
        date={
          supplierArrival.statusSelect === StockMove.status.Draft
            ? supplierArrival.createdOn
            : supplierArrival.statusSelect === StockMove.status.Planned
            ? supplierArrival.estimatedDate
            : supplierArrival.realDate
        }
      />
      <LocationsMoveCard
        fromStockLocation={supplierArrival.fromAddress?.fullName}
        toStockLocation={supplierArrival.toStockLocation?.name}
      />
      <View style={styles.stockView}>
        {supplierArrivalLine != null && (
          <View style={styles.stateLine}>
            <Text style={styles.text_secondary}>
              {supplierArrivalLine?.name}
            </Text>
            {Number(supplierArrivalLine.qty) !==
              Number(supplierArrivalLine.realQty) && (
              <Badge title="Incomplete" color={Colors.cautionColor_light} />
            )}
            {Number(supplierArrivalLine.qty) ===
              Number(supplierArrivalLine.realQty) && (
              <Badge title="Complete" color={Colors.primaryColor_light} />
            )}
          </View>
        )}
        <Card style={styles.cardProductInfo}>
          <Text>{product?.name}</Text>
        </Card>
        <View style={styles.trackingNumber}>
          <Text style={styles.text_secondary}>ADD TRACKING NUMBER</Text>
          <Icon
            name="plus"
            color={Colors.primaryColor}
            size={24}
            style={styles.action}
            touchable={true}
            onPress={() => {}}
          />
        </View>
        <AutocompleteSearch
          objectList={trackingNumberList}
          onChangeValue={item => handleTrackingNumberSelection(item)}
          fetchData={fetchTrackingAPI}
          displayValue={displayItemTrackingNumber}
          scanKeySearch={trackingScanKey}
          placeholder="Tracking Number"
          isFocus={true}
          changeScreenAfter={true}
        />
      </View>
      <PopUpOneButton
        visible={isVisible}
        title="Warning"
        data="This is not the right tracking number."
        btnTitle="OK"
        onPress={() => setVisible(false)}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  cardProductInfo: {
    marginVertical: '2%',
    marginHorizontal: 16,
  },
  trackingNumber: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 5,
  },
  stateLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    marginVertical: '1%',
  },
  stockView: {
    marginTop: '2%',
  },
  text_secondary: {
    fontSize: 14,
  },
  action: {
    marginLeft: 10,
  },
});

export default SupplierArrivalSelectTrackingScreen;