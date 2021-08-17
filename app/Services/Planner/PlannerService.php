<?php

namespace App\Services\Planner;

use App\Helpers\ResponseHelper;
use App\Http\Resources\PlannerResource;
use App\Models\Planner;
use App\Services\Service;
use Exception;

class PlannerService extends Service
{

  const MODEL = \App\Models\Planner::class;


  public function all(array $only = null)
  {
    $user = $this->user;
    $model = Planner::whereIn('calendar_id', function($query) use($user) {
      $query->from('calendars')->select('id')
        ->where('user_id', $user->id)
        ->where('deleted_at', null);
    })->orWhere(function($query) {
      $query->whereIn('id', function($query) {
        $query->from('planner_permissions')
          ->select('planner_id')
          ->where('user_id', $this->user->id);
      });
    });

    $model = $this->queryParamBuilder($model);

    if($only) {
      return $model->get($only);
    }
    return $model->get();
  }

  public function create(array $data)
  {
    try {

      $check = $this->first(self::MODEL,[
        'title' => $data['title'],
        'calendar_id' => $data['calendar_id']
      ]);

      if($check) {
        return ResponseHelper::alreadyExists();
      }

      Planner::create($data);


      return response([
        "message" => "Planner created successfully"
      ], 201);

    }catch(Exception $e) {
      return ResponseHelper::serverError($e);
    }
  }

  public function update(int $id, array $data)
  {
    $planner = $this->first(\App\Models\Planner::class, [
      'id' => $id
    ]);

    if(!$planner) {
      return ResponseHelper::invalidResourceId();
    }

    foreach($data as $key => $value) {
      $planner->$key = $value;
    }

    $planner->save();

    return response([
      'message' => 'Updated successfully',
      'data' => new PlannerResource($planner)
    ], 200);
  }


  public function delete(int $id)
  {
    $planner = $this->first(self::MODEL, ['id' => $id]);

    if(!$planner) {
      return ResponseHelper::invalidResourceId();
    }

    if($planner->calendar->user_id !== $this->user->id) {
      return ResponseHelper::unauthorized();
    }

    $planner->delete();

    return response([
      'message' => 'Planner deleted successfully',
      'status' => 200,
      'user' => [
        'id' => $this->user->id,
        'name' => $this->user->name,
      ],
      'timestamp' => date('20y-m-d h:i:s a')
    ], 200);
  }

}
