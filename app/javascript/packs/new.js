ymaps.ready(init);

function init() {
    myMap = new ymaps.Map('map', {
        center: [60.906882, 30.067233],
        zoom: 9,
        controls: []
    }),
        // Создадим панель маршрутизации.
        routePanelControl = new ymaps.control.RoutePanel({
            options: {
                // Добавим заголовок панели.
                showHeader: true,
                title: 'Расчёт доставки'
            }
        }),
        zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: 'small',
                float: 'none',
                position: {
                    bottom: 145,
                    right: 10
                }
            }
        });
    // Пользователь сможет построить только автомобильный маршрут.
    routePanelControl.routePanel.options.set({
        types: {auto: true}
    });

    myMap.controls.add(routePanelControl).add(zoomControl);

    // Получим ссылку на маршрут.
    routePanelControl.routePanel.getRouteAsync().then(function (route) {

        // Зададим максимально допустимое число маршрутов, возвращаемых мультимаршрутизатором.
        route.model.setParams({results: 1}, true);

        // Повесим обработчик на событие построения маршрута.
        route.model.events.add('requestsuccess', function () {

            var activeRoute = route.getActiveRoute();
            if (activeRoute) {
                // Получим протяженность маршрута.
                var length = route.getActiveRoute().properties.get("distance");

                document.querySelector('#order_coordinates_from').value = routePanelControl.routePanel.state.get("from");
                document.querySelector('#order_coordinates_to').value = routePanelControl.routePanel.state.get("to");
                document.querySelector('#submit').removeAttribute('disabled')

            }
        });

    });

    // Вычисление общего объёма груза
    var elements = document.querySelectorAll('.elem-for-calculate-volume');

    // Проверка длины, ширины и высоты (целое число и не пустая строка)
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninput = function() {
            if (
                (/^\d{1,}(.\d{1,})?$/.test(elements[0].value) &&
                 /^\d{1,}(.\d{1,})?$/.test(elements[1].value) &&
                 /^\d{1,}(.\d{1,})?$/.test(elements[2].value))
            ) {
                document.querySelector('#order_overall_volume').value = Math.round(Number(elements[0].value) * Number(elements[1].value) * Number(elements[2].value))
            } else {
                document.querySelector('#order_overall_volume').value = ''

            }
        }
    }
}


