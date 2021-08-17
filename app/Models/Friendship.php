<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'friend_id',
      'accepted'
    ];


    public function user()
    {
      return $this->belongsTo(\App\Models\User::class, 'user_id', 'id');
    }

    public function friend()
    {
      return $this->belongsTo(\App\Models\User::class, 'friend_id', 'id');
    }
}
