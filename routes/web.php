<?php

use App\Http\Controllers\Web\V1\LoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.home');
})->name('login');

Route::post('/login', [LoginController::class, 'login']);

Route::post('/logout', function() {
  Auth::logout();
});


// protected routes
Route::group(['middleware' => ['auth']], function () {

  Route::get('/dashboard/{slug?}', function() {
    return view('pages.dashboard');
  })->where('slug', '.*');
});


