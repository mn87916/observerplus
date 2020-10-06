/* 
Observerplus 小小觀察家 TGOS地圖
網頁版JavaScript
*/
var messageBox;                    												//訊息視窗物件
var pMap;                   													//初始化地圖物件
var cMap;
//-----------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定----------------------
//var infotext =  ['<B>世新大學','<B>台北市政府'];        //依序填入地標名稱及訊息視窗內容, 可自行增減數量
//var markerPoint = [];        		//依序填入地標坐標位置, 坐標數須與標記數一致
var startPoint = new TGOS.TGPoint(304386.437, 2770442.812);      //起始點:台北中間  
var imgUrl = ["http://api.tgos.tw/TGOS_API/images/marker2.png"];                //依序設定標記點圖示來源
var currentlocUrl = "http://api.tgos.tw/TGOS_API/images/marker1.png";
var mapTypeID = 'TGOSMAP'; 														//Maptype
var Markers = new Array();														//新增一個陣列, 準備存放使用者新增的Marker
var detection;  																//新增一個變數, 準備接收監聽器回傳值
var enableuserMarker = true;
var pData = null;
var myMapMarkers = new Array();
var myMapinfotext = new Array();
var myMapMarkerAddress = new Array();
var myMapMarkerWebsite = new Array();
var myMapMarkerDescription = new Array();
var mCluster;
var mClusters = new Array();
var mySchoolpTGMarker = new TGOS.TGMarker();
var pDatalength = 0;
var myMapMarkersforRmv = new Array();
var sidebaractivate = false;
var longt = null;
var lat = null;
var AllTGOSMarkers = new Array();					//儲存所有座標，以便搜尋

//-----------------+7參數----------------------
var school_name = '';

//-----------------導航參數----------------------
/*
var navpt = null;		
var navpass = null;				
var navstart = null;
var navgoal = null;
var navpass = null;
var navpasses = new Array();
var navpassMarkers = new Array();
var navbarrier = null;
var navbarriers = new Array();
var navbarrierMarkers = new Array();
var navlistener = null;
var navgoalpoint = new TGOS.TGPoint();
var navline = null;
var navShadowLine = null;
*/
  
//--------------------若網頁介面依照範例網頁的預設設定,以下程式碼可不修改--------------------------

function InitWnd()
{
	//------------------初始化地圖--------------------
	var pOMap = document.getElementById("OMap");
	var mapOptiions = {
				scaleControl: true,                //顯示比例尺
				navigationControl: true,     //顯示地圖縮放控制項
				navigationControlOptions: {        //設定地圖縮放控制項
					controlPosition: TGOS.TGControlPosition.BOTTOM_RIGHT,  //控制項位置
					navigationControlStyle: TGOS.TGNavigationControlStyle.LARGE,       //控制項樣式
				},
				mapTypeControl: true, 
				disableDefaultUI: true,
	};

	pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826, mapOptiions,);    //EPSG3826 TWD97以X,Y順序為主；Google坐標系統的EPSG:3857 放大就沒東西
	//初始地圖縮放層級
	pMap.setMapTypeId(mapTypeID);
	pMap.setZoom(7);	
	pMap.setCenter(startPoint);      //初始地圖中心點
	LoadGeoJson()

	/* for(var i = 0; i < infotext.length; i++) {

		//------------------建立標記點---------------------
		var markerImg = new TGOS.TGImage(imgUrl[i], new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
		//var pTGMarker = new TGOS.TGMarker(pMap, markerPoint[i],'', markerImg, {flat:false});   //建立機關單位標記點
		//TGOS.TGEvent.addListener(pTGMarker, 'click', function () { window.ReactNativeWebView.postMessage("SHU"); } ); //滑鼠事件監聽
		//-----------------建立訊息視窗--------------------
		var InfoWindowOptions = {
				maxWidth:4000,         //訊息視窗的最大寬度
				pixelOffset: new TGOS.TGSize(5, -30) //InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負 
		};             
		messageBox= new TGOS.TGInfoWindow(infotext[i], markerPoint[i], InfoWindowOptions);   //建立訊息視窗 
		TGOS.TGEvent.addListener(pTGMarker, "mouseover", function (pTGMarker, messageBox) {
										return function () {                  
												messageBox.open(pMap, pTGMarker);
										}
		} (pTGMarker, messageBox));//滑鼠監聽事件--開啟訊息視窗
									TGOS.TGEvent.addListener(pTGMarker, "mouseout", function (messageBox) {
												return function () {
														messageBox.close();
												}
									} (messageBox));
						} */
}

//將WGS84坐標系統轉換為TWD97(台灣)坐標系統    
function WGS84toTWD97(long , lat)  {
	var TT = new TGOS.TGTransformation();
	TT.wgs84totwd97(long,lat);
	//alert(TT.transResult.x + "," +TT.transResult.y);
	//MoveCurrentLocation(TT.transResult.x,TT.transResult.y)
}
			
function LoadGeoJson(){
	/****************  變數  ****************/
	var url 				= "https://www.tgos.tw/MapSites/getGeoJson?themeid=19372";
	var e 					= document.getElementById("ddl_json");
	var farmiconurl 		= "http://192.192.155.112/TGOSMap/Farm.png";
	var schooliconurl 		= "http://192.192.155.112/TGOSMap/School.png";
	var citizenfarmurl 		= "http://192.192.155.112/TGOSMap/citizenfarm.png";
	var butterflyurl 		= "http://192.192.155.112/TGOSMap/butterfly.png";
	var fireflyurl 			= "http://192.192.155.112/TGOSMap/firefly.png";
	var shopurl 			= "http://192.192.155.112/TGOSMap/shop.png";
	var ecologyurl			= "http://192.192.155.112/TGOSMap/ecology.png"
	var eschoolcheckbox 	= document.getElementById("ESchoolvisible");
	var citizenfarmcheckbox = document.getElementById("citizenfarmvisible");
	var butterflycheckbox 	= document.getElementById("butterflyvisible");
	var shopcheckbox 		= document.getElementById("shopvisible");
	var fireflycheckbox 	= document.getElementById("fireflyvisible");
	var farmcheckbox 		= document.getElementById("farmvisible");
	var ecologycheckbox		= document.getElementById("ecologyvisible");
	if(pData != null){
		pData.clearAll();
		for (var count=0; count < myMapMarkersforRmv.length; count++) {
			myMapMarkersforRmv[count].setMap(null);
		}		
		myMapMarkersforRmv 	= [];
	}

	pData = new TGOS.TGData({map: pMap});  //建立幾何圖層物件
	//指定資料來源
	pData.loadGeoJson(url,{idPropertyName:"GEOJSON"},function(graphic){  
		var mymarkerImg 			= new TGOS.TGImage(schooliconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var myFarmmarkerImg 		= new TGOS.TGImage(farmiconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var citizenfarmmarkerImg 	= new TGOS.TGImage(citizenfarmurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var butterflymarkerImg 		= new TGOS.TGImage(butterflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var fireflymarkerImg 		= new TGOS.TGImage(fireflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var shopmarkerImg 			= new TGOS.TGImage(shopurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var ecologymarkerImg 		= new TGOS.TGImage(ecologyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		console.log(pData)

		var InfoWindowOptions = {
			maxWidth:4000,         //訊息視窗的最大寬度
			pixelOffset: new TGOS.TGSize(5, -30) //InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負 
		};             
		var pDatastyle =  {
			visible:false
		}
		pDatalength = pData.graphics.length;
	
		for(var i = 0;i < pData.graphics.length;i++){
			pData.overrideStyle(graphic[i], pDatastyle);
			myMapinfotext.push (pData.graphics[i].properties.名稱);
			myMapMarkers.push(pData.graphics[i].geometry)
			myMapMarkerAddress.push(pData.graphics[i].properties.地址)
			myMapMarkerWebsite.push(pData.graphics[i].properties.官網)
			myMapMarkerDescription.push(pData.graphics[i].properties.描述)
			
		
			switch(pData.graphics[i].properties.類型){
				case '國小':
					var mySchoolpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], mymarkerImg,{flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					markerdetailinfo.website = myMapMarkerWebsite[i];
					AllTGOSMarkers.push(mySchoolpTGMarker);
					
					if(eschoolcheckbox.checked == true){
						mySchoolpTGMarker.setVisible(true);
					}
					else{
						mySchoolpTGMarker.setVisible(false);
					}
					myMapMarkersforRmv.push(mySchoolpTGMarker);
					
					TGOS.TGEvent.addListener(mySchoolpTGMarker, 'click', function(mySchoolpTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(mySchoolpTGMarker.title,markerdetailinfo);
								TWConvert(mySchoolpTGMarker.position.x,mySchoolpTGMarker.position.y);
								navgoalpoint = mySchoolpTGMarker.position;
								school_name = mySchoolpTGMarker.title;
							}
					}(mySchoolpTGMarker,markerdetailinfo));
					break;
				case '農場':
					var myFarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], myFarmmarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					markerdetailinfo.website = myMapMarkerWebsite[i];
					markerdetailinfo.description = myMapMarkerDescription[i];
					AllTGOSMarkers.push(myFarmpTGMarker);
					if(farmcheckbox.checked == true){
						myFarmpTGMarker.setVisible(true);
					}
					else{
						myFarmpTGMarker.setVisible(false);
					}
					myMapMarkersforRmv.push(myFarmpTGMarker);
					
					TGOS.TGEvent.addListener(myFarmpTGMarker, 'click', function(myFarmpTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(myFarmpTGMarker.title,markerdetailinfo);
								TWConvert(myFarmpTGMarker.position.x,myFarmpTGMarker.position.y)
							}
					}(myFarmpTGMarker,markerdetailinfo));
					break;
				case '市民農園':
					var citizenfarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], citizenfarmmarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					AllTGOSMarkers.push(citizenfarmpTGMarker);
					if(citizenfarmcheckbox.checked == true){
						citizenfarmpTGMarker.setVisible(true);
					}
					else{
						citizenfarmpTGMarker.setVisible(false);
					}
					myMapMarkersforRmv.push(citizenfarmpTGMarker);
					TGOS.TGEvent.addListener(citizenfarmpTGMarker, 'click', function(citizenfarmpTGMarker, markerdetailinfo){ 
						return function () {                  
							MarkerPressed(citizenfarmpTGMarker.title,markerdetailinfo);						
							TWConvert(citizenfarmpTGMarker.position.x,citizenfarmpTGMarker.position.y)					
							console.log(markerdetailinfo)
						}
					}(citizenfarmpTGMarker,markerdetailinfo));
					break;
				case '螢火蟲區':
					var fireflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], fireflymarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					markerdetailinfo.website = myMapMarkerWebsite[i];
					AllTGOSMarkers.push(fireflypTGMarker);
					if(fireflycheckbox.checked == true){
						fireflypTGMarker.setVisible(true);
					}
					else{
						fireflypTGMarker.setVisible(false);
					}
					myMapMarkersforRmv.push(fireflypTGMarker);
					
					TGOS.TGEvent.addListener(fireflypTGMarker, 'click', function(fireflypTGMarker, markerdetailinfo){ 
						return function () {                  
							MarkerPressed(fireflypTGMarker.title,markerdetailinfo);						
							TWConvert(fireflypTGMarker.position.x,fireflypTGMarker.position.y)					
							console.log(markerdetailinfo)
						}
					}(fireflypTGMarker,markerdetailinfo));
					break;
				case '蝴蝶園':
					var butterflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], butterflymarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					AllTGOSMarkers.push(butterflypTGMarker);
					if(butterflycheckbox.checked == true){
						butterflypTGMarker.setVisible(true);
					}
					else{
						butterflypTGMarker.setVisible(false);
					}
					myMapMarkersforRmv.push(butterflypTGMarker);
					
					TGOS.TGEvent.addListener(butterflypTGMarker, 'click', function(butterflypTGMarker, markerdetailinfo){ 
						return function (){                  
							MarkerPressed(butterflypTGMarker.title,markerdetailinfo);				
							TWConvert(butterflypTGMarker.position.x,butterflypTGMarker.position.y)							
						}
					}(butterflypTGMarker,markerdetailinfo));
					break;
				case '商店':
					var shoppTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], shopmarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					AllTGOSMarkers.push(shoppTGMarker);
					if(shopcheckbox.checked == true){
						shoppTGMarker.setVisible(true);
					}
					else{
						shoppTGMarker.setVisible(false);
					}
					
					myMapMarkersforRmv.push(shoppTGMarker);
					TGOS.TGEvent.addListener(shoppTGMarker, 'click', function(shoppTGMarker, markerdetailinfo){ 
						return function () {                  
							MarkerPressed(shoppTGMarker.title,markerdetailinfo);
							TWConvert(shoppTGMarker.position.x,shoppTGMarker.position.y)
						}
					}(shoppTGMarker,markerdetailinfo));	
					break;
				case '生態園區':
					var ecologypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], ecologymarkerImg, {flat:false});
					var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
					markerdetailinfo.address = myMapMarkerAddress[i];
					markerdetailinfo.website = myMapMarkerWebsite[i];
					markerdetailinfo.description = myMapMarkerDescription[i];
					AllTGOSMarkers.push(ecologypTGMarker);
					if(ecologycheckbox.checked == true){
						ecologypTGMarker.setVisible(true);
					}
					else{
						ecologypTGMarker.setVisible(false);
					}
					
					myMapMarkersforRmv.push(ecologypTGMarker);
					TGOS.TGEvent.addListener(ecologypTGMarker, 'click', function(ecologypTGMarker, markerdetailinfo){ 
						return function () {                  
							MarkerPressed(ecologypTGMarker.title,markerdetailinfo);
							TWConvert(ecologypTGMarker.position.x,ecologypTGMarker.position.y)
						}
					}(ecologypTGMarker,markerdetailinfo));	
					break;
			}
		//messageBoxS= new TGOS.TGInfoWindow(myMapinfotext[i], myMapMarkers[i], InfoWindowOptions); 
		//console.log(myMapinfotext[i]);
		//console.log(messageBoxS);								
	} 
	pData.setMap(pMap);  //設定呈現幾何圖層物件的地圖物件
});
	
	//alert(pDatalength);
	
}
			function toggleSidebar() 
			{
				if(sidebaractivate == true)
				{
					sidebaractivate = false;
				}
				else
				{
					sidebaractivate = true;
				}
				document.getElementById("mySidebar").classList.toggle('active');
			}
			
			function markervisible()//改變visible觸發 ----警告----警告-----警告:快速連點會造成地圖Bug  ((((待解決))))
			{
			LoadGeoJson();
			}
		
		    function MarkerPressed(markerTitle,markerdetailinfo)
			{
				document.getElementById("markerwebsite").innerHTML = "";
				document.getElementById("markerdescription").innerHTML = "";
				if(sidebaractivate == true)
				{
					
				}
				else
				{
					document.getElementById("mySidebar").classList.toggle('active');
					sidebaractivate = true;
				}
				
				if(markerdetailinfo.website != undefined){
					document.getElementById("markerwebsite").innerHTML = "網址: "+ markerdetailinfo.website;
				}
				
				if(markerdetailinfo.description != undefined){
					document.getElementById("markerdescription").innerHTML = "介紹: "+ markerdetailinfo.description;
				}
				
				document.getElementById("markerdetailtitle").innerHTML = markerTitle;
				document.getElementById("markerdetail").innerHTML = "地址: "+markerdetailinfo.address;	
				document.getElementById("chck2").checked = true;
			}
			
			function TWConvert(twx,twy)
			{
				var TT = new TGOS.TGTransformation();
    
				TT.twd97towgs84(twx,twy);
				
				//console.log(TT.transResult.x);
				//console.log(TT.transResult.y);
				document.getElementById("longandlat").innerHTML = TT.transResult.y + ","+TT.transResult.x;
				
				longt = TT.transResult.x;
				lat = TT.transResult.y;
				
				
			}
			function openstreetview(){
				var url ="http://maps.google.com/maps?q=&layer=c&cbll="+ lat +","+ longt ;
				window.open(url)
			}
			
			function toggledetail(){
					
					if(school_name == ''){
						alert("請點選地圖座標!");
					}
					else
					
					var popupdetail = document.getElementById('popupdetail');
					popupdetail.classList.toggle('active');
					
					$.ajax({                                      //使用jQuery讀取學校資訊json
						url: "http://192.192.155.112/API/Map.aspx",
						type: "GET",
						dataType: "json",
						success: function(Jdata) {
							console.log(Jdata)
							var list = document.getElementById("detail");
							/*while (list.hasChildNodes()) {
							list.removeChild(list.firstChild);
							}*/
							var my_body = document.getElementById('popupdetail');
							my_body.innerHTML = '<h1 id = "detailtitle">' + school_name + '</h1>';
							for(var i = 0 ; i < Jdata.length ; i++){
								console.log("asd:"+Jdata[i].teacher_name)
								let content = '<div class="flex">'
									+'<h3>教師名稱 : </h3><h3>' + Jdata[i].teacher_name + '</h3>'
								+'</div>'
								+'<div class="img_flex">';
								for(let j=0;j<Jdata[i].record.length ; j++){
									console.log("record["+ j +"]:"+Jdata[i].record[j].img);
									content +=
										'<div class="record_img">'
												+'<img src="' + Jdata[i].record[j].img + '">'
										+'</div>';
								}
								
								content += '</div>';
								console.log(content)
								my_body.innerHTML += content
								/*var newItem = document.createElement("H3");
								var imagesdiv = document.createElement('DIV');
								imagesdiv.setAttribute("id", "img_flex");
								imagesdiv.setAttribute("display"," flex !important");
								imagesdiv.setAttribute("overflow-x","scroll");
								imagesdiv.setAttribute("overflow-y","hidden");
								var textnode = document.createTextNode("教師名稱 :" + Jdata[i].teacher_name);
								newItem.appendChild(textnode);
								var list = document.getElementById("detail");
								list.insertBefore(imagesdiv, list.childNodes[0]);
								list.insertBefore(newItem, list.childNodes[0]);
								for(var count = 0 ; count < Jdata[i].record.length;count ++){
									var images = document.createElement('IMG');
									images.setAttribute("src", Jdata[i].record[count].img);
									images.setAttribute("width", "125px");
									images.setAttribute("margin-top","0px");
									images.setAttribute("alt", "plantimages");
									var list = document.getElementById("img_flex");
									list.insertBefore(images, list.childNodes[0]);
									
								}*/

							}
							my_body.innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="toggledetail()" value = &#10006;>';
						},
  
						error: function() {
							alert("讀取json失敗");
						}
					});
					
			}
			
			
			//-----------------導航Function 暫時無法使用 TGOS.TGRoutes搞事----------------------
			
			/*function togglenavigation(){
				if (navlistener) {		//新增每種點位之前, 先移除目前現有的事件監聽器
					TGOS.TGEvent.removeListener(navlistener);
					navlistener = null;
				}
					
				navlistener = TGOS.TGEvent.addListener(pMap, "click", function(tEvent){	//監聽地圖上的滑鼠點擊事件, 並執行下方的動作
					if (navstart) {				//分析動作只允許一個起點, 因此每次點擊地圖都必須先移除目前圖面上的起點
						navstart.setMap(null);
					}
					navpt = new TGOS.TGPoint(tEvent.point.x, tEvent.point.y);	//取得滑鼠點擊位置
					//設定起點圖示
					var img = new TGOS.TGImage('http://cdn1.iconfinder.com/data/icons/iconslandplayer/PNG/24x24/CircleBlue/Play1Hot.png', new TGOS.TGSize(16,16), new TGOS.TGPoint(0,0), new TGOS.TGPoint(12,12));
					navstart = new TGOS.TGMarker(pMap, navpt, "起點", img);		//在滑鼠點擊位置上建立一個標記點作為起點, 並存入變數start內
					//start.setDraggable(true);
					
					navgoal = new TGOS.TGMarker(pMap, navgoalpoint, "終點", img);	
				});
				
	
	var RouteAnalysis = new TGOS.TGRoutes(); 
	var request = {								//設定路徑參數
		//是否迴避收費道路
		avoidHighways: false,
		//設定禁行點
		blockpoints: navbarriers,
		//指定坐標系統
		coordinateSystem: "EPSG:3826",
		//設定終點
		destination: navgoal.getPosition(),
		//設定起點
		origin: navstart.getPosition(),
		//使用最短路徑方法進行分析
		shortestRoute: false,
		//使用公制單位(公尺)
		unitSystem: TGOS.TGUnitSystem.METRIC,
		//設定經過點
		wayPoints: navpasses,
		//是否重新排序經過點
		arrangePoint: false
	};
	
	RouteAnalysis.route(request, function(result){	//執行路徑規劃
		if (result.status != 'OK') {
			alert(result.status);	//如果沒有產生分析結果, 則跳出錯誤狀態資訊並離開函式
			return;
		}
		var NavigateInfo = "";						//建立空字串, 準備寫入導航資訊		
		var routes = result.routes;					//取出規劃結果
		var pathes = routes[0].overviewPath;		//由規劃結果中取出路徑(TGLineString形式)
		var TotalDist = routes[0].distance;		    //取出規劃結果總路徑長度
		var TotalTime = routes[0].time;			    //取出規劃結果總耗時
		var string0 = '路徑總長度 = ' + Math.floor(TotalDist/1000) + ' 公里 ' + (TotalDist%1000).toFixed(2) + ' 公尺<br>總耗時 = ' + Math.floor(TotalTime/60) + ' 分 ' + (TotalTime%60) + ' 秒<br>';
		NavigateInfo += string0;					//組合總長度及總耗時字串並加入並加入NavigateInfo
		
		if (ShadowLine) {ShadowLine.setMap(null);}
		ShadowLine = new TGOS.TGLine(pMap, pathes, {		//將規劃路徑繪出, 使用TGLine物件
			strokeColor: '#005c99',
			strokeWeight: 6,
			strokeOpacity: 1
		});
		
		if (line) {line.setMap(null);}
		line = new TGOS.TGLine(pMap, pathes, {		//將規劃路徑繪出, 使用TGLine物件
			strokeColor: '#b3e0ff',
			strokeWeight: 4,
			strokeOpacity: 1
		});

		
		
	});
				
				
			} */
			
			
		function searchmarker(){
			document.getElementById("searchresult").innerHTML = "";
			var searchstring = document.getElementById("searchTerm").value;
			
			//var foundPresent = myMapinfotext.includes(searchstring);
			const result = myMapinfotext.filter((value) => value.match(searchstring));
			
			
			for(var i= 0  ; i < result.length ; i++ ){
				var resultparameter = "'" + result[i] + "'"
				document.getElementById("searchresult").innerHTML += '<button onclick = "searchresult('+ resultparameter +')" >'+ result[i]+'</button>' ;
				
			}
			
			
		}
		
		function searchresult(resultstring){
			//MarkerPressed(resultstring);
			for(var i = 0 ; i < AllTGOSMarkers.length ; i++){
				if(AllTGOSMarkers[i].getTitle() == resultstring){
					pMap.setCenter(AllTGOSMarkers[i].getPosition());
					pMap.setZoom(11);
					
					TWConvert(AllTGOSMarkers[i].position.x,AllTGOSMarkers[i].position.y);
					school_name = AllTGOSMarkers[i].title;
					
					document.getElementById("markerwebsite").innerHTML = "";
					document.getElementById("markerdescription").innerHTML = "";
					if(sidebaractivate == true)
					{
						
					}
					else
					{
						document.getElementById("mySidebar").classList.toggle('active');
						sidebaractivate = true;
					}
					
					if(myMapMarkerWebsite[i] != undefined){
						document.getElementById("markerwebsite").innerHTML = "網址: "+ myMapMarkerWebsite[i];
					}
					
					if(myMapMarkerDescription[i] != undefined){
						document.getElementById("markerdescription").innerHTML = "介紹: "+ myMapMarkerDescription[i];
					}
					
					document.getElementById("markerdetailtitle").innerHTML = AllTGOSMarkers[i].title;
					document.getElementById("markerdetail").innerHTML = "地址: "+myMapMarkerAddress[i];	
					document.getElementById("chck2").checked = true;
					
				}
			}
			
		}
		

			
			
			
			