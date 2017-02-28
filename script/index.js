'use strict'
(function (angular) {

  function construct () {
    console.log('loaded')
  }

  return document.addEventListener('DOMContentLoaded', construct)
})(angular)