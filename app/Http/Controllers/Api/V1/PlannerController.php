<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PlannerRequest;
use App\Http\Resources\PlannerResource;
use App\Services\Planner\PlannerService;
use Illuminate\Support\Facades\Auth;

class PlannerController extends Controller
{

  /**
   * current auth user
   *
   * @var \App\Models\User
   */
  protected $user;

  /**
   * controller service
   *
   * @var \App\Services\Planner\PlannerService
   */
  protected $service;


  public function __construct(PlannerService $service)
  {
    $this->middleware(function ($request, $next) use ($service) {

      $this->user = Auth::user();

      $this->service = new $service($this->user, request()->except('api_token', 'query_fields'));

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
    $only = request()->query_fields;

    $data = $this->service->all($only);
    return PlannerResource::collection($data);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(PlannerRequest $request)
  {
    $data = $request->except('api_token');
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
    $data = [
      "id" => $id
    ];

    $planner =  $this->service->first(\App\Models\Planner::class, $data);


    return new PlannerResource($planner);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(PlannerRequest $request, $id)
  {
    $data = $request->except(['api_token', 'query_fields', 'id', 'calendar_id']);

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
