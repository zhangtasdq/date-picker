describe("datepicker 测试", function() {
    "use strict";

    it("$.fn.datepicker 应该存在", function() {
        expect($.fn.datepicker).to.be.a("function");
    });

    describe("基础测试", function() {
        var inputElement = null,
            datePickerElement = null;

        before(function() {
            inputElement = $("#date_picker_input");
            inputElement.datepicker();
            datePickerElement = $(".date-picker-container");
        });

        it("应该在页面添加时间控件的元素", function() {
            expect(datePickerElement.length).to.equal(1);
        });

        it("当 input 获得焦点时,应该显示时间选择控件", function() {
            inputElement.focus();
            expect(datePickerElement.is(":visible")).to.equal(true);
            expect(datePickerElement.hasClass("hide")).to.equal(false);
        });

        it("当 input 失去焦点时,应该隐藏时间选择控件", function() {
            inputElement.blur();
            expect(datePickerElement.hasClass("hide")).to.equal(true);
        });

        it("时间选择控件的位置应该与 input 对齐", function() {
            inputElement.focus();
            expect(datePickerElement.offset().left).to.equal(inputElement.offset().left);
            var topPosition = parseInt(datePickerElement.css("top"));
            expect(inputElement.offset().top + inputElement.height() + 10).to.equal(topPosition);
            inputElement.blur();
        });

        it("点击一个日期时,应该为被点击的日期元素添加类 'active'", function() {
            var clickElement = datePickerElement.find("tbody td:eq(12)");
            clickElement.trigger("mousedown");
            expect(clickElement.hasClass("active")).to.equal(true);
        });

        it("点击日期时,应该在 input 中显示相应的日期", function() {
            var date = new Date(),
                currentDay = date.getDate();
            // 获取当前日期下一天的 tr 元素并点击
            var nextDayTr = $(datePickerElement.find("tbody td")[currentDay + 1]);
            nextDayTr.trigger("mousedown");

            var nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 1);

            expect(inputElement.val()).to.equal($.format.date(nextDate, "yyyy-MM-dd"));
        });

        it("点击切换月份的箭头时,标题栏的日期应该相应改变", function() {
            var currentDate = new Date();
            datePickerElement.find("thead tr [data-operate='next-month']").trigger("mousedown");
            currentDate.setMonth(currentDate.getMonth() +1);
            var currentMonth = datePickerElement.find("thead tr th#currentMonth").text();
            expect(currentMonth).to.equal($.format.date(currentDate, "yyyy-MM"));

            datePickerElement.find("thead tr [data-operate='previous-month']").trigger("mousedown");
            currentDate.setMonth(currentDate.getMonth() -1);
            currentMonth = datePickerElement.find("thead tr th#currentMonth").text();
            expect(currentMonth).to.equal($.format.date(currentDate, "yyyy-MM"));
        });

    });
});
