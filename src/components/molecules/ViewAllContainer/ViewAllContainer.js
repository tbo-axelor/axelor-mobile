import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Card, Icon, Text} from '@/components/atoms';
import {useThemeColor} from '@/features/themeSlice';

const ViewAllContainer = ({
  style,
  children,
  isHeaderExist = false,
  onNewIcon = () => {},
  onPress = () => {},
}) => {
  const Colors = useThemeColor();

  return (
    <Card style={[styles.container, style]}>
      {isHeaderExist && (
        <View style={styles.headLineMove}>
          <Text>CONTENT</Text>
          <Icon
            name="plus"
            color={Colors.primaryColor}
            size={24}
            style={styles.action}
            touchable={true}
            onPress={onNewIcon}
          />
        </View>
      )}
      <View style={styles.cardContainer}>{children}</View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={styles.iconContainer}>
          <Text style={styles.txtDetails}>View All</Text>
          <Icon
            name="chevron-right"
            color={Colors.secondaryColor_light}
            size={20}
          />
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    paddingRight: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
  },
  headLineMove: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 1,
    marginVertical: 2,
    width: '100%',
  },
  cardContainer: {
    marginBottom: 2,
    width: '100%',
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 2,
    elevation: 3,
  },
  txtDetails: {
    fontSize: 14,
    marginHorizontal: 15,
  },
});

export default ViewAllContainer;