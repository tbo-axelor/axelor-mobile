import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@/components/atoms';

const Badge = ({style, txtStyle, title, color, numberOfLines = 1}) => {
  const badgeStyle = useMemo(() => getStyles(color), [color]);

  return (
    <View style={[badgeStyle, style]}>
      <Text style={[styles.badgeTxt, txtStyle]} numberOfLines={numberOfLines}>
        {title}
      </Text>
    </View>
  );
};

const getStyles = color =>
  StyleSheet.create({
    borderRadius: 7,
    margin: '1%',
    width: 87,
    height: 22,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
  });

const styles = StyleSheet.create({
  badgeTxt: {
    fontSize: 14,
  },
});

export default Badge;