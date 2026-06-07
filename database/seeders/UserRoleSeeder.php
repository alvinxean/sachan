<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Roles
        $superadmin = Role::create(['name' => 'superadmin']);
        $admin = Role::create(['name' => 'admin']);
        $customer = Role::create(['name' => 'customer']);

        // 2. Daftar User
        $users = [
            [
                'name' => 'Super Admin',
                'phone' => '081200000001',
                'identity_number' => 'ADM001',
                'role' => $superadmin
            ],
            [
                'name' => 'Admin Staff',
                'phone' => '081200000002',
                'identity_number' => 'ADM002',
                'role' => $admin
            ],
            [
                'name' => 'Customer Satu',
                'phone' => '081200000003',
                'identity_number' => 'CST001',
                'role' => $customer
            ],
        ];

        // 3. Proses Data
        foreach ($users as $data) {
            // Buat User (Timestamp otomatis diisi Laravel)
            $user = User::create([
                'name' => $data['name'],
                'phone_number' => $data['phone'],
                'password' => Hash::make('password123'),
            ]);

            // Buat Identity Document (Relasi otomatis pakai user_id)
            $user->identityDocuments()->create([
                'type' => 'KTP',
                'number' => $data['identity_number'],
                'file_path' => null,
            ]);

            // Hubungkan Role (Pivot table)
            $user->roles()->attach($data['role']->id);
        }
    }
}
