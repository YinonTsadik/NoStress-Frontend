export interface ProfileNameProps {
    name: string
}

export interface ProfileMenuProps {
    anchorEl: HTMLElement | null
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
    open: boolean
}
