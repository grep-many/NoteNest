import React, { useState } from 'react';
import { signUpFormControls, initialSignUpFormData } from '@/config/form';
import CommonForm from '@/components/common-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@/context/PageProvider';
import { registerService } from '@/services/authService';

const SignUpForm = ({ closeDialog }) => {

    const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
    const { setProgress, setAuth, toast } = usePage();

    const validateSignUpFormIsValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (
            signUpFormData &&
            signUpFormData.name !== "" &&
            signUpFormData.email !== "" &&
            emailRegex.test(signUpFormData.email) &&
            signUpFormData.password !== "" &&
            signUpFormData.confirmPassword !== "" &&
            signUpFormData.confirmPassword === signUpFormData.password &&
            signUpFormData.password.length > 8 &&
            signUpFormData.confirmPassword.length > 8
        );
    }

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        setProgress(0);
        const response = await registerService(signUpFormData, setProgress);
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
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>
                    Enter your details to get started
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <CommonForm
                    formControls={signUpFormControls}
                    buttonText={'Sign Up'}
                    formData={signUpFormData}
                    setFormData={setSignUpFormData}
                    isButtonDisabled={!validateSignUpFormIsValid()}
                    handleSubmit={handleRegisterUser}
                />
            </CardContent>
        </Card>
    );
}

export default SignUpForm;
