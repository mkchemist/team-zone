<?php

namespace App\Services\PlannerEvent;

use App\Helpers\ResponseHelper;
use App\Http\Resources\PlannerEventResource;
use App\Services\Service;
use App\Models\PlannerEvent;

class PlannerEventService extends Service
{
    /**
     * get all item from App\Models\PlannerEvent;
     *
     * @param array $only [default = null]
     * @return App\Models\PlannerEvent;
     */
    public function all(array $only = null)
    {
      $fields = [];
      $data = PlannerEvent::query();

      if($only) {
        $fields = array_merge($fields, $only);
        $data = $data->get($fields);
      } else {
        $data = $data->get();
      }

      return $data;

      // getting all goes here
    }

    /**
     * create a new item
     *
     * @param array $data
     * @return \Illuminate\Http\Response
     */
    public function create(array $data)
    {
      $data['user_id'] = $this->user->id;
      $event = PlannerEvent::create($data);


      return new PlannerEventResource($event);
    }

    /**
     * Update the given resource
     *
     * @param int $id [resource id]
     * @param array $data [array of data to be updated]
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, array $data)
    {
      $event = $this->first(PlannerEvent::class, ['id' => $id]);

      if(!$event) {
        return ResponseHelper::invalidResourceId();
      }

      foreach($data as $key => $value) {
        $event->$key = $value;
      }

      $event->save();

      return (new PlannerEventResource($event))->additional([
        'message' => 'Event updated',
        'timestamp' => date('20y-m-d h:i:s a'),
        'user' => [
          'id' => $this->user->id,
          'name' => $this->user->name
        ]
      ]);
    }

    /**
     * delete the given resource
     *
     * @param int $id [resource id]
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id)
    {

      $check = $this->first(PlannerEvent::class, ['id' => $id]);


      if($check->user_id !== $this->user->id) {
        return ResponseHelper::unauthorized();
      }



      if(!$check) {
        return ResponseHelper::invalidResourceId([
          'id' => $id,
          'resource' => 'PlannerEvent',
          'user' => [
            'name' => $this->user->name,
            'id' => $this->user->id
          ]
        ]);
      }

      PlannerEvent::where('id', $id)->delete();

      return response([
        'message' => 'Event deleted successfully',
        'timestamp' => date('20y-m-d h:i:s a'),
        'user' => [
          'id' => $this->user->id,
          'name' => $this->user->name
        ],
        'resource' => [
          'id' => $id,
          'data' => new PlannerEventResource($check)
        ]
      ], 200);
    }
}
