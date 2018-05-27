var datepicker = {};
var monthDate;
var $wrapper;
var today = new Date();

// month为显示的月数
datepicker.getMonthData = function(year, month){
	var ret = [];

	if(!year || !month){
		var today = new Date();
		year      = today.getFullYear();
		month     = today.getMonth() + 1;
	}

    // 本月第一天
	var firstDay            = new Date(year, month-1, 1);
    // 一周的第几天
	var firstDayWeekDay     = firstDay.getDay();

	if(firstDayWeekDay === 0){
		firstDayWeekDay = 7;
	}

    // 上个月最后一天
	var lastDayOfLastMonth  = new Date(year, month-1, 0);
    // 上个月总共多少天
	var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    // 显示上个月的天数
	var prevMonthDaysCount  = firstDayWeekDay - 1;

    // 本月最后一天
	var lastDay             = new Date(year, month, 0);
	var lastDate            = lastDay.getDate();

	for (var i=0; i<6*7; i++){
		var date      = i + 1 - prevMonthDaysCount;
		var showDate  = date;
		var thisMonth = month;

		if(date <= 0){
			thisMonth = month-1;
			showDate  = lastDateOfLastMonth + date;
		}else if(date > lastDate){
			thisMonth = month+1;
			showDate  = showDate - lastDate;
		}

		if(thisMonth === 13){
			thisMonth = 1;
		}

		if(thisMonth === 0){
			thisMonth = 12;
		}

		ret.push({
			date     : date,
			month    : thisMonth,
			showDate : showDate
		});

	}
	return {
		year  : year,
		month : month,
		days  : ret
	};
}

datepicker.buildUI = function(year, month){
	monthDate = this.getMonthData(year, month);
	var html = '<div class="ui-datepicker-header">\
		<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-prev">&lt;</a>\
		<a href="javascript:;" class="ui-datepicker-btn ui-datepicker-next">&gt;</a>\
		<span class="ui-datepicker-curr-month">2018-05</span>\
	</div>\
	<div class="ui-datepicker-body">\
		<table class="ui-datepicker-table">\
			<thead>\
				<tr>\
					<th>一</th>\
					<th>二</th>\
					<th>三</th>\
					<th>四</th>\
					<th>五</th>\
					<th>六</th>\
					<th>日</th>\
				</tr>\
			</thead>\
			<tbody>';
				for(var i=0,len=monthDate.days.length; i<len; i++){
					var data = monthDate.days[i];
					if(i%7 === 0){
						html += '<tr>';
					}

					if(data.date<=0){
						html += '<td data-date = ' + data.date+' class = "jNotThisMonth">'+ data.showDate +'</td>';
					}else if(data.date>data.showDate){
						html += '<td data-date = ' + data.date+' class = "jNotThisMonth">'+ data.showDate +'</td>';
					}else if(data.showDate === today.getDate() && monthDate.month === today.getMonth()+1 && monthDate.year === today.getFullYear()){
						html += '<td data-date = ' + data.date+' class = "on">'+ data.showDate +'</td>';
					}else{
						html += '<td data-date = ' + data.date+'>'+ data.showDate +'</td>';
					}

					if(i%7 === 6){
						html += '</tr>';
					}
				}
				html +
			'</tbody>\
		</table>\
	</div>';

	return html;
}

datepicker.render = function(direction){
	var year, month;

	if(monthDate){
		year  = monthDate.year;
		month = monthDate.month;
	}


	if(direction === 'prev'){
		month --;
	}
	if(direction === 'next'){
		month ++;
	}

	var html = datepicker.buildUI(year,month);

	$wrapper = document.querySelector('.ui-datepicker-wrapper');
	if(!$wrapper){
		$wrapper           = document.createElement('div');
		$wrapper.className = "ui-datepicker-wrapper";

		document.body.appendChild($wrapper);
	}
	$wrapper.innerHTML = html;
}

datepicker.init = function(input){
	datepicker.render();

	var $input = document.querySelector(input);
	var isOpen = false;

    // 点击日期输入框
	$input.addEventListener('click',function(){
		if(isOpen){
			$wrapper.classList.remove('ui-datepicker-wrapper-show');
			isOpen = false;
		}else{
			$wrapper.classList.add('ui-datepicker-wrapper-show');
			var left   = $input.offsetLeft;
			var top    = $input.offsetTop;
			var height = $input.offsetHeight;

			$wrapper.style.top  = top + height + 8 + 'px';
			$wrapper.style.left = left + 2 +'px';

			isOpen = true;
		}
	},false);

    // 点击上个月, 下个月输入框
	$wrapper.addEventListener('click',function(e){
		var $target = e.target;

		if(!$target.classList.contains('ui-datepicker-btn')){
			return;
		};

		if($target.classList.contains('ui-datepicker-prev-btn')){
			datepicker.render('prev');
		}else if($target.classList.contains('ui-datepicker-next-btn')){
			datepicker.render('next');
		}
	},false);

    // 点击日期小方格
	$wrapper.addEventListener('click',function(e){
		var $target = e.target;

		if($target.tagName.toLowerCase() !=='td'){
			return;
		};

		var date = new Date(monthDate.year, monthDate.month-1, $target.dataset.date);

		$input.value = format(date);
		$wrapper.classList.remove('ui-datepicker-wrapper-show');
		isOpen = false;

	},false);
}

function format(date){
	var ret = '';
	var padding =  function(num){
		return num <= 9 ? '0' + num : num;
	}
	ret += date.getFullYear() + '-';
	ret += padding(date.getMonth() + 1) + '-';
	ret += padding(date.getDate());

	return  ret;
}
