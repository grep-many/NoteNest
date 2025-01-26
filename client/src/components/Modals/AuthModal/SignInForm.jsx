import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CommonForm from '@/components/common-form';
import { signInFormControls, initialSignInFormData } from '@/config/form';
import { loginService } from '@/services/authService';
import { usePage } from '@/context/PageProvider';

const SignInForm = ({ closeDialog }) => {
    const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
    const { setProgress, setAuth, toast } = usePage();

    const validateSignInFormIsValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            signInFormData &&
            signInFormData.email !== "" &&
            emailRegex.test(signInFormData.email) &&
            signInFormData.password !== "" &&
            signInFormData.password.length > 8
        );
    }

    const handleLoginUser = async (e) => {
        e.preventDefault();
        setProgress(0);
        const response = await loginService(signInFormData, setProgress);
        if (response?.token) {
            localStorage.setItem('token', response?.token);
            localStorage.setItem('name', response?.name);
            localStorage.setItem('email', response?.email);
            toast({
                // variant: "destructive",
                // title: "Uh oh! Something went wrong.",
                description: response?.msg,
            });
            closeDialog();
            setAuth({
                authenticate: true,
                user: {
                    name: response?.name,
                    email: response?.email,
                }
            });
        } else {
            toast({
                variant: "destructive",
                title: response,
            });
        }
        setProgress(100);
    }

    return (
        <Card className="space-y-4">
            <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <CommonForm
                    formControls={signInFormControls}
                    buttonText={'Sign In'}
                    formData={signInFormData}
                    setFormData={setSignInFormData}
                    isButtonDisabled={!validateSignInFormIsValid()}
                    handleSubmit={handleLoginUser}
                />
            </CardContent>
        </Card>
    );
}

export default SignInForm;
