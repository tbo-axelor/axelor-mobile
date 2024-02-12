import {Color, ThemeColors} from '@axelor/aos-mobile-ui';
import {TranslatorProps} from '@axelor/aos-mobile-core';

class Type {
  static type = {
    Company: 1,
    Individual: 2,
  };

  static getTypeTitle = (
    select: number,
    I18n: TranslatorProps,
  ): string | undefined | null => {
    if (I18n) {
      switch (select) {
        case this.type.Company:
          return I18n.t('Company');
        case this.type.Individual:
          return I18n.t('Individual');
        default:
          console.warn(
            `Type provided with value ${select} is not supported by control entry`,
          );
          return null;
      }
    }
  };

  static getTypeColor = (type: number, Colors: ThemeColors): Color | null => {
    switch (type) {
      case this.type.Company:
        return Colors.secondaryColor;
      case this.type.Individual:
        return Colors.progressColor;
      default:
        console.warn(
          `Type provided with value ${type} is not supported by control entry`,
        );
        return null;
    }
  };
}

export default Type;
