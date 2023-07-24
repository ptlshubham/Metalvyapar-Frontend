export interface Email {
    id: number;
    userid: number;
    role: string;
    email: string;
    name: string;
    subject: string;
    message: string;
    isactive: boolean;
    createddate:Date;
    updateddate:Date;

    // title: string;
    // date: string;
    // unread?: boolean;
    btn?: string;
    bg_color?: string;
}
