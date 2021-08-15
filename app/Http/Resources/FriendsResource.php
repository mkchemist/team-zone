<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FriendsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = $request->user();
        $friend = $this->friend->id !== $user->id ? $this->friend : $this->user;
        return [
          'name' => $friend->name,
          'email' => $friend->email,
          'id' => $friend->id,
          'image' => $friend->image,
          'accepted' => $this->accepted ? true : false,
          'relation_id' => $this->id,
        ];
    }
}
