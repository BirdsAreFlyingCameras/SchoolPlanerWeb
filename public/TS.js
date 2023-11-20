"use strict";
exports.__esModule = true;
var utils_js_1 = require("./utils.js");
var utils_js_2 = require("./utils.js");
var NamesOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
fetch('http://localhost:3000/Info').then(function (response) { return response.json().then(function (OutputJson) {
    var ParsedJSON = JSON.parse(JSON.stringify(OutputJson));
    console.log(ParsedJSON);
    var _loop_1 = function (Day) {
        var DateNumber = (ParsedJSON[Day][0]['DATENUMBER']);
        console.log(DateNumber);
        var DayHeader = document.getElementById("".concat(Day, "Header"));
        var DayHeaderContainer = document.createElement('h3');
        DayHeaderContainer.textContent = "".concat(Day, "-").concat(DateNumber);
        DayHeader.appendChild(DayHeaderContainer);
        var length_1 = Object.keys(ParsedJSON[Day]).length;
        var _loop_2 = function (i) {
            var task = (ParsedJSON[Day][i]['ASSIGNMENT']);
            var DayList = (0, utils_js_1.getElementById)("".concat(Day, "Items"));
            var li = document.createElement('li');
            var SubTag = document.createElement('button');
            SubTag.textContent = task;
            SubTag.classList.add('button');
            li.appendChild(SubTag);
            DayList.appendChild(li);
            if (ParsedJSON[Day][i]['DONE'] == 1) {
                SubTag.classList.toggle('button');
                SubTag.classList.toggle('strikethrough');
            }
            SubTag.addEventListener('click', function () {
                console.log("Button Pressed: ".concat(task));
                SubTag.classList.toggle('button');
                SubTag.classList.toggle('strikethrough');
                if (SubTag.classList.contains('strikethrough')) {
                    console.log('strikethrough');
                    var Item = [{
                            Day: Day,
                            Assignment: task,
                            Done: 1
                        }];
                    var ItemString = JSON.stringify(Item);
                    console.log("Json Sent: ".concat(ItemString));
                    (0, utils_js_2.PostData)(ItemString).then(function (response) {
                        console.log(response);
                    });
                }
                else {
                    console.log('button');
                    var Item = [{
                            Day: Day,
                            Assignment: task,
                            Done: 0
                        }];
                    var ItemString = JSON.stringify(Item);
                    console.log("Json Sent: ".concat(ItemString));
                    (0, utils_js_2.PostData)(ItemString).then(function (response) {
                        console.log(response);
                    });
                }
            });
        };
        for (var i = 0; i < length_1; i++) {
            _loop_2(i);
        }
    };
    for (var _i = 0, NamesOfDays_1 = NamesOfDays; _i < NamesOfDays_1.length; _i++) {
        var Day = NamesOfDays_1[_i];
        _loop_1(Day);
    }
}); });
