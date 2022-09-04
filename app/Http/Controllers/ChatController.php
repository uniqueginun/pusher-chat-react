<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ConversationResource;

class ChatController extends Controller
{
    public function compose(Request $request)
    {
        $chat = Chat::create([
            'body' => $request->body,
            'user_id' => Auth::id(),
            'receiver_id' => $request->receiver
        ]);

        broadcast(new MessageSent($chat))->toOthers();

        return response(new ConversationResource($chat));
    }

    public function loadMessages(User $user)
    {
        $messages = Chat::query()->conversationWith($user)->get();

        return response()->json(ConversationResource::collection($messages));
    }
}
