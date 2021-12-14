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
                document.querySelector('#order_distance').value = Math.round(length.value / 1000);

                document.querySelector('#submit').removeAttribute('disabled')

                // Запрос к геокодеру
                // 1. Создаём новый объект XMLHttpRequest
                var xhr = new XMLHttpRequest();

                var pointsCoord = []
                pointsCoord[0] = routePanelControl.routePanel.state.get("from");
                pointsCoord[1] = routePanelControl.routePanel.state.get("to");

                for (let i = 0; i <= 1; i++){

                    // 2. GET-запрос на URL
                    xhr.open('GET', 'https://geocode-maps.yandex.ru/1.x/?apikey=0af0f061-4e45-4e7f-8565-5e708931346d&format=json&geocode=' + pointsCoord[i], false);

                    // 3. Отсылаем запрос
                    xhr.send();

                    // 4. Если код ответа сервера не 200, то это ошибка
                    if (xhr.status != 200) {
                        // обработать ошибку
                        alert(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
                    } else {
                        // Записываем результат
                        if (i === 0) {
                            document.querySelector('#order_departure_locality').value = JSON.parse(xhr.response)["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["name"];
                        } else {
                            document.querySelector('#order_destination_locality').value = JSON.parse(xhr.response)["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["name"];
                        }
                    }
                }
            }
        });
    });
}


