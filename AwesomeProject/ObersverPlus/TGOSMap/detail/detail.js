

var teachersname = '';
var school_name = '';
var school_ID = '';
var class_ID = '';

CallReactLoaded()

function getschoolid(schoolid){
	school_ID = schoolid; 
	
}
function getschoolname(schoolname){
	school_name = schoolname;
	
}

function getknowid(knowid){
	if(knowid != ''){
		
		knowinit(knowid);
	}
	else{
		init();
	}
	
}
function knowinit(knowid){
	var list = document.getElementById("detail");
	var my_body = document.getElementById('popupdetail');
	var title = '';
	var des = '';
	var cabimgurl = '';
	
	if (knowid == 'HighCab'){
		title = '高山高麗菜';
		des ='日夜溫差大，植物白天行光合作用，所產生的碳水化合物在夜晚低溫時更容易累積，高麗菜在養分充足下，更甜、更好吃。簡單說，植物的光合作用分兩部分，一是光反應，吸收光能轉換成植物可以使用的能量，並且分解水產生氧氣，二是碳(暗)反應, 植物利用光反應產生的能量固定二氧化碳，並且轉換成葡萄糖。 在溫差大的地區，因為晚上很冷，植物為了避免凍傷就會合成比較多的葡萄糖以增加溶質濃度，甚至若干澱粉也會轉換成葡萄糖，使得植物細胞的溶質變多；另一方面，晚上的低溫使得呼吸作用相對消耗較少的糖分，如此反反覆覆的日夜進行，就使得植物本身所含的糖分變高，自然就比較甜了。'
		cabimgurl = 'http://192.192.155.112/TGOSMap/HighCab.png'
	}
	else if (knowid == 'LowCab'){
		title = '平地高麗菜';
		des = '平地高麗菜因氣溫較高,而高麗菜的生長環境是10-20度,所以夏天要吃高山高麗菜,而冬天最好選擇平地高麗菜,因為高麗菜其實太低溫也不好,冬天平地大約是12-18度,合高麗菜生長環境,所以因季節變化就要選擇不同的高麗菜。'
		cabimgurl = 'http://192.192.155.112/TGOSMap/LowCab.png'
	}
	my_body.innerHTML = '<h1 id = "detailtitle"> '+ title+'</h1>';
	my_body.innerHTML += '<img src = "'+ cabimgurl +'" class = "cabimg" >'
	my_body.innerHTML += '<div class = "des"> '+ des +'</div>';
	
}

function CallReactLoaded(){
			 const data = {
				command: 'doneloading',
			}
		  window.ReactNativeWebView.postMessage(JSON.stringify(data));
}

function init(){
	
	$.ajax({                                      //使用jQuery讀取學校資訊json
						url: "http://192.192.155.112/API/Map.aspx?school_id="+school_ID,
						type: "GET",
						dataType: "json",
						success: function(Jdata) {
							console.log(Jdata)
							var list = document.getElementById("detail");
							/*while (list.hasChildNodes()) {
							list.removeChild(list.firstChild);
							}*/
							var my_body = document.getElementById('popupdetail');
							my_body.innerHTML = '<h2 id = "detailtitle"> '+ school_name+'</h2>';
							for(var i = 0 ; i < Jdata.length ; i++){
								console.log("asd:"+Jdata[i].teacher_name)
								let content = '<div class="flex">'
									+'<h3 class = "teachername">教師名稱 : </h3><h3>' + Jdata[i].teacher_name + '</h3>'
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
								
								
							}
							
						},
  
						error: function() {
							
							 document.getElementById('popupdetail').innerHTML += '<div class="flex">'
							+'<h2>此學校暫無種植資料! </h2>'
							+'</div>';
						}
					});
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
							console.log(Jdata)
							 
							var list = document.getElementById("detail");
							/*while (list.hasChildNodes()) {
							list.removeChild(list.firstChild);
							}*/
							var my_body = document.getElementById('popupdetail');
							my_body.innerHTML = '<img src = "http://192.192.155.112/TGOSMap/retune.png" class="backbutton" id="backbutton" onclick="init()">'+'<h2 id = "detailtitle" class = "detailtitle">' + school_name +'>'+ teachersname +' 老師</h2>';
							my_body.innerHTML += '<div id = "gallerys" class="gallerys"></div>';

							for(var i = 0 ; i < Jdata.length ; i++){
								
								let content ='</div>'
								//+'<div class="img_flex">'
								//+'<img width ="120px" height = "100px" src = "http://192.192.155.112/img/1.jpg">';
								
								+'<img  class = "stuimg0" src="'+ Jdata[i].Photo+'" alt="" onclick = "galleryclick('+  Jdata[i].obj_ID +')">'
								
								
								
								//content += '</div>';
								console.log(content)
								document.getElementById("gallerys").innerHTML += content

							}
							
							galleryprocess();
						},
  
						error: function() {
							alert("讀取json失敗");
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
				item.classList.add('byebye');
				if (item.complete) {
					console.log(item.src);
				}
				else {
					item.addEventListener('load', function () {
						var altura = getVal(gallery, 'grid-auto-rows');
						var gap = getVal(gallery, 'grid-row-gap');
						var gitem = item.parentElement.parentElement;
						gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
						item.classList.remove('byebye');
					});
				}
			});
			window.addEventListener('resize', resizeAll);
			gallery.querySelectorAll('.gallery-item').forEach(function (item) {
				item.addEventListener('click', function () {        
					//item.classList.toggle('full');        
				});
			});
		}
		
		function galleryclick(objID){
			
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
							my_body.innerHTML = '<img src = "http://192.192.155.112/TGOSMap/retune.png" class="backbutton" id="backbutton" onclick="clickedclass('+ class_ID +')">'+'<h2 id = "detailtitle">' + school_name +'>'+ teachersname +' 老師</h2>';
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

							

						},
  
						error: function() {
							alert("讀取json失敗");
						}
					});
		}