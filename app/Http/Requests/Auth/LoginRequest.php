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

    // public function authenticate(): void
    // {
    //     $this->ensureIsNotRateLimited();

    //     $user = User::query()
    //         ->where('phone_number', $this->phone_number)
    //         ->whereHas('identityDocuments', function ($query) {
    //             $query->where('number', $this->identity_number);
    //         })
    //         ->first();

    //     if (!$user) {
    //         RateLimiter::hit($this->throttleKey());

    //         throw ValidationException::withMessages([
    //             'identity_number' => 'Data identitas atau nomor HP tidak terdaftar.',
    //         ]);
    //     }

    //     Auth::login($user, $this->boolean('remember'));

    //     RateLimiter::clear($this->throttleKey());
    // }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        try {
            $m2Service = app(M2Service::class);

            // 1. Cek DB Lokal
            $user = User::query()
                ->where('phone_number', $this->phone_number)
                ->whereHas('identityDocuments', function ($query) {
                    $query->where('number', $this->identity_number);
                })
                ->first();

            // 2. Jika tidak ada, coba ambil dari API
            if (!$user) {
                $apiData = $m2Service->getCustomerData($this->identity_number);

                if (
                    isset($apiData['status']) && $apiData['status'] === true &&
                    $this->phone_number === $apiData['data']['customer']['Phone']
                ) {

                    $user = DB::transaction(function () use ($apiData) {
                        $newUser = User::create([
                            'name' => strtoupper($apiData['data']['customer']['Name']),
                            'date_of_birth' => $apiData['data']['customer']['DOB'],
                            'nationality' => strtoupper($apiData['data']['customer']['Nationality']),
                            'occupation' => strtoupper($apiData['data']['customer']['Occupation']),
                            'address' => strtoupper($apiData['data']['customer']['Address']),
                            'phone_number' => $this->phone_number,
                            'password' => bcrypt('password123'),
                        ]);

                        $newUser->identityDocuments()->create([
                            'number' => $this->identity_number,
                        ]);

                        $roleCustomer = Role::query()->where('name', 'customer')->first();
                        if ($roleCustomer) {
                            $newUser->roles()->attach($roleCustomer->id);
                        }

                        return $newUser;
                    });
                }
            }

            // 3. Validasi akhir: Jika user tetap tidak ada, berarti gagal login
            if (!$user) {
                RateLimiter::hit($this->throttleKey());
                throw ValidationException::withMessages([
                    'identity_number' => 'Nomor identitas atau nomor HP tidak terdaftar atau tidak sesuai. Silahkan hubungi kasir!',
                ]);
            }

            // 4. Login user (baik user lama atau user yang baru dibuat di atas)
            Auth::login($user, $this->boolean('remember'));
            RateLimiter::clear($this->throttleKey());
        } catch (\Exception $e) {
            // Tangkap error (DB error, API error, dsb)
            // Jika sudah ValidationException, biarkan saja (jangan dibungkus jadi pesan sistem)
            if ($e instanceof ValidationException) {
                throw $e;
            }

            dd($e->getMessage());

            throw ValidationException::withMessages([
                'identity_number' => 'Sistem sedang mengalami kendala, silakan hubungi admin!',
            ]);
        }
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
