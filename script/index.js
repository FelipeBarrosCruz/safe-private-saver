'use strict';
(function construct (angular) {

  angular.module('SPSApp', [])
    .service('TabsService', function () {
      return chrome.tabs;
    })
    .service('StorageService', function () {
      return chrome.storage; 
    })
    .controller('IndexController', function IndexController (TabsService, StorageService) {
    var vm = this;
    vm.save = save;

    function save () {
      var q = { active:  true, lastFocusedWindow: true };
      return TabsService.query(q, function (Tabs) {
        var Tab = Array.isArray(Tabs) && Tabs.length && Tabs[0] || false;
        if (!Tab) return;
        StorageService.sync.get('pages', function(value) {
          var pages = value && Array.isArray(value.pages) && value.pages.length && value.pages || [];
          var id = CryptoJS.SHA256(Tab.url).toString();
          if (_.find(pages, {id: id})) return;
          pages.push({
            id: id,
            title: Tab.title,
            url: Tab.url
          });
          StorageService.sync.set({pages: pages})
        });

      });
    }
  });

})(angular);