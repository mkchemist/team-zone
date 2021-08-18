<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileInfoRequest extends FormRequest
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
        return [
            'email' => 'required|email',
            'name' => 'required|string',
            'gender' => [
              'required',
              Rule::in(['male', 'female'])
            ],
            'company' => 'string|nullable',
            'birth_date' => 'date|nullable',
            'phone' => 'nullable|numeric'
        ];
    }
}
