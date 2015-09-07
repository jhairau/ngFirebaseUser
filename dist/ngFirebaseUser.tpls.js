angular.module('ng-firebaseuser-templates', ['templates/bootstrap3/login-form.html', 'templates/ionic/login-form.html']);

angular.module("templates/bootstrap3/login-form.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/bootstrap3/login-form.html",
    "<div class=\"panel panel-info\">\n" +
    "    <div class=\"panel-heading\">\n" +
    "        <h3 class=\"panel-title\">Please Sign In</h3>\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-5\">\n" +
    "                <a href=\"#\"><img src=\"http://techulus.com/buttons/fb.png\"/></a><br/>\n" +
    "                <a href=\"#\"><img src=\"http://techulus.com/buttons/tw.png\"/></a><br/>\n" +
    "                <a href=\"#\"><img src=\"http://techulus.com/buttons/gplus.png\"/></a>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-md-7\" style=\"border-left:1px solid #ccc;height:160px\">\n" +
    "                <form class=\"form-horizontal\" ng-submit=\"doLogin()\">\n" +
    "                    <fieldset>\n" +
    "                        <input type=\"text\" ng-model=\"user.email\" placeholder=\"Enter Email\" class=\"form-control input-md\">\n" +
    "                        <input ng-model=\"user.password\" placeholder=\"Enter Password\" class=\"form-control input-md\">\n" +
    "                        <button class=\"btn btn-info btn-sm pull-right\" type=\"submit\">Sign In</button>\n" +
    "                    </fieldset>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
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
