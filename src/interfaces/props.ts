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

export interface EditProfileDialogProps extends DialogProps {}

export interface AddCalendarDialogProps extends DialogProps {}

export type ElementType = 'Task' | 'Constraint'

export interface AddElementDialogProps extends DialogProps {
    elementType: ElementType
}

export interface CalendarProps {
    calendar: Calendar
    handleCloseMenu: () => void
}

export interface ElementProps {
    elementType: ElementType
    element: Task | Constraint
}

export interface EditCalendarDialogProps extends DialogProps {
    calendar: Calendar
}

export interface DeleteCalendarDialogProps extends EditCalendarDialogProps {}

export interface EditElementProps extends DialogProps, ElementProps {}

export interface DeleteElementDialogProps extends DialogProps, ElementProps {}
