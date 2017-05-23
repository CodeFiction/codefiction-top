"use strict";
/**
 * Created by ugur on 2016-12-26.
 */
exports.__esModule = true;
var Datastructure;
(function (Datastructure) {
    var TopperStack = (function () {
        function TopperStack(object) {
            this.toppers = [];
            this.toppers = object;
        }
        TopperStack.prototype.TopperStack = function () {
        };
        TopperStack.prototype.setList = function (list) {
            this.toppers = list;
        };
        TopperStack.prototype.getList = function () {
            return this.toppers;
        };
        TopperStack.prototype.push = function (element) {
            var index = this.findElementByName(element);
            index === -1 && this.toppers.push(element);
            return index;
        };
        TopperStack.prototype.topThat = function (element) {
            var index = this.findElementIndex(element);
            if (index > -1) {
                this.toppers.splice(index, 1);
                this.toppers.unshift(element);
            }
        };
        TopperStack.prototype.remove = function (element) {
            var index = this.findElementIndex(element);
            if (index > -1) {
                this.toppers.splice(index, 1);
            }
        };
        TopperStack.prototype.findElementIndex = function (element) {
            return this.toppers.map(function (e) { return e.id; }).indexOf(element.id);
        };
        TopperStack.prototype.findElementByName = function (element) {
            return this.toppers.map(function (e) { return e.name; }).indexOf(element.name);
        };
        return TopperStack;
    }());
    Datastructure.TopperStack = TopperStack;
})(Datastructure = exports.Datastructure || (exports.Datastructure = {}));
