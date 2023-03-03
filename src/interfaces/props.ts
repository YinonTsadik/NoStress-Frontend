import { Calendar, Task, Constraint } from './modules'

export interface AuthPageProps {
    component: React.FC
}

export interface ProfileMenuProps {
    anchorEl: HTMLElement | null
    open: boolean
    handleCloseMenu: () => void
}

interface DialogProps {
    open: boolean
    onClose: () => void
}

export interface EditProfileProps extends DialogProps {}

export interface CreateCalendarProps extends DialogProps {}

export interface CalendarProps {
    calendar: Calendar
    handleCloseMenu: () => void
}

export interface ElementProps {
    element: Task | Constraint
}

export interface EditElementProps extends DialogProps, ElementProps {}
