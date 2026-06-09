<?php

namespace App\Http\Requests\Auth;

use App\Models\Role;
use App\Models\User;
use App\Services\M2Service;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'phone_number'    => ['required', 'string', 'regex:/^[0-9]+$/'],
            'identity_number' => ['required', 'string', 'regex:/^[A-Z0-9]+$/'],
        ];
    }

    // public function authenticate(): void
    // {
    //     $this->ensureIsNotRateLimited();

    //     if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
    //         RateLimiter::hit($this->throttleKey());

    //         throw ValidationException::withMessages([
    //             'email' => trans('auth.failed'),
    //         ]);
    //     }

    //     RateLimiter::clear($this->throttleKey());
    // }

    // =================================================================

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        try {
            $user = $this->findUserInDatabase();

            if (!$user) {
                $user = $this->fetchAndRegisterFromApi();
            }

            if (!$user) {
                RateLimiter::hit($this->throttleKey());
                throw ValidationException::withMessages([
                    'identity_number' => 'Nomor identitas atau nomor HP tidak terdaftar. Silahkan hubungi kasir!',
                ]);
            }

            Auth::login($user, $this->boolean('remember'));
            RateLimiter::clear($this->throttleKey());
        } catch (\Exception $e) {
            if ($e instanceof ValidationException) throw $e;

            Log::error('Login Failure: ' . $e->getMessage());
            throw ValidationException::withMessages([
                'identity_number' => 'Sistem sedang mengalami kendala, silakan hubungi admin!',
            ]);
        }
    }

    private function findUserInDatabase(): ?User
    {
        $user = User::query()
            ->where('phone_number', $this->phone_number)
            ->whereHas('identityDocuments', fn($q) => $q->where('number', $this->identity_number))
            ->first();

        if (!$user && User::query()->where('phone_number', $this->phone_number)->exists()) {
            throw ValidationException::withMessages([
                'identity_number' => 'Nomor HP terdaftar, namun nomor identitas tidak sesuai!',
            ]);
        }

        return $user;
    }

    private function fetchAndRegisterFromApi(): ?User
    {
        $m2Service = app(M2Service::class);
        $apiData = $m2Service->getCustomerData($this->identity_number);

        if (!isset($apiData['status']) || $apiData['status'] !== true || empty($apiData['data']['customer'])) {
            return null;
        }

        $customer = $apiData['data']['customer'];

        if ($this->phone_number !== (string) $customer['Phone']) {
            throw ValidationException::withMessages([
                'identity_number' => 'Data tidak cocok. Silahkan verifikasi data di kasir!',
            ]);
        }

        return DB::transaction(function () use ($customer) {
            $newUser = User::create([
                'name' => strtoupper($customer['Name'] ?? 'UNKNOWN'),
                'date_of_birth' => $customer['DOB'] ?? null,
                'nationality' => strtoupper($customer['Nationality'] ?? 'INDONESIA'),
                'occupation' => strtoupper($customer['Occupation'] ?? '-'),
                'address' => strtoupper($customer['Address'] ?? '-'),
                'phone_number' => $this->phone_number,
                'password' => bcrypt('password123'),
            ]);

            $newUser->identityDocuments()->create(['number' => $this->identity_number]);

            $role = Role::query()->where('name', 'customer')->first();
            if ($role) $newUser->roles()->attach($role->id);

            return $newUser;
        });
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')) . '|' . $this->ip());
    }
}
