function fnGenerateHtml(items){
	$(items).find("item").each(function() {
    	var goodTime = $(this).find("goodTime").text(); 
    	var hour = (parseInt(goodTime / 60) != 0) ? parseInt(goodTime / 60)+'시' : '';
		var minute = ( (goodTime % 60) !=0 ) ? ' '+ (goodTime % 60)+'분' :'간' ;
		var time = hour + minute;

	    var orderBy = $(this).find("orderBy").text();  
	    var goodId = $(this).find("goodId").text();  
	    var goodPrice = $(this).find("goodPrice").text();
	    var goodName = $(this).find("goodName").text();    
     
	    $('#tbodyid tr:last').after(
        			  '<tr>'
						+'<td class="chk"><input type="checkbox"/></td>'
						+'<td><a href="#" >'+goodName+'</a></td>'
						+'<td class="time">'+time+'</td>'
						+'<td class="price">'+goodPrice+'원</td>'
						+'<td class="del"><button type="button" name="deleteBtn">삭제</button></td>'
						+'<input type="hidden" name="goodId" value="'+goodId+'"/> '
						+'<input type="hidden" name="orderBy" value="'+orderBy+'"/> '
					+'</tr>'
        );//after
    });//each
}//fnGenerateHtml

//체크박스 한개만 선택되도록.
function fnCheckboxEventBinding(){
	$("input:checkbox").on('click',function(){
		$("input:checked").not(this).attr('checked',false);
	});	     
}

function fnDelEventBinding(){
	fnDelComCode();
	fnDelComCode();
}//fnDelEventBinding

function fnDelComCode(){ // CommonCode
	$('button[name=deleteBtn]').each(function(e){
		$(this).off();
		$(this).on('click',function(){
			var deletedId = $(this).parent().nextAll('input[name=orderBy]').val();
			$('input[value='+deletedId+']').parent().remove();
			$('input[name=orderBy]').each(function(e){
				var orderBy = $(this).val();
				if( orderBy > deletedId && orderBy != 'empty'){
					$(this).val(orderBy - 1);
				}
			});//orderBy each
			itemCount -= 1;
		});//click
	});//each
}

function fnSwitchRowEventBinding(){
	$("#upButton").on('click',function(){
		fnSwitchEvent(-1);
	});//upButton
	
	$("#downButton").on('click',function(){
		fnSwitchEvent(1);
	});//downButton
}

function fnSwitchEvent(action){
	var orderBy = ( $("input:checkbox:checked").parent().nextAll('input[name=orderBy]').val() ) * 1;

		if( (orderBy > 1 && action == -1) || (orderBy < itemCount && action == 1) ){
			$('input[value='+orderBy+']').prevAll('.del').children().off();
			$('input[value='+(orderBy+action)+']').prevAll('.del').children().off();
			fnCommonUpDown(action, orderBy);
			fnDelEventBinding(orderBy, orderBy+action);
		}
}

function fnCommonUpDown(action, checked_tr_orderBy){
	var checked_tr = $("input:checkbox:checked").parent().parent();
	var checked_tr_html = checked_tr.html();
	var target_tr;
	if(action == -1 ){
		 target_tr = checked_tr.prev();
	}else if(action == 1){
		 target_tr = checked_tr.next();
	}
	var target_tr_orderBy = target_tr.children('input[name=orderBy]').val();
	var target_tr_html = target_tr.html();

	checked_tr.html(target_tr_html);
	target_tr.html(checked_tr_html);

	checked_tr.children('input[name=orderBy]').val(checked_tr_orderBy);
	target_tr.children('input[name=orderBy]').val(target_tr_orderBy);

	$('input[value='+target_tr_orderBy+']').prevAll("td.chk").children().attr('checked',true);
	
	checked_tr.attr('class','');
	target_tr.attr('class','on');
	
	fnCheckboxEventBinding();

}//fnCommonUpDown
