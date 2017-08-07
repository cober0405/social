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

    $scope.login = function () {
        location.href = "/users/login";
    };

    $scope.testHtml = "<button ng-click='clickMe()'>hahaha</button>";

    $scope.clickMe = function(){
        alert(1);
    };

    $scope.foo = 0;
    $scope.bar = 0;

    $scope.testData = 110;

    //$watch

    $scope.name = "Angular";

    // $scope.updated = -1;
    //
    // $scope.$watch('name', function() {
    //     $scope.updated++;
    // })

    //更好的写法，$watch的第二个方法接受两个参数newValue，oldValue
    $scope.updated = 0;

    $scope.$watch('name', function(newValue, oldValue) {
        if (newValue === oldValue) { return; } // AKA first run
        $scope.updated++;
    });

    //监听对象

    $scope.user = { name: "Fox" };

    $scope.userUpdated = 0;

    // $scope.$watch('user', function(newValue, oldValue) {
    //     if (newValue === oldValue) { return; }
    //     $scope.userUpdated++;
    // });

    /*呃？没用，为啥？因为$watch默认是比较两个对象所引用的是否相同，
    在例子1和2里面，每次更改$scope.name都会创建一个新的基本变量，
    因此$watch会执行，因为对这个变量的引用已经改变了。在上面的例子里，
    我们在监视$scope.user，当我们改变$scope.user.name时，对$scope.user的引用是不会改变的，
    我们只是每次创建了一个新的$scope.user.name，但是$scope.user永远是一样的。*/

    $scope.$watch('user', function(newValue, oldValue) {
        if (newValue === oldValue) { return; }
        $scope.userUpdated++;
    },true);

    /*现在有用了吧！因为我们对$watch加入了第三个参数，
    它是一个bool类型的参数，表示的是我们比较的是对象的值而不是引用。
    由于当我们更新$scope.user.name时$scope.user也会改变，所以能够正确触发。
    关于$watch还有很多tips&tricks，但是这些都是基础。*/
})
    .directive('clickable', function() {

        return {
            restrict: "E",
            scope: {
                foo: '=',
                bar: '=',
                test:'=testData'
            },
            template: '<ul style="background-color: lightblue"><li>{{foo}}</li><li>{{bar}}</li></ul>',
            link: function(scope, element, attrs ) {
                console.log(scope.test);
                element.bind('click', function() {
                    scope.foo++;
                    scope.bar++;
                    scope.$apply();
                    console.log(scope.test);

                    //更好的办法如下
                    // scope.$apply(function () {
                    //     scope.foo++;
                    //     scope.bar++;
                    // });
                });

            }
        }

    });