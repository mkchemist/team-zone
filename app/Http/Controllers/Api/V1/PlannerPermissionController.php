<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\PlannerPermissionRequest;
use App\Http\Resources\PermissionResource;
use App\Models\Planner;
use App\Models\PlannerPermission;
use Exception;
use Illuminate\Http\Request;

class PlannerPermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $user = request()->user();

      $permissions = PlannerPermission::with([
        'user',
        'calendar',
        'planner',
        'owner'
      ])
      ->where('user_id', $user->id)
      ->orWhere('owner_id', $user->id)
      ->get();

      $permissions = $this->separatePermissions($user, $permissions);
      return response([
        'user' => PermissionResource::collection($permissions->user),
        'friends' => PermissionResource::collection($permissions->friends)
      ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PlannerPermissionRequest $request)
    {
      $user = $request->user();
      $data = $request->only(['calendar_id', 'user_id', 'planner_id', 'permission']);
      $data['owner_id'] = $user->id;
      try {
        $permission = PlannerPermission::updateOrCreate([
          'user_id' => $request->user_id,
          'planner_id' => $request->planner_id,
          'calendar_id' => $request->calendar_id
        ], [
          'permission' => $request->permission
        ]);
         return response([
            'message' => 'Permission created',
            'data' => $permission
         ], 201);
      }catch(Exception $e) {
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
      $user = request()->user();
      $permission = PlannerPermission::with(['user','planner','calendar'])
      ->where([
        'id' => $id,
        'owner_id' => $user->id
      ])->first();

      return $permission;
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
      $user = $request->user();
      $permission = PlannerPermission::where([
        'id' => $id,
        'owner_id' => $user->id
      ])->update([
        'permission' => $request->permission
      ]);

      return response([
        'message' => 'Permission updated'
      ]);
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
      $permission = PlannerPermission::where([
        'id' => $id,
        'owner_id' => $user->id
      ])->delete();

      return response([
        'message' => 'Permission deleted'
      ]);
    }


    private function separatePermissions($user, $permissions)
    {
      $userPermissions = [];
      $friendsPermissions = [];

      foreach($permissions as $permission) {
        if($permission->owner_id === $user->id) {
          $friendsPermissions[] = $permission;
        } else {
          $userPermissions[] = $permission;
        }
      }

      return (object) [
        'user' => $userPermissions,
        'friends' => $friendsPermissions
      ];
    }
}
