export interface Column {
    type?: string;
    field?: string;
    name?: string;
    title?: string;
    onClick?: Function;
    sortable?: boolean;
    sortableField?: string;
    preRender?: Function;
    buttons?: Button[];
    width?: number;
}

export interface Button {
    icon?: string,
    text?: string,
    onClick?: Function,
    disabled?: boolean,
    hidden?: boolean,
}