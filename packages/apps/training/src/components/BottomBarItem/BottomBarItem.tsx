import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  StyleProp,
  ColorValue,
  ViewStyle,
  Pressable,
  StyleSheet,
} from 'react-native';

import {
  BootstrapIcon,
  Text,
  ThemeColors,
  useThemeColor,
} from '@axelor/aos-mobile-ui';

export interface Item {
  notifications?: {
    count?: number;
    hidden?: boolean;
  };
  title: string;
  titleColor?: string;
  showTitle?: boolean;
  icon: string;
  iconColor?: ColorValue;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  order?: number;
  disabled?: boolean;
  hideIfDisabled?: boolean;
  listItems?: Object[];
}

/**
 * Customizable bottom bar item. Each item is required to have an icon, a title and an onPress function.
 * @param icon              Bootstrap Icon's name
 * @param onPress           Callback called when item is pressed
 * @param title             Title of the item
 * @param iconColor         To change iconColor
 * @param notifications     Object with two properties : count and hidden
 * @param showTitle         If false, hides the item title. Default value is true
 * @param style             Basic style object
 * @param titleColor        Item's title color
 * @param disabled          If true, the onPress callback isn't called. Default value is false
 * @param hideIfDisabled    Hides the whole item if disabled is true. Default value is false
 * @param listItems         Array of actions { title, onPress } displayed on long press on item
 */
export default function BottomBarItem({
  icon,
  onPress,
  title,
  iconColor,
  notifications,
  showTitle = true,
  style,
  titleColor,
  disabled = false,
  hideIfDisabled = false,
  listItems,
}: Item) {
  const [showActions, setShowActions] = useState(false);

  const Colors = useThemeColor();

  const styles = useMemo(() => getStyles(Colors), [Colors]);

  const handleLongPress = useCallback(() => {
    console.log('longpress', listItems);
    if (Array.isArray(listItems) && listItems.length > 0) {
      setShowActions(_current => !_current);
    }
  }, [listItems]);

  if (hideIfDisabled && disabled) return null;

  return (
    <>
      {showActions && (
        <View
          style={{
            position: 'absolute',
            // overflow: 'hidden',
            top: 0,
            left: 0,
            width: 500,
            height: 500,
            backgroundColor: 'red',
          }}
        />
      )}

      <View style={styles.container}>
        <Pressable
          onPress={onPress}
          onLongPress={handleLongPress}
          disabled={disabled}
          android_ripple={{radius: 50}}
          style={[styles.item, style]}>
          <BootstrapIcon name={icon} size={30} color={iconColor} />
          <Text
            numberOfLines={1}
            textColor={titleColor}
            style={[styles.text, {color: titleColor}]}>
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
    </>
  );
}

const getStyles = (Colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      padding: 10,
      // overflow: 'hidden',
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
    smallText: {
      fontSize: 10,
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
      color: Colors.backgroundColor,
      backgroundColor: Colors.errorColor.background,
      borderRadius: 8,
    },
  });
