var messageBox;                    	//訊息視窗物件
var pMap;                      		//初始化地圖物件s

//-----------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定----------------------
				
var knowstartPoint = new TGOS.TGPoint(248017.89,2652198.379);    //知識地圖:台灣中間 
var startPoint = new TGOS.TGPoint(302176.52146819467, 2779861.3835988427);      //起始點:台北中間      
var imgUrl = ["http://api.tgos.tw/TGOS_API/images/marker2.png","http://api.tgos.tw/TGOS_API/images/marker2.png"];                //依序設定標記點圖示來源
var currentlocUrl = "http://api.tgos.tw/TGOS_API/images/marker1.png";
var userclickUrl = "http://192.192.155.112/TGOSMap/redmarker.png";
var mapTypeID = 'TGOSMAP'; 						//Maptype
var Markers = new Array();						//新增一個陣列, 準備存放使用者新增的Marker
var detection;  								//新增一個變數, 準備接收監聽器回傳值
var enableuserMarker = false;
var pData = null;
var myMapMarkers = new Array();
var myMapinfotext = new Array();
var myMapMarkerAddress = new Array();
var myMapMarkerWebsite = new Array();
var myMapMarkerDescription = new Array();
var myMapSchoolIDArr = new Array();
var myMapKnowIDArr = new Array();
var mCluster;
var mClusters = new Array();
var mySchoolpTGMarker = new TGOS.TGMarker();
var pDatalength = 0;
var AllTGOSMarkers = new Array();

//----判斷是否在顯示地圖上的token----//
var schoolvisible 		= true;
var citizenvisible 		= false;
var butterflyvisible 	= false;
var shopvisible 		= false;
var farmvisible 		= false;
var fireflyvisible 		= false;
var ecologyvisible 		= false;
var knowledgemode 		= false;


var school_ID = '';
var school_name = '';
                        
    
function InitWnd()
{
	//------------------初始化地圖--------------------//
	var pOMap = document.getElementById("OMap");
	var mapOptiions = {
		scaleControl: true,                										//顯示比例尺
		navigationControl: true,     											//顯示地圖縮放控制項
		navigationControlOptions: {        										//設定地圖縮放控制項
			controlPosition: TGOS.TGControlPosition.TOP_RIGHT,  				//控制項位置
			navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL,       	//控制項樣式
		},
		mapTypeControl: false,
		disableDefaultUI: true,
	};


	//EPSG3826 TWD97以X,Y順序為主；Google坐標系統的EPSG:3857 放大就沒東西
	pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826, mapOptiions,);    


	pMap.setZoom(8);  					//初始地圖縮放層級                
	pMap.setMapTypeId(mapTypeID);		//地圖種類
	pMap.setCenter(startPoint);      	//初始地圖中心點				

	
	AddMarker()							// 取得點擊座標
	LoadGeoJson()						// 載入Json
	CallReactLoaded()					// 與react互動
}

//將WGS84坐標系統轉換為TWD97(台灣)坐標系統  
function WGS84toTWD97(long , lat)  
{
	var TT = new TGOS.TGTransformation();
	TT.wgs84totwd97(long,lat);

	//alert(TT.transResult.x + "," +TT.transResult.y);

	MoveCurrentLocation(TT.transResult.x,TT.transResult.y)
}


function MoveCurrentLocation(long,lat)
{
	var CurrentPoint = new TGOS.TGPoint(long, lat);
	
	//設定標記點圖片及尺寸大小
	var markerImg = new TGOS.TGImage(
		currentlocUrl, 
		new TGOS.TGSize(38, 33), 
		new TGOS.TGPoint(0, 0), 
		new TGOS.TGPoint(10, 33)
	);       
	var pTGMarker = new TGOS.TGMarker(pMap, CurrentPoint,'', markerImg, {flat:false});  
	pMap.setCenter(CurrentPoint);
}


//設定目前地圖的地圖類型
function setMapType(type) {
	pMap.setMapTypeId(type); 
}

function AddMarker() {
	detection = TGOS.TGEvent.addListener(pMap, "click", function (tEvent) {	 //建立監聽器

		if(enableuserMarker == true){
			var pt = new TGOS.TGPoint(tEvent.point.x, tEvent.point.y);		//取得滑鼠點擊位置

			//設定標記點圖片及尺寸大小
			var markersImg = new TGOS.TGImage(
				userclickUrl, 
				new TGOS.TGSize(38, 33), 
				new TGOS.TGPoint(0, 0), 
				new TGOS.TGPoint(10, 33)
			);       
			var userMarker = new TGOS.TGMarker(pMap, pt,'s', markersImg, {flat:false});   //建立標記點
			Markers.push(marker);
		}			
	});
}		
		  

function toggleuserMarker(){
	if (enableuserMarker == true){
		enableuserMarker = false;
	}
	else{
		enableuserMarker = true;
	}
}

// 串接API
function LoadGeoJson()
{
	if(pData != null)
	{
		pData.clearAll();
		for (var count=0; count < AllTGOSMarkers.length; count++) 
		{
			AllTGOSMarkers[count].setMap(null);
		}		
		AllTGOSMarkers.length = 0 ;
		myMapinfotext.length = 0;
	}

	// TGOS API
	var url 			= "https://www.tgos.tw/MapSites/getGeoJson?themeid=19372";

	// 圖片icon
	var farmiconurl 	= "http://192.192.155.112/TGOSMap/Farm.png";
	var schooliconurl 	= "http://192.192.155.112/TGOSMap/School.png";
	var citizenfarmurl 	= "http://192.192.155.112/TGOSMap/citizenfarm.png";
	var butterflyurl 	= "http://192.192.155.112/TGOSMap/butterfly.png";
	var fireflyurl 		= "http://192.192.155.112/TGOSMap/firefly.png";
	var shopurl 		= "http://192.192.155.112/TGOSMap/shop.png";
	var ecologyurl 		= "http://192.192.155.112/TGOSMap/ecology.png";
	var vegurl			= "http://192.192.155.112/TGOSMap/veg.png";
			
	pData = new TGOS.TGData({map: pMap});  //建立幾何圖層物件

	//指定資料來源
	pData.loadGeoJson(url,{idPropertyName:"GEOJSON"},function(graphic){  
		var mymarkerImg = new TGOS.TGImage(schooliconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var myFarmmarkerImg = new TGOS.TGImage(farmiconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var citizenfarmmarkerImg = new TGOS.TGImage(citizenfarmurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var butterflymarkerImg = new TGOS.TGImage(butterflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var fireflymarkerImg = new TGOS.TGImage(fireflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var shopmarkerImg = new TGOS.TGImage(shopurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var ecologymarkerImg = new TGOS.TGImage(ecologyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
		var vegmarkerImg = new TGOS.TGImage(vegurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				
		console.log(pData)
		var InfoWindowOptions = {
			maxWidth:4000,         					//訊息視窗的最大寬度
			pixelOffset: new TGOS.TGSize(5, -30) 	//InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負 
		};             
				
		var pDatastyle =  {
			visible:false
		}
				
		pDatalength = pData.graphics.length;
				
		for(var i = 0;i < pData.graphics.length;i++)
		{
			pData.overrideStyle(graphic[i], pDatastyle);
			myMapinfotext.push (pData.graphics[i].properties.名稱);
			myMapMarkerAddress.push(pData.graphics[i].properties.地址);
			myMapMarkerWebsite.push(pData.graphics[i].properties.官網);
			myMapMarkerDescription.push(pData.graphics[i].properties.描述);
			myMapSchoolIDArr.push(pData.graphics[i].properties.School_ID);
			myMapMarkers.push(pData.graphics[i].geometry);
			myMapKnowIDArr.push(pData.graphics[i].properties.knowID);
					
			//messageBoxS= new TGOS.TGInfoWindow(myMapinfotext[i], myMapMarkers[i], InfoWindowOptions); 
			if(knowledgemode == false)
			{	
				switch(pData.graphics[i].properties.類型)
				{
					case '國小':
						var mySchoolpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], mymarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.schoolID = myMapSchoolIDArr[i];
						if(schoolvisible == true)
						{
							mySchoolpTGMarker.setVisible(true);
						}
						else
						{
							mySchoolpTGMarker.setVisible(false);
						}
						AllTGOSMarkers.push(mySchoolpTGMarker);
						TGOS.TGEvent.addListener(mySchoolpTGMarker, 'click', function(mySchoolpTGMarker, markerdetailinfo){ return function () {                  
						school_name = mySchoolpTGMarker.title;
						school_ID = markerdetailinfo.schoolID;
						MarkerPressed(mySchoolpTGMarker.title,markerdetailinfo);		
						}}(mySchoolpTGMarker,markerdetailinfo));
						break;
					case '農場':
						var myFarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], myFarmmarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						if(farmvisible == true)
						{
							myFarmpTGMarker.setVisible(true);
						}
						else
						{
							myFarmpTGMarker.setVisible(false);
						}
						AllTGOSMarkers.push(myFarmpTGMarker);
						
						TGOS.TGEvent.addListener(myFarmpTGMarker, 'click', function(myFarmpTGMarker, markerdetailinfo){ return function () {                  
							school_name ='';
							MarkerPressed(myFarmpTGMarker.title,markerdetailinfo);
						}}(myFarmpTGMarker,markerdetailinfo));
						break;
					case '市民農園':
						var citizenfarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], citizenfarmmarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						if(citizenvisible == true)
						{
							citizenfarmpTGMarker.setVisible(true);
						}
						else
						{
							citizenfarmpTGMarker.setVisible(false);
						}
						AllTGOSMarkers.push(citizenfarmpTGMarker);
					
						TGOS.TGEvent.addListener(citizenfarmpTGMarker, 'click', function(citizenfarmpTGMarker,markerdetailinfo){ return function () {                  
							school_name ='';
							MarkerPressed(citizenfarmpTGMarker.title,markerdetailinfo);
						}}(citizenfarmpTGMarker,markerdetailinfo));
						break;
					case '螢火蟲區':
						var fireflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], fireflymarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						if(fireflyvisible == true)
						{
							fireflypTGMarker.setVisible(true);
						}
						else
						{
							fireflypTGMarker.setVisible(false);
						}
						AllTGOSMarkers.push(fireflypTGMarker);
						TGOS.TGEvent.addListener(fireflypTGMarker, 'click', function(fireflypTGMarker,markerdetailinfo){ return function () {                  
							school_name ='';
							MarkerPressed(fireflypTGMarker.title,markerdetailinfo);
						}}(fireflypTGMarker,markerdetailinfo));
						break;
					case '蝴蝶園':
						var butterflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], butterflymarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];

						if(butterflyvisible == true)
						{
							butterflypTGMarker.setVisible(true);
						}
						else
						{
							butterflypTGMarker.setVisible(false);
						}

						AllTGOSMarkers.push(butterflypTGMarker);
						TGOS.TGEvent.addListener(butterflypTGMarker, 'click', function(butterflypTGMarker, markerdetailinfo){ return function () {                  
							school_name ='';
							MarkerPressed(butterflypTGMarker.title,markerdetailinfo);
						}}(butterflypTGMarker,markerdetailinfo));
						break;
					case '商店':
						var shoppTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], shopmarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];

						if(shopvisible == true)
						{
							shoppTGMarker.setVisible(true);
						}
						else
						{
							shoppTGMarker.setVisible(false);
						}

						AllTGOSMarkers.push(shoppTGMarker);
						TGOS.TGEvent.addListener(shoppTGMarker, 'click', function(shoppTGMarker, markerdetailinfo){ return function () {                  
							school_name ='';
							MarkerPressed(shoppTGMarker.title,markerdetailinfo);
						}}(shoppTGMarker,markerdetailinfo));		
						break;
					case '生態園區':
						var ecologypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], ecologymarkerImg, {flat:false});
						var markerdetailinfo = new Object();
						markerdetailinfo.address = myMapMarkerAddress[i];
						markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						
						if(ecologyvisible == true)
						{
							ecologypTGMarker.setVisible(true);
						}
						else
						{
							ecologypTGMarker.setVisible(false);
						}
						
						AllTGOSMarkers.push(ecologypTGMarker);
						TGOS.TGEvent.addListener(ecologypTGMarker, 'click', function(ecologypTGMarker,markerdetailinfo){ 
							return function () {                  
								school_name = '';
								MarkerPressed(ecologypTGMarker.title,markerdetailinfo);
								//TWConvert(ecologypTGMarker.position.x,ecologypTGMarker.position.y)
								
							}
						}(ecologypTGMarker,markerdetailinfo));
						break;		
				}
			}
			else
			{
				switch(pData.graphics[i].properties.類型){
					case '蔬菜介紹': 
						var vegpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], vegmarkerImg,{flat:false});
						var markerdetailinfo = new Object();			//為了儲存地標位置and標題以外的資訊所創的Object
						//markerdetailinfo.address = myMapMarkerAddress[i];
						//markerdetailinfo.website = myMapMarkerWebsite[i];
						markerdetailinfo.description = myMapMarkerDescription[i];
						markerdetailinfo.knowID = myMapKnowIDArr[i]; 
						AllTGOSMarkers.push(vegpTGMarker);
						vegpTGMarker.setVisible(true);
						
						TGOS.TGEvent.addListener(vegpTGMarker, 'click', function(vegpTGMarker, markerdetailinfo){ 
								return function () {                  
									KnowMarkerPressed(vegpTGMarker.title,markerdetailinfo);
									//vegdetailpressed(vegpTGMarker.title,markerdetailinfo);
									school_name = '';
								}
						}(vegpTGMarker,markerdetailinfo)); 
						break;
				}
			}
				//console.log(myMapinfotext[i]);
				//console.log(messageBoxS);								 
		} 
		pData.setMap(pMap);  //設定呈現幾何圖層物件的地圖物件			
	});			
}

function MarkerPressed(Markertitle,markerdetailinfo){
	//window.ReactNativeWebView.postMessage(Markertitle);
	
	const data = {
		command: 'getinfo',
		payload: {
			title:Markertitle,
			address:markerdetailinfo.address,
			website:markerdetailinfo.website,
			description:markerdetailinfo.description,
			school_ID:school_ID,
			school_name:school_name,
		}
	}
	window.ReactNativeWebView.postMessage(JSON.stringify(data));
	
}
		
function KnowMarkerPressed(Markertitle,markerdetailinfo){
	const data = {
		command: 'getknow',
		payload: { 
			title:Markertitle,
			description:markerdetailinfo.description,
			school_ID:school_ID,
			school_name:school_name,
			know_ID:markerdetailinfo.knowID,
		}
	}
	window.ReactNativeWebView.postMessage(JSON.stringify(data));
}
	
//改變visible觸發 -----------------------Closed 換成"套用"模式		
function markervisible(markerparameter)
{
	switch(markerparameter)
	{
		case 'school':
			if(schoolvisible == true)
			{
				schoolvisible = false;
			}
			else
			{
				schoolvisible = true;
			}
			break;
		case 'citizen':
			if(citizenvisible == true)
			{
				citizenvisible = false;
			}
			else
			{
				citizenvisible = true;
			}
			break;
		case 'butterfly':
			if(butterflyvisible == true)
			{
				butterflyvisible = false;
			}
			else
			{
				butterflyvisible = true;
			}
			break;
		case 'shop':
			if(shopvisible == true)
			{
				shopvisible = false;
			}
			else
			{
				shopvisible = true;
			}
			break;
		case 'farm':
			if(farmvisible == true)
			{
				farmvisible = false;
			}
			else
			{
				farmvisible = true;
			}
			break;
		case 'firefly':
			if(fireflyvisible == true)
			{
				fireflyvisible = false;
			}
			else
			{
				fireflyvisible = true;
			}
			break;
		case 'ecology':
			if(ecologyvisible == true)
			{
				ecologyvisible = false;
			}
			else
			{
				ecologyvisible = true;
			}
			break;
	}

	LoadGeoJson();
}
		
function searchmarker(searchTerm)
{
	var searchstring = searchTerm;
	var resultarray = new Array();

	const result = myMapinfotext.filter((value) => value.match(searchstring));
	//alert(result)

	for(var i= 0  ; i < result.length ; i++ )
	{
		resultarray.push(result[i])
	}
	
	const data = {
		command: 'searchresult',
		payload: {
			result:resultarray,
		}
	}
	window.ReactNativeWebView.postMessage(JSON.stringify(data));
}
			
function CallReactLoaded()
{
	const data = {
		command: 'doneloading',
	}
	window.ReactNativeWebView.postMessage(JSON.stringify(data));
}
		
function searchresult(resultstring){
	//MarkerPressed(resultstring);
	var isfinished = false;
	for(var i = 0 ; i < AllTGOSMarkers.length ; i++)
	{
		if(AllTGOSMarkers[i].getTitle() == resultstring)
		{
			if(knowledgemode == false)
			{
				pMap.setCenter(AllTGOSMarkers[i].getPosition());
				pMap.setZoom(11);
				
				school_name = AllTGOSMarkers[i].title;
				school_ID = myMapSchoolIDArr[i];
				
				//TWConvert(AllTGOSMarkers[i].position.x,AllTGOSMarkers[i].position.y);
				//school_name = AllTGOSMarkers[i].title;
				const data = {
					command: 'getinfo',
					payload: {
						title:AllTGOSMarkers[i].title,
						address:myMapMarkerAddress[i],
						website:myMapMarkerWebsite[i],
						description: myMapMarkerDescription[i],
						school_ID:school_ID,
						school_name:school_name,
						
					}
				}
				window.ReactNativeWebView.postMessage(JSON.stringify(data));
				isfinished = true;
			}
			else{
				pMap.setCenter(AllTGOSMarkers[i].getPosition());
				pMap.setZoom(5);
				isfinished = true;
			}
		}
	}
	if(isfinished == false)
	{
		knowmapview()
	}		
}

//切換地圖模式
function knowmapview()
{   
	if(pData != null)
	{
		pData.clearAll();
		for (var count=0; count < AllTGOSMarkers.length; count++) 
		{
			AllTGOSMarkers[count].setMap(null);
		}		
		AllTGOSMarkers = [];
	}
	if(knowledgemode == false)
	{
		knowledgemode = true;

		pMap.setZoom(3);
		pMap.setCenter(knowstartPoint);
	}
	else
	{
		knowledgemode = false;

		pMap.setZoom(7);	
		pMap.setCenter(startPoint); 
	}
	LoadGeoJson();

}
		
function changevisible(visiblestatusarr)
{
	var visiblestatusarray = visiblestatusarr.split(",");			//將字串轉成陣列	
	schoolvisible = (visiblestatusarray[0] === 'true')  			//將"true" or "false"字串 轉成boolean		
	citizenvisible = (visiblestatusarray[1] === 'true')
	butterflyvisible = (visiblestatusarray[2] === 'true')	
	shopvisible = (visiblestatusarray[3] === 'true')
	farmvisible = (visiblestatusarray[4] === 'true')
	fireflyvisible = (visiblestatusarray[5] === 'true')
	ecologyvisible = (visiblestatusarray[6] === 'true')	
	
	LoadGeoJson(); 
	
}
