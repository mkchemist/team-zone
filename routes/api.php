<?php

use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\PlannerController;
use App\Http\Controllers\Api\V1\PlannerEventController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/user/email/check', [RegisterController::class, 'checkIfUserEmailAlreadyTaken']);

Route::post('/login', [LoginController::class, "login"]);
Route::post('/register', [RegisterController::class,'register']);

Route::group(["middleware" => ["auth:api"]], function () {

  Route::group(["prefix" => "v1"], function() {

    Route::apiResource("calendars",CalendarController::class);

    Route::apiResource('planners', PlannerController::class);

    Route::apiResource('events', PlannerEventController::class);

    Route::get('view-calendar/{id}',[ViewCalendarController::class, 'view']);

  });

});
