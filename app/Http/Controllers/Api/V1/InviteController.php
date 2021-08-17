<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Mail\InviteMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InviteController extends Controller
{
    public function sendInvite(Request $request)
    {
      $request->validate([
        'mail' => 'required|email'
      ]);

      Mail::to($request->mail)->send(new InviteMail($request->user()));

      return response([
        'message' => 'mail has been sent'
      ]);
    }
}
