/* 
Observerplus 小小觀察家 TGOS地圖
網頁版JavaScript
*/
var messageBox;                    												//訊息視窗物件
var pMap;                   													//初始化地圖物件
var cMap;
//-----------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定----------------------
//var markerPoint = [];        		//依序填入地標坐標位置, 坐標數須與標記數一致
var startPoint = new TGOS.TGPoint(302176.52146819467, 2779861.3835988427);      //起始點:士林中間  
var knowstartPoint = new TGOS.TGPoint(248017.89,2652198.379);    //知識地圖:台灣中間
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
var myMapSchoolIDArr = new Array();
var knowID = new Array();
var mCluster;
var mClusters = new Array();
var mySchoolpTGMarker = new TGOS.TGMarker();
var pDatalength = 0;
var sidebaractivate = false;
var longt = null;
var lat = null;
var AllTGOSMarkers = new Array();					//儲存所有座標，以便搜尋
var knowledgemode = false;
var knowledgetitle = '';
var dontoff = "dontoff";
var class_ID = '';
var LoadGeoJsonFinished = false;

var school_name = '';
var school_ID = '';
var teachersname = '';

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
	pMap.setZoom(8);	
	pMap.setCenter(startPoint);      //初始地圖中心點
	LoadGeoJson()
	document.getElementById("currentmode").innerHTML = "目前為:座標地圖模式";	 //預設地圖模式
	document.getElementById("normalbutton").innerHTML = '<input type="button" value="查看Google街景" id="streetviewbutton" onclick="openstreetview()"><input type="button" value="查看種植/飼養紀錄" id="detailbutton" onclick="toggledetail()">';
 
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
	LoadGeoJsonFinished = false;
	/****************  變數  ****************/
	var url 				= "https://www.tgos.tw/MapSites/getGeoJson?themeid=19372";
	var e 					= document.getElementById("ddl_json");
	var farmiconurl 		= "http://192.192.155.112/TGOSMap/Farm.png";
	var schooliconurl 		= "http://192.192.155.112/TGOSMap/School.png";
	var citizenfarmurl 		= "http://192.192.155.112/TGOSMap/citizenfarm.png";
	var butterflyurl 		= "http://192.192.155.112/TGOSMap/butterfly.png";
	var fireflyurl 			= "http://192.192.155.112/TGOSMap/firefly.png";
	var shopurl 			= "http://192.192.155.112/TGOSMap/shop.png";
	var ecologyurl			= "http://192.192.155.112/TGOSMap/ecology.png";
	var vegurl				= "http://192.192.155.112/TGOSMap/veg.png"
	var eschoolcheckbox 	= document.getElementById("ESchoolvisible");
	var citizenfarmcheckbox = document.getElementById("citizenfarmvisible");
	var butterflycheckbox 	= document.getElementById("butterflyvisible");
	var shopcheckbox 		= document.getElementById("shopvisible");
	var fireflycheckbox 	= document.getElementById("fireflyvisible");
	var farmcheckbox 		= document.getElementById("farmvisible");
	var ecologycheckbox		= document.getElementById("ecologyvisible");
	if(pData != null){
		pData.clearAll();
		for (var count=0; count < AllTGOSMarkers.length; count++) {
			AllTGOSMarkers[count].setMap(null);
		}		
		AllTGOSMarkers.length = 0 ;
		myMapinfotext.length = 0;
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
		var vegmarkerImg 			= new TGOS.TGImage(vegurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
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
			myMapSchoolIDArr.push(pData.graphics[i].properties.School_ID)
			knowID.push(pData.graphics[i].properties.knowID)
			console.log(knowID[i])
			
			
			if(knowledgemode == false){
				switch(pData.graphics[i].properties.類型){
					case '國小':
						var mySchoolpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], mymarkerImg,{flat:false});
						var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.schoolID = myMapSchoolIDArr[i];
						AllTGOSMarkers.push(mySchoolpTGMarker);
						
						if(eschoolcheckbox.checked == true){
							mySchoolpTGMarker.setVisible(true);
						}
						else{
							mySchoolpTGMarker.setVisible(false);
						}
						
						TGOS.TGEvent.addListener(mySchoolpTGMarker, 'click', function(mySchoolpTGMarker, markerdetailinfo){ 
								return function () {                  
									MarkerPressed(mySchoolpTGMarker.title,markerdetailinfo);
									TWConvert(mySchoolpTGMarker.position.x,mySchoolpTGMarker.position.y);
									navgoalpoint = mySchoolpTGMarker.position;
									school_name = mySchoolpTGMarker.title;
									school_ID = markerdetailinfo.schoolID;
									console.log(school_ID); 
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
						
						TGOS.TGEvent.addListener(myFarmpTGMarker, 'click', function(myFarmpTGMarker, markerdetailinfo){ 
								return function () {                  
									MarkerPressed(myFarmpTGMarker.title,markerdetailinfo);
									TWConvert(myFarmpTGMarker.position.x,myFarmpTGMarker.position.y)
									school_name = '';
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
						TGOS.TGEvent.addListener(citizenfarmpTGMarker, 'click', function(citizenfarmpTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(citizenfarmpTGMarker.title,markerdetailinfo);						
								TWConvert(citizenfarmpTGMarker.position.x,citizenfarmpTGMarker.position.y)					
								school_name = '';
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
						
						TGOS.TGEvent.addListener(fireflypTGMarker, 'click', function(fireflypTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(fireflypTGMarker.title,markerdetailinfo);						
								TWConvert(fireflypTGMarker.position.x,fireflypTGMarker.position.y)					
								school_name = '';
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
						
						TGOS.TGEvent.addListener(butterflypTGMarker, 'click', function(butterflypTGMarker, markerdetailinfo){ 
							return function (){                  
								MarkerPressed(butterflypTGMarker.title,markerdetailinfo);				
								TWConvert(butterflypTGMarker.position.x,butterflypTGMarker.position.y)
								school_name = '';								
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
						
						TGOS.TGEvent.addListener(shoppTGMarker, 'click', function(shoppTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(shoppTGMarker.title,markerdetailinfo);
								TWConvert(shoppTGMarker.position.x,shoppTGMarker.position.y)
								school_name = '';	
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
						
						TGOS.TGEvent.addListener(ecologypTGMarker, 'click', function(ecologypTGMarker, markerdetailinfo){ 
							return function () {                  
								MarkerPressed(ecologypTGMarker.title,markerdetailinfo);
								TWConvert(ecologypTGMarker.position.x,ecologypTGMarker.position.y)
								school_name = '';	
							}
						}(ecologypTGMarker,markerdetailinfo));	
						break;
				}
			}
			else{
				switch(pData.graphics[i].properties.類型){
					case '蔬菜介紹': 
						var vegpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], vegmarkerImg,{flat:false});
						var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
						//markerdetailinfo.address = myMapMarkerAddress[i];
						//markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						markerdetailinfo.knowID = knowID[i];
						AllTGOSMarkers.push(vegpTGMarker);
						vegpTGMarker.setVisible(true);
						
						TGOS.TGEvent.addListener(vegpTGMarker, 'click', function(vegpTGMarker, markerdetailinfo){ 
								return function () {                  
									//MarkerPressed(vegpTGMarker.title,markerdetailinfo);
									vegdetailpressed(vegpTGMarker.title,markerdetailinfo);
									
								}
						}(vegpTGMarker,markerdetailinfo));
						break;
				}
			}

		//messageBoxS= new TGOS.TGInfoWindow(myMapinfotext[i], myMapMarkers[i], InfoWindowOptions); 
		//console.log(myMapinfotext[i]);
		//console.log(messageBoxS);								
	} 
	pData.setMap(pMap);  //設定呈現幾何圖層物件的地圖物件
});
	
	//alert(pDatalength);
	LoadGeoJsonFinished = true;
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
				document.getElementById("markerwebsite").innerHTML = "網址:  <a href=" +  markerdetailinfo.website+"  target='_blank' >" +markerdetailinfo.website+"</a>" 
				}
				if(markerdetailinfo.description != undefined){
					document.getElementById("markerdescription").innerHTML = "介紹: "+ markerdetailinfo.description;
				}
				if(markerdetailinfo.address != undefined){
					document.getElementById("markerdetail").innerHTML = "地址: "+markerdetailinfo.address;	
				}
				
				document.getElementById("markerdetailtitle").innerHTML = markerTitle;
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
			
			function toggledetail(para){
					document.getElementById('popupdetail').innerHTML = '';
					if(school_name == ''){
						alert("請點選有效的座標!");
					}
					else
					
					var popupdetail = document.getElementById('popupdetail');
					
					if(para != "dontoff"){
						popupdetail.classList.toggle('active');
					}
					
					
					$.ajax({                                      //使用jQuery讀取學校資訊json
						url: "http://192.192.155.112/API/Map.aspx?school_id="+ school_ID,
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
								+'<div class="class_flex">';
								for(let j=0;j<Jdata[i].record.length ; j++){
									//console.log("record["+ j +"]:"+	);
									content += 
										'<div class="">'
												+'<a class="classbtn" onclick="clickedclassteacher(&quot;'+Jdata[i].teacher_name+'&quot;); clickedclass('+Jdata[i].record[j].class_id+');">' + Jdata[i].record[j].class_name + '</a>'
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
							my_body.innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="closewindow()" value = &#10006;>';
						},
  
						error: function() {
							 document.getElementById('popupdetail').innerHTML += '<div class="flex">'
									+'<h2>此學校暫無種植資料! </h2>'
								+'</div>';
								
							document.getElementById('popupdetail').innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="closewindow()" value = &#10006;>';
						}
					});
					

					
			}
			function closewindow(){
				var popupdetail = document.getElementById('popupdetail');
				popupdetail.classList.toggle('active');
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
			var isfinished = false;
			console.log(resultstring)
			if(LoadGeoJsonFinished == true){
				for(var i = 0 ; i < AllTGOSMarkers.length ; i++){
						if(AllTGOSMarkers[i].getTitle() == resultstring){
							if(knowledgemode == false){
								pMap.setCenter(AllTGOSMarkers[i].getPosition());
								pMap.setZoom(11);
								
								TWConvert(AllTGOSMarkers[i].position.x,AllTGOSMarkers[i].position.y);
								school_name = AllTGOSMarkers[i].title;
								school_ID = myMapSchoolIDArr[i];
								
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
									document.getElementById("markerwebsite").innerHTML = "網址:<a href=" +  myMapMarkerWebsite[i]+"  target='_blank' >" +myMapMarkerWebsite[i]+"</a>" 
								}
								
								if(myMapMarkerDescription[i] != ""){
									document.getElementById("markerdescription").innerHTML = "介紹: "+ myMapMarkerDescription[i];
								}
								if(myMapMarkerAddress[i] != undefined){
									document.getElementById("markerdetail").innerHTML = "地址: "+ myMapMarkerAddress[i];	
								}
								document.getElementById("markerdetailtitle").innerHTML = AllTGOSMarkers[i].title; 
								document.getElementById("chck2").checked = true;
								isfinished = true;
							}
							else{
								pMap.setCenter(AllTGOSMarkers[i].getPosition());
								pMap.setZoom(5);
								isfinished = true;
							}
						}
					
				}
				if(isfinished == false){
					knowmapview()
				}
			}
			
		}
		
		//--------------------------------小知識模式
		function vegdetailpressed(markerTitle,markerdetailinfo){
			document.getElementById("vegbutton").innerHTML = '<button onclick = "vegmoredetail()"> 查看詳細介紹 </button>' ;
			
				document.getElementById("markerwebsite").innerHTML = "";
				document.getElementById("markerdescription").innerHTML = "";
				document.getElementById("markerdetail").innerHTML = "";	
				document.getElementById("longandlat").innerHTML = "";
				knowledgetitle = markerdetailinfo.knowID 
				
				if(sidebaractivate == true)
				{
					
				}
				else
				{
					document.getElementById("mySidebar").classList.toggle('active');
					sidebaractivate = true;
				}
				 
				if(markerdetailinfo.description != undefined){
					document.getElementById("markerdescription").innerHTML = "說明: "+ markerdetailinfo.description;
				}
				
				document.getElementById("markerdetailtitle").innerHTML = markerTitle;
				document.getElementById("chck2").checked = true;
		}
		
		function vegmoredetail(){
			console.log(knowledgetitle)
			

			var title = '';
			var des = '';
			var cabimgurl = '';
			
			if (knowledgetitle == 'HighCab'){
				title = '高山高麗菜';
				des ='日夜溫差大，植物白天行光合作用，所產生的碳水化合物在夜晚低溫時更容易累積，高麗菜在養分充足下，更甜、更好吃。簡單說，植物的光合作用分兩部分，一是光反應，吸收光能轉換成植物可以使用的能量，並且分解水產生氧氣，二是碳(暗)反應, 植物利用光反應產生的能量固定二氧化碳，並且轉換成葡萄糖。 在溫差大的地區，因為晚上很冷，植物為了避免凍傷就會合成比較多的葡萄糖以增加溶質濃度，甚至若干澱粉也會轉換成葡萄糖，使得植物細胞的溶質變多；另一方面，晚上的低溫使得呼吸作用相對消耗較少的糖分，如此反反覆覆的日夜進行，就使得植物本身所含的糖分變高，自然就比較甜了。'
				cabimgurl = 'http://192.192.155.112/TGOSMap/HighCab.png'
			}
			else if (knowledgetitle == 'LowCab'){
				title = '平地高麗菜';
				des = '平地高麗菜因氣溫較高,而高麗菜的生長環境是10-20度,所以夏天要吃高山高麗菜,而冬天最好選擇平地高麗菜,因為高麗菜其實太低溫也不好,冬天平地大約是12-18度,合高麗菜生長環境,所以因季節變化就要選擇不同的高麗菜。'
				cabimgurl = 'http://192.192.155.112/TGOSMap/LowCab.png'
			}
			
			var popupdetail = document.getElementById('popupdetail');
			popupdetail.classList.toggle('active');
			var my_body = document.getElementById('popupdetail');
			my_body.innerHTML = '<h1 id = "detailtitle"> '+ title+'</h1>';
			my_body.innerHTML += '<img src = "'+ cabimgurl +'" class = "cabimg" >'
			my_body.innerHTML += '<div class = "des"> '+ des +'</div>';
			my_body.innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="vegmoredetail()" value = &#10006;>';
		}
		//------------------------------------------
		function knowmapview(resultstring){   //切換地圖模式
			if(pData != null){
				pData.clearAll();
				for (var count=0; count < AllTGOSMarkers.length; count++) {
					AllTGOSMarkers[count].setMap(null);
				}		
				AllTGOSMarkers = [];
			}
			if(knowledgemode == false){
				knowledgemode = true;
				document.getElementById("markerdetailtitle").innerHTML = "請選擇地圖知識點！";
				document.getElementById("currentmode").innerHTML = "目前為:小知識地圖模式";
				document.getElementById("currentmodeimg").innerHTML = '<img src="knowmode.png" style="width:100px;height:100px;">' ;
				document.getElementById("vegbutton").innerHTML = '<button onclick = "vegmoredetail()"> 查看詳細介紹 </button>' 
				document.getElementById("normalbutton").innerHTML = '';
				pMap.setZoom(3);
				pMap.setCenter(knowstartPoint);
			}
			else{
				knowledgemode = false;
				document.getElementById("markerdetailtitle").innerHTML = "請選擇地圖座標！";
				document.getElementById("vegbutton").innerHTML = '' ;
				document.getElementById("markerwebsite").innerHTML = '' ;
				document.getElementById("longandlat").innerHTML = '' ;
				document.getElementById("normalbutton").innerHTML = '<input type="button" value="查看Google街景" id="streetviewbutton" onclick="openstreetview()"><input type="button" value="查看種植/飼養紀錄" id="detailbutton" onclick="toggledetail()">';
				document.getElementById("currentmode").innerHTML = "目前為:座標地圖模式";
				document.getElementById("currentmodeimg").innerHTML = '<img src="normalmode.png" style="width:100px;height:100px;">' ;
				pMap.setZoom(7);	
				pMap.setCenter(startPoint); 
			}
			LoadGeoJson();
			
		}
		function clickedclassteacher(teacher_name){   //因為html中文傳值問題所以才要多做一個function
			teachersname = teacher_name;
		}
		function clickedclass(class_id){
			
			class_ID = class_id;
			var my_body = document.getElementById('popupdetail');
			//document.getElementById("detailtitle").innerHTML += "> TEACHER_NAME";
			my_body.innerHTML = '';
						$.ajax({                                      
						url: "http://192.192.155.112/API/Class.aspx?Class_ID="+class_id,
						type: "GET",
						dataType: "json",
						success: function(Jdata) {
							
							console.log("classid:"+class_id)
							
							  
							
							var list = document.getElementById("detail");
							/*while (list.hasChildNodes()) {
							list.removeChild(list.firstChild);
							}*/
							var my_body = document.getElementById('popupdetail');
							my_body.innerHTML = '<h1 id = "detailtitle">' + school_name +'>'+ teachersname +' 老師</h1>';
							my_body.innerHTML += '<div id = "gallery" class="gallery"></div>';
							
							for(var i = 0 ; i < Jdata.length ; i++){
								
								let content ='</div>'
								//+'<div class="img_flex">'
								//+'<img width ="120px" height = "100px" src = "http://192.192.155.112/img/1.jpg">';
								+'<div class="gallery-item">'
								+'<div class="content"><img src="'+ Jdata[i].Photo+'" alt="" onclick = "galleryclick('+  Jdata[i].obj_ID +')"></div>'
								+'</div>'
								
								
								//content += '</div>';
								
								document.getElementById("gallery").innerHTML += content

							}
							my_body.innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="closewindow()" value = &#10006;>';
							my_body.innerHTML +='<img src = "http://192.192.155.112/TGOSMap/retune.png" class="backbutton" id="backbutton" onclick="toggledetail('+ dontoff +')">';
							
							galleryprocess();
						},
  
						error: function() {
							console.log("NoClass")
							alert("暫時沒有資料!");
						}
					});
		}
		
		function galleryprocess(){
			var gallery = document.querySelector('#gallery');
			var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
			var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
			var resizeAll = function () {
				var altura = getVal(gallery, 'grid-auto-rows');
				var gap = getVal(gallery, 'grid-row-gap');
				gallery.querySelectorAll('.gallery-item').forEach(function (item) {
					var el = item;
					el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
				});
			};
			gallery.querySelectorAll('img').forEach(function (item) {
				//item.classList.add('byebye');
				console.log("1+7  :  "+item.complete);
					
				
					item.addEventListener('load', function () {
						var altura = getVal(gallery, 'grid-auto-rows');
						var gap = getVal(gallery, 'grid-row-gap');
						var gitem = item.parentElement.parentElement;
						gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
						//item.classList.remove('byebye');  
					});
				
			});
			window.addEventListener('resize', resizeAll);
			gallery.querySelectorAll('.gallery-item').forEach(function (item) {
				item.addEventListener('click', function () {        
					//item.classList.toggle('full');        
				});
			}); 
		}
		
		function galleryclick(objID){
			document.getElementById("gallery").innerHTML = '';
			//alert(objID)
			var my_body = document.getElementById('popupdetail');
			//document.getElementById("detailtitle").innerHTML += "> TEACHER_NAME";
			my_body.innerHTML = '';
			
						$.ajax({                                      
						url: "http://192.192.155.112/API/Map_rcd.aspx?obj_ID="+objID,
						type: "GET",
						dataType: "json",
						success: function(Jdata) {
							console.log(Jdata)
							
							var list = document.getElementById("detail");
							/*while (list.hasChildNodes()) {
							list.removeChild(list.firstChild);
							}*/
							var my_body = document.getElementById('popupdetail');
							my_body.innerHTML = '<h1 id = "detailtitle">' + school_name +'>'+ teachersname +' 老師</h1>';
							my_body.innerHTML += '<div id = "rcd" class="rcd"></div>';
							
							for(var i = 0 ; i < Jdata.length ; i++){
								let weatherimg = ""
								if(Jdata[i].Weather < 3){
									weatherimg = '<img src = "http://192.192.155.112/TGOSMap/Weather_sunny.png" class="weatherimg">'
								}
								else if(Jdata[i].Weather >= 3 && Jdata[i].Weather <= 5){
									weatherimg = '<img src = "http://192.192.155.112/TGOSMap/Weather_suncloud.png" class="weatherimg">'
								}
								else if(Jdata[i].Weather >= 6 && Jdata[i].Weather <= 7){
									weatherimg = '<img src = "http://192.192.155.112/TGOSMap/Weather_cloudy.png" class="weatherimg">'
								}
								else if(Jdata[i].Weather >= 8){
									weatherimg = '<img src = "http://192.192.155.112/TGOSMap/Weather_rain.png" class="weatherimg">'
								}
								
								let gallerycount = "gallery" + i;
								let content ='</div>'
								+'<div class = "rcdcard" id ="rcdcard">'
								+'<div class = "cardflex">'
								+'<div class = "textpart">'
								+'<div> 時間:'
								+ Jdata[i].Date
								+'</div>'
								+'<div> 感想:'
								+ Jdata[i].Feeling
								+'</div>'
								+'<div> 天氣:'
								+ weatherimg
								+'</div>'
								+'</div>'
								+'<div class = "gallerypart">'
								+'<div id = "'+ gallerycount +'" class="stugallery"></div>'
								+'</div>'
								+'</div>'
								+'</div>'					
								
								//content += '</div>';
								console.log(content)
								document.getElementById("rcd").innerHTML += content
								
								for(var count = 0 ; count <= Jdata[i].Img.length ; count++){
									let images ='<img src="'+ Jdata[i].Img[count]+'" alt="" class = "stuimg" >'
									document.getElementById(gallerycount).innerHTML += images
								}
							}

							my_body.innerHTML +='<input type="button" class="closebutton" id="closebutton" onclick="closewindow()" value = &#10006;>';
							my_body.innerHTML +='<img src = "http://192.192.155.112/TGOSMap/retune.png" class="backbutton" id="backbutton" onclick="clickedclass('+ class_ID+')">';
						},
						error: function() {
							alert("讀取json失敗");
						}
					});
		}
		

			
			
			
			