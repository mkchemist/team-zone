<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    protected $extensions = [
      'jpg',
      'jpeg',
      'gif',
      'svg'
    ];

    public function uploadProfilePicture(Request $request)
    {
      $request->validate([
        'pic' => 'required|file|mimes:jpg,gif,jpeg,svg,png|max:1600'
      ]);

      $file = $request->pic;
      $user = $request->user();
      // create unique user avatar name
      $filename = uniqid()."_".$user->name.".".$file->extension();

      try {
        // check if user already has a profile picture
        // and remove it if exists
        if($user->image && file_exists("images/users/{$user->image->url}")) {
          unlink("images/users/{$user->image->url}");
        }

        $user->image()->updateOrCreate(['model_id' => $user->id], ['url' => $filename]);
        $file->move('images/users', $filename);

        return response([
          'user' => $user
        ]);
      }catch(Exception $e) {
        return ResponseHelper::serverError($e);
      }
    }

    public function removeProfilePicture(Request $request)
    {
      $user = $request->user();

      if($user->image) {
        $user->image->delete();
      }

      return response([
        'message' => 'Profile picture has been cleared'
      ], 200);
    }
}
