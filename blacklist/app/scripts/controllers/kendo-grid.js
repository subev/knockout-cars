'use strict';

/**
 * @ngdoc function
 * @name blacklistApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the blacklistApp
 */
angular.module('blacklistApp')
  .controller('kendo-grid', function ($scope) {
    $scope.foo = 'templates work :)';


    var initialData = [
        { Id: 1, Name: 'Decision 1', Position: 1 , ContractDate : new Date('1996/12/12')},
        { Id: 2, Name: 'Decision 2', Position: 2 , ContractDate : new Date('2012/5/4')},
        { Id: 3, Name: 'Decision 3', Position: 3 , ContractDate : new Date('1998/12/30')}
    ];

    var ds = new kendo.data.DataSource({
        transport: {
          read: function(e) {
            e.success(initialData);
          },
          update: function(e) {
            e.success();
          },
          create: function(e) {
            var item = e.initialData;
            item.Id = initialData.length + 1;
            e.success(item);
          }
        },
        schema: {
          model: {
            id: 'Id',
            fields: {
              Id: { type: 'number' },
              Name: { type: 'string' },
              Position: { type: 'number' },
              ContractDate :{ type: 'date'}
            }
          }
        }
    });

    $scope.gridOptions = {
        dataSource: ds,
        scrollable: false,
        editable : true,
        navigatable: true,
        toolbar:  ['save','cancel', 'create'],
        columns: [{
          field: 'Id',
          width: 100
        }, {
          field: 'Name',
          width: 200
        }, {
          field: 'Position',
          width: 200
        }, {
          field:'ContractDate',
          width: 200,
          format:'{0:d}'
        }]
    };
});
