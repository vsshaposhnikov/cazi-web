angular
    .module('caziWeb')
    .factory('restFullApi', function($http, API_URL, $rootScope, $state, localStorageService, Notification) {
        return {
            sendPost: function (modelName, data) {
                return $http({
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    url: API_URL + modelName,
                    data: data
                })
                .catch(function(reason) {
                    switch (reason.data){
                        case 'invalid token':
                        case 'no token':
                            $rootScope.userInfo = {};
                            localStorageService.remove('user');
                            $state.go('authorization');
                            Notification.error({message: 'Ваш токен просрочен, авторизируйтесь снова. Сервисный код ошибки - '+ reason.data, title: 'Ошибка получения доступа'});
                            break;
                        case 'token not destroyed':
                            Notification.error({message: 'Ваш токен не удалён. Сервисный код ошибки - '+ reason.data, title: 'Ошибка выхода'});
                            break;
                        case 'wrong credentials':
                            Notification.error({message: 'Пользователя с такими данными, не существует. Сервисный код ошибки - '+ reason.data, title: 'Ошибка авторизации'});
                            break;
                        case 'no merchant points on this user':
                            Notification.warning({message: 'У вас пока нет, точек.'});
                            break;
                        case 'merchant point did not update':
                            Notification.error({message: 'Точка не обновлена. Сервисный код ошибки - '+ reason.data, title: 'Ошибка обновления точки'});
                            break;
                        case 'merchant point did not create':
                            Notification.error({message: 'Проверьте корректность вводимых данных. Сервисный код ошибки - '+ reason.data, title: 'Ошибка создания точки'});
                            break;
                        case 'user did not update':
                            Notification.error({message: 'Не возможно обновить пользователя. Сервисный код ошибки - '+ reason.data, title: 'Ошибка обновления пользователя'});
                            break;
                        case 'discount rule did not create':
                            Notification.error({message: 'Не возможно создать скидочное правило. Сервисный код ошибки - '+ reason.data, title: 'Ошибка добавления скидочного правила'});
                            break;
                        case 'discount rule did not update':
                            Notification.error({message: 'Не возможно обновить скидочное правило. Сервисный код ошибки - '+ reason.data, title: 'Ошибка обновления скидочного правила'});
                            break;
                        case 'merchantPoint not deleted':
                            Notification.error({message: 'Не возможно удалить точку. Сервисный код ошибки - '+ reason.data, title: 'Ошибка удаления точки'});
                            break;
                        case 'no discount rules on this id':
                            Notification.error({message: 'Не возможно удалить скидочное правило. Сервисный код ошибки - '+ reason.data, title: 'Ошибка удаления скидочного правила'});
                            break;
                        case 'no discount rules on this merchant point':
                            Notification.warning({message: 'У выбранной точки, пока нет скидочных правил.' });
                            break;
                        case 'no users on this merchant point':
                            Notification.warning({message: 'У выбранной точки, пока нет персонала.'});
                            break;
                        case 'duplicate email':
                            Notification.warning({message: 'Не возможно добавить пользователя. Такой email уже есть! Сервисный код ошибки - '+ reason.data, title: 'Ошибка добавления пользователя'});
                            break;
                        case 'invalid email':
                            Notification.error({message: 'Не возможно добавить пользователя, не корректный email. Сервисный код ошибки - '+ reason.data, title: 'Ошибка добавления пользователя'});
                            break;
                        case 'no user on this id':
                            Notification.error({message: 'Не возможно удалить пользователя. Сервисный код ошибки - '+ reason.data, title: 'Ошибка удаления пользователя'});
                            break;
                        case 'discount can not be more then 100%':
                            Notification.warning({message: 'Скидка не может быть более 100%. Сервисный код ошибки - '+ reason.data, title: 'Ошибка создания скидочного правила'});
                            break;
                        case 'discount rules can not overlap':
                            Notification.warning({message: 'Правила не могут пересекатся по суммам или процентным ставкам. Сервисный код ошибки - '+ reason.data, title: 'Ошибка создания скидочного правила'});
                            break;
                        case 'duplicate login':
                            Notification.warning({message: 'Пользователь с таким логином уже существует в системе. Сервисный код ошибки - '+ reason.data, title: 'Ошибка обновления пользователя'});
                            break;
                        case 'no history on this data':
                            Notification.warning({message: 'В этом заведении журнал событий, пока пуст. '});
                            break;
                        case null:
                            Notification.error({message: 'Запустите / презапустите ваш сервер!', title: 'Ошибка, сервер не принимает запросы'});
                            break;
                        default:
                            Notification.error({message: reason.data, title: 'Не известная ошибка'});
                            console.log(reason.data);
                    }

                });
            }
        };
});