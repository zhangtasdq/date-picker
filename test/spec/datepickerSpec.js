describe("datepicker 测试", function() {
    "use strict";

    it("$.fn.datepicker 应该存在", function() {
        expect($.fn.datepicker).to.be.a("function");
    });

    describe("基础测试", function() {
        var inputElement = null,
            datePickerElement = null,
            datePicker = null;

        before(function() {
            inputElement = $("#date_picker_input");
            datePicker = inputElement.datepicker();
            datePickerElement = $(".date-picker-container");
            inputElement.on("focus", function() {
                datePicker.show();
            }).on("blur", function() {
                datePicker.hide();
            });
        });

        after(function() {
            datePicker.destroy();
        });

        it("应该在页面添加时间控件的元素", function() {
            expect(datePickerElement.length).to.equal(1);
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
                currentDay = date.getDay();
            // 获取当前日期下一天的 tr 元素并点击
            var nextDayTr = $(datePickerElement.find("tbody td")[currentDay]);
            nextDayTr.trigger("mousedown");

            var nextDate = new Date();
            nextDate.setDate(nextDate.getDate() + 1);

            expect(inputElement.val()).to.equal($.format.date(nextDate, "yyyy/MM/dd"));
        });

        it("点击切换月份的箭头时,标题栏的日期应该相应改变", function() {
            var currentDate = new Date();
            datePickerElement.find("thead tr [data-operate='next-month']").trigger("mousedown");
            currentDate.setMonth(currentDate.getMonth() +1);
            var currentMonth = datePickerElement.find("thead tr th#currentMonth").text();
            expect(currentMonth).to.equal($.format.date(currentDate, "yyyy/MM"));

            datePickerElement.find("thead tr [data-operate='previous-month']").trigger("mousedown");
            currentDate.setMonth(currentDate.getMonth() -1);
            currentMonth = datePickerElement.find("thead tr th#currentMonth").text();
            expect(currentMonth).to.equal($.format.date(currentDate, "yyyy/MM"));
        });

        it("可以销毁时间控件", function() {
            datePicker.destroy();
            expect( $(".date-picker-container").length).to.equal(0);
        });

    });

    describe("回调测试", function() {
        var inputElement = null,
            datePicker = null,
            sinonFn = null;

        beforeEach(function() {
            inputElement = $("#date_picker_input");
            sinonFn = sinon.spy();
        });

        afterEach(function() {
            datePicker.destroy();
        });

        it("点击日期时,应该调用回调用函数", function() {
            datePicker = inputElement.datepicker({
                selectDate: sinonFn
            });
            var datePickerElement = $(".date-picker-container");
            var clickElement = datePickerElement.find("tbody td:eq(12)");
            clickElement.trigger("mousedown");
            expect(sinonFn.calledOnce).to.equal(true);
        });

        it("点击切换月份时,应该调用回调用函数", function() {
            datePicker = inputElement.datepicker({
                changeMonth: sinonFn
            });
            var datePickerElement = $(".date-picker-container");
            datePickerElement.find("thead tr [data-operate='next-month']").trigger("mousedown");
            expect(sinonFn.calledOnce).to.equal(true);
        });

        it("显示时间控件前, 应该调用回调函数", function() {
            datePicker = inputElement.datepicker({
                beforeShow: sinonFn
            });
            datePicker.show();
            expect(sinonFn.calledOnce).to.equal(true);
        });

        it("显示时间控件后, 应该调用回调函数", function() {
            datePicker = inputElement.datepicker({
                afterShow: sinonFn
            });
            datePicker.show();
            expect(sinonFn.calledOnce).to.equal(true);
        });

        it("隐藏时间控件前, 应该调用回调函数", function() {
            datePicker = inputElement.datepicker({
                beforeHide: sinonFn
            });
            datePicker.show();
            datePicker.hide();
            expect(sinonFn.calledOnce).to.equal(true);
        });

        it("显示时间控件后, 应该调用回调函数", function() {
            datePicker = inputElement.datepicker({
                afterHide: sinonFn
            });
            datePicker.show();
            datePicker.hide();
            expect(sinonFn.calledOnce).to.equal(true);
        });

    });

    describe("起始日期测试", function() {
        var inputElement = null,
            datePickerElement = null,
            startDate = null,
            datePicker = null,
            sinonFn = sinon.spy();

        before(function(done) {
            inputElement = $("#date_picker_input");
            startDate = new Date();
            datePicker = inputElement.datepicker({
                startDate: startDate,
                selectOldDate: sinonFn,
                changeMonth: function() {
                    datePickerElement = $(".date-picker-container");
                    datePickerElement.find("tbody td:eq(12)").trigger("mousedown");
                },
                selectDate: function() {
                    done();
                }
            });
            datePickerElement = $(".date-picker-container");
            datePickerElement.find("thead tr [data-operate='previous-month']").trigger("mousedown");
            done();
        });

        after(function() {
            datePicker.destroy();
        });

        it("早于起始日期的日期应该有类 'previous'", function() {
            datePickerElement = $(".date-picker-container");
            var clickElement = datePickerElement.find("tbody td:eq(12)");
            expect(clickElement.hasClass("previous")).to.equal(true);
        });

        it("点击早于起始日期的日期应该调用回调用函数", function() {
            expect(sinonFn.calledOnce).to.equal(true);
        });
    });
});
