'use strict';

angular.module('blacklistApp').factory('complaintSvc', function () {
    var complaints = [{
            id: 1,
            title: 'X going over the limits',
            description: 'I am part of Mtel for many years and I have not seen anthing like this. Blabla ...'
        }];

    return {
        getComplaints: function(cb) {
            setTimeout(function() {
                cb(complaints);
            }, 200);
        },
        createComplain: function(complaint) {
            complaint.id = complaints.length;
            complaints.push(complaint);
        },
        getComplaint: function(id) {
            return complaints.find(function(val) {
                return val.id === id;
            })[0];
        }
    };
});
