import React from 'react';
import {StyleSheet} from 'react-native';

import {useThemeColor, ObjectCard} from '@axelor/aos-mobile-ui';
import {useMetafileUri} from '@axelor/aos-mobile-core';

interface ClientCardProps {
  style: any;
  clientName: string;
  clientReference: string;
  clientPicture: any;
  clientCategory: string;
  clientType: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  onPress?: () => void;
}

export const ClientCard = ({
  style,
  clientName,
  clientReference,
  clientPicture,
  clientCategory,
  clientType,
  clientAddress,
  clientPhone,
  clientEmail,
  onPress,
}: ClientCardProps) => {
  const Colors = useThemeColor();
  const formatMetaFile = useMetafileUri();

  return (
    <ObjectCard
      style={style}
      onPress={() => console.log('Press')}
      image={{
        generalStyle: styles.imageIcon,
        imageSize: styles.imageSize,
        resizeMode: 'contain',
        defaultIconSize: 50,
        source: formatMetaFile(clientPicture?.id),
      }}
      upperTexts={{
        items: [
          {displayText: clientName, isTitle: true},
          {
            displayText: clientReference,
            hideIfNull: true,
          },
        ],
      }}
      sideBadges={{
        items: [
          {displayText: clientCategory, color: Colors.infoColor},
          {displayText: clientType, color: Colors.plannedColor},
        ],
      }}
      lowerTexts={{
        items: [
          {
            indicatorText: clientAddress,
            hideIfNull: true,
            iconName: 'geo-alt-fill',
          },
          {
            indicatorText: clientPhone,
            hideIfNull: true,
            iconName: 'telephone-fill',
          },
          {
            indicatorText: clientEmail,
            hideIfNull: true,
            iconName: 'envelope-fill',
          },
        ],
      }}
    />
  );
};

const styles = StyleSheet.create({
  imageIcon: {
    height: 50,
    width: 50,
  },
  imageSize: {
    height: 50,
    width: 50,
  },
});

export default ClientCard;
