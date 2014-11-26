angular.module('flapperNews', ['ui.router'])
.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){	

var posts  = posts.posts();
$scope.post = posts;

}])
.controller('MainCtrl', ['$scope','posts',function($scope,posts){
	$scope.test = 'Hello world!';

$scope.posts = posts.posts();

$scope.addPost = function(){
  if(!$scope.title || $scope.title === '') { return; }
  $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0,
    comments: [
    {author: 'Joe', body: 'Cool post!', upvotes: 0},
    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
  ]
  });
  $scope.title = '';
  $scope.link = '';
};

$scope.incrementUpvotes = function(post) {
  post.upvotes += 1;
};

}]).factory('posts', [function(){
  
  return {
  	posts : function() {
  		var posts = [
  {title:'post1',upvotes:5},
  {title:'post2',upvotes:3},
  {title:'post3',upvotes:4},
  {title:'post4',upvotes:1},
  {title:'post5',upvotes:2}
];
  		return posts;
  	}
  };



}]).config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'templates/home.html',
		controller: 'MainCtrl'
	}).state('posts', {
		url: '/posts/:id',
		templateUrl: 'templates/posts.html',
		controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);