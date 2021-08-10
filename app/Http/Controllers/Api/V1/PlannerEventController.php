<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlannerEventRequest;
use App\Http\Resources\PlannerEventResource;
use App\Services\PlannerEvent\PlannerEventService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlannerEventController extends Controller
{

  protected $user;

  protected $service;


  public function __construct(PlannerEventService $service)
  {
    $this->middleware(function ($request, $next) use ($service) {

      $this->user = Auth::user();

      $this->service = new $service($this->user, request()->except(['api_token', 'query_fields']));

      return $next($request);
    });
  }

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {

    $queryFields = request()->query_fields;

    $events = $this->service->all($queryFields);

    return PlannerEventResource::collection($events);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(PlannerEventRequest $request)
  {
    $data = $request->except(['api_token', 'query_fields']);

    return $this->service->create($data);
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $event =  $this->service->first(\App\Models\PlannerEvent::class,[
      'id' => $id
    ]);

    return new PlannerEventResource($event);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(PlannerEventRequest $request, $id)
  {
    $data = $request->except(['api_token', 'query_fields', 'id', 'planner_id']);

    return $this->service->update($id, $data);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    return $this->service->delete($id);
  }
}
