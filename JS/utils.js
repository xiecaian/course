/**在tpl的模块中用opt中的数据替换掉符合tpl中符合正则表达式的数据 */
function setTplToHTML(tpl,regExp,opt){
    return tpl.replace(regExp(),function(node,key){
        return opt[key];
    });
}

/** 正则表达式*/
function regTpl(){
    return new RegExp(/{{(.*?)}}/,'gim');
}

/*事件监听函数*/
;(function(){
	function addEvent(el,type,fn){
		if(addEventListener){
			el.addEventListener(type,fn,false);
		}
		else if(el.attachEvent){
			el.attachEvent('on' + type,function(){
				fn.call(el);/*attachEvent默认是指向window，需要改*/
			});
		}
		else{
			el['on'+type] = fn;
		}
	}
	window.addEvent = addEvent;
})();

/*取消事件监听函数 */
;(function(){
	function removeEvent(el,type,fn){
		if(el.addEventListener){
			el.removeEventListener(type,fn,false);
		}
		else if(el.attachEvent){
			el.detachEvent('on' +type,fn);
		}
		else{
			el['on'+'type'] = null;
		}
	}
	window.removeEvent = removeEvent;
})();