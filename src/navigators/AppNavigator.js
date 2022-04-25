import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserNavigator from '@/modules/auth/navigators/UserNavigator';
import ProductNavigator from '@/modules/stock/navigators/ProductNavigator';
import StockCorrectionNavigator from '@/modules/stock/navigators/StockCorrectionNavigator';

const {Navigator, Screen} = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="User" component={UserNavigator} />
      <Screen name="Product" component={ProductNavigator} />
      <Screen name="Stock correction" component={StockCorrectionNavigator} />
    </Navigator>
  );
};

export default AppNavigator;
