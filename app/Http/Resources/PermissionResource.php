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
      "id" => $this->id,
      "owner_id" => $this->owner_id,
      "calendar_id" => $this->calendar_id,
      "user_id" => $this->user_id,
      "user" => [
        "name" => $this->user->name,
        "email" => $this->user->email
      ],
      "calendar" => [
        "title" => $this->calendar->title,
        "user" => [
          "id" => $this->calendar->user->id,
          "name" => $this->calendar->user->name,
          "email" => $this->calendar->user->email
        ]
      ],
      "can_read" => $this->can_read ? true : false,
      "can_create" => $this->can_create ? true : false,
      "can_edit" => $this->can_edit ? true : false,
      "can_delete" => $this->can_delete ? true : false,
      "can_restore" => $this->can_restore ? true : false,
    ];
  }
}
