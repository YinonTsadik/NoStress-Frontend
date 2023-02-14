export interface AuthPageProps {
    component: React.FC
}

export interface ProfileMenuProps {
    anchorEl: HTMLElement | null
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    open: boolean
}

interface DialogProps {
    open: boolean
    handleClose: () => void
}

export interface EditProfileProps extends DialogProps {}

export interface CreateCalendarProps extends DialogProps {}
