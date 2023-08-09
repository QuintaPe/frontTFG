// export interface Column {
//     type?: string;
//     field?: string;
//     name?: string;
//     title?: string;
//     onClick?: Function;
//     sortable?: boolean;
//     sortableField?: string;
//     preRender?: Function;
//     buttons?: Button[];
//     width?: number;
//     value?: 'select' extends typeof type ? string : never;
//     options?: { id: string; name: string; }[];
// }

export interface Button {
    icon?: string,
    text?: Function | string,
    onClick?: Function,
    disabled?: boolean,
    hidden?: Function | boolean,
}
