(function () {
    var Car = function (options) {
        var that = this;

        that.id = ko.observable();
        that.pictureUrl = ko.observable();
        that.make = ko.observable().extend({ required: true });
        that.model = ko.observable().extend({ required: true });
        that.date = ko.observable();
        that.plateNumber = ko.observable();
        that.available = ko.observable();
        that.coords = ko.observable();
        that.formattedName = ko.computed(this.formattedName, that);

        that.errors = ko.validation.group(that);

        that.update(options);
    };

    ko.utils.extend(Car.prototype, {
        formattedName: function () {
            return this.make() + " " + this.model();
        },
        update: function (options) {
            var that = this;
            that.id(options.id || 0); //todo
            that.pictureUrl(options.pictureUrl || "http://4.bp.blogspot.com/-Jb0tgFtBByM/UvpGPMC8psI/AAAAAAAAAPE/ByAbeJWQBZM/s1600/auto+clipart+2.png");
            if (options.make && $.isPlainObject(options.make)) {
                that.make(options.make.name || "bmw");
            }else {
                that.make(options.make || "bmw");
            }
            that.model(options.model || "unknown");
            that.date(options.date || '12/12/2012');
            that.plateNumber(options.plateNumber || "A0000AA");
            that.available(options.available);
            that.coords(options.coords || {
                lat: 0,
                lng: 0
            });
        }
    });

    var maps = google.maps;
    var AppModel = function (initial) {
        var stored = localStorage && localStorage["ko-cars"];
        if (stored) {
            //commented for testing
            initial = JSON.parse(stored);
        }

        var that = this;
        that.cars = ko.observableArray(ko.utils.arrayMap(initial, function (item) {
            return new Car(item);
        }));
        that.editItem = ko.observable(null);
        that.pristine = ko.observable(null);

        that.editVisible = ko.computed(function () {
            return this.editItem() !== null;
        }, that);

        that.edit = that.edit.bind(that);
        that.create = that.create.bind(that);
        that.destroy = that.destroy.bind(that);
        that.save = that.save.bind(that);
        that.cancel = that.cancel.bind(that);
        that.showOnMap = that.showOnMap.bind(that);

        that.sortedCars = ko.computed(this.getSortedCars, this);

        that.manufactorers = ko.observable(manufactorers);

        this.map = new maps.Map($('#map')[0], {
            center: {
                lat: 42.71613138564328,
                lng: 25.433950424194336
            }, //show bulgaria
            zoom: 7
        });

        that.cars.subscribe(that.showMarkersForCars, that);
        that.cars.subscribe(that.persistChanges, that);

        maps.event.addListener(this.map, "click", this.updateEditableCoordsOnClick.bind(this));
        that.showMarkersForCars.call(that);
    };

    ko.utils.extend(AppModel.prototype, {
        getSortedCars: function () {
            return this.cars().sort(function (left, right) {
                return left.available() == right.available() ? 0 : (left.available() ? -1 : 1);
            });
        },
        create: function () {
            this.editItem(new Car({}));
        },
        edit: function (item) {
            this.pristine(item);

            this.editItem(new Car(ko.toJS(item)));
            //set model to complex object again to pre-select ddls
            var complexMake = $.grep(manufactorers, function (val) {
                return val.name == item.make();
            })[0];

            this.editItem().make(complexMake);
        },
        updateEditableCoordsOnClick: function(clickArgs) {
            if (this.editItem() !== null) {
                this.editItem().coords({ lat:clickArgs.latLng.lat(), lng: clickArgs.latLng.lng()});
            }
        },
        save: function () {
            var pristine = this.pristine();
            var submitted = this.editItem();
            if (submitted.errors().length !== 0) {
                return;
            }
            if (pristine) {
                pristine.update(ko.toJS(submitted));
            } else {
                var cars = this.cars();
                submitted.id(cars.length);
                this.cars.push(new Car(ko.toJS(submitted)));
            }
            this.cars.valueHasMutated(); //refresh the markers

            this.pristine(null);
            this.editItem(null);
        },
        cancel: function () {
            this.pristine(null);
            this.editItem(null);
        },
        destroy: function (model) {
            if (confirm("Are you sure you want to remove the item?")) {
                this.cars.remove(model);
            }
        },
        showMarkersForCars: function() {
            var that = this;

            if (that.markers) {
                $.each(that.markers, function (idx, marker) {
                    marker.setMap(null);
                });
            }

            that.markers = ko.utils.arrayMap(that.cars(), function (item) {
                return new maps.Marker({
                    position: item.coords(),
                    map: that.map
                });
            });
        },
        showOnMap: function (item) {
            var newCoords = item.coords();

            this.map.panTo(newCoords);
            this.map.setZoom(17);
        },
        persistChanges: function() {
            if(localStorage){
                var cars = ko.toJS(this.cars());
                localStorage["ko-cars"] = JSON.stringify(cars);
            }
        }
    });

    $(function() {
        window.model = new AppModel(initial);
        ko.applyBindings(model);
    });
})();
