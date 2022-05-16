import { Address } from '../global/embedded';

export const FormattedAddress = (address: Address) : string => {
	let formatted = ''
	if (address.Address) formatted += `${address.Address}, `;
	if (address.Suite) formatted += `${address.Suite}, `;
	if (address.City) formatted += `${address.City} `;
	if (address.State) formatted += `${address.State} `;
	if (address.Zip) formatted += address.Zip;
	return formatted;
}