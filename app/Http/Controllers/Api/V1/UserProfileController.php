<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileInfoRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
  /**
   * Allowed user profile picture extensions
   *
   * @var array
   */
  protected $extensions = [
    'jpg',
    'jpeg',
    'gif',
    'svg'
  ];

  /**
   * upload user profile picture
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function uploadProfilePicture(Request $request)
  {
    $request->validate([
      'pic' => 'required|file|mimes:jpg,gif,jpeg,svg,png|max:1600'
    ]);

    $file = $request->pic;
    $user = $request->user();
    // create unique user avatar name
    $filename = uniqid() . "_" . $user->name . "." . $file->extension();

    try {
      // check if user already has a profile picture
      // and remove it if exists
      if ($user->image && file_exists("images/users/{$user->image->url}")) {
        unlink("images/users/{$user->image->url}");
      }

      $user->image()->updateOrCreate(['model_id' => $user->id], ['url' => $filename]);
      $file->move('images/users', $filename);

      return response([
        'user' => $user
      ]);
    } catch (Exception $e) {
      return ResponseHelper::serverError($e);
    }
  }

  /**
   * reset user profile to default
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function removeProfilePicture(Request $request)
  {
    $user = $request->user();

    if ($user->image) {
      $user->image->delete();
    }

    return response([
      'message' => 'Profile picture has been cleared'
    ], 200);
  }


  /**
   * update user profile info
   *
   * @param \App\Http\Requests\ProfileInfoRequest $request
   * @return \Illuminate\Http\Response
   */
  public function updateUserProfile(ProfileInfoRequest $request)
  {
    $user = $request->user();

    $user->update([
      'email' => $request->email,
      'name' => $request->name,
      'company' => $request->company,
      'phone' => $request->phone,
      'birth_date' => $request->birth_date,
      'gender' => $request->gender
    ]);

    return response([
      'message' => 'Profile updated'
    ], 200);
  }

  public function changePassword(Request $request)
  {
    $request->validate([
      'old_password' => 'required',
      'password' => 'required|confirmed'
    ]);

    $user = $request->user();


    if(Hash::check($request->old_password, $user->password)) {
      $user->password = Hash::make($request->password);
      $user->save();
      return response([
        'user' => $user
      ]);
    }

    return response([
      'message' => 'Old password is not correct'
    ], 403);

  }
}
