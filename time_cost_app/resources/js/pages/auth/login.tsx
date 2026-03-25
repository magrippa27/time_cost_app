import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <div className="w-full min-h-screen bg-background-default-default">
            <Head title="Log in" />

            <section
                className="w-full flex flex-col items-center justify-center gap-space-100 px-space-300 pt-[10px] pb-[25px] sm:pt-[80px] sm:pb-[35px] lg:pt-[120px] lg:pb-[55px] relative"
                aria-label="Hero"
            >
                <div className="relative z-10 flex flex-col items-center gap-3 text-center leading-[1.05] text-text-default-default font-title-hero-font-family max-w-[900px]">
                    <h1 className="m-0 font-title-hero-font-weight text-[clamp(3.2rem,8.5vw,6rem)] tracking-[-2.16px]">
                        Assessment 2
                    </h1>
                    <div className="h-2 w-full" aria-hidden />
                    <div className="flex flex-col items-center gap-1.5 text-[clamp(1.05rem,3.1vw,1.75rem)] font-subtitle-font-family font-normal">
                        <p className="m-0">COMP2002: Web Development</p>
                        <div className="h-4 w-full" aria-hidden />
                        <p className="m-0">Professor: Filip Biały</p>
                        <div className="h-4 w-full" aria-hidden />
                        <p className="m-0">
                            Tutors: Yash Kumar, Durba Srivastava &amp; Sugandha Rathi
                        </p>
                        <div className="h-6 w-full" aria-hidden />
                        <p className="m-0">Developed by: Manuel Pulido</p>
                    </div>
                </div>
            </section>

            <div className="max-w-[900px] mx-auto px-4 pb-4 pt-0 sm:px-6 sm:pb-8 sm:pt-2">
                <div className="flex justify-center">
                    <div className="w-full max-w-[420px]">
                        <div className="rounded-xl border border-black bg-white p-4 text-black shadow-sm sm:p-6">
                            <Form
                                {...store.form()}
                                resetOnSuccess={['password']}
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-black"
                                                >
                                                    Email address
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder="email@example.com"
                                                    className="border-black bg-white text-black placeholder:text-black/50 focus-visible:border-black focus-visible:ring-black/20"
                                                />
                                                <InputError
                                                    message={errors.email}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label
                                                        htmlFor="password"
                                                        className="text-black"
                                                    >
                                                        Password
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="ml-auto text-sm text-black decoration-black/40 hover:decoration-black"
                                                            tabIndex={5}
                                                        >
                                                            Forgot password?
                                                        </TextLink>
                                                    )}
                                                </div>
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Password"
                                                    className="border-black bg-white text-black placeholder:text-black/50 focus-visible:border-black focus-visible:ring-black/20"
                                                />
                                                <InputError
                                                    message={errors.password}
                                                />
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <Checkbox
                                                    id="remember"
                                                    name="remember"
                                                    tabIndex={3}
                                                />
                                                <Label
                                                    htmlFor="remember"
                                                    className="text-black"
                                                >
                                                    Remember me
                                                </Label>
                                            </div>

                                            <Button
                                                type="submit"
                                                className="mt-4 w-full bg-black text-white hover:bg-black/90"
                                                tabIndex={4}
                                                disabled={processing}
                                                data-test="login-button"
                                            >
                                                {processing && <Spinner />}
                                                Log in
                                            </Button>
                                        </div>

                                        {canRegister && (
                                            <div className="text-center text-sm text-black">
                                                Don't have an account?{' '}
                                                <TextLink
                                                    href={register()}
                                                    tabIndex={5}
                                                    className="text-black decoration-black/40 hover:decoration-black"
                                                >
                                                    Sign up
                                                </TextLink>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Form>

                            {status && (
                                <div className="mt-4 text-center text-sm font-medium text-green-700">
                                    {status}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
