<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FriendSearchResource extends JsonResource
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
          'name' => $this->name,
          'id' => $this->id,
          'email' => $this->email,
          'friends' => $this->friendsOfMine->merge($this->friendOf),
          'image' => $this->image
        ];
    }
}
