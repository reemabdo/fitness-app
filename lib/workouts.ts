
export type Exercise = {
    name: string;
    sets: string;
    video: string;
  };
  
  export type Workout = {
    id: string;
    title: string;
    level: string;
    duration: string;
    exercises: Exercise[];
  };
  
  export const workouts: Workout[] = [
    {
      id: "push-1",
      title: "Push Day",
      level: "Beginner",
      duration: "35 min",
      exercises: [
        {
          name: "Push Ups",
          sets: "3 x 12",
          video: "https://www.youtube.com/embed/IODxDxX7oi4",
        },
        {
          name: "Shoulder Press",
          sets: "3 x 10",
          video: "https://www.youtube.com/embed/qEwKCR5JCog",
        },
      ],
    },
    {
      id: "pull-1",
      title: "Pull Day",
      level: "Intermediate",
      duration: "40 min",
      exercises: [
        {
          name: "Pull Ups",
          sets: "3 x 8",
          video: "https://www.youtube.com/embed/eGo4IYlbE5g",
        },
        {
          name: "Bicep Curls",
          sets: "3 x 12",
          video: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
        },
      ],
    },
  ];