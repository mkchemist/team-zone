<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PlannerRequest extends FormRequest
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
            "calendar_id" => "required|numeric",
            "title" => "required|string",
            "bg_color" => "string",
            "color" => "string",
            "icon" => "string",
            "desc" => "string|nullable",
          ];
        } else {
          return [
            "title" => "required",
            "bg_color" => "string",
            "color" => "string",
            "icon" => "string",
            "desc" => "string|nullable",
          ];
        }
    }
}
