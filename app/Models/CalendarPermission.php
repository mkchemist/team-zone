<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CalendarPermission extends Model
{
    use HasFactory;

    protected $fillable = [
      'owner_id',
      'user_id',
      'calendar_id',
      'can_read',
      'can_create',
      'can_edit',
      'can_delete',
      'can_restore',
    ];


    public function calendar()
    {
      return $this->belongsTo(\App\Models\Calendar::class);
    }

    public function owner()
    {
      return $this->belongsTo(\App\Models\User::class, 'owner_id');
    }

    public function user()
    {
      return $this->belongsTo(\App\Models\User::class);
    }
}
