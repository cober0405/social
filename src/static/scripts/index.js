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
}]).controller('MainController',function ($scope,$sce) {
    $scope.testHtml = "<button ng-click='clickMe()'>hahaha</button>";

    $scope.clickMe = function(){
        alert(1);
    };

    $scope.foo = 0;
    $scope.bar = 0;


    $scope.list = ["https://cdn.kemeiapp.com/upload/topic/videoUrl/1481685827672/1481685827672.mp4",
        "https://cdn.kemeiapp.com/upload/topic/videoUrl/1481530002746/1481530002746.mp4"];


    $scope.add = function(url){
        return $sce.trustAsResourceUrl(url);
    }

    $scope.open = function () {
        $scope.bTrue = true;
    }
})
    .directive('clickable', function() {

        return {
            restrict: "E",
            scope: {
                foo: '=',
                bar: '='
            },
            template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
            link: function(scope, element, attrs ) {
                element.bind('click', function() {
                    scope.foo++;
                    scope.bar++;

                    scope.$apply();
                });
            }
        }

    });