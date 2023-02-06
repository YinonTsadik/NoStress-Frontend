export interface SignInFormValues {
    username: string
    password: string
}

export interface SignUpFormValues extends SignInFormValues {
    firstName: string
    lastName: string
}

export interface EditProfileFormValues extends SignUpFormValues {}
