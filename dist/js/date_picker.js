/*! date-picker - v0.0.1-dev - 2016-04-02 */
;(function($) {
    "use strict";

    function DatePicker(element, options) {
        this.__targetElement = element;
        this.options = $.extend({}, this.defaultOptions, options);
        this.__init();
    }

    DatePicker.prototype = {
        constructor: DatePicker,

        defaultOptions: {
            dateFormat: "yyyy/MM/dd",
            monthFormat: "yyyy/MM",
            defaultRelativePosition: {
                left: 0,
                top: 10
            },
            selectDate: $.noop,
            changeMonth: $.noop,
            beforeShow: $.noop,
            afterShow: $.noop,
            beforeHide: $.noop,
            afterHide: $.noop,
            selectOldDate: function() { return true; },
            previousMonthIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAAChCAYAAAB+ttvGAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMHBzo5fwSzvwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJ0SURBVHja7d3BDYAgEABBsCX6L4GatAF+fow72wEHk8CLOfSqtdb917XtvWdhD6djDEAZAAQA5AFAAEAeAAQA5AFAAEAeAAQA5AFAAEAeAAQA2H8IABAEAAgCAGQgAEBgBABAIAAgEAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQAAAABAAAAAEAAEAAAAAQACAIqgAEAQCCAABBAIAgAEAQACAIABAEAKiOAAClEQCgNAIAlEYAgNIIAFAaAQBKIwBAaQQAKI0AAKURAKA0AgBU7jICQSC5DnkTCIIBgiAAQRCAIAhAEAQgCAIQBAEIggAEQQCCIABBEIAgCEAQBCAIAhAEAQiCAARBAIIgAEEQgHDKZ94QgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIEAAAggQgAACBCCAAAEIIHy4B/k/IVKSuxe2AAAAAElFTkSuQmCC",
            nextMonthIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAAChCAYAAACVgWDFAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AMHBzsWzc6/pwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAJ3SURBVHja7d2xDYAwDADBhJW8/wiZCQokCiqIUoB9v0EsndzFvRUrIvaM7xpj9KbpSg4PBoEAg0CAQSDAIBBgEAgwCAQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEGCAAQQYYAABBhhAgAEGEAQDCIIBBMEAgmAAQTCAIBhAEAyfwwACDDCAAAMMIMAAAwgwwAACDDCAAAMMIMAAAwgwwAACDDCAAAMMIMAAAwgwwAACDDCAAAMMIAiG9xCyDkx5W41hM1LZdiAIBhAEAwiCAQTBAIJgAEEwgCAYQBAMIAgGEAQDCILhAQYQBAMIggEEwQCCYABBMNwwgCAYQBAMJwYQJBAkEKTrNwwQVB4BCIIABEEAgiAAQRCAIAhAEAQgCAIQBAEIggAEQQCCIABBEIAgCEAQBCAIAhAEwUwOjicu8/3s1XeWQYCgPAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCECAAAIQIIAABAggAAECCH7ZAcy3Mn9kU+0iAAAAAElFTkSuQmCC"
        },

        template: {
            head: "<thead>" +
                    "<tr>" +
                      "<th class='change-month' >" +
                        "<img data-operate='previous-month' src='<%= previousMonthIcon%>' alt='previous month' />" +
                      "</th>" +
                      "<th colspan='5' id='currentMonth'><%= currentMonth %></th>" +
                      "<th class='change-month' >" +
                        "<img src='<%= nextMonthIcon%>' alt='next month' data-operate='next-month'/>" +
                      "</th>" +
                    "</tr>" +
                    "<tr>" +
                      "<th><%= mon%></th>" +
                      "<th><%= tue%></th>" +
                      "<th><%= wed%></th>" +
                      "<th><%= thu%></th>" +
                      "<th><%= fri%></th>" +
                      "<th><%= sat%></th>" +
                      "<th><%= sun%></th>" +
                    "</tr>" +
                  "</thead>",
            body: "<tbody>",
            dayItem: "<td class='<%= className%>'><%= day %></td>",
            wrapper: "<div class='date-picker-container hide'><table></table></div>"
        },
        templateReplaceReg: /<%=\s*(\w+)\s*%>/g,

        compileTemFn: function(template, value) {
            return template.replace(this.templateReplaceReg, function(match, key) {
                return value[key];
            });
        },

        __init: function() {
            this.__setInitialDate();
            this.__datePicker = $(this.template.wrapper);
            $("body").append(this.__datePicker);
            this.__render(this.__currentDate);
        },

        __setInitialDate: function() {
            if (this.options.startDate) {
                this.__currentDate = new Date(this.options.startDate);
                this.__initialDate = new Date(this.options.startDate);
            } else {
                this.__currentDate = new Date();
                this.__initialDate = new Date();
            }
        },

        __render: function(date) {
            this.__datePicker.find("table").html(this.__buildViewStr(date));
            this.__bindEventHandler();
        },

        __buildViewStr: function(date) {
            var result = "";
            var dateArray = this.__getDateArrayOfMonth(date);
            result += this.__compileDateHead(date);
            result += this.__compileDateBody(dateArray);
            return result;
        },

        __getDateArrayOfMonth: function(date) {
            var tmpDate = new Date(date),
                firstDay = null,
                currentMonth = tmpDate.getMonth(),
                currentDate = null,
                result = [];

            tmpDate.setDate(1);
            firstDay = tmpDate.getDay();

            for(var i = 1; i < firstDay; i++) {
                result.push({
                    day: "",
                    type: "null"
                });
            }
            do {
                currentDate = tmpDate.getDate();
                result.push({
                    day: currentDate,
                    type: this.__judgeDateType(tmpDate, this.__initialDate)
                });
                tmpDate.setDate(currentDate + 1);
            } while(tmpDate.getMonth() === currentMonth);

            return result;
        },

        __judgeDateType: function(targetDate, compareDate) {
            return targetDate < compareDate ? "previous" :
                                              targetDate > compareDate ? "next" : "current";
        },

        __compileDateBody: function(dateArray) {
            var result = "<tbody><tr>";
            for(var i = 1; i <= dateArray.length; i++) {
                result = result + this.compileTemFn(this.template.dayItem, {
                    day: dateArray[i - 1].day,
                    className: dateArray[i - 1].type
                });
                if (i % 7 === 0) {
                    result = result + "</tr>";
                }
            }
            return result + "</tr></tbody>";
        },

        __compileDateHead: function(date) {
            var headData = {
                currentMonth: this.__dateFormat(date, this.options.monthFormat),
                previousMonthIcon: this.options.previousMonthIcon,
                nextMonthIcon: this.options.nextMonthIcon
            };
            $.extend(headData, $.fn.datepicker.__translate.week);
            return this.compileTemFn(this.template.head, headData);
        },

        __dateFormat: function(date, fmt) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
            };
            if (/(y+)/.test(fmt)){
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").
                          substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).
                              substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },

        __placeDatePicker: function() {
            var targetElementPosition = this.__targetElement.offset(),
                position = this.options.position;

            if (!position) {
                position = {
                    top: targetElementPosition.top +
                         this.__targetElement.height() +
                         this.options.defaultRelativePosition.top + "px",
                    left: targetElementPosition.left + this.options.defaultRelativePosition.left + "px"
                };
            }
            this.__datePicker.css(position);
        },

        __bindEventHandler: function() {
            this.__bindClickDateHandler();
            this.__bindChangeMonthHandler();
        },

        __bindClickDateHandler: function() {
            var self = this;

            self.__datePicker.find("tbody").on("mousedown", function(event) {
                event.preventDefault();
                var target = $(event.target);
                if (target.is("td") && !target.hasClass("null")) {
                    var selectDay = parseInt(target.text()),
                        previousDate = new Date(self.__currentDate),
                        selectDate = new Date(previousDate);

                    selectDate.setDate(selectDay);

                    if ((!target.hasClass("previous") || self.options.selectOldDate(previousDate, selectDate))) {
                        changeBySelectDay(target, previousDate, selectDate);
                    }
                }
            });

            function changeBySelectDay(target, previousDate, selectDate) {
                self.__datePicker.find("tbody td").removeClass("active");
                target.addClass("active");
                self.__currentDate = new Date(selectDate);
                self.options.selectDate(new Date(self.__currentDate), previousDate);
                self.updateInputValue();
            }
        },

        __bindChangeMonthHandler: function() {
            var self = this;

            self.__datePicker.find("thead").on("mousedown", function(event) {
                var target = $(event.target),
                    operate = target.attr("data-operate");

                event.preventDefault();
                if (operate) {
                    if (operate === "previous-month") {
                        self.__currentDate.setMonth(self.__currentDate.getMonth() -1);
                    } else if (operate === "next-month") {
                        self.__currentDate.setMonth(self.__currentDate.getMonth() +1);
                    }
                    self.__render(self.__currentDate);
                    self.options.changeMonth(self.__currentDate, event, operate);
                }
            });
        },

        show: function() {
            this.options.beforeShow();
            this.__placeDatePicker();
            this.__datePicker.removeClass("hide");
            this.options.afterShow();
        },

        hide: function() {
            this.options.beforeHide();
            this.__datePicker.addClass("hide");
            this.options.afterHide();
        },

        updateInputValue: function() {
            this.__targetElement.val(this.__dateFormat(this.__currentDate, this.options.dateFormat));
        },

        destroy: function() {
            this.__datePicker.remove();
            this.__targetElement.off("focus");
            this.__targetElement.off("blur");
        }
    };

    $.fn.datepicker = function(options) {
        return new DatePicker(this, options);
    };
}($));

;(function($) {
    "use strict";

    $.fn.datepicker.__translate = {
        week: {
            mon: "一",
            tue: "二",
            wed: "三",
            thu: "四",
            fri: "五",
            sat: "六",
            sun: "七"
        }
    };
}($));
