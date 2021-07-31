<?php

namespace App\Services;

use App\Models\User;

class Service {

  protected $user;

  protected $params;

  public function __construct(User $user, array $params = [])
  {
    $this->user = $user;

    $this->params = $params;
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


}
