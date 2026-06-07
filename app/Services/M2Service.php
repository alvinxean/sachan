<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class M2Service
{
    protected string $baseUrl = 'https://remittance.apikko.co.id/remittance/api-m2/';

    public function getCustomerData(string $customerId)
    {
        return Http::asForm()->post($this->baseUrl . 'postHKGetCustomerDataAPI.php', [
            'user' => config('services.m2.user'),
            'password' => config('services.m2.password'),
            'customer_id' => $customerId,
        ])->json();
    }
}
