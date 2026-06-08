import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        phone_number: '',
        identity_number: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('phone_number'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* <div className="mt-4">
                    <InputLabel htmlFor="Phone Number" value="Password" />

                    <TextInput
                        id="password"
                        type="number"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div> */}

                <div>
                    <InputLabel htmlFor="phone_number" value="Nomor HP" />

                    <TextInput
                        id="phone_number"
                        type="tel"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        maxLength={15}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        onChange={(e) => {
                            const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                            setData('phone_number', onlyNumbers);
                        }} />

                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                {/* <div>
                    <InputLabel htmlFor="Nomor Identitas" value="Nomor Identitas" />

                    <TextInput
                        id="identityNumber"
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div> */}

                <div className="mt-4">
                    <InputLabel htmlFor="identity_number" value="Nomor Identitas" />

                    <TextInput
                        id="identity_number"
                        type="text"
                        name="identity_number"
                        value={data.identity_number}
                        className="mt-1 block w-full uppercase"
                        maxLength={30}
                        isFocused={true}
                        onChange={(e) => {
                            const sanitizedValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
                            setData('identity_number', sanitizedValue);
                        }} />

                    <InputError message={errors.identity_number} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Simpan preferensi masuk
                        </span>
                    </label>
                </div>

                {/* <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div> */}

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        {processing && (
                            <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {processing ? 'Memproses...' : 'Masuk'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
