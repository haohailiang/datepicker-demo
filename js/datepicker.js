var datepicker = {};

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
	var monthData = this.getMonthData(year, month);
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
				for(var i=0,len=monthData.days.length; i<len; i++){
					var data = monthData.days[i];
					if(i%7 === 0){
						html += '<tr>';
					}
					html += '<td>'+ data.showDate +'</td>';
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

datepicker.init = function($dom){
	var html = this.buildUI(2018, 5);
	$dom.html(html);
}
