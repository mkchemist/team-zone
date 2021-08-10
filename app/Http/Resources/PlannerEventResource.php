<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlannerEventResource extends JsonResource
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
          'start' => date($this->start),
          'end' => date($this->end),
          'allDay' => false,
          'fav' => $this->fav,
          'user' => [
            'name' => $this->user->name,
            'email' => $this->user->email,
            'id' => $this->user->id
          ],
          'style' => [
            'backgroundColor' => $this->planner->bg_color,
            'color' => $this->planner->color,
            'icon' => $this->planner->icon
          ],
          'planner' => [
            'title' => $this->planner->title,
            'id' => $this->planner->id
          ],
          'calendar' => [
            "id" => $this->planner->calendar_id,
            'title' => $this->planner->calendar->title,
            'owner_id' => $this->planner->calendar->user->id,
            'owner_name' => $this->planner->calendar->user->name,
          ]
        ];
    }
}
