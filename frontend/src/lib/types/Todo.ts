export type Todo = {
    id: number;
    title: string;
    user_id?: number;
    project_id?: number;
    order: number;
    priority?: string;
    completed_at?: Date;
    due_at?: Date;
    origin?: Todo,
    updated_at?: Date;
    created_at?: Date;
}