<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Resources\FriendSearchResource;
use App\Http\Resources\FriendsResource;
use App\Models\Friendship;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class FriendController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = request()->user();
    $friends = $user->friends;
    return FriendsResource::collection($friends);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $request->validate([
      'friend_id' => 'required|numeric'
    ]);
    $user = $request->user();
    $checkIfExist = Friendship::where([
      'user_id' => $user->id,
      'friend_id' => $request->friend_id
    ])->first();
    if (!$checkIfExist) {
      Friendship::create([
        'user_id' => $user->id,
        'friend_id' => $request->friend_id
      ]);
    }

    return response([
      'message' => 'User added to your friends'
    ], 201);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    $request->validate([
      'type' => 'required|boolean',
      'id'  =>  'required|numeric'
    ]);

    $user = $request->user();

    $relation = Friendship::where([
      'id' => $id,
      'user_id' => $request->id,
      'friend_id' => $user->id
      ])->first();

      if(!$relation) {
        return ResponseHelper::invalidResourceId();
      }

    if($request->type === true) {

      $relation->update([
        'accepted' => true
      ]);
      return response([
        'message' => 'Friend request confirmed'
      ]);
    } else {

      $relation->delete();

      return response([
        'message' => 'Friend request Denied'
      ]);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $user = request()->user();
    $relation = Friendship::where('id', $id)
                            ->first();
    $relation->delete();

    return response([
      'message' => 'Action completed'
    ], 200);
  }

  /**
   * search friends
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function searchFriends(Request $request)
  {
    $request->validate([
      'keyword' => 'required|string'
    ]);
    $user = $request->user();
    try {
      $friends = User::with([
        'image',
        'friendsOfMine' => function($query) use($user) {
          $query->where('friend_id', $user->id);
        },
        'friendOf' => function ($query) use($user) {
          $query->where('user_id', $user->id);
        }
      ])
        ->where('name', 'LIKE', "%$request->keyword%")
        ->orWhere('email', 'LIKE', "%$request->keyword%")
        ->orderBy('name')
        ->simplePaginate(20);
        //return $friends;
      return FriendSearchResource::collection($friends);
    } catch (Exception $e) {
      return  ResponseHelper::serverError($e);
    }
  }

  /**
   * get user friend requests
   *
   * @return \Illuminate\Http\Response
   */
  public function friendRequests()
  {
    $user = request()->user();
    $requests = Friendship::where([
      'accepted' => false,
      'friend_id' => $user->id
    ])->get();

    return FriendsResource::collection($requests);
  }
}
