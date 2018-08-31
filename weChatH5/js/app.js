
"use strict";

;(function(win,undefined){
	var Lifizer = function(){}

	Lifizer.prototype = {
		ONE: function(str){
			if(!str){
				return;
			}
			return document.getElementById(str.split('#')[1]);
		},
		ONES: function (selector){
			var className=selector.substring(1);//从索引为1的元素往后取
			//判断浏览器是否支持getElementsByClassName
			if(document.getElementsByClassName){
				return document.getElementsByClassName(className)
			//document.querySelectorAll('.cls')兼容性有问题
			}else{
				//document.getElementsByTagName('*')+正则表达式
				//\s空白字符 ^开始 $结束
				var reg=new RegExp('^|\\s'+className+'$|\\s');
				var elems=document.getElementsByTagName("*");//获取页面中所有元素
				var arr=[];//保存获取到的指定className的元素
				for(var i=0;i<elems.length;i++){
					if(reg.test(elems[i].className)){//如果和模式匹配上
						arr.push(elem[i]);
					}
				}
				return arr;
			}
		},
		htmlencode: function (str) {
		    var div = document.createElement('div');  
	        div.appendChild(document.createTextNode(str));  
	        return div.innerHTML;
		},
		htmldecode: function (str) {
		    var div = document.createElement('div');  
		    div.innerHTML = str;  
		    return div.innerText || div.textContent;
		},
		getCookie: function (objName) {
		    if (document.cookie.length>0)
		    {
		        var arrStr = document.cookie.split("; ");
		        for(var i = 0;i < arrStr.length;i ++){
		            var temp = arrStr[i].split("=");
		            if(temp[0] == objName) return unescape(temp[1]);
		        }
		    }
		},
		addCookie: function (objName,objValue,objHours){
		    var str = objName + "=" + escape(objValue);
		    if(objHours > 0){
	            var date = new Date();
	            var ms = objHours * 3600 * 1000;
	            date.setTime(date.getTime() + ms);
	            str += "; expires=" + date.toGMTString();
	        }
	        document.cookie = str;
		},
	    debounce: function(fn,delayTime){
			var timer;
			return function () {
				clearTimeout(timer);
				/* fn run after delayTime */
				timer = setTimeout(function (args) {
					fn.apply(undefined,args);
		        }.bind(undefined,arguments),delayTime);
		    }
		},
		setItem: function(key, value) {
			var v = null;
			if( typeof value == 'string'){
				v = value;
			}else{
				v = JSON.stringify(value);
			}
			window.localStorage.setItem(key, v);
		},
		getItem: function(key) {
			return JSON.parse(window.localStorage.getItem(key));
		},
		replace: function (content,reg,toItem) {
			return content.replace(reg,toItem);
		},
		isWxBrowser: function() {
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true;
			} else {
				return false;
			}
		},
		getDevicePixelRatio: function () {
			return window.devicePixelRatio || 1;
		},
		getLanguage: function (isLower=true,customLanguage) {
		    var language;
			typeof customLanguage == 'string' ? language = customLanguage : language = (window.navigator.language || window.navigator.browserLanguage);
		    return isLower? language.toLowerCase() : language;
		},
		RAF: function() {
	      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
	            return window.setTimeout(callback, 1000 / 60);
	          };
	    },
	    toast: function(msg,duration){
	    	var timer1,timer2;
	    	var msg = msg;
	    	var duration = isNaN(duration) ? 2000 : duration;
	    	var msgDiv = document.createElement("div");
	    	msgDiv.innerHTML = msg;
	    	msgDiv.classList.add("liui__toast");
	    	document.body.appendChild(msgDiv);
	    	timer1 = setTimeout(function () {
				var d = 0.5;
				msgDiv.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
				msgDiv.style.opacity = '0';
				timer2 = setTimeout(function () {
					document.body.removeChild(msgDiv);
					clearTimeout(timer1);
					clearTimeout(timer2);
				}, d * 1000);
			}, duration);

	    },
	    AJAX: function(url,type,cb){
	    	var opt = {
	    		type: 'get'
	    	}
	    	$.ajax({
				type: type ? type : opt.type,
				url: url,
				async: true,
				dataType: 'json',
				beforeSend: function(){},
				success: function(data){
					cb(data);
				},
				error: function(err){
					console.info('request err:'+err);
				}
			});
	    }
	}
	win = (function(){ return this || (0, eval)('this'); }());
	if(typeof module !== "undefined" && module.exports) {
        module.exports = Lifizer;
    }else if(typeof define === "function" && define.amd) {
        define(function(){return Lifizer;});
    }else{
        !('Lifizer' in win) && (win.Lifizer = Lifizer);
    }
    win.lifi = new Lifizer();
}(window));



var app_version = '1.0.0';//版本信息
var index_status = false;
var engine_first = true;
var customLanguage = null;
var currentLanguage = (lifi.getLanguage(true) == 'zh') ? 'zh-cn' : lifi.getLanguage(true);
//var currentLanguage = 'en-us';//测试英文环境
var GV_H5_URL = 'http://10.0.0.53:8089/';
//var GV_H5_URL = 'http://120.76.211.50:8089/';
var audio = document.getElementById('audio');
var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;
var isNowNavigating = false;/* 是否正在导航 */
var oBeancons = null; /* 场景蓝牙列表 */
var isNavSuccess = true;/* 导航状态 */
var current_floor = null; /* 记录当前楼层位置 */
var defaultStart = 'default-start-point';
var compass = $('.compass').get(0);

var startPositionInputEl = $("#Li_start_position_input");
var endPositionInputEl = $("#Li_end_position_input");
var http_cache_time = 5000;/* 缓存时间 */


initParam(); /*初始化微信接口参数 */

/* 国际化 */
var i18nData=[
	{
		language: 'zh-cn',
		properties: {
			shanghai_exhibition:'上海会展',
			exhibition_map:'会展地图',
			traffic_guide:'交通导览',
			food_search:'餐饮查询',
			exhibition_introduction:'会展介绍',
			hotel_introduction:'酒店介绍',
			selected_position:'选择位置',
			navigation:'路线',
			infrastructure:'设施',
			starting_point:'设为起点',
			end_point:'到这里去',
			go_here:'到这里',
			scavenging_location:'扫码定位',
			exit_and_playback:'退出回放'
		}
	},
	{
		language: 'en-us',
		properties: {
			shanghai_exhibition:'shanghai exhibition',
			exhibition_map:'Map',
			traffic_guide:'Traffic guide',
			food_search:'Food search',
			exhibition_introduction:'about',
			hotel_introduction:'Hotel',
			selected_position:'Position',
			navigation:'route',
			infrastructure:'infrastructure',
			starting_point:'starting point',
			end_point:'end point',
			go_here:'GO',
			scavenging_location:'scavenging',
			exit_and_playback:'exit and playback'
		}
	}
];
function setI18n(){
	if(currentLanguage != 'zh-cn' && currentLanguage != 'zh'){
		$('.i18n').each(function(){
		    $(this).text(i18nData[1].properties[$(this).data("i18n")]);
		});
	}
}
setI18n();




/*会展地图*/
;(function(window,$){

	var WEBGL = {}

	function randerBulidWork(){
	    var Li_bulid_list_el = $("#Li_bulid_list");
	    var currTime = new Date().valueOf();
	    var url = GV_H5_URL+'Api/InterfaceH5/getBuildingListAll?language_type='+currentLanguage;

	    if(JSON.stringify(lifi.getItem('bulids_list')) == "null"){//首次加载
			lifi.AJAX(url,'get',randerBulidWorkHtml);
		}else{
			if(currTime - parseInt(lifi.getItem('bulids_list-time')) > http_cache_time){//缓存过期再次请求
				lifi.AJAX(url,'get',randerBulidWorkHtml);
			}else{
				var data = lifi.getItem('bulids_list');
				randerBulidWorkHtml(data);
			}
		}

		function randerBulidWorkHtml(data){
			var htmlText = "<li>请选择要进入的场景</li><li class='exterior active i18n' data-i18n='shanghai_exhibition'>上海会展</li>";
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var bulid of data.dataInfo){
		            htmlText += '<li class="work" data-bulidid="'+ bulid.building_id +'" data-id="'+ bulid.id +'">'+ bulid.building_name +'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			Li_bulid_list_el.html(htmlText);
			lifi.setItem('bulids_list',data);
			lifi.setItem('bulids_list-time',currTime);
		}

		setI18n();
	}
	randerBulidWork();

	(function load() {
		var url = GV_H5_URL + 'Api/InterfaceH5/getBaseStationList3D?language_type='+currentLanguage;//基础设施点
	    var url2 = GV_H5_URL + 'Api/InterfaceH5/getShopsList3D?language_type='+currentLanguage;//所有房间的点
	    var url3 = GV_H5_URL+'Api/InterfaceH5/getFloorListAll?language_type='+currentLanguage;
	    lifi.AJAX(url,'get',function (data) {
	    	lifi.setItem('base_station_list',data);
		    lifi.AJAX(url2,'get',function (data) {
	        	lifi.setItem('room_list',data);

	    		var points = lifi.getItem('base_station_list').dataInfo.concat(lifi.getItem('room_list').dataInfo);
	    		var floorData;
	    		lifi.AJAX(url3,'get',function (data){//获取所有楼层名称
	    			lifi.setItem('base-floorData-list',JSON.stringify(data.dataInfo));

		    		floorData = lifi.getItem('base-floorData-list');
		    		console.warn(floorData);
			        var options = {
			            pStats: null,
			            pSiteData: points,
			            pZipLoader: loadZip,
			            pUpdate1: pBar,
			            pUpdate2: top_pBar,
			            pLayerUpdate: reLoadFloor,
			            pNavBack: loadHisPath,
			            pOutWorkBack: changedSceenType,
			            pSwichViweModelBack: changeDimType,
			            pChooseLayer: chooseFloor,
			            nWidth: viewWidth,
			            nHeight: viewHeight,
			            pNoFindPath: notFoundRoute,
			            pCompass: actCompass,
			            pSetNavPoint: chooseSetPoint,
			            pChickTouchMove: hideSetPoint,
			            pPostBlueToothList: getBleList,
			            pVoicePost: reciveVoiceText,
			            pMovie: getAnimateType,
			            pShowActiveLayer: showActiveFloor,
			            pCallback: pCallback,
			            pFloorData: floorData
			        };
			        new Engine().Init(options);
	    		});
	        });
	    });
	})();


	/* 加载ZIP文件 */
	function loadZip(callback) {
	    fetch('project.zip').then(function (response) {
	        if (response.status === 200 || response.status === 0) {
	            return Promise.resolve(response.blob());
	        } else {
	            return Promise.reject(new Error(response.statusText));
	        }
	    }).then(JSZip.loadAsync).then(function (zip) {
	        callback(zip);
	    });
	}
	/* 主进度条 */
	function pBar(bShow, nRate) {
	    if (!bShow) {
	        $(".processcontainer").hide();
	    }
	    var processbar = document.getElementById("processbar");
	    processbar.style.width = ( nRate * 100 ) + "%";
	}

	/* 顶部进度条 */
	function top_pBar(bShow, nRate) {
	    if (!bShow) {
	        $(".top-process").hide();
	    }

	    var topprocessbar = document.getElementById("topprocessbar");
	    topprocessbar.style.width = ( nRate * 100 ) + "%";
	}
	/* 
	 *
	 *切换楼宇重新加载楼层信息
	 *
	 */
	function reLoadFloor(sum, houseid) {
	    var url = GV_H5_URL+'Api/InterfaceH5/getFloorListByBuildingID?building_id='+houseid+'&language_type='+currentLanguage;
	    lifi.AJAX(url,'get',function (data){
	        var layerArr = [];
	        var html = '';
	        if(data.dataInfo){
	            var layers = data.dataInfo;
	            lifi.setItem('base-floorData-list', JSON.stringify(data.dataInfo));
	            for(var i=0; i<layers.length; i++){
	                /*layerArr.unshift目的是保证高楼层在上*/
	                layerArr.unshift("<li house-id="+houseid +" data-floorid="+layers[i].floor_id+" data-layerid="+i+" data-layername="+layers[i].floor_name+"  class="+(layers[i].is_default==1?"active default":"")+">"+layers[i].floor_name+"</li>");
	            }
	        }
	        $("#scroll_bar").html(layerArr.join(""));
	        //$("#scroll_bar li.active").trigger("click",{type: 'noNeedActive'});
        	var default_layerId = $("#scroll_bar li.active").attr("data-layerid");
	        if(default_layerId){
	        	if( $(".history-rollback-wrapper li").eq(0).hasClass("item-active") ){//判断是否在导航中，获取出发楼层的ID并激活相应的楼层
	        		default_layerId = $(".history-rollback-wrapper li.item-active").attr("layer-id");
	        	}
	        	if(lifi.getItem("currShopFloorId")){
	        		var floor_id = lifi.getItem("currShopFloorId").floor_id;
	        		default_layerId = $("#scroll_bar li[data-floorid="+floor_id+"]").attr("data-layerid");
		            setTimeout(function(){
		            	localStorage.removeItem('currShopFloorId');
		            },2000);//延时清空数据
	        	}
	            Engine.g_pInstance.m_pProject.ActiveFloor(default_layerId);
	        }
	        
	    });

	}
	/*切换楼层*/
	$(document).unbind().on("click", "#scroll_bar li", function(event, argv){
		var _this = $(this);
		_this.addClass("active").siblings().removeClass("active");
		var houseId = $("#scroll_bar li.active").attr("house-id");
		var floorid = $("#scroll_bar li.active").data("floorid");
		var layerid = $("#scroll_bar li.active").data("layerid");
		var layername = $("#scroll_bar li.active").data("layername");


		if (argv != undefined && argv.type == 'noNeedActive') {
	        console.info('floor_box noNeedActive layer');
	    } else {
	        var flag = false;
	        var elemWidth = $(".history-rollback-wrapper ul li").eq(0).width();
	        $(".history-rollback-wrapper ul li").each(function (index) {
	            if ($(this).attr('layer-id') == layerid && $(this).attr('house-id') == houseId) {
	                $(".history-rollback-wrapper ul li").eq(index).trigger('click', {type: 'noNeedActive'});
	                $(".history-rollback-wrapper ul").scrollLeft(index * elemWidth);
	                flag = true;
	            }
	        });

	        if (!flag) {
	            $(".history-rollback-wrapper ul li").eq(0).removeClass('item-active').siblings().removeClass('item-active');
	            $(".history-rollback-wrapper ul").scrollLeft(0);
	        }
	        Engine.g_pInstance.m_pProject.ActiveFloor(layerid);
	    }
	});

	/* 给被激活显示的楼层添加选中状态 */
	function showActiveFloor(floor) {
	   	current_floor = floor;
	    if(current_floor.HousId != 0){
	        $("#scroll_bar li[data-layerid="+current_floor.LayerId+"]").trigger('click', {type: 'noNeedActive'});

	        $('.history-rollback-wrapper li').each(function () {
	            if(current_floor.LayerId == $(this).attr('layer-id') && current_floor.HousId == $(this).attr('house-id')){
	                $(this).trigger('click',{type: 'noNeedActive'});
	            }
	        });
	    }
	    
	}
	/*开始导航---->退出回放*/
	$(document).on("click", ".btn-exit-rollback", function (e) {
	    e.preventDefault();
	    var point = startPositionInputEl.attr('roomid');
	    Engine.g_pInstance.m_pProject.CloseNavBack();
	    Engine.g_pInstance.m_pProject.BounceIcon(point, 0, 0);
	    $(".history-rollback-wrapper").css("display", "none").find("ul").html("");
	    endPositionInputEl.attr('roomid','').val('');
	    $('#navigate_btn').removeClass("moveDown");
	    $("#webgl_cont_b_l,#direction_wrp").removeClass("moveUp");
	    isNowNavigating = false;
	    if($(".Li_page_entance[data-pageurl='exhibitionMap']").hasClass("active")){
	    	$(".two_d_btn").trigger("click");
	    }
	});
	/* 点击历史回放楼层，从新定位 */
	$(document).on("click", ".history-rollback-wrapper ul li", function (event, argv) {
	    /* 恢复播放 */
	    audio.volume = 1;
	    $(this).addClass("item-active").siblings().removeClass("item-active");
	    if (argv == undefined ) {
	        var nb = new NavBackData($(this).attr('house-id'),$(this).attr('p-id'),$(this).attr('layer-id'));
	        Engine.g_pInstance.m_pProject.NavBack(nb);
	        //isNowNavigating = false;
	        console.info('history-rollback-wrapper needActive layer');
	    } else if(argv.type == 'noNeedActive'){
	        if(isNowNavigating){
	            var elemWidth = $(".history-rollback-wrapper ul li").eq(0).width();
	            $(".history-rollback-wrapper ul").scrollLeft( $(this).index() * elemWidth);
	        }
	        console.info('history-rollback-wrapper noNeedActive layer');
	    }
	});
	/*开始导航---->加载回放路径*/
	function loadHisPath(points) {
	    var htmlContext = "";
	    //console.clear();
	    console.log(points);
	    for(var i in points){
	        htmlContext += "<li layer-id='" + points[i].LayerId + "' house-id='" + points[i].HousId + "' p-id='" + points[i].PId + "'><span class='floor-item'>" + points[i].LayerName + "</span>";
	        if (i < points.length - 1) {
	            htmlContext += "<span class='iconfont icon-fanhui'></span>";
	        }
	        htmlContext += "</li>";
	    }
	    $(".history-rollback-wrapper ul").html(htmlContext);
	    $(".history-rollback-wrapper").css("display", "flex");
	    $("#direction_wrp").removeClass("moveUp");
	    $("#scroll_bar li[data-layerid="+current_floor.LayerId+"]").trigger('click', {type: 'noNeedActive'});
	    $('.history-rollback-wrapper li').each(function () {
	        if(current_floor.LayerId == $(this).attr('layer-id') && current_floor.HousId == $(this).attr('house-id')){
	            $(this).trigger('click',{type: 'noNeedActive'});
	        }
	    });
	}
	/* webgl控制内外景切换 */
	function changedSceenType(isOuter) {
	    if (isOuter) {
	        $("#scroll_bar").hide();
	        Engine.g_pInstance.m_pProject.CloseNavBack();
	        console.info("由楼宇进入院区");
	    } else {
	        $("#scroll_bar").show();
	        console.info("由院区进入楼宇");
	    }
	}
	/* webgl控制2/3D切换 */
	function changeDimType(type) {
	    type === 0 ? $(".two_d_btn a").text("3D") : $(".two_d_btn a").text("2D");
	}
	/* 2D/3D切换 */
	$(".two_d_btn").on("click", function () {
	    $(this).text() === "3D" ? Engine.g_pInstance.m_pProject.SwitchViewMode(ViewMode.View3D) : Engine.g_pInstance.m_pProject.SwitchViewMode(ViewMode.View2D);
	});
	/* 列表自动滚动的距离 */
	function chooseFloor(){
	    if(!$("#Li_bulid_list li.active").hasClass("exterior")){
	        var currIdx = $("#scroll_bar li.active").index()+1;//当前激活的楼层索引
	        var li_len = $("#scroll_bar li").length;//总共有多个li
	        var li_showNum = 4;//显示li的个数
	        if(li_len > li_showNum){
	            if((currIdx - li_showNum) >=0){
	                $("#scroll_bar").scrollTop((currIdx - li_showNum + 1) * 40 + 20);
	            }else{
	                $("#scroll_bar").scrollTop(0);
	            }
	        }
	    }
	}
	/* 用于提示没有找到线路 */
	function notFoundRoute() {
	    isNavSuccess = false;
	    lifi.toast('无法找到当前线路.', 1500);
        $("#navigate_btn").addClass("moveDown");
        $("#direction_wrp").addClass("moveUp");
	}
	/* 指南针 */
	function actCompass(deg) {
	    compass.style.webkitTransform = 'rotate(' + deg + 'deg)';
	}
	/* webgl 选取起始点/终点 */
	function chooseSetPoint(id, name, event) {
	    if( name !=='' ){
	        var point = {id: id, name: name};
	        $("#choose_set_point,#webgl_cont_b_l").addClass("moveUp");
	        if($("#go_here").hasClass("moveUp")){
	        	$("#go_here").removeClass("moveUp");
	        }
	        $("#choose_set_point_name").text(name);
	        lifi.setItem('choose-set-point',point);
	        Engine.g_pInstance.m_pProject.CloseNavBack();
	        $("#direction_wrp").removeClass("moveUp");
	        $("#navigate_btn").removeClass("moveDown");
	        $(".history-rollback-wrapper").css("display", "none");
	    }
	}
	function hideSetPoint() {
	    WEBGL.resetStatus();
	}

	/* 获取蓝牙设备列表[所有楼宇所有楼层的蓝牙基站] */
	function getBleList(blelist) {
	    oBeancons = blelist;
	    for (var i in blelist)
	        console.log(blelist[i]);
	}

	function getPosition(currentBLEs) {
	    var pArray = [];
	    var pArray1 = [];
	    var localization = new NLocalization();
	    var mPosition = null;

	    for (var i in currentBLEs) {
	        pArray[i] = new NBaseStation();
	        pArray[i].m_nRssi = currentBLEs[i].rssi;
	        pArray[i].m_nMinorid = currentBLEs[i].minorId;
	        pArray[i].m_mPosition = new Vector3(currentBLEs[i].position[0], currentBLEs[i].position[1], 0.0);
	    }

	    pArray.sort(function (a, b) {
	        if( a.rssi < b.rssi ){
	            return 1;
	        }else if(a.rssi > b.rssi){
	            return -1;
	        }else{
	            return 0;
	        }
	    });

	    for (var id in pArray) {
	        pArray1.push(pArray[id]);
	        if( id == 2 ){
	            break;
	        }
	    }

	    var minor0 = pArray1[0].m_nMinorid;
	    var minor4 = pArray1[1].m_nMinorid;
	    var minor2 = pArray1[2].m_nMinorid;
	    var mm = minor0+minor4+minor2;
	    var flag0 = false;
	    var flag4 = false;
	    var flag2 = false;

	    if(mm.indexOf('36092')>-1) flag0=true;
	    if(mm.indexOf('39828')>-1) flag4=true;
	    if(mm.indexOf('59749')>-1) flag2=true;

	    var minor1 = pArray1[0].m_nMinorid;
	    var minor44 = pArray1[1].m_nMinorid;
	    var minor3 = pArray1[2].m_nMinorid;
	    var mm1 = minor1+minor44+minor3;
	    var flag1 = false;
	    var flag44 = false;
	    var flag3 = false;

	    if(mm1.indexOf('59750')>-1) flag1=true;
	    if(mm1.indexOf('39828')>-1) flag44=true;
	    if(mm1.indexOf('39829')>-1) flag3=true;

	    //清除对角线上的点
	    if( (flag0&&flag4&&flag2) || (flag1&&flag44&&flag3)){
	        mPosition = null;
	    }else{
	        mPosition = localization.GetLocation(pArray1);
	    }
	    if (mPosition != null) {
	        Engine.g_pInstance.m_pProject.CurrentPosition(currentBLEs[0].work, currentBLEs[0].layer, mPosition);
	    } else {
	        console.info('mPosition :' + mPosition);
	    }
	}

	/* 获取蓝牙数据 */
	function autoRunBlE() {
	    var msgTipStatus = false;
	    wx.startSearchBeacons({
	        ticket: "",
	        success: function (argv1) {
	            function Beancon(index, minorId, majorid, uuid, position){
	                this.index = index;
	                this.minorId = minorId | "";
	                this.majorid = majorid | "";
	                this.uuid = uuid | "";
	                this.position =  position | [0.0, 0.0, 0.0];
	                this.rssiRecords = [];
	                this.rssi = 0.0;
	                this.weight = 0.0;
	                this.tick = 0;
	                this.order = 0;
	                this.layer = 0;
	                this.work = 0;
	            }

	            var beaconList = [];
	            var beaconLut = new Map();
	            for(var i in oBeancons){
	                var bean = new Beancon();
	                bean.index = i;
	                bean.minorId = oBeancons[i].m_pMinorid;
	                bean.majorid = oBeancons[i].m_pMajorid;
	                bean.uuid = oBeancons[i].m_pUuid;
	                bean.position = [oBeancons[i].m_pPosition.x, oBeancons[i].m_pPosition.z, 0.0];
	                bean.layer = oBeancons[i].m_pLayerID;
	                bean.work = oBeancons[i].m_pWorkID;
	                beaconList.push(bean);
	                beaconLut.set(oBeancons[i].m_pMinorid,bean);
	            }

	            var cache = [];
	            var tick = 0;

	            wx.onSearchBeacons({
	                complete: function (argv){
	                    var frame = cache[tick % 9] = [];

	                    for(var index in argv.beacons){
	                        var minor = argv.beacons[index]['minor'];
	                        if(minor=='919') {minor='39828';}
	                        var major = argv.beacons[index]['major'];
	                        var uuid = argv.beacons[index]['uuid'];
	                        var rssi = argv.beacons[index]['rssi'];

	                        var beancon = beaconLut.get(minor);
	                        frame.push([beancon.index, Math.abs(rssi)]);
	                    }

	                    tick++;

	                    // 缓存最近9帧数据，将出现的基站按权重排序
	                    if(tick > 8){
	                        var beancons = [];

	                        for(var index = 0; index < 9; index++) {
	                            frame = cache[(tick - index - 1) % 9];

	                            for(var i = 0; i < frame.length; i++){
	                                var beancon = beaconList[frame[i][0]];

	                                if(beancon.tick != tick){
	                                    beancon.tick = tick;
	                                    beancon.rssiRecords = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
	                                    beancons.push(beancon);
	                                }

	                                beancon.rssiRecords[index] = frame[i][1];
	                            }
	                        }

	                        // 频率权重，3：2：1，最近的信号权重较高，出现次数越多权重越高；
	                        // 振幅权重，3：2.4：1.5，根据幅度，单个权重取1.0，0.8，0.5
	                        for(var beancon of beancons){
	                            var fweight = 0.0;
	                            var aweight = 0.0;

	                            var rssiTotal = 0.0;
	                            var rssiCount = 0.0;
	                            var rssiAvg = 0.0;

	                            for(var index = 0; index < 9; index++){
	                                var rssi = beancon.rssiRecords[index];

	                                if(rssi != 0.0){
	                                    if(rssi < 65.0){
	                                        aweight += 1.0;
	                                    }
	                                    else if(rssi < 75.0){
	                                        aweight += 0.8;
	                                    }
	                                    else{
	                                        aweight += 0.5;
	                                    }

	                                    if(index < 3){
	                                        fweight += 1.0;
	                                    }
	                                    else if(index < 6){
	                                        fweight += 0.67;
	                                    }
	                                    else{
	                                        fweight += 0.33;
	                                    }

	                                    rssiTotal += rssi;
	                                    rssiCount++;
	                                }

	                                if(rssiTotal > 0.0){
	                                    if(index == 3){
	                                        rssiAvg = rssiTotal / rssiCount;
	                                    }
	                                    else if(index == 6){
	                                        rssiAvg = (rssiAvg * 2.0 / 3.0) + (rssiTotal / rssiCount * 1.0 / 3.0);
	                                    }
	                                    else if(index == 9){
	                                        rssiAvg = (rssiAvg * 2.0 / 3.0) + (rssiTotal / rssiCount * 1.0 / 3.0);
	                                    }
	                                }
	                            }

	                            beancon.weight = fweight + aweight;
	                            beancon.rssi = rssiAvg;
	                        }

	                        // 根据权重和信号强度分别进行排序，中合两个排序，选取序列前面三个基站来计算位置
	                        // 结果置换缓存中的对应数据
	                        beancons.sort(function (a, b) {
	                            if (a.weight < b.weight) {
	                                return -1;
	                            }
	                            else if (a.weight > b.weight) {
	                                return 1;
	                            }
	                            else {
	                                return 0;
	                            }
	                        });

	                        for(var i = 0; i < beancons.length; i++){
	                            beancons[i].sort = i;
	                        }

	                        beancons.sort(function (a, b) {
	                            if (a.rssi < b.rssi) {
	                                return 1;
	                            }
	                            else if (a.rssi > b.rssi) {
	                                return -1;
	                            }
	                            else {
	                                return 0;
	                            }
	                        });

	                        for(var i = 0; i < beancons.length; i++){
	                            beancons[i].sort += i;
	                        }

	                        beancons.sort(function (a, b) {
	                            if (a.sort < b.sort) {
	                                return 1;
	                            }
	                            else if (a.sort > b.sort) {
	                                return -1;
	                            }
	                            else {
	                                return 0;
	                            }
	                        });

	                        if(beancons.length > 2){
	                            //alert(JSON.stringify(beancons));
	                            getPosition(beancons);
	                        }
	                        else{
	                            if(!msgTipStatus){
	                                lifi.toast(tick + " RSSI：Invalid.");
	                                msgTipStatus = true;
	                            }
	                        }
	                    }
	                    else{
	                        // alert("DD" + tick);
	                    }
	                }
	            });
	        },
	        complete: function (argv) {
	            var message = argv.errMsg;
	            if (message == 'startSearchBeacons:ok' || message == 'startSearchBeacons:already started') {

	            } else if (message == 'startSearchBeacons:bluetooth power off') {
	                lifi.toast('请开启手机蓝牙，体验定位服务.', 3500);
	            } else if (message == 'startSearchBeacons:location service disable') {
	                lifi.toast('请开启手机GPS，体验定位服务.', 3500);
	            } else if (message == 'startSearchBeacons:system unsupported') {
	                lifi.toast('当前环境不支持此蓝牙服务.', 3500);
	            }
	        },
	        errors: function () {
	            alert("!wx.startSearchBeacons");
	        }
	    });
	}

	/* 初始化u3d文字片段所对应的语音 */
	function reciveVoiceText( texts ) {
	    var newTexts = '';
	    for(var i in texts){
	        if( window.localStorage.getItem('v'+texts[i]) == null ){
	            if(texts[i] == null){
	                texts[i] = '位置点';
	            }
	            newTexts += texts[i] + ',';
	        }
	    }
	    newTexts = newTexts.substr( 0, newTexts.length-1 );
	    getVoice( newTexts, texts );
	}

	/* 请求语音片段 */
	function getVoice(newTexts,texts) {
	    if( newTexts === '' ){
	        playVoice(texts);
	    }else {
	        //var url = GV_H5_URL+'api/VoiceInfo/getVoiceUrlInfo?keyname='+newTexts;

	        $.ajax({
	            type: "get",
	            async: true,
	            url: GV_H5_URL+'api/VoiceInfo/getVoiceUrlInfo?keyname='+newTexts,
	            success: function (data) {
	                if(data){
	                    var voices = (JSON.parse(data)).dataInfo;
	                    for(var i in voices){
	                        lifi.setItem('v'+voices[i].key_name,'data:audio/mp3;base64,'+voices[i].mp3_url);
	                    }
	                    
	                    playVoice(texts);
	                }else {
	                    console.info('请求数据出错.');
	                }
	            },
	            errors: function (err) {
	                console.log("get voice error: "+err);
	            }
	        });
	    }
	}
	/*播放语音*/
	function playVoice(texts) {
	    var i = 0;
	    if( texts.length>0 ){
	        audio.currentTime=0;
	        audio.pause();
	        //audio.src = metoo.getItem('v'+texts[i]);
	        audio.src = window.localStorage.getItem('v'+texts[i]);
	        audio.volume = 1;
	        ++i;
	        Engine.g_pInstance.m_pProject.VoiceStart();
	        setTimeout(() => {
	            audio.play();
	            
	            /* 兼容ios版微信 */
	            //判斷 WeixinJSBridge 是否存在
	            if(typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
	            }else{
	                if (document.addEventListener) {
	                    document.addEventListener("WeixinJSBridgeReady", function(){
	                        audio.play();
	                    }, false);
	                }else if(document.attachEvent) {
	                    document.attachEvent("WeixinJSBridgeReady", function(){
	                        audio.play();
	                    });
	                    document.attachEvent("onWeixinJSBridgeReady", function(){
	                        audio.play();
	                    });
	                }
	            }
	        },0);
	        
	    }
	    audio.onended = function () {
	        if( i<texts.length ){
	            audio.currentTime=0;
	            audio.pause();
	            //audio.src = metoo.getItem('v'+texts[i]);
	            audio.src = window.localStorage.getItem('v'+texts[i]);
	            ++i;
	            setTimeout(() =>{ audio.play();} , 0);
	        }else{
	            Engine.g_pInstance.m_pProject.VoiceEnd();
	        }
	    }
	}
	/* 兼容ios版微信 */
	function audioAutoPlay(id){
	    var audio = document.getElementById(id);
	    audio.play();
	    document.addEventListener("WeixinJSBridgeReady", function () {
	        audio.play();
	    }, false);
	}
	audioAutoPlay('audio');

	/*加载动画类型*/
	function getAnimateType(type){
	    console.info('play gif type：'+ type );
	    playGif( type ,3000 );
	}
	/* playGif 播放gif */
	function playGif(type, duration) {
	    duration = isNaN(duration) ? 3000 : duration;
	    var m = document.createElement('img');
	    m.src = 'images/animate/'+type+'.gif';
	    m.style.cssText = "position:absolute;padding:5px; top:0px; left:0px; right:0px;margin:auto; z-index:999999;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);";
	    document.body.appendChild(m);
	    setTimeout(function () {
	        var d = 0.5;
	        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
	        m.style.opacity = '0';
	        setTimeout(function () {
	            document.body.removeChild(m)
	        }, d * 1000);
	    }, duration);
	}
	/*回调函数*/
	function pCallback(pError){
	    if (pError == null) {
	        Engine.g_pInstance.Start();
	        engine_first = false;
	    }
	    loadEnd();//加载默认值
	}

	function loadEnd() {
	    wx.ready(function () {
	        /*autoRunBlE();*/
	        var url = GV_H5_URL+'Api/InterfaceH5/getSharingData?language_type='+currentLanguage;
	        lifi.AJAX(url,'get',wxSharePage);
	    });
	    wx.error(function (res) {
	        alert(res.errMsg);
	    });

	    //设置默认起点
	    var pDefaultStart_url = GV_H5_URL+'Api/InterfaceH5/getStartPoint?language_type='+currentLanguage;
	    lifi.AJAX(pDefaultStart_url,'get',function(data){
	    	if(data.dataInfo){
		        lifi.setItem(defaultStart, JSON.stringify(data.dataInfo));
		        startPositionInputEl.attr('roomid', data.dataInfo.site_start_id).val(data.dataInfo.site_start_name);
	        }
	    });
	}

	function wxSharePage(data) {
	    var title = data.dataInfo.title;
	    var desc = data.dataInfo.desc;
	    var imgUrl = data.dataInfo.imgUrl;
	    var host = location.protocol+'//'+window.location.host;
	    /* 分享给朋友 */
	    wx.onMenuShareAppMessage({
	        title: title,
	        desc: desc, // 分享描述
	        link: host+'/h5/dist/index.html',
	        imgUrl: imgUrl,
	        type: '',
	        dataUrl: '',
	        success: function () {
	        },
	        cancel: function () {
	        }
	    });
	    /* 分享到朋友圈 */
	    wx.onMenuShareTimeline({
	        title: title,
	        link: host+'/h5/dist/index.html',
	        imgUrl:imgUrl,
	        success: function () {
	        },
	        cancel: function () {
	        }
	    });
	    /* 分享给QQ好友 */
	    wx.onMenuShareQQ({
	        title: title,
	        desc: desc, // 分享描述
	        link: host+'/h5/dist/index.html',
	        imgUrl: imgUrl,
	        success: function () {
	        },
	        cancel: function () {
	        }
	    });
	}



	/* 切换楼宇 */
	$(document).on("click", "#Li_bulid_list li", function () {
	    isNavSuccess = true; /* 初始化标记 */
	    var _this = $(this);
	    var txt = _this.html();

	    $(this).addClass("active").siblings().removeClass("active");
	    if(_this.hasClass('work')){
	        var _bulidid = $(this).attr("data-bulidid");
	        Engine.g_pInstance.m_pProject.SwitchWork(_bulidid);
	    }
	    if(_this.hasClass('exterior')){
	        Engine.g_pInstance.m_pProject.GoOutWork();
	    }
	    $("#bulid_wrapper .layer").trigger("click");
	    $("#curr_bulid_name").html(txt);
	});



	WEBGL.resetStatus = function(){
		/*重置导航页面的状态有：
		1、判断场景切换是否在打开状态
		2、判断是否正在导航中，选择可关闭和不关闭*/
		if($("#bulid_wrapper").hasClass("moveLeft")){
			$("#bulid_wrapper").removeClass("moveLeft");
		}
	}


	$(document).on("click", "#navigate_btn", function(){
		var that = $(this);
		var pStart = startPositionInputEl.attr("roomid");
	    var pEnd = endPositionInputEl.attr("roomid");
	    var nType = 0;

	    if(pStart!='' && pEnd!=''){
	        if(pStart!=pEnd){
	    		isNowNavigating = true;
	            $("#webgl_cont_b_l").addClass("moveUp");
	            $("#direction_wrp").removeClass("moveUp");
	            Engine.g_pInstance.m_pProject.Navigate(pStart, pEnd, nType);
	            if (isNavSuccess) {
	                audio.volume = 1;
	            } else {
	    			isNowNavigating = false;
	    			isNavSuccess = false;
	                
	                //endPositionInputEl.attr('roomid','').val('');
	            }
	        }else{
	            endPositionInputEl.attr('roomid','').val('');
	            lifi.toast('起点和终点相同！',1500);
	        }
	    }else{
	    	isNowNavigating = false;
            if(pStart==''){
                lifi.toast('请输入起点',1500);
            }else if(pEnd==''){
                lifi.toast('请输入终点',1500);
            }
            that.addClass("moveDown");
			$("#direction_wrp,#webgl_cont_b_l").addClass("moveUp");
	    }
	});

	//设为起点+到这里去
	$(document).on("click", "#choose_set_point_start,#choose_set_point_end", function(){
		var type = $(this).data("type");
		var name = lifi.getItem("choose-set-point").name;
		var roomid = lifi.getItem("choose-set-point").id;
		$("#choose_set_point").removeClass("moveUp");
		if(type == "start"){//设为起点
			startPositionInputEl.attr("roomid",roomid).val(name);
			$("#direction_wrp").addClass("moveUp");
		}else if(type == "end"){
			endPositionInputEl.attr("roomid",roomid).val(name);
			$("#navigate_btn").trigger("click");
		}
	});


	/*起点点击事件*/
	$(document).on("click", "#Li_start_position_input,#Li_end_position_input", function(){
		var type = $(this).data("type");
		lifi.setItem('position_input_type',type);
		$("#pop_input_page").addClass("scale");
		if(JSON.stringify(lifi.getItem('bulids_list')) == "null"){//首次加载
			var currTime = new Date().valueOf();
			var url = GV_H5_URL+'Api/InterfaceH5/getBuildingListAll?language_type='+currentLanguage;
			lifi.AJAX(url,'get',bulidsHtml);
		}else{
			var data = lifi.getItem('bulids_list');
			bulidsHtml(data);
		}

		function bulidsHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var bulid of data.dataInfo){
		            htmlText += '<li data-bulidid="'+bulid.id+'">'+bulid.building_name+'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			$("#pop_input_bulids").html(htmlText);
			$("#pop_input_bulids li").eq(0).trigger("click");
		}
	});

	$(document).on("click", "#pop_input_bulids li", function(){
		var _this = $(this);
		var building_id = _this.data("bulidid");
		var currTime = new Date().valueOf();
		var url = GV_H5_URL+'Api/InterfaceH5/getFloorListByBuildingID?building_id='+building_id+'language_type='+currentLanguage;
		if(!_this.hasClass("active")){
			_this.addClass("active").siblings().removeClass("active");
			if(JSON.stringify(lifi.getItem('pop_input_layers'+building_id)) == "null"){//首次加载
				lifi.AJAX(url,'get',layersHtml);
			}else{
				var data = lifi.getItem('pop_input_layers'+building_id);
				layersHtml(data);
			}
		}

		function layersHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				var dataInfo = data.dataInfo;

				if( parseInt(dataInfo[0].floor_id) < parseInt(dataInfo[dataInfo.length-1].floor_id) ){//排序
					dataInfo = dataInfo.sort(sortFloorId).reverse();
				}

				for(var layer of dataInfo){
		            htmlText += '<li data-id="'+layer.id+'">'+layer.floor_name+'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			$("#pop_input_layers").html(htmlText);
			lifi.setItem('pop_input_layers'+building_id,data);
			lifi.setItem('pop_input_layers'+building_id+'-time',currTime);
			$("#pop_input_layers li").eq(0).trigger("click");
		}

		function sortFloorId(x,y){
		    return (y.floor_id.split(y.build_num))[1]-(x.floor_id.split(x.build_num))[1];
		}

	});

	$(document).on("click", "#pop_input_layers li", function(){
		var _this = $(this);
		var layer_id = _this.data("id");
		var currTime = new Date().valueOf();
		var url = GV_H5_URL+'Api/InterfaceH5/getShopsListByFloorID?floor_id='+layer_id+'language_type='+currentLanguage;
		if(!_this.hasClass("active")){
			_this.addClass("active").siblings().removeClass("active");
			if(JSON.stringify(lifi.getItem('pop_input_shops')) == "null"){//首次加载
				lifi.AJAX(url,'get',shopsHtml);
			}else{
				var data = lifi.getItem('pop_input_shops');
				shopsHtml(data);
			}
		}

		function shopsHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var shop of data.dataInfo){
		            htmlText += '<li class="shop-item liui-flex-row liui-flex-row-middle" data-id="'+shop.id+'" data-roomid="'+ shop.room_id +'" data-addr="'+ shop.addr +'" data-name="'+shop.name+'">'
                        +'<div class="liui-flex-row-hd">'
                            +'<img class="img" src="'+ shop.icon +'" onerror="javascript:this.src=\'images/active-miss.png\'">'
                        +'</div>'
                        +'<div class="liui-flex-row-bd">'
                            +'<h3 class="name">'+ shop.name +'</h3>'
                            +'<div class="label"><span>' + shop.type_name + '</span></div>'
                        +'</div>'
                    +'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			$("#pop_input_shops").html(htmlText);
			lifi.setItem('pop_input_shops'+layer_id,data);
			lifi.setItem('pop_input_shops'+layer_id+'-time',currTime);
		}
	});

	$(document).on("click", "#pop_input_shops li", function(){
		var _this = $(this);
		var name = _this.data("name");
		var roomid = _this.data("roomid");
		var type = window.localStorage.getItem('position_input_type');
		if(roomid && type){
			if( type== "start"){
				startPositionInputEl.attr("roomid",roomid).val(name);
			}else if(type == "end"){
				endPositionInputEl.attr("roomid",roomid).val(name);
				$("#navigate_btn").trigger("click");
			}
			$("#pop_input_close").trigger("click");
		}
	});

	$(document).on("click", "#pop_input_close", function(){
		if($("#pop_input_page").hasClass("scale")){
			$("#pop_input_page").removeClass("scale");
		}
	});

	/* 扫描二维码（确定起点）*/
	$(document).on("click", ".two_code_btn", function () {
		var type = $(this).data("type");
	    wx.scanQRCode({
	        needResult: 1,
	        desc: 'scanQRCode desc',
	        success: function (res) {
	            if(res){
	                if (res.resultStr) {
	                    var point = JSON.parse(res.resultStr);
	                    startPositionInputEl.attr('roomid', point.Room_ID).val(point.Name);
	                    if(type != "home"){//不是首页的扫描按钮
	                    	$(".Li_page_entance[data-pageurl='exhibitionMap']").trigger("click");
	                    }
	                }
	            }else{
	                lifi.toast('请求数据出错.');
	            }
	        }
	    });
	});



	//切换展馆
	$(document).on("click", ".webgl-cont-r", function(){
		if(!$("#bulid_wrapper").hasClass("moveLeft") && !isNowNavigating){
			$("#bulid_wrapper").addClass("moveLeft");
		}else{
			lifi.toast("正在导航中...<br>请先点击右下角的退出回放");
		}
	});
	//关闭切换展馆
	$(document).on("click", "#bulid_wrapper .layer", function(){
		if($("#bulid_wrapper").hasClass("moveLeft")){
			$("#bulid_wrapper").removeClass("moveLeft");
		}
	});
	/* 场景复位 */
	$(document).on("click", "#webgl_reset", function () {
	    $(this).addClass('active');
	    Engine.g_pInstance.m_pProject.Reset();
	});

	/* 隐藏导航输入面板 */
	$(document).on("touchstart", "canvas", function () {
	    WEBGL.resetStatus();
	    $('#webgl_reset').removeClass('active');
	    $("#choose_set_point").removeClass("moveUp");
	    if(!$("#navigate_btn").hasClass("moveDown") && $("#webgl_cont_b_l").hasClass("moveUp") && $(".history-rollback-wrapper").css("display") != "flex" && !$("#go_here").hasClass("moveUp")){
	    	$("#webgl_cont_b_l").removeClass("moveUp");
	    }
	});



	//基础设施绑定
	$(document).on("click", "#webgl_infrastructure", function(){
		if(!isNowNavigating){
			var currTime = new Date().valueOf();
			var url = GV_H5_URL+'Api/InterfaceH5/getBaseStationSortList?language_type='+currentLanguage;
			if(!$("#infrastructure_wrp").hasClass("moveUp")){

				$("#infrastructure_wrp").addClass("moveUp");

				if(JSON.stringify(lifi.getItem('infrastructure_list')) == "null"){//首次加载
					lifi.AJAX(url,'get',infrastructureHtml);
				}else{
					var data = lifi.getItem('infrastructure_list');
					infrastructureHtml(data);
				}

				function infrastructureHtml(data){
					var htmlText = '';
					if(data.returnCode == "100" && data.dataInfo.length>0){
						for(var infra of data.dataInfo){
				            htmlText += '<li class="liui-col-xs-4" data-id="'+infra.id+'">'
				                        +'<div class="img"><img src="'+infra.icon_url+'"></div>'
				                        +'<div class="name">'+infra.name+'</div>'
				                    +'</li>';
				        }
					}else{
						htmlText = '暂无数据';
					}
					$("#infrastructure_list").html(htmlText);
					lifi.setItem('infrastructure_list',data);
					lifi.setItem('infrastructure_list-time',currTime);
				}
			}
		}else{
			lifi.toast("正在导航中...<br>请先点击右下角的退出回放");
		}
	});

	/*点击基础设施分类*/
	$(document).on("click", "#infrastructure_list li", function(){
        $("#infrastructure_wrp").removeClass("moveUp");
		var infras_item_id = $(this).data("id");
	    if(infras_item_id){
            var point = startPositionInputEl.attr('roomid');
            if(point){
                var end = Engine.g_pInstance.m_pProject.BounceIcon(point, infras_item_id, 0);
                if(end != null && end.ID){
                	$("#go_here,#webgl_cont_b_l").addClass("moveUp");
                	if($("#choose_set_point").hasClass("moveUp")){
                		$("#choose_set_point").removeClass("moveUp");
                	}
                	$("#direction_wrp").removeClass("moveUp");
                    $("#go_here_name").text(end.Name);
                    $("#go_here_addr").text(end.Name || '暂无地址');
                    $("#go_here_btn").attr("data-info",end.ID+'|'+end.Name);
                }else{
                	lifi.toast('未找到相关设施位置');
                }
            }else{
            	lifi.toast('请先设置默认起点');
            }
	    }else{
	    	lifi.toast("没有找到该设施");
	    }
	});
	$(document).on("click", "#infrastructure_wrp_close", function(){
		$("#infrastructure_wrp").removeClass("moveUp");
		$("#navigate_btn").removeClass("moveDown");
	});

	$(document).on("click", "#go_here_btn", function(){
		var roomid = $(this).data("info").split("|")[0];
		var name = $(this).data("info").split("|")[1];
		$("#go_here,#direction_wrp").removeClass("moveUp");
		if(roomid){
			endPositionInputEl.attr("roomid",roomid).val(name);
			$("#navigate_btn").trigger("click");
		}
	});

	$(document).on("click", "#go_here_close", function(){
		$("#go_here,#webgl_cont_b_l").removeClass("moveUp");
		if($("#navigate_btn").hasClass("moveDown")){
			$("#navigate_btn").removeClass("moveDown");
		}
	});


	window.WEBGL = WEBGL;

}(window,jQuery));


/*餐饮查询、会展介绍、酒店介绍*/
;(function(window,$){

	var S_PAGE = {}

	//底部菜单事件绑定
	S_PAGE.footerNavHandler = function(){
		$(document).on("click", ".Li_page_entance", function(){
			var that = $(this);
			var pageurl = $(this).data("pageurl");
			var pagecache = $(this).data("pagecache");
			if(pageurl && !that.hasClass("active")){
				that.addClass("active").siblings().removeClass("active");
				if(pageurl != "trafficGuide"){
					if(pageurl == "exhibitionMap"){
						$("#webgl_infrastructure,#navigate_btn,.webgl-cont-r").css("display","block");
					}
					$("#"+pageurl).addClass("active").siblings().removeClass("active");
				}else{
					$("#Li_bulid_list li.exterior").trigger("click");
					$("#exhibitionMap").addClass("active").siblings().removeClass("active");
					$("#webgl_infrastructure,#navigate_btn,.webgl-cont-r").css("display","none");
					$("#go_here,#direction_wrp,#choose_set_point").removeClass("moveUp");
					
				}
				if(pageurl == "exhibitionMap"){
					if(!$("#direction_wrp").hasClass("moveUp") && $("#navigate_btn").hasClass("moveDown")){
						$("#navigate_btn").removeClass("moveDown");
					}
				}


				if(isNowNavigating && pageurl != "exhibitionMap"){//判断正在导航,切换到其他页面则关闭导航
					$(".btn-exit-rollback").trigger("click");
				}
				switch(pagecache){
					case 'catering_page':
						S_PAGE.renderCateringPage();
						break;
					case 'exhibition_introduction_page':
						S_PAGE.renderIntroductionHtml('ExhibitionIntroductionPage','getExhibitionByLan','exhibitionIntroduction');
						break;
					case 'hotel_introduction_page':
						S_PAGE.renderIntroductionHtml('HotelIntroductionPage','getHotelByLan','hotelIntroduction');
						break;
					default:
						//console.info("error");
						//break;
				}
			}
		});
		
	}


		
	//初始化餐饮查询页面--->左侧分类
	S_PAGE.renderCateringPage = function(){
		var currTime = new Date().valueOf();
		var url = GV_H5_URL+'Api/InterfaceH5/getTypeList?language_type='+currentLanguage;
		
		if(JSON.stringify(lifi.getItem('categorys_list')) == "null"){//首次加载
			lifi.AJAX(url,'get',categorysListHtml);
		}else{
			if(currTime - parseInt(lifi.getItem('categorys_list-time')) > http_cache_time){//缓存过期再次请求
				lifi.AJAX(url,'get',categorysListHtml);
			}else{
				var data = lifi.getItem('categorys_list');
				categorysListHtml(data);
			}
		}

		function categorysListHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var category of data.dataInfo){
		            htmlText += '<li data-id="'+ category.id +'">'+ category.name +'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			$("#categorys_list").html(htmlText);
			lifi.setItem('categorys_list',data);
			lifi.setItem('categorys_list-time',currTime);
			if($("#categorys_list li").length > 0){
				$("#categorys_list li").eq(0).trigger("click");
			}
		}
	}
	//餐饮查询页面--->右侧商铺列表
	S_PAGE.renderShopList = function(id){
		var currTime = new Date().valueOf();
		var url = GV_H5_URL+'Api/InterfaceH5/getShopsListByTypeID?type_id='+id+'&language_type='+currentLanguage;
		
		if(JSON.stringify(lifi.getItem('shops_list'+id)) == "null"){//首次加载
			lifi.AJAX(url,'get',shopListHtml);
		}else{
			if(currTime - parseInt(lifi.getItem('shops_list'+id+'-time')) > http_cache_time){//缓存过期再次请求
				lifi.AJAX(url,'get',shopListHtml);
			}else{
				var data = lifi.getItem('shops_list'+id);
				shopListHtml(data);
			}
			
		}

		function shopListHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var shop of data.dataInfo){
					htmlText += '<li class="shop-item liui-flex-row liui-flex-row-middle" data-id="'+shop.id+'" data-roomid="'+shop.room_id+'" data-typename="'+shop.type_name+'" data-addr="'+shop.address+'" data-name="'+shop.name+'" data-buildingid="'+shop.building_id+'" data-floorid="'+shop.floor_id+'">'
                        +'<div class="liui-flex-row-hd">'
                            +'<img class="img" src="'+shop.icon_url+'" onerror="javascript:this.src=\'images/active-miss.png\'">'
                        +'</div>'
                        +'<div class="liui-flex-row-bd">'
                            +'<h3 class="name">'+shop.name+'</h3>'
                            +'<div class="label"><span>'+shop.type_name+'</span></div>'
                        +'</div>'
                    +'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			$("#shops_list").html(htmlText);
			lifi.setItem('shops_list'+id,data);
			lifi.setItem('shops_list'+id+'-time',currTime);
		}
	}

	//初始化会展介绍、酒店查询
	S_PAGE.renderIntroductionHtml = function(page,api,obj){
		var page = page;
		var api = api;
		var obj = obj;
		var currTime = new Date().valueOf();
		if(JSON.stringify(lifi.getItem(page)) == "null" || (currTime - parseInt(lifi.getItem(page+'-time')) > http_cache_time)){//首次加载+缓存过期再次请求
			var url = 'http://10.0.0.53:8089/Api/InterfaceH5/'+api;
			$.ajax({
				type: 'post',
				url: url,
				async: true,
				data: {
					'language':(currentLanguage == 'zh-cn' || currentLanguage == 'zh') ? 1 : 2
				},
				dataType: 'json',
				success: function(data){
					if(data.return_info){
						if(data.show_type == 2){//图片
							$('#'+obj).html('<img class="one-pic" src="'+data.return_info+'">');
						}else if(data.show_type == 1){//html
							$('#'+obj).html('<div class="p20">'+data.return_info+'</div>');
						}
					}
					lifi.setItem(page,data);
					lifi.setItem(page+'-time',currTime);
				},
				error: function(err){
					console.info('request err:'+err);
				}
			});
		}else{
			var data = lifi.getItem(page);
			if(data.return_info){
				if(data.show_type == 2){//图片
					$('#'+obj).html('<img class="one-pic" src="'+data.return_info+'">');
				}else if(data.show_type == 1){//html
					$('#'+obj).html('<div class="p20">'+data.return_info+'</div>');
				}
			}
		}
	}


	//分类绑定事件
	$(document).on("click", "#categorys_list li", function(){
		var _this = $(this);
		var id = _this.data("id");
		var currIdx = _this.index()+1;//当前激活的楼层索引
        var li_len = $("#categorys_list li").length;//总共有多个li
        var li_h = _this.height();
        var li_showNum = Math.ceil(_this.parent().parent().height() / (li_h * 2));
		_this.addClass("active").siblings().removeClass("active");
        if(li_len > li_showNum){//总数量大于显示的数量才会滚动
            if((currIdx - li_showNum) >=0){
            	$("#categorys_list").scrollTop((currIdx - li_showNum + 1) * li_h);
            }else{
                $("#categorys_list").scrollTop(0);
            }
        }
		if(id){
			S_PAGE.renderShopList(id);
		}
	});



	//搜索绑定事件
	$(document).on("input focus propertychange", "#search_word", function(event){
		var self = $(this);
		var shops_search = $("#shops_search");
		var self_val = self.val().trim();
		var currTime = new Date().valueOf();
		var url = GV_H5_URL+'Api/InterfaceH5/getShopsListByName?language_type='+currentLanguage;

		if(!$("#catering_search").hasClass("active")){
			$("#catering_search").addClass("active");
			$("#close_search").css("margin-left","0");
		}

		if( JSON.stringify(lifi.getItem('shops_search')) == "null"){//首次加载
			self.next().css("display","none");
			lifi.AJAX(url,'get',shopsSearchHtml);
		}else{
			if(currTime - parseInt(lifi.getItem('shops_search-time')) > http_cache_time){//缓存过期再次请求
				lifi.AJAX(url,'get',shopsSearchHtml);
			}else if(self_val == ""){
				var data = lifi.getItem('shops_search');
				shopsSearchHtml(data);
			}else{//匹配缓存数据
				var htmlText = '';
				var result_shops_list = (lifi.getItem('shops_search')).dataInfo;
				self.next().css("display","inline-block");
				for(var shop of result_shops_list){
					if(shop.name.indexOf(self_val) >= 0){
						htmlText += '<li class="liui-flex-row liui-flex-row-middle" data-id="'+shop.id+'" data-roomid="'+shop.room_id+'" data-typename="'+shop.type_name+'" data-addr="'+shop.address+'" data-name="'+shop.name+'" data-buildingid="'+shop.building_id+'" data-floorid="'+shop.floor_id+'">'
			                        +'<div class="img liui-flex-row-hd">'
			                            +'<span class="iconfont icon-huizhanditu-weixuan"></span>'
			                        +'</div>'
			                        +'<div class="liui-flex-row-bd">'
			                            +'<h3 class="name">'+lifi.replace(shop.name,new RegExp(self_val),'<span style="color:#3285ff">'+self_val+'</span>')+'</h3>'
			                            +'<div class="txt"><span>'+shop.address+'</span></div>'
			                        +'</div>'
			                    +'</li>';
					}
				}
				if(htmlText == ""){
					htmlText+='<li style="text-align: center;color: #999;display: inherit;line-height: 3rem;border:none;"">未找到您想要的信息</li>';
				}
				shops_search.html(htmlText);
			}
		}

		$("#search_word_clear").on("click",function(){
			var data = lifi.getItem('shops_search');
			$(this).css("display","none");
			self.val("").focus();
			shopsSearchHtml(data);
		});



		function shopsSearchHtml(data){
			var htmlText = '';
			if(data.returnCode == "100" && data.dataInfo.length>0){
				for(var shop of data.dataInfo){
		            htmlText += '<li class="liui-flex-row liui-flex-row-middle" data-id="'+shop.id+'" data-roomid="'+shop.room_id+'" data-typename="'+shop.type_name+'" data-addr="'+shop.address+'" data-name="'+shop.name+'">'
		                        +'<div class="img liui-flex-row-hd">'
		                            +'<span class="iconfont icon-huizhanditu-weixuan"></span>'
		                        +'</div>'
		                        +'<div class="liui-flex-row-bd">'
		                            +'<h3 class="name">'+shop.name+'</h3>'
		                            +'<div class="txt"><span>'+shop.address+'</span></div>'
		                        +'</div>'
		                    +'</li>';
		        }
			}else{
				htmlText = '暂无数据';
			}
			shops_search.html(htmlText);
			lifi.setItem('shops_search',data);
			lifi.setItem('shops_search-time',currTime);
		}
	});
	//搜索结果商铺绑定事件
	$(document).on("click", "#shops_search li,#shops_list li", function(){
		var that = $(this);
		var roomid = that.data("roomid");
		var name = that.data("name");
		var addr = that.data("addr");
		var building_id = that.data("buildingid");
		var floor_id = that.data("floorid");
		if(roomid != "undefined" && roomid != ""){
			$(".Li_page_entance[data-pageurl='exhibitionMap']").trigger("click");
        	$("#go_here,#webgl_cont_b_l").addClass("moveUp");
        	$("#direction_wrp").removeClass("moveUp");
            $("#go_here_name").text(name);
            $("#go_here_addr").text(addr || '暂无地址');
            $("#go_here_btn").attr("data-info",roomid+'|'+name);
            if(building_id != "undefined" && floor_id != "undefined"){
            	$("#Li_bulid_list li[data-bulidid="+building_id+"]").trigger("click");
            	lifi.setItem("currShopFloorId",{floor_id:floor_id});
            	//$("#scroll_bar li[data-floorid="+floor_id+"]").trigger("click");
            	
            }
	    }else{
	    	lifi.toast("没有找到该商铺");
	    }
	});
	//关闭搜索结果
	$(document).on("click", "#close_search", function(){
		$("#catering_search").removeClass("active");
		$("#close_search").css("margin-left","-35px");
		$("#search_word").val("");
		$("#search_word_clear").css("display","none");
	});



	S_PAGE.footerNavHandler();
}(window,jQuery));


