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
	var firstDayWeekDay     = firstDay.getDay();

	if(firstDayWeekDay === 0){
		firstDayWeekDay = 7;
	}

    // 上个月最后一天
	var lastDayOfLastMonth  = new Date(year, month-1, 0);
	var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

	var prevMonthDaysCount  = firstDayWeekDay - 1;

    // 本月最后一天
	var lastDay             = new Date(year, month, 0);
	var lastDate            = lastDay.getDate();

}

datepicker.buildUI = function(year, month){
	var monthData = this.getMonthData(year, month);
	var html = '';
}
