export const signUpFormControls = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Enter your name',
        type: 'text',
        componentType: 'input'
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input'
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm password',
        type: 'password',
        componentType: 'input'
    },
]

export const signInFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
        componentType: 'input'
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
        componentType: 'input'
    }
]

export const initialSignInFormData = {
    email: '',
    password: '',
}

export const initialSignUpFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
}
