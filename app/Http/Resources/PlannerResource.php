<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlannerResource extends JsonResource
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
          'style' => [
            'backgroundColor' => $this->bg_color,
            'color' => $this->color,
            'icon' => $this->icon,
          ],
          'desc' => $this->desc,
          'calendar' => [
            'title' => $this->calendar->title,
            'desc' => $this->calendar->desc,
            'id' => $this->calendar_id
          ],
          'user' => [
            'name' => $this->calendar->user->name,
            'email' => $this->calendar->user->email,
            'id' => $this->calendar->user_id
          ]

        ];
    }
}
