import moment from 'moment';
import 'moment-timezone';

type InputValue = Date | string | number | null;

// Set Belgrade timezone
const belgradeTimezone = 'Europe/Belgrade';

export const fDate = (date: InputValue, newFormat?: string) => {
  const fm = newFormat || 'YYYY/MM/DD';

  return date ? moment(date).utcOffset(belgradeTimezone).format(fm) : '';
}

export const fDateTime = (date: InputValue, newFormat?: string) => {
  const fm = newFormat || 'YYYY/MM/DD HH:mm:ss';

  return date ? moment(date).utcOffset(belgradeTimezone).format(fm) : '';
}

export const fTimestamp = (date: InputValue) => {
  return date ? moment(date).utcOffset(belgradeTimezone).valueOf() : '';
}

export const fToNow = (date: InputValue) => {
  return date ? moment(date).utcOffset(belgradeTimezone).fromNow() : '';
}
