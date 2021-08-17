<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CalendarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'title' => $this->title,
          'desc' => $this->desc,
          'planners_count' => $this->planners_count,
          'user' => [
            'name' => $this->user->name,
            'email' => $this->user->email,
            'id' => $this->user_id
          ]
        ];
    }
}
