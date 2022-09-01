<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function compose(Request $request)
    {
        Chat::create([
            'body' => $request->body,
            'user_id' => Auth::id(),
            'receiver_id' => $request->receiver
        ]);

        return to_route('dashboard');
    }

    public function loadMessages(User $user)
    {
        $messages = Chat::where(function ($query) use ($user) {
            $query->where('user_id', $user->id)->where('receiver_id', Auth::id())->orWhere(function ($query) use ($user) {
                $query->where('user_id', Auth::id())->where('receiver_id', $user->id);
            });
        })->get();

        return response()->json($messages);
    }
}
