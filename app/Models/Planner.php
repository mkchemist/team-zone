<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Planner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
      'title',
      'calendar_id',
      'bg_color',
      'color',
      'icon',
      'desc'
    ];


    protected $attributes = [
      'bg_color' => 'black',
      'color' => 'white',
      'icon' => 'fa fa-calendar-check'
    ];


    protected $with = ['calendar'];

    protected $withCount = ['events'];


    public function calendar()
    {
      return $this->belongsTo('\App\Models\Calendar')->with(['user'])
              ->select('id', 'user_id','title', 'desc');
    }


    public function events()
    {
      return $this->hasMany(\App\Models\PlannerEvent::class);
    }

}
