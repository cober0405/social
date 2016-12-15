/**
 * Created by Cober on 2016/12/15.
 */

//demo 实现ng-bind-html中的指令生效
var app = angular.module('app',[]);

app.directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        )};
}]).controller('MainController',function ($scope) {
    $scope.testHtml = "<button ng-click='clickMe()'>hahaha</button>";

    $scope.clickMe = function(){
        alert(1);
    };
});