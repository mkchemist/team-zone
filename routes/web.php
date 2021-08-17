<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
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


Route::get('/register', function() {
  return view('pages.register');
})->name('register');

Route::post('/login', [LoginController::class, 'login']);

Route::post('/register', [RegisterController::class, 'register']);

Route::get('/logout', function() {
  Auth::logout();
  return redirect('/');
});

Route::redirect('/home', '/dashboard', 301);

Route::get('/email/verify', function () {
  if(request()->user()->hasVerifiedEmail()) {
    return redirect("/home");
  }
  return view('auth.verify-email');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
  $request->fulfill();

  return redirect('/home');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
  $request->user()->sendEmailVerificationNotification();

  return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// protected routes
Route::group(['middleware' => ['auth', "verified"]], function () {

  Route::get('/dashboard/{slug?}', function() {
    return view('pages.dashboard');
  })->where('slug', '.*');

  Route::get('/home/{slug?}', function() {
    return view('pages.dashboard');
  })->where('slug', '.*');
});




