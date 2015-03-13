(function () {

    var log = require('./modules/log');
    log();

    var angular = require('angular');

    var projects = [
        {
            id: 152,
            name: "Project Foo"
        },
        {
            id: 694,
            name: "Bar Baz"
        },
        {
            id: 909,
            name: "The Greatest Project"
        }
    ];


    var app = angular.module('app', []);

    // TODO
    // can I make my own fuzzy search filter?
    // keyboard navigation of "dropdown"
    app.controller('myController', ['$scope', function ($scope) {
        $scope.searchTerm = "";
        $scope.tasks = projects;
        $scope.taskSelected = false;


        $scope.setText = function (clicked) {
            $scope.searchTerm = clicked;
            $scope.taskSelected = true;
        };

        $scope.searchTermChanged = function () {
            console.log('searchTermChanged', $scope.searchTerm);
            if ($scope.taskSelected) {
                $scope.taskSelected = false;
            }
        };

    }]);

    app.controller('svgController', ['$scope', function ($scope) {

        $scope.points = [
            {x: 10, y: 45, radius: 2},
            {x: 45, y: 2, radius: 4},
            {x: 16, y: 23, radius: 5},
            {x: 3, y: 15, radius: 4},
            {x: 22, y: 8, radius: 3}
        ];

        $scope.addPoint = function (e) {
            console.log(e);
            $scope.points.push({x: 50, y: 50, radius: 2});
        };

        $scope.deletePoint = function (point) {
            var newPoints = [];
            angular.forEach($scope.points, function (value, key) {
                if (value !== point) {
                    newPoints.push(value);
                }
            });
            $scope.points = newPoints;
        };

    }]);

}());
