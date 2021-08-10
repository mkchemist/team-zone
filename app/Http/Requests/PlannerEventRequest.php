<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlannerEventRequest extends FormRequest
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
        if(request()->method() === "POST") {
          return [
              'title' => 'required|string',
              'start' => 'required|date',
              'end' => 'required|date',
              'allDay' => 'boolean',
              'planner_id' => 'required|numeric',
              'fav' => 'boolean',
          ];

        } else {
          return [
            'title' => 'required|string',
            'start' => 'required|date',
            'end' => 'required|date',
            'allDay' => 'boolean',
            'fav' => 'boolean',
        ];
        }
    }
}
