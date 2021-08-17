<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerEvent extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'planner_id',
      'title',
      'start',
      'end',
      'allDay',
      'fav',
      'who',
      'where',
      'content'
    ];


    protected $attributes = [
      'allDay' => true,
      'fav' => false
    ];


    protected $with = ['planner', 'user'];

    public function planner()
    {
      return $this->belongsTo(\App\Models\Planner::class)->with(['calendar']);
    }


    public function user()
    {
      return $this->belongsTo(\App\Models\User::class);
    }
}
