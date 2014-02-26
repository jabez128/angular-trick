/*Angular-trick 0.1.0 ,@license MIT, (c) 2014*/

(function(window, argular, undefined) {'use strict';
	angular.module('angularTrick',[])
			   .provider('trick',function(){
			   	var trickList = {};
			   	var code = [];
				return {
				setTrick: function(trick,fn){
				(trickList[trick] = trickList[trick] || []).push(fn);
				},
				$get: function(){
					return {
					trickStart: function(event){
					code.push(event.keyCode);
					var now = code.join(' ');
					var keys = Object.keys(trickList);
					var length = keys.length;	
					var leastOne = false;
					for(var i = 0; i < length; i++){
						if(keys[i].match(new RegExp('^' + now )) ){leastOne=true};
						if(keys[i] == now){
							trickList[keys[i]][0]();
							code=[];return;}
					}
					if(!leastOne){
						code = [];
					}
				}}}}
			   }).run(function($rootScope,trick){
					$rootScope.trickStart = trick.trickStart;
			   });
})(window, window.argular);