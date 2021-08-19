<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PlannerEventResource;
use App\Models\PlannerEvent;

class ViewCalendarController extends Controller
{
    public function view(int $id)
    {
      $events  = PlannerEvent::whereIn('planner_id', function($query) use($id) {
        $query->from('planners')->select('id')
        ->where('calendar_id', $id)
        ->where('deleted_at', null)
        ->get();
      })
      ->orderBy('start')
      ->simplePaginate(100);

      return PlannerEventResource::collection($events);
    }
}
