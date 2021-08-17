<?php

use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\CalendarPermissionController;
use App\Http\Controllers\Api\V1\FriendController;
use App\Http\Controllers\Api\V1\InviteController;
use App\Http\Controllers\Api\V1\PlannerController;
use App\Http\Controllers\Api\V1\PlannerEventController;
use App\Http\Controllers\Api\V1\PlannerPermissionController;
use App\Http\Controllers\Api\V1\UpComingEventsController;
use App\Http\Controllers\Api\V1\UserProfileController;
use App\Http\Controllers\Api\V1\ViewCalendarController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('/user/email/check', [RegisterController::class, 'checkIfUserEmailAlreadyTaken']);

Route::post('/login', [LoginController::class, "login"]);
Route::post('/register', [RegisterController::class,'register']);

Route::group(["middleware" => ["auth:api"]], function () {

  Route::group(["prefix" => "v1"], function() {

    Route::apiResource("calendars",CalendarController::class);

    Route::apiResource('planners', PlannerController::class);

    Route::apiResource('events', PlannerEventController::class);

    Route::get('view-calendar/{id}',[ViewCalendarController::class, 'view']);

    Route::get('upcoming-events', UpComingEventsController::class);

    Route::group(['prefix' => 'user'], function() {
      // user profile picture
      Route::post('picture', [UserProfileController::class, 'uploadProfilePicture']);
      Route::post('picture-remove', [UserProfileController::class, 'removeProfilePicture']);
      // authenticated user data
      Route::get('data', function (Request $request) {
        return $request->user();
      });
      // User Friends
      Route::apiResource('friends', FriendController::class);
      Route::get('/friend-requests', [FriendController::class, 'friendRequests']);

      // User Permissions
      Route::group(['prefix' => 'permissions'], function () {
        Route::apiResource('/planners', PlannerPermissionController::class);
      });

      // invite friend
      Route::post('/invite', [InviteController::class, 'sendInvite']);
    });

    // search users
    Route::group(['prefix' => 'search'], function() {
      Route::post('/friends', [FriendController::class, 'searchFriends']);
    });

  });

});
