<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class RegisterController extends Controller
{

  public function register(RegisterRequest $request)
  {
    $checkEmail = $this->checkEmail($request->email);

    if($checkEmail) {
      return redirect()->back()->with( 'error','User Email already exists');
    }

    $user = User::create([
      'email' => $request->email,
      'name' => $request->name,
      'password' => Hash::make($request->password),
      'api_token' => Str::random(15)
    ]);

    Auth::attempt(['email' => $request->email, 'password' => $request->password]);


    event(new Registered($user));

    return redirect("/dashboard");

  }


  public function checkIfUserEmailAlreadyTaken(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email'
    ]);

    if($validator->fails()) {
      return response([
        'errors' => $validator->errors()
      ], 422);
    }

    $email = $request->email;

    $user = $this->checkEmail($email);

    if($user) {
      return response([
        'exists' => true
      ], 200);
    } else {
      return response([
        'exists' => false
      ], 200);
    }
  }


  private function checkEmail(string $email)
  {
    return User::where('email', $email)->first();
  }
}
