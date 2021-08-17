<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
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
      'calendar' => [
        'id' => $this->calendar->id,
        'title' => $this->calendar->title,
      ],
      'owner' => [
        'id' => $this->owner->id,
        'name' => $this->owner->name,
        'email' => $this->owner->email
      ],
      'user'=> [
        'id' => $this->user->id,
        'name' => $this->user->name,
        'email' => $this->user->email
      ],
      'planner' => [
        'title' => $this->planner->title,
        'id' => $this->planner->id,
        'style' => [
          'icon' => $this->planner->icon,
          'bg_color' => $this->planner->bg_color,
          'color' => $this->planner->color
        ]
      ],
      'permission' => $this->permission
    ];
  }
}
