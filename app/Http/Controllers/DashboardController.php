<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->user()->roles()->first()->name ?? 'customer';

        return Inertia::render('Dashboard', [
            'role' => $role
        ]);
    }
}
