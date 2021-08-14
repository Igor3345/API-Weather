


document.querySelector('.city_input button').onclick = clean;
document.querySelector('body').onload = weather;

/*Функиця создающая элементы */

function createElements(tagName, classNames, attributes) {
    const element = document.createElement(tagName);
    if (classNames) {
        element.classList.add(...classNames);
    };
    if (attributes) {
        for (const attribute in attributes) {
            element[attribute] = attributes[attribute];
        };
    };
    return element;
};


/*Функция очистки экрана от результатов предыдущего запуска функции weather */
function clean() {
    let unit = document.querySelectorAll('.weather_unit');
    for (let i = 0; i < 9; i++) {
        unit[i].remove();
    }

    weather();
}

function weather() {

    let city_name = document.querySelector('.city_input input').value;
    console.log(city_name)

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&lang=ru&appid=c7fb15eff140bcfc6d10c373a19bfc55`)
        .then(function (data) { return data.json() })
        .then(function (data) {

            if (data) {
                /*Generals table*/
                document.querySelector('.city_box .city_date .city_name').textContent = data.city.name;
                document.querySelector('.city_box .city_date .date').textContent = data.list[0].dt_txt;
                document.querySelector('.city_box .city_weather .feature_weather').textContent = data.list[0].weather[0].main;
                document.querySelector('.city_box .city_weather .temperature').innerHTML = Math.floor(data.list[0].main.temp) + '&deg C';
                document.querySelector('.weather_general .general_weather_icon').innerHTML = `<img class='ganeral_icon' src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="">`;
                /*Добавление прогноза погоды в горизонтальную линию по временной шкале*/

                const weather_box = document.querySelector('.weather_line');

                for (let i = 1; i <= 9; i++) {

                    let unit = createElements('div', ['weather_unit']);
                    let day = createElements('span', ['day_of_week'], { textContent: data.list[i].dt_txt });
                    unit.append(day);
                    let icon = createElements('div', ['list_icon']);
                    let icon_img = createElements('img', ['general_icon'], { src: `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`, alt: " " });
                    icon.append(icon_img);
                    unit.append(icon);
                    let temperature = createElements('span', ['temperature'], { innerHTML: Math.floor(data.list[1].main.temp) + '&deg C' });
                    unit.append(temperature);
                    weather_box.append(unit)
                };
            } else {
                document.querySelector('.weather__error').style.display = 'block';
            }
        });
}


