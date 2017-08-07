angular.module("umbraco").controller("uSplit.abTesting.configurationController",
    function ($scope, $q, uSplitConfigurationResource) {

        $scope.loaded = false;
        $scope.accounts = [];

        $scope.tabs = [
            { id: "configuration", label: "Configuration" },
            { id: "instructions", label: "Instructions" }
        ];

        $scope.reauthorize = function (profileId) {
            window.location = 'backoffice/usplit/GoogleAuth/ReauthorizeAsync?originalUrl=' + encodeURIComponent(window.location) + '&profileId=' + profileId;
        };

        $scope.refresh = function () {
            $scope.loaded = false;
            $scope.accounts = [];
            
            var accessUpdate = uSplitConfigurationResource.checkAccess().then(function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    var data = response.data[i];
                    $scope.accounts.push({
                        name: data.name,
                        profileId: data.profileId,
                        connected: data.isConnected,
                        hasAccess: data.hasAccess,
                        message: data.error,
                    });
                }
            });

            $q.all(accessUpdate)
                .then(function() {
                    $scope.loaded = true;
                });
        };

        $scope.refresh();
    });
