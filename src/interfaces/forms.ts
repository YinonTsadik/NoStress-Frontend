interface FirstAndLastName {
    firstName: string
    lastName: string
}

export interface SignInFormValues {
    username: string
    password: string
}

export interface EditProfileFormValues extends FirstAndLastName {
    username: string
}

export interface SignUpFormValues extends FirstAndLastName, SignInFormValues {}
