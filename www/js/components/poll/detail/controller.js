(function() {
  'use strict';


  /**
   * Angular definition.
   */
  Tursan.controller('PollDetailController', PollDetailController);


  /**
   * Dependencies.
   */
  PollDetailController.$inject = [
    '$scope',
    'ApiFactory',
    '$localStorage',
    '$state',
    '$ionicHistory',
    '$ionicLoading',
    '$ionicPopup',
    '$http',
    '$stateParams'
  ];


  /**
   * Controller.
   */
  function PollDetailController($scope, ApiFactory, $localStorage, $state, $ionicHistory, $ionicLoading, $ionicPopup, $http, $stateParams) {
    $scope.vm = {};

    $ionicLoading.show({
      template: 'Yukleniyor...'
    });

    $http
      .post('http://ws1.tursan.net/QuestionsHandler.ashx?survey=' + $stateParams.id)
      .success(function(response) {
        $scope.vm.items = response;
        $ionicLoading.hide();
      });


    $scope.selectAnswer = function(index, id) {
      $scope.vm.items[index].Answers = $scope.vm.items[index].Answers.map(function(el) {
        el.selected = false;
        return el;
      });

      var questionId = $scope.vm.items[index].QuestionID;
      var answerId = $scope.vm.items[index].Answers[id].ID;
      var firmId = $localStorage.userName;
      var answeredDate = new Date();

      $scope.vm.items[index].Answers[id].selected = true;
    };

    $scope.save = function() {
      var canSave = true;
      var answers = [];

      $scope.vm.items.forEach(function(item) {
        var whichAnswer;
        var description;

        if (item.Answers[0].selected) {
          whichAnswer = item.Answers[0].ID;
        } else if (item.Answers[1].selected) {
          whichAnswer = item.Answers[1].ID;
          description = item.Answers[1].desc;
        } else {
          canSave = false;
        }

        answers.push({
          QuestionID: item.QuestionID,
          AnswerID: whichAnswer,
          Description: description || '',
          FirmID: $localStorage.userName,
          SurveyID: $stateParams.id,
          AnsweredDate: new Date()
        });
      });

      if (!canSave) return $ionicPopup.alert({
        title: 'Bilgi',
        template: 'Lütfen, göndermeden önce anketin bütün sorularını cevaplayın.'
      });

      $ionicLoading.show({
        template: 'Gönderiliyor...'
      });

      $http
        .get('http://ws1.tursan.net/SurveyResultHandler.ashx?JsonResult=' + JSON.stringify(answers))
        .success(function(response) {
          $ionicLoading.hide();

          $ionicPopup.alert({
            title: 'Bilgi',
            template: response
          });

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('tab.menu');
        });
    };
  };
})();
