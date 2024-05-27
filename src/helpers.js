// @ts-check
import colorNames from 'color-name';

export const reverseNames = Object.entries(colorNames).reduce(
	(acc, [name, color]) => {
		acc[JSON.stringify(color)] = name;
		return acc;
	},
	{},
);

export function isValidColorName(name) {
	return Object.hasOwnProperty.call(colorNames, name);
}

export function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

export function hexDouble(num) {
	var str = Math.round(num).toString(16).toUpperCase();
	return str.length < 2 ? '0' + str : str;
}
