import _ from 'lodash';
import api from '../api'
import browserInfo from './browserInfo'
import { message } from 'antd'
import EventEmitter from 'events';
const { location } = window;

export const toast = ({ text }) => {
	message.error(text)
	// notification.error({
	// 	message: text
	// })
}
const showLoading = () => {

}

const hideLoading = () => {

}

const debug = false;
const request = (endpoint, options) => {
	if (debug) {
		endpoint = `/mock/${endpoint}.json`
	}
	const type = (options.type || 'get').toLowerCase();

	if (type == 'post') {
		return api[type](endpoint, options.data);
	} else {
		return api[type](endpoint, { params: options.data });
	}

}

/**
 * 获取url中的参数
 * @param str 默认是location.href
 */
const getUrlParam = (str = location.href) => {
	const arr = str.split('?')[1] ? str.split('?')[1].split('&') : [];
	const res = {};
	if (arr.length > 0) {
		arr.forEach((item) => {
			const index = item.indexOf('=');
			let name;
			let value;
			if (index > -1) {
				name = item.substring(0, index);
				value = item.substring(index + 1, item.length);
				if (value.indexOf('#/') > -1) {
					value = value.substring(0, value.indexOf('#/'));
				}
			}
			if (value != undefined) res[name] = value;
		})
	}
	return res;
};
/**
 * 根据loction.pathname判断平台页面类型
 * @param str 默认是location.pathname
 * 
 */
const checkPlatformType = (str = location.pathname) => {
	let platformTypeCharArray = ["weixin", "video", "live", "sina", "moments"];
	let platformType = 1;
	platformTypeCharArray.map((item, index, array) => {
		if (str.indexOf(item) != -1) {
			platformType = index + 1;
		}
	})
	return platformType;
}
window.getUrlParam = getUrlParam;
const shallowEqual = (objA, objB) => {
	if (objA === objB) {
		return true;
	}

	if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
		return false;
	}
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);

	if (keysA.length !== keysB.length) {
		return false;
	}

	const bHasOwnProperty = hasOwnProperty.bind(objB);
	for (let i = 0; i < keysA.length; i++) {
		const keyA = keysA[i];

		if (objA[keyA] === objB[keyA]) {
			continue;
		}

		// special diff with Array or Object
		if (_.isArray(objA[keyA])) {
			if (!_.isArray(objB[keyA]) || objA[keyA].length !== objB[keyA].length) {
				return false;
			} else if (!_.isEqual(objA[keyA], objB[keyA])) {
				return false;
			}
		} else if (_.isPlainObject(objA[keyA])) {
			if (!_.isPlainObject(objB[keyA]) || !_.isEqual(objA[keyA], objB[keyA])) {
				return false;
			}
		} else if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
			return false;
		}
	}

	return true;
}
const changeHistorySearch = (historyInstance, path) => {
	historyInstance.push(path)
}
const changeHistoryLocation = (historyInstance, paramsString, actionType, value) => {
	let search = historyInstance.location.search
	let tempSearch = search ? search.substr(1) : search
	let tempSearchArr = tempSearch ? tempSearch.split("&") : [];
	if (actionType == 'clear') {
		if (tempSearchArr.length > 0) {
			tempSearchArr.map((item, index, array) => {
				let temindex = item.includes(paramsString);
				if (temindex) {
					array.splice(index, 1);
				}
			}
			)
		} else {
			tempSearchArr = [];
		}

	} else if (actionType == 'modify') {
		if (tempSearchArr.length > 0) {
			let existParam = false;
			tempSearchArr.map((item, index, array) => {
				let temindex = item.includes(paramsString);
				if (temindex) {
					existParam = true;
					array[index] = paramsString + '=' + value;
				}
			}
			)
			if (!existParam) {
				let tempData = paramsString + '=' + value;
				tempSearchArr.push(tempData)
			}
		} else {
			let tempData = paramsString + '=' + value;
			tempSearchArr.push(tempData)
		}

	}
	let finalSearchString = '?'
	tempSearchArr.forEach((item, index, array) => {
		if (index == 0) {
			finalSearchString += item;
		} else {
			finalSearchString += '&' + item;
		}
	});
	// console.log(finalSearchString, 'changeHistoryLocation-index')
	historyInstance.location.search = finalSearchString.length > 1 ? finalSearchString : "";
	// console.log(historyInstance, 'historyInstance-index')
}

// export var EventEmitter = require('events')

var events = new EventEmitter()
// events.on('message', function (text) {
// 	console.log(text)
// })
// window.events = events;
// events.emit('message', 'hello world')
/**
 * @param arr [Array]
 * return Number
 */
const getTotalWidth = (arr = []) => {
	return arr.reduce((accumulator, item) => accumulator + parseInt(item.width), 0);
}

/**
 * 下载文件
 * @param String link 文件链接
 * */
const downloadByATag = (src, fileName = "") => {
	var $a = document.createElement('a');
	$a.setAttribute("href", src);
	$a.setAttribute("target", "_blank");
	$a.setAttribute("download", fileName);

	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	$a.dispatchEvent(evObj);
}
/**
 * 转换科学计数法为数字展示
 * @param {Number} num 
 */
const scientificToNumber = (num) => {
	if(/\d+\.?\d*e[+-]*\d+/i.test(num)) {
		var zero = '0',
		parts = String(num).toLowerCase().split('e'),
		e = parts.pop(),
		l = Math.abs(e),
		sign = e/l,
		coeff_array = parts[0].split('.');
		if(sign === -1) {
			num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
		} else {
			var dec = coeff_array[1];  
			if(dec) l = l - dec.length;
			num = coeff_array.join('') + new Array(l+1).join(zero);
		}
	}
	return num;
}
/**
 * 乘法运算
 * @param {Number} arg1
 * @param {Number} arg2
 */
const accMul = (arg1,arg2) => { 
	if(!arg1)
		return 0;
	let m=0;
	let s1=arg1.toString();
	let s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){m} 
	try{m+=s2.split(".")[1].length}catch(e){m} 
	const dealVal = Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
    return scientificToNumber(dealVal)
} 
/**
 * 百分比转换为小数
 * @param {Number} value
 */
function percentToValue(value) {
    value = value + '';
    const pointIndex = value.indexOf('.');
    if (pointIndex === -1) return (value - 0) / 100;
	const powIndex = value.length - pointIndex - 1;
	const dealVal = (value.replace('.', '') - 0) / Math.pow(10, powIndex + 2)
    return scientificToNumber(dealVal);
}

export {
	showLoading,
	hideLoading,
	request,
	getUrlParam,
	checkPlatformType,
	browserInfo,
	shallowEqual,
	changeHistorySearch,
	changeHistoryLocation,
	events,
	getTotalWidth,
	downloadByATag,
	accMul,
	percentToValue,
	scientificToNumber
}
export { calcSum } from './calcSum'

export * from './objectToArray'

String.prototype.toUpperCaseFirst = function () {
	return this.slice(0, 1).toUpperCase() + this.slice(1)
}
