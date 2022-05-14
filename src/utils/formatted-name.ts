import { Name } from '../global/embedded';

export const FormattedName = (name: Name): string => {
  let formatted = '';

  if (name.Salutation) {
    formatted += `${name.Salutation} `;
  }
  if (name.First) {
    formatted += `${name.First} `;
  }
  if (name.Middle) {
    formatted += `${name.Middle} `;
  }
  if (name.Last) {
    formatted += `${name.Last} `;
  }
  if (name.Suffix) {
    formatted += name.Suffix;
  }

  return formatted;
};
