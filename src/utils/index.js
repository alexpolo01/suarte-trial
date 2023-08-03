import AppUtils from './app.utils';
import DateUtils from './date.utils';
import FormUtils from './form.utils';
import NumberUtils from './number.utils';
import ObjectUtils from './object.utils';

const Utils = {
  ...NumberUtils,
  ...AppUtils,
  ...ObjectUtils,
  ...DateUtils,
  ...FormUtils
};

export default Utils;