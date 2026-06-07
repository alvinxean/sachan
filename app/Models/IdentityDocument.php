<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IdentityDocument extends BaseModel
{
    protected $fillable = ['user_id', 'type', 'number', 'file_path'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
