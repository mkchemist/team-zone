<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlannerPermission extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'calendar_id',
      'planner_id',
      'permission',
      'owner_id',
    ];

    public function calendar() {
      return $this->belongsTo(\App\Models\Calendar::class);
    }

    public function user()
    {
      return $this->belongsTo(\App\Models\User::class);
    }

    public function planner()
    {
      return $this->belongsTo(\App\Models\Planner::class);
    }

    public function owner()
    {
      return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }
}
