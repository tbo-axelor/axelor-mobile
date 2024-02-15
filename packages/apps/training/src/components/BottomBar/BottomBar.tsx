import React, {useCallback, useMemo} from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';

import BottomBarItem, {Item} from '../BottomBarItem/BottomBarItem';
import {ThemeColors, useThemeColor} from '@axelor/aos-mobile-ui';

interface BottomBarProps {
  isFloating?: boolean;
  listItems: Item[];
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays a customizable bottom bar.
 * @param listItems   All bottom bar actions. They require a title, an icon name and an onPress function.
 *                    If all items have "order" property, it overrides the classic order based on index.
 * @param isFloating  Makes the bottom bar floating. Default value is false.
 */
function BottomBar({style, listItems, isFloating = false}: BottomBarProps) {
  const Colors = useThemeColor();

  const orderedList = useMemo(() => {
    if (listItems.every(item => item.hasOwnProperty('order'))) {
      return listItems.sort((a, b) => a.order - b.order);
    }

    return listItems;
  }, [listItems]);

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const renderItem: ListRenderItem<Item> = useCallback(
    ({item}) => {
      return (
        <BottomBarItem
          icon={item.icon}
          onPress={item.onPress}
          title={item.title}
          disabled={item?.disabled}
          hideIfDisabled={item?.hideIfDisabled}
          iconColor={item?.iconColor}
          notifications={item?.notifications}
          order={item?.order}
          showTitle={item?.showTitle}
          style={item?.style}
          titleColor={item?.titleColor}
          listItems={item?.listItems}
        />
      );
    },
    [listItems],
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

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.defaultColor.background,
      width: '100%',
      alignItems: 'center',
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
  });

export default BottomBar;
