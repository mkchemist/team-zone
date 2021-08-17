<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlannerPermissionRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    $rules = [
      'permission' => 'required|string'
    ];
    if (request()->method() === "POST") {
      $rules = array_merge($rules, [
        'calendar_id' => 'required|numeric',
        'planner_id' =>  'required|numeric',
        'user_id'     =>  'required|numeric',
      ]);
    }

    return $rules;
  }
}
