import React, {useCallback, useMemo} from 'react';
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

import {BootstrapIcon} from '@axelor/aos-mobile-ui';

interface Item {
  notifications?: {
    count?: number;
    hidden?: boolean;
  };
  title: string;
  titleColor?: ColorValue;
  showTitle?: boolean;
  icon: string;
  iconColor?: ColorValue;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  order?: number;
  disabled?: boolean;
}

interface BottomBarProps {
  isFloating?: boolean;
  listItems: Item[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays a customizable bottom bar.
 * @param listItems   All bottom bar actions. They require a title, an icon name and an onPress function.
 * @param isFloating  Makes the bottom bar floating. Default value is false.
 * @param order       Overrides the classic order based on index
 */
function BottomBar({style, listItems, isFloating = false}: BottomBarProps) {
  const orderedList = useMemo(() => {
    if (listItems.every(item => item.hasOwnProperty('order'))) {
      return listItems.sort((a, b) => a.order - b.order);
    }

    return listItems;
  }, [listItems]);

  const renderItem: ListRenderItem<Item> = useCallback(
    ({
      item: {
        icon,
        onPress,
        title,
        iconColor,
        notifications,
        showTitle = true,
        style,
        titleColor,
        disabled,
      },
    }) => {
      return (
        <View style={styles.itemContainer}>
          <Pressable
            onPress={onPress}
            disabled={disabled}
            android_ripple={{radius: 50}}
            style={[styles.item, style]}>
            <BootstrapIcon name={icon} size={30} color={iconColor} />
            <Text numberOfLines={1} style={[styles.text, {color: titleColor}]}>
              {showTitle ? title : ''}
            </Text>
          </Pressable>
          {!notifications?.hidden && notifications?.count > 0 && (
            <Text
              style={[
                styles.notification,
                notifications?.count > 9 && styles.smallText,
              ]}>
              {notifications?.count > 9 ? '9+' : notifications?.count}
            </Text>
          )}
        </View>
      );
    },
    [],
  );

  return (
    <View
      style={[styles.container, isFloating && styles.floatingContainer, style]}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={orderedList}
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
    overflow: 'hidden',
    alignItems: 'center',
  },
  smallText: {
    fontSize: 10,
  },
  floatingContainer: {
    bottom: 0,
    width: '90%',
    margin: 20,
    borderRadius: 20,
    position: 'absolute',
  },
  flatListContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  itemContainer: {
    padding: 10,
    overflow: 'hidden',
  },
  item: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
  notification: {
    width: 16,
    height: 16,
    position: 'absolute',
    top: 6,
    left: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 8,
  },
});

export default BottomBar;
