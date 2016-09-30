$(function(){
	var scenc=$(".scenc");
	var t=null;
	var score=0;
	function tanchishe(){
		for(var i=0;i<20;i++){
			for(var j=0;j<20;j++){
				var r=Math.floor(Math.random()*255);
				var g=Math.floor(Math.random()*255);
				var b=Math.floor(Math.random()*255);
				var color="rgba("+r+","+g+","+b+",0.8)";
				$('<div>').attr("id",i+"_"+j).css("backgroundColor",color).addClass('block').appendTo(scenc);
			}
		}
		var shebiao={"0_0":true,"0_1":true,"0_2":true};
		var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
		$("#0_0,#0_1,#0_2").addClass('she');
		var dir="you";
		var move=function(){
			var oldhead=she[she.length-1];
			if(dir=="zuo"){
				var newhead={x:oldhead.x,y:oldhead.y-1};
			}
			if(dir=="shang"){
				var newhead={x:oldhead.x-1,y:oldhead.y};
			}
			if(dir=="you"){
				var newhead={x:oldhead.x,y:oldhead.y+1};
			}
			if(dir=="xia"){
				var newhead={x:oldhead.x+1,y:oldhead.y};
			}
			if(newhead.x<0||newhead.x>19||newhead.y<0||newhead.y>19){
				clearInterval(t);
				t=null;
				alert("撞死了");
				return;
			}
			if(shebiao[newhead.x+"_"+newhead.y]){
				clearInterval(t);
				t=null;
				alert("撞到自己了");
				return;
			}
			she.push(newhead);
			$("#"+newhead.x+"_"+newhead.y+"").addClass("she");
			if(newhead.x==shiwu.x&&newhead.y==shiwu.y){
				score+=10;
				$("h3").text("得分:"+score);
				$(".food").removeClass("food");
				$(".scenc img").detach();
				food();
			}else{
				var weiba=she.shift();
				$("#"+weiba.x+"_"+weiba.y+"").removeClass("she");
				shebiao[weiba.x+"_"+weiba.y]=null;
			}
			shebiao[newhead.x+"_"+newhead.y]=true;
		}
		var biao={37:"zuo",38:"shang",39:"you",40:"xia"};
		var fanbiao={"zuo":37,"shang":38,"you":39,"xia":40};
		$(document).on('keydown',function(e){
			var num=e.keyCode;
			if(num==37||num==38||num==39||num==40){
				if(Math.abs(num-fanbiao[dir])===2){
					return;
				}
				dir=biao[num];
			}
		})
		var shiwu=null;
		function food(){
			do{
				var x=Math.floor(Math.random()*20);
				var y=Math.floor(Math.random()*20);
			}while(shebiao[x+"_"+y]);
			shiwu={x:x,y:y};
			$("#"+x+"_"+y+"").addClass("food");
			$('<img>').attr('src','baozi.gif').css("width",25).appendTo(".food");
		}
		food();
		t=setInterval(move,200);
	}
	tanchishe();
	$(".start").on("click",function(){
		$(".restart").trigger("click");
	})
	$(".restart").on("click",function(){
		if(t)return;
		score=0;
		$("h3").text("得分:0");
		scenc.empty();
		tanchishe();
	})
})