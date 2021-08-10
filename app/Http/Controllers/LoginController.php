<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

  const INVALID_LOGIN_CREDENTIALS = "Invalid login credentials";

  /**
   * user login
   *
   * @param \Illuminate\Http\Request
   * @return \Illuminate\Http\Response
   */
  public function login(LoginRequest $request)
  {
    // user credentials
    $credentials = $request->only(['email', 'password']);

    // check if valid credentials
    // if user logged in redirect to dashboard
    // else if the request is api request
    // return json response
    // else return redirect back with error session
    if(Auth::attempt($credentials)) {
      if($request->is("api/*")) {
        return Auth::user();
      }
      return redirect('/dashboard');
    } else {
      if($request->is('api/*')) {
        // if request is api request
        return response([
          'message' => self::INVALID_LOGIN_CREDENTIALS,
          'timestamp' => date('20y-m-d h:i:s')
        ], 403);
      } else {

        // if request is http request
        return redirect()->back()->with('error', self::INVALID_LOGIN_CREDENTIALS);
      }
    }

  }
}
