<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Calendar extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      "title", "user_id" , "desc"
    ];

    protected $with = ['user'];


    protected $withCount = ['planners'];


    public function user()
    {
      return $this->belongsTo('App\Models\User')->select('id', 'name', 'email');
    }


    public function planners()
    {
      return $this->hasMany('App\Models\Planner');
    }
}
