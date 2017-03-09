angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.home', {
    url: '/home',
    views: {
      'tab2': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.settings', {
    url: '/settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })
  
  .state('tabsController.payment', {
    url: '/payment',
    views: {
      'tab4': {
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl'
      }
    }
  })
  
  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('coffeeShop', {
    url: '/coffeeshop',
    templateUrl: 'templates/coffeeShop.html',
    controller: 'coffeeShopCtrl',
    params: {
        cafe: {}
    },
  })

  .state('order', {
    url: '/order',
    templateUrl: 'templates/order.html',
    controller: 'orderCtrl'
  })

$urlRouterProvider.otherwise('/page1/home')

  

});