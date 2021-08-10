<?php

namespace App\Services\Calendar;

use App\Helpers\ResponseHelper;
use App\Http\Resources\CalendarResource;
use App\Models\Calendar;
use App\Services\Service;
use Exception;

class CalendarService extends Service {

  const MODEL = \App\Models\Calendar::class;

 /**
  * get all results
  *
  * @param array $only
  *
  * @return array
  */
  public function all(array $only = null) {
    $model = Calendar::where('user_id', $this->user->id);

    $model = $this->queryParamBuilder($model);

    if($only) {
      return $model->get($only);
    }

    return $model->get();
  }



  /**
   * create a new calendar
   *
   * @param array $data
   * @return \Illuminate\Http\Response
   * @throws Exception
   */
  public function create(array $data) {
    try {
      if(!$data) {
        throw new Exception("Missing Argument data in Calendar create method");
      }

      $checkIfCalendarExists = $this->first(self::MODEL,[
        "title" => $data['title'],
        "user_id" => $data["user_id"]
      ]);

      if($checkIfCalendarExists) {
        return ResponseHelper::alreadyExists();
      }

      $calendar = Calendar::create($data);



      return response([
        "message" => "Calendar {$data['title']} created successfully",
        "timestamp" => date("20y-m-d h:i:s a"),
        'data' => new CalendarResource($calendar)
      ], 201);

    }catch(Exception $e) {
      return ResponseHelper::serverError($e);
    }
  }

  /**
   * update calendar
   *
   *
   * @param int $id
   * @param array $data
   * @return \Illuminate\Http\Response
   */
  public function update(int $id, array $data)
  {
    $queryData = [
      "id" => $id
    ];
    $calendar = $this->first(self::MODEL,$queryData);

    if(!$calendar) {
      return ResponseHelper::invalidResourceId();
    }

    foreach($data as $key => $value) {
      $calendar->$key = $value;
    }

    $calendar->save();


    return response([
      "message" => "Calendar \"{$calendar->title}\" Updated successfully",
      "data" => new CalendarResource($calendar)
    ], 201);
  }

  /**
   * delete calendar
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function delete(int $id)
  {
    Calendar::where([
      'id' => $id,
      'user_id' => $this->user->id
    ])->delete();

    return response([
      'message' => 'Calendar deleted successfully'
    ], 200);
  }

}
