                         var messageBox;                    //訊息視窗物件
                         
    
                         var pMap;                      //初始化地圖物件s
    
                         //-----------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定----------------------
    
                         var infotext =  ['<B>世新大學'
											                  ,'<B>台北市政府'];        //依序填入地標名稱及訊息視窗內容, 可自行增減數量
    
                         var markerPoint = [new TGOS.TGPoint(304926.924,2764627.737)
											,new TGOS.TGPoint(306954, 2770049)
											];        //依序填入地標坐標位置, 坐標數須與標記數一致
    
                         var startPoint = new TGOS.TGPoint(304926.9247, 2764627.737);       
    
                         var imgUrl = ["http://api.tgos.tw/TGOS_API/images/marker2.png"
										                  ,"http://api.tgos.tw/TGOS_API/images/marker2.png"];                //依序設定標記點圖示來源

                         var currentlocUrl = "http://api.tgos.tw/TGOS_API/images/marker1.png";

                         var userclickUrl = "http://192.192.155.112/TGOSMap/redmarker.png";

                         var mapTypeID = 'TGOSMAP'; //Maptype

                         var Markers = new Array();	//新增一個陣列, 準備存放使用者新增的Marker

	                       var detection;  //新增一個變數, 準備接收監聽器回傳值
                         
                         var enableuserMarker = false;

                         var pData = null;
						 
						             var myMapMarkers = new Array();
						 
						             var myMapinfotext = new Array();
                        
						             var mCluster;
						 
						             var mClusters = new Array();
						 
						             var mySchoolpTGMarker = new TGOS.TGMarker();
						 
						             var pDatalength = 0;
						 
						             var myMapMarkersforRmv = new Array();
                        
    
                         //--------------------若網頁介面依照範例網頁的預設設定,以下程式碼可不修改--------------------------
    
                         function InitWnd()
    
                         {
    
                                    //------------------初始化地圖--------------------
                                   
                                    var pOMap = document.getElementById("OMap");
    
                                    var mapOptiions = {
    
                                               scaleControl: true,                //顯示比例尺
    
                                               navigationControl: true,     //顯示地圖縮放控制項
    
                                               navigationControlOptions: {        //設定地圖縮放控制項
    
                                                  controlPosition: TGOS.TGControlPosition.TOP_RIGHT,  //控制項位置
    
                                                  navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL,       //控制項樣式

                                               },
    
                                               mapTypeControl: false,

											                         disableDefaultUI: true,

                                             
    
                                    };
    
                                    pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826, mapOptiions,);    //EPSG3826 TWD97以X,Y順序為主；Google坐標系統的EPSG:3857 放大就沒東西
    
                                    pMap.setZoom(9);                                     //初始地圖縮放層級

                                    pMap.setMapTypeId(mapTypeID);
    
                                    pMap.setCenter(startPoint);      //初始地圖中心點

                                    AddMarker()

                                    LoadGeoJson()
                                    

    
                for(var i = 0; i < infotext.length; i++) {
    
                    //------------------建立標記點---------------------
    
                    var markerImg = new TGOS.TGImage(imgUrl[i], new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
    
                    var pTGMarker = new TGOS.TGMarker(pMap, markerPoint[i],'', markerImg, {flat:false});   //建立機關單位標記點

                    TGOS.TGEvent.addListener(pTGMarker, 'click', function () { window.ReactNativeWebView.postMessage("SHU"); } ); //滑鼠事件監聽
    
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
    
                                    }
                                    
    
                         }
    
            function WGS84toTWD97(long , lat)  //將WGS84坐標系統轉換為TWD97(台灣)坐標系統
    
            {
   
            var TT = new TGOS.TGTransformation();
    
            TT.wgs84totwd97(long,lat);
    
           //alert(TT.transResult.x + "," +TT.transResult.y);
              
              MoveCurrentLocation(TT.transResult.x,TT.transResult.y)
            }

            function MoveCurrentLocation(long,lat)
            {
               
              var CurrentPoint = new TGOS.TGPoint(long, lat);

              var markerImg = new TGOS.TGImage(currentlocUrl, new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
    
              var pTGMarker = new TGOS.TGMarker(pMap, CurrentPoint,'', markerImg, {flat:false});  

              pMap.setCenter(CurrentPoint);

              
              
            }

            function setMapType(type) {
            pMap.setMapTypeId(type); //設定目前地圖的地圖類型
            }

            function AddMarker() {
                    
                    
		                detection = TGOS.TGEvent.addListener(pMap, "click", function (tEvent) {	 //建立監聽器

                   if(enableuserMarker == true){
                     var pt = new TGOS.TGPoint(tEvent.point.x, tEvent.point.y);		//取得滑鼠點擊位置
			
			              var markersImg = new TGOS.TGImage(userclickUrl, new TGOS.TGSize(38, 33), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));       //設定標記點圖片及尺寸大小
    
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

          function LoadGeoJson()
		    {
			if(pData != null)
			{
				pData.clearAll();
				for (var count=0; count < myMapMarkersforRmv.length; count++) {
					myMapMarkersforRmv[count].setMap(null);
				}		
				myMapMarkersforRmv = [];
			}
			var url = "https://www.tgos.tw/MapSites/getGeoJson?themeid=19372";
			var farmiconurl = "http://192.192.155.112/TGOSMap/Farm.png";
			var schooliconurl = "http://192.192.155.112/TGOSMap/School.png";
			var citizenfarmurl = "http://192.192.155.112/TGOSMap/citizenfarm.png";
			var butterflyurl = "http://192.192.155.112/TGOSMap/butterfly.png";
			var fireflyurl = "http://192.192.155.112/TGOSMap/firefly.png";
			var shopurl = "http://192.192.155.112/TGOSMap/shop.png";
			
			pData = new TGOS.TGData({map: pMap});  //建立幾何圖層物件
			pData.loadGeoJson(url,{idPropertyName:"GEOJSON"},function(graphic)//指定資料來源
			{  
				var mymarkerImg = new TGOS.TGImage(schooliconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				var myFarmmarkerImg = new TGOS.TGImage(farmiconurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				var citizenfarmmarkerImg = new TGOS.TGImage(citizenfarmurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				var butterflymarkerImg = new TGOS.TGImage(butterflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				var fireflymarkerImg = new TGOS.TGImage(fireflyurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				var shopmarkerImg = new TGOS.TGImage(shopurl, new TGOS.TGSize(35, 50), new TGOS.TGPoint(0, 0), new TGOS.TGPoint(10, 33));
				
				
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
					
					switch(pData.graphics[i].properties.類型){
						case '國小':
							var mySchoolpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], mymarkerImg, {flat:false});
							
							myMapMarkersforRmv.push(mySchoolpTGMarker);
							break;
						case '農場':
							var myFarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], myFarmmarkerImg, {flat:false});
							
							myMapMarkersforRmv.push(myFarmpTGMarker);
							break;
						case '市民農園':
							var citizenfarmpTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], citizenfarmmarkerImg, {flat:false});
							
							myMapMarkersforRmv.push(citizenfarmpTGMarker);
							break;
						case '螢火蟲區':
							var fireflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], fireflymarkerImg, {flat:false});
							
							myMapMarkersforRmv.push(fireflypTGMarker);
							break;
						case '蝴蝶園':
							var butterflypTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], butterflymarkerImg, {flat:false});
							
							myMapMarkersforRmv.push(butterflypTGMarker);
							break;
						case '商店':
							var shoppTGMarker = new TGOS.TGMarker(pMap, myMapMarkers[i],myMapinfotext[i], shopmarkerImg, {flat:false});
							myMapMarkersforRmv.push(shoppTGMarker);
							break;
					}
					
					
					
					
					messageBoxS= new TGOS.TGInfoWindow(myMapinfotext[i], myMapMarkers[i], InfoWindowOptions); 
					//console.log(myMapinfotext[i]);
					//console.log(messageBoxS);
					 
					
					TGOS.TGEvent.addListener(mySchoolpTGMarker, 'click', function(mySchoolpTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(mySchoolpTGMarker.title);
																	
																	}}(mySchoolpTGMarker,messageBoxS));
														 
					TGOS.TGEvent.addListener(myFarmpTGMarker, 'click', function(myFarmpTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(myFarmpTGMarker.title);
    
																	}}(myFarmpTGMarker,messageBoxS));
																	
					TGOS.TGEvent.addListener(citizenfarmpTGMarker, 'click', function(citizenfarmpTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(citizenfarmpTGMarker.title);
    
																	}}(citizenfarmpTGMarker,messageBoxS));

					TGOS.TGEvent.addListener(fireflypTGMarker, 'click', function(fireflypTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(fireflypTGMarker.title);
    
																	}}(fireflypTGMarker,messageBoxS));

					TGOS.TGEvent.addListener(butterflypTGMarker, 'click', function(butterflypTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(butterflypTGMarker.title);
    
																	}}(butterflypTGMarker,messageBoxS));

					TGOS.TGEvent.addListener(shoppTGMarker, 'click', function(shoppTGMarker, messageBoxS){ return function () {                  
    
																	MarkerPressed(shoppTGMarker.title);
    
																	}}(shoppTGMarker,messageBoxS));													
														 
				} 
				pData.setMap(pMap);  //設定呈現幾何圖層物件的地圖物件
				
			});
			   
				
		    }

        function MarkerPressed(Markertitle){
          window.ReactNativeWebView.postMessage(Markertitle);
        }