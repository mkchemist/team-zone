<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token',
        'gender',
        'phone',
        'company',
        'birth_date'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    protected $with = ['image'];

    public function image() {
      return $this->morphOne(\App\Models\Images::class,'model');
    }

    public function getFriendsAttribute()
    {
      return $this->friendsOfMine->merge($this->friendOf);
    }

    public function friendsOfMine()
    {
      return $this->hasMany(\App\Models\Friendship::class, 'user_id', 'id')
      ->with(['friend']);
    }

    public function friendOf()
    {
      return $this->hasMany(\App\Models\Friendship::class,'friend_id', 'id')
      ->with(['user']);
    }


}
