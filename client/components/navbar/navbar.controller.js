'use strict';

class NavbarController {
  //start-non-standard


  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.menu = [
      {
        'title': 'All',
        'link': function(){return '/';},
        'show': function(){return true;},
      },
      {
        'title': 'Mine',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id;},
        'show': Auth.isLoggedIn,
      },
      {
        'title': 'Starred',
        'link': function(){return '/users/' + Auth.getCurrentUser()._id + '/starred';},
        'show': Auth.isLoggedIn,
      },
    ];
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('paizaqaApp')
  .controller('NavbarController', NavbarController);
