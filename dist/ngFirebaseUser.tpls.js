angular.module('ng-firebaseuser-templates', ['templates/bootstrap3/login-form.html', 'templates/ionic/login-form.html']);

angular.module("templates/bootstrap3/login-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bootstrap3/login-form.html",
    "HTML");
}]);

angular.module("templates/ionic/login-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/ionic/login-form.html",
    "<form ng-submit=\"doLogin()\">\n" +
    "    <div class=\"list\">\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Username</span>\n" +
    "            <input type=\"text\" ng-model=\"user.email\">\n" +
    "        </label>\n" +
    "        <label class=\"item item-input\">\n" +
    "            <span class=\"input-label\">Password</span>\n" +
    "            <input type=\"password\" ng-model=\"user.password\">\n" +
    "        </label>\n" +
    "        <label class=\"item\">\n" +
    "            <button class=\"button button-block button-positive\" type=\"submit\">Log in</button>\n" +
    "        </label>\n" +
    "    </div>\n" +
    "</form>");
}]);
