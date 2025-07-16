/*
 * Расстановка переносов
 * @todo: не всегда убираются переносы при ресайзе
 * @todo: таймер при ресайзе
 */

const Hyphens = {
	selectors: 'h1,h2,h3,h4,h5,h6, .content p, .content li, .title, .hyphenable',
	
	hyphenate(el) {
		var RusA = "[абвгдеёжзийклмнопрстуфхцчшщъыьэюя]";
		var RusV = "[аеёиоуыэю\я]";
		var RusN = "[бвгджзклмнпрстфхцчшщ]";
		var RusX = "[йъь]";
		var Hyphen = "\xAD";
		var re = [
			new RegExp("("+RusX+")("+RusA+RusA+")","ig"),
			new RegExp("("+RusV+")("+RusV+RusA+")","ig"),
			new RegExp("("+RusV+RusN+")("+RusN+RusV+")","ig"),
			new RegExp("("+RusN+RusV+")("+RusN+RusV+")","ig"),
			new RegExp("("+RusV+RusN+")("+RusN+RusN+RusV+")","ig"),
			new RegExp("("+RusV+RusN+RusN+")("+RusN+RusN+RusV+")","ig")
		]
		re.forEach((r) => el.innerHTML = el.innerHTML.replace(r, "$1"+Hyphen+"$2"));
	},
	
	unhyphenate(el) {
		el.innerHTML = el.innerHTML.replace("\xAD", '');
	},
	
	isOverflown(el) {
		var docWidth = document.documentElement.offsetWidth;
		return el.scrollWidth > el.clientWidth || el.offsetWidth > docWidth;
	},
	
	start() {
		var els = document.querySelectorAll(Hyphens.selectors);
		els.forEach((el) => {
			var style = getComputedStyle(el, null);
	        Hyphens.isOverflown(el) || style.textAlign == 'justify'
	        	? Hyphens.hyphenate(el)
	        	: Hyphens.unhyphenate(el);
	    });
	}
};

window.onresize = () => Hyphens.start();
Hyphens.start();
