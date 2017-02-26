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
                            localStorageService.remove('user');
                            $rootScope.user = null;
                            $state.go('authorization');
                            Notification.warning({message: 'Ваш токен прострочений, авторизируйтесь знову. Сервісний код помилки - '+ reason.data, title: 'Помилка отримання доступу'});
                            break;
                        case 'token not destroyed':
                            Notification.error({message: 'Ваш токен не видалено. Сервісний код помилки - '+ reason.data, title: 'Помилка виходу'});
                            break;
                        case 'wrong credentials':
                            Notification.warning({message: 'Користувача з такими даними, не існує.', title: 'Перевірте введені дінні'});
                            break;
                        case 'user did not update':
                            Notification.error({message: 'Не можливо обновити користувача. Сервісний код помилки - '+ reason.data, title: 'Помилка обновлення користувача'});
                            break;
                        case 'duplicate email':
                            Notification.warning({message: 'Не можливо додати користувача. Такой email вже є у системі! Сервісний код помилки - '+ reason.data, title: 'Помилка додавання користувача'});
                            break;
                        case 'invalid email':
                            Notification.error({message: 'Не можливо додати користувача. Email не є корректним! Сервісний код помилки - '+ reason.data, title: 'Помилка додавання користувача'});
                            break;
                        case 'duplicate login':
                            Notification.warning({message: 'Користувача з таким логіном вже існує у системі. Сервісний код помилки - '+ reason.data, title: 'Помилка обновлення користувача'});
                            break;
                        case null:
                            Notification.error({message: 'Запустіть / перезапустіть ваш сервер!', title: 'Помилка, сервер не приймає запроси'});
                            break;
                        default:
                            Notification.error({message: 'Сервісний код помилки - ' + reason.data, title: 'Не відома помилка'});
                            console.log(reason.data);
                    }

                });
            }
        };
});