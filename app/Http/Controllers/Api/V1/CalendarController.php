<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CalendarRequest;
use App\Http\Resources\CalendarResource;
use App\Services\Calendar\CalendarService;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{

  protected $user;

  protected $service;

  public function __construct(CalendarService $service)
  {
    $this->middleware(function ($request, $next) use ($service) {

      $this->user = Auth::user();

      $this->service = new $service($this->user, request()->except('api_token', 'query_fields'));

      return $next($request);
    });
  }

  /**
   * Display a listing of the resource.
   *@response [{
   *  "id" : 1,
   *  "title" : "Calendar name",
   *  "desc" : "Calendar description",
   *  "planners_count" : 1,
   *  "user" : {
   *    "name" : "username",
   *    "email" : "user email",
   *    "id" : 1
   *  }
   * }]
   * @return \Illuminate\Http\Response
   */
  public function index()
  {

    $calendars = $this->service->all();

    return CalendarResource::collection($calendars);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @bodyParam title string required the calendar title
   * @bodyParam desc string Calendar description
   * @response 201 [
   * "message" : "Calendar {calendar name } created successfully",
   * "timestamp" : "2021-08-05 01:00 pm"
   * "data" :{
   *  "id" : 1,
   *  "title" : "Calendar name",
   *  "desc" : "Calendar description",
   *  "planners_count" : 1,
   *  "user" : {
   *    "name" : "username",
   *    "email" : "user email",
   *    "id" : 1
   *  }
   * }]
   *
   * @response 409 [
   *   "message" : "Item Already Exists"
   * ]
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(CalendarRequest $request)
  {
    $data = $request->only(["title", "desc"]);

    $data["user_id"] = $this->user->id;

    return $this->service->create($data);
  }

  /**
   * Display the specified resource.
   * @queryParam id int Required Calendar Id
   *  @response {
   *  "id" : 1,
   *  "title" : "Calendar name",
   *  "desc" : "Calendar description",
   *  "planners_count" : 1,
   *  "user" : {
   *    "name" : "username",
   *    "email" : "user email",
   *    "id" : 1
   *  }
   * }
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $calendar = $this->service->first(\App\Models\Calendar::class,[
      'id' => $id
    ]);

    return new CalendarResource($calendar);
  }

  /**
   * Update the specified resource in storage.
   *
   *  @queryParam id int Required Calendar Id
   *  @bodyParam title string Required Calendar title
   *  @bodyParam desc string Calendar description
   *  @response 201 [
   *  'message' : 'Calendar Updated successfully',
   *  data: {
   *  "id" : 1,
   *  "title" : "Calendar name",
   *  "desc" : "Calendar description",
   *  "planners_count" : 1,
   *  "user" : {
   *    "name" : "username",
   *    "email" : "user email",
   *    "id" : 1
   *  }
   * }]
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(CalendarRequest $request, $id)
  {
    $data = $request->only(['title', 'desc']);
    return $this->service->update($id, $data);
  }

  /**
   * Remove the specified resource from storage.
   *  @queryParam id int Required Calendar id you want to delete
   *  @response[
   *    'message' => 'Calendar deleted successfully'
   *  ]
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    return $this->service->delete($id);
  }
}
