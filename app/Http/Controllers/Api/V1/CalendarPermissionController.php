<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\CalendarPermissionRequest;
use App\Http\Resources\PermissionResource;
use App\Models\CalendarPermission;
use Exception;
use Illuminate\Http\Request;

class CalendarPermissionController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = request()->user();
    $friendsPermissions = CalendarPermission::where('owner_id', $user->id)
                      ->with(['user', 'calendar'])
                      ->get();
    $userPermissions = CalendarPermission::where('user_id', $user->id)
                      ->get();
    return response([
      'data' => [
        'user_permissions' => PermissionResource::collection($userPermissions),
        'friends_permissions' => PermissionResource::collection($friendsPermissions)
      ]
    ], 200);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CalendarPermissionRequest $request)
  {
    $user = $request->user();
    try {
      $data = $request->only([
        'user_id',
        'calendar_id',
        'can_read',
        'can_create',
        'can_edit',
        'can_delete',
        'can_restore',
      ]);

      $data['owner_id'] = $user->id;
      CalendarPermission::create($data);
      return response([
        'message' => 'User permission created'
      ], 201);
    } catch (Exception $e) {
      return ResponseHelper::serverError($e);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $permission = $this->getPermissionById($id);

    if (!$permission) {
      return ResponseHelper::invalidResourceId();
    }

    return $permission;
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(CalendarPermissionRequest $request, $id)
  {
    $data = $request->only([
      'can_read',
      'can_create',
      'can_edit',
      'can_delete',
      'can_restore',
    ]);

    $permission = $this->getPermissionById($id);

    if(!$permission) {
      return ResponseHelper::invalidResourceId();
    }

    $permission->update($data);

    return $permission;
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    $permission = $this->getPermissionById($id);

    if(!$permission) {
      return ResponseHelper::invalidResourceId();
    }

    $permission->delete();

    return response([
      'message' => 'Permission canceled'
    ], 200);
  }

  /**
   * get the permission of the given id
   *
   * @param int $id
   * @return CalendarPermission
   */
  private function getPermissionById(int $id)
  {
    $user = request()->user();
    return CalendarPermission::where('id', $id)
      ->where('owner_id', $user->id)
      ->first();
  }
}
