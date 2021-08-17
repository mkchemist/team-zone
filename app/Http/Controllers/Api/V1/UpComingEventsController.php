<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PlannerEventResource;
use App\Models\PlannerEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpComingEventsController extends Controller
{

    protected $user;

    public function __construct()
    {
        $this->middleware(function($request, $next) {
          $this->user = Auth::user();
          return $next($request);
        });
    }

    public function __invoke()
    {
      $today = date('20y-m-d h:i a');
      $start = new Carbon($today, 'Africa/Cairo');
      $end = (new Carbon($today, 'Africa/Cairo'))->addDay(7);

      $events = PlannerEvent::whereBetween('start', [$start, $end])
      ->where(function($query) {
        $query->where('user_id', $this->user->id)
        ->orWhereIn('planner_id', function($query) {
          $query->from('planner_permissions')
          ->select('planner_id')
          ->where('user_id', $this->user->id);
        });
      })->take(5)
      ->orderBy('start')
      ->orderBy('end')
      ->get();

      return PlannerEventResource::collection($events);
    }
}
