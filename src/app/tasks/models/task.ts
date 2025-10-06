export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number; // 1 à 5
  dueDate: Date;
  completed: boolean;
  userEmail: string; // pour identifier l’utilisateur
}
