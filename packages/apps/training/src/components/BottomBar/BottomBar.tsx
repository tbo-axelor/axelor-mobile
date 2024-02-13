import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  ViewStyle,
  StyleSheet,
  Pressable,
  StyleProp,
  ColorValue,
} from 'react-native';

import {BootstrapIcon, useThemeColor} from '@axelor/aos-mobile-ui';

interface Item {
  title: string;
  titleColor: ColorValue;
  icon: string;
  iconColor?: ColorValue;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

interface BottomBarProps {
  style?: StyleProp<ViewStyle>;
  listItems: Item[];
}

function BottomBar({listItems, style}: BottomBarProps) {
  const Colors = useThemeColor();

  const renderItem: ListRenderItem<Item> = useCallback(({item}) => {
    return (
      <View style={{padding: 10}}>
        <Pressable
          onPress={item.onPress}
          android_ripple={{radius: 50}}
          style={[item?.style, styles.item]}>
          <BootstrapIcon name={item.icon} size={30} color={item.iconColor} />
          <Text
            numberOfLines={1}
            style={[styles.text, {color: item.titleColor}]}>
            {item.title}
          </Text>
        </Pressable>
      </View>
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={listItems}
        renderItem={renderItem}
        horizontal={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    width: '100%',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default BottomBar;
