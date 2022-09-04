<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeConversationWith(Builder $builder, Authenticatable $user)
    {
        $builder->where(function ($query) use ($user) {
            $query->where([
                'user_id' => $user->id,
                'receiver_id' => Auth::id()
            ])->orWhere(function ($query) use ($user) {
                $query->where([
                    'user_id' => Auth::id(),
                    'receiver_id' => $user->id
                ]);
            });
        });
    }
}
