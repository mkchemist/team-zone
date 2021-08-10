<?php

namespace App\Services;

use App\Helpers\ResponseHelper;
use App\Models\User;
use Exception;

class Service {

  protected $user;

  protected $params;

  public function __construct(User $user, array $params = [])
  {
    $this->user = $user;

    $this->params = $params;
  }

  /**
   * set query params
   *
   * @param array $data
   * @return void
   */
  protected function setQueryParam(array $data)
  {
    $this->params = $data;
  }

  /**
   * build query param in SQL if
   * param length
   *
   * @param mixed $model
   * @return mixed
   */
  protected function queryParamBuilder($model)
  {
    if($this->serviceHasParameters()) {
      $model = $model->where($this->params);
    }

    return $model;
  }

  /**
   * check if the given service has
   * a query parameters
   *
   * @return boolean
   */
  protected function serviceHasParameters()
  {
    return count($this->params) > 0 ? true : false;
  }


  public function first(string $model, array $data)
  {
    $only = [];
    if(isset(request()->query_fields)) {
      $only = array_merge($only, request()->query_fields);
    }
    if($only) {
      return $model::where($data)->first($only);
    }
    return $model::where($data)->first();

  }




}
