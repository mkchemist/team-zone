<?php

namespace App\Services\Calendar;

use App\Models\Calendar;
use App\Services\Service;

class CalendarService extends Service {

  public function all(array $only = null) {
    $model = Calendar::query();

    $model = $this->queryParamBuilder($model);

    if($only) {
      return $model->get($only);
    }

    return $model->get();
  }

}
