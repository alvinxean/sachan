<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends BaseModel
{
    protected $fillable = ['name'];
    public function users()
    {
        return $this->belongsToMany(User::class, 'role_user')
            ->withPivot(['assigned_by'])
            ->withTimestamps();
    }
}
