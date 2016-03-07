;(function($) {
    "use strict";

    function DatePicker(element, options) {
        this._element = element;
        this.options = $.extend({}, this.defaultOptions, options);
        this.init();
    }

    DatePicker.prototype = {
        constructor: DatePicker,

        defaultOptions: {
            dateFormat: "yyyy-MM-dd",
            monthFormat: "yyyy-MM",
            focusShow: true,
            defaultRelativePosition: {
                left: 0,
                top: 10
            },
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
            dayItem: "<td><%= day %></td>",
            wrapper: "<div class='date-picker-container hide'><table></table></div>"
        },
        templateReplaceReg: /<%=\s*(\w+)\s*%>/g,

        compileTemFn: function(template, value) {
            return template.replace(this.templateReplaceReg, function(match, key) {
                return value[key];
            });
        },

        init: function() {
            this.setInitialDate();
            this.__datePicker = $(this.template.wrapper);
            $("body").append(this.__datePicker);
            this.render(this._currentDate);
        },

        setInitialDate: function() {
            if (this.options.startDate) {
                this._currentDate = new Date(this.options.startDate);
            } else {
                this._currentDate = new Date();
            }
        },

        render: function(date) {
            this.__datePicker.find("table").html(this.buildViewStr(date));
            this.bindEventHandler();
        },

        buildViewStr: function(date) {
            var result = "";
            var dateArray = this.getDateArrayOfMonth(date);
            result += this.compileDateHead(date);
            result += this.compileDateBody(dateArray);
            return result;
        },

        getDateArrayOfMonth: function(date) {
            var tmpDate = new Date(date),
                firstDay = null,
                currentMonth = tmpDate.getMonth(),
                currentDate = null,
                result = [];

            tmpDate.setDate(1);
            firstDay = tmpDate.getDay();

            for(var i = 1; i < firstDay; i++) {
                result.push("");
            }
            do {
                currentDate = tmpDate.getDate();
                result.push(currentDate);
                tmpDate.setDate(currentDate + 1);
            } while(tmpDate.getMonth() === currentMonth);

            return result;
        },


        compileDateBody: function(dateArray) {
            var result = "<tbody><tr>";

            for(var i = 1; i <= dateArray.length; i++) {
                result = result + this.compileTemFn(this.template.dayItem, {day: dateArray[i - 1]});
                if (i % 7 === 0) {
                    result = result + "</tr>";
                }
            }
            return result + "</tr></tbody>";
        },

        compileDateHead: function(date) {
            var headData = {
                currentMonth: this.dateFormat(date, this.options.monthFormat),
                previousMonthIcon: this.options.previousMonthIcon,
                nextMonthIcon: this.options.nextMonthIcon
            };
            $.extend(headData, $.fn.datepicker._translate.week);
            return this.compileTemFn(this.template.head, headData);
        },

        dateFormat: function(date, fmt) {
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

        placeDatePicker: function() {
            var targetElementPosition = this._element.offset(),
                position = this.options.position;

            if (!position) {
                position = {
                    top: targetElementPosition.top +
                         this._element.height() +
                         this.options.defaultRelativePosition.top,
                    left: targetElementPosition.left + this.options.defaultRelativePosition.left
                };
            }
            this.__datePicker.css({
                left: position.left + "px",
                top: position.top + "px"
            });
        },

        bindEventHandler: function() {
            this.bindFocusHandler();
            this.bindClickDateHandler();
            this.bindChangeMonthHandler();
        },

        bindFocusHandler: function() {
            var self = this;
            if (self._element.is("input") && self.options.focusShow) {
                self._element.on("focus", function() {
                    self.show();
                });
                self._element.on("blur", function() {
                    self.hide();
                });
            }
        },

        bindClickDateHandler: function() {
            var self = this;

            self.__datePicker.find("tbody").on("mousedown", function(event) {
                event.preventDefault();
                var target = $(event.target);
                if (target.is("td")) {
                    self.__datePicker.find("tbody td").removeClass("active");
                    target.addClass("active");
                    self._currentDate.setDate(parseInt(target.text()));
                    self.updateInputValue();
                }
            });
        },

        bindChangeMonthHandler: function() {
            var self = this;

            self.__datePicker.find("thead").on("mousedown", function(event) {
                var target = $(event.target),
                    operate = target.attr("data-operate");
                event.preventDefault();
                if (operate) {
                    if (operate === "previous-month") {
                        self._currentDate.setMonth(self._currentDate.getMonth() -1);
                    } else if (operate === "next-month") {
                        self._currentDate.setMonth(self._currentDate.getMonth() +1);
                    }
                    self.render(self._currentDate);
                }
            });
        },

        show: function() {
            this.placeDatePicker();
            this.__datePicker.removeClass("hide");
        },

        hide: function() {
            this.__datePicker.addClass("hide");
        },

        updateInputValue: function() {
            this._element.val(this.dateFormat(this._currentDate, this.options.dateFormat));
        }
    };

    $.fn.datepicker = function(options) {
        return new DatePicker(this, options);
    };
}($));
