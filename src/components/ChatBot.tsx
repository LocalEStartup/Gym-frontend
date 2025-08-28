import React, { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const gymDetails = {
  master: "K.Bharani",
  timings: "Morning: 5am to 9am, Evening: 4pm to 9pm",
  address:
    "229, KSSPKN Complex, PKSA Arumuga Nadar Road, near Central Bank of India, Opposite to Mari Amman Kovil, Sivakasi-626189",
};

const supersetWorkouts: Record<string, string> = {
  chest:
    "Superset: Set 1 - Bench Press(8-12 reps) + Incline Dumbbell Press (10-15 reps)\nSuperset: Set 2 - Dumbbell Chest Press(10-12 reps) + Cable Flyes (12-15 reps)",
  back: "Superset: Set 1 - Pull Ups(10-12 reps) + Seated Row (10-12 reps)\nSuperset: Set 2 - Lat Pulldown(10-12 reps) + Bent Over Barbell Rows (8-12 reps)",
  legs: "Superset: Set 1 - Squats (8-12 reps) + Leg Press (10-12 reps)\nSuperset: Set 2 - Leg Extension(12-15 reps) + Leg Curl (10-12 reps)",
  biceps: "Superset: Barbell Curl(10-12 reps) + Hammer Curl (12-15 reps)",
  triceps:
    "Superset: Tricep Dips(10-12) + Overhead Tricep Extension (10-12 reps)",
  shoulders:
    "Superset: Front Delt - Seated Dumbbell Press(10-12 reps) + Standing Barbell Press(6-8 reps). Side Delt - Dumbbell Lateral Raise(12-15 reps) + Single Arm Lateral Raise(10-12 reps). Rear Delt - Face Pulls(12-15 reps) + Reverse Cable Fly(10-12 reps)",
  abs: "Superset: Plank(1min) + Hanging Leg Raise (12-15 reps)",
};

const dropsetWorkouts: Record<string, string> = {
  chest:
    "Dropset: Dumbbell Press (Start heavy, drop weight each set, 3 drops per set, 3 sets total)",
  back: "Dropset: Lat Pulldown (4 sets, reduce weight every set, reps to failure)",
  legs: "Dropset: Leg Press (Start heavy, drop weight after each set, 4 sets total)",
  biceps:
    "Dropset: Dumbbell Curl (Start heavy, drop weight to failure, 3 drops per set, 3 sets)",
  triceps: "Dropset: Tricep Pushdown (4 sets, lower weight after each failure)",
  shoulders:
    "Dropset: Lateral Raise (Start heavy, lower weight 2-3 times, 3 sets)",
  abs: "Dropset: Cable Crunch (Reduce weight each set, 4 sets, reps to failure)",
};

const famousBodybuilderWorkouts: Record<string, Record<string, string>> = {
  arnold: {
    chest: `Arnold Schwarzenegger Chest Workout:
- Barbell Bench Press: 5 sets x 6-10 reps
- Incline Barbell Press: 5 sets x 6-10 reps
- Flat Bench Dumbbell Flyes: 5 sets x 10-12 reps
- Dips: 5 sets x to failure
- Pullovers: 5 sets x 15 reps`,
  },
  "jay cutler": {
    chest: `Jay Cutler Chest Workout:
- Incline Barbell Press: 4 sets x 8-10 reps
- Flat Dumbbell Press: 4 sets x 8-10 reps
- Dumbbell Flyes: 4 sets x 10-12 reps
- Machine Press: 3 sets x 10 reps
- Dips: 3 sets x 15 reps`,
  },
  "ronnie coleman": {
    back: `Ronnie Coleman Back Workout:
- Deadlifts: 4 sets x 6-12 reps
- Barbell Rows: 4 sets x 10-12 reps
- Lat Pulldowns: 4 sets x 10-12 reps
- T-Bar Row: 4 sets x 10 reps
- Seated Cable Row: 4 sets x 12 reps`,
  },
  "mike mentzer": {
    fullbody: `Mike Mentzer Heavy Duty Workout (Full Body - Example):
- Squats: 1-2 sets x 6-8 reps
- Bench Press: 1-2 sets x 6-8 reps
- Deadlift: 1 set x 6-8 reps
- Overhead Press: 1 set x 6-8 reps`,
  },
  "dorian yates": {
    back: `Dorian Yates Back Workout:
- Reverse-Grip Pull-down: 2 warm-up, 2 working sets x 8-10 reps
- Barbell Row: 2 sets x 8-10 reps
- Seated Cable Row: 2 sets x 8-10 reps
- Deadlift: 1 set x 8-10 reps`,
  },
  // Add more as needed
  raul: {
    arms: `Raul Arm Workout:
- Barbell Curl: 4 sets x 12 reps
- Tricep Dips: 4 sets x 12 reps
- Hammer Curl: 3 sets x 15 reps
- Skullcrushers: 3 sets x 12 reps`,
  },
};

function getBodybuilderWorkout(
  name: string,
  muscle: string
): string | undefined {
  const key = name.toLowerCase();
  if (famousBodybuilderWorkouts[key]) {
    // Try to match the muscle, fallback to first available
    const muscles = Object.keys(famousBodybuilderWorkouts[key]);
    const found = muscles.find((m) => muscle.includes(m));
    return famousBodybuilderWorkouts[key][found || muscles[0]];
  }
  return undefined;
}

const greetings = [
  "hi",
  "hello",
  "hey",
  "good morning",
  "good afternoon",
  "good evening",
  "greetings",
];

const invalidReplies = [
  "Sorry, I didn't understand that. Could you please rephrase? 🤔",
  "Hmm, I couldn't catch that. Try asking in a different way! 😊",
  "I'm not sure what you mean. Can you clarify your question?",
  "That doesn't seem like something I can help with. Maybe try a different query?",
  "I'm a fitness coach bot, please ask about workouts, diet, or fitness topics! 💪",
];

const MUSCLE_GROUPS = [
  "chest",
  "back",
  "legs",
  "shoulders",
  "biceps",
  "triceps",
  "abs",
  "full body",
  "arms",
];

function parseMuscleGroup(input: string): string | undefined {
  return MUSCLE_GROUPS.find((mg) => input.toLowerCase().includes(mg));
}

function checkGreeting(input: string) {
  return greetings.some((greet) => input.toLowerCase().includes(greet));
}

function checkGymAddress(input: string) {
  return /address|where.*gym|location|how to reach|find.*gym/i.test(input);
}

function checkMaster(input: string) {
  return /master|trainer|coach|bharani/i.test(input);
}

function checkGymTimings(input: string) {
  return /timing|hours|open|close|time|when.*open|when.*close/i.test(input);
}

function checkSuperset(input: string) {
  return /superset/i.test(input);
}

function checkDropset(input: string) {
  return /dropset|drop set/i.test(input);
}

function checkBodybuilder(input: string) {
  const names = Object.keys(famousBodybuilderWorkouts);
  return names.find((name) => input.toLowerCase().includes(name));
}

const ChatBot: React.FC = () => {
  const [chat, setChat] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! 😊 Ask me about workouts, diet, gym details, or famous bodybuilder routines!",
    },
  ]);
  const [input, setInput] = useState("");
  const [state, setState] = useState<{ lastInvalidReply?: string }>({});
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isBotTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setChat((prev) => [...prev, userMsg]);
    setIsBotTyping(true);

    setTimeout(() => {
      let reply = "";

      // 1. Gym Address
      if (checkGymAddress(input)) {
        reply = `🏋️‍♂️ Gym Address:\n${gymDetails.address}`;
      }
      // 2. Master name
      else if (checkMaster(input)) {
        reply = `Our master/trainer is ${gymDetails.master}.`;
      }
      // 3. Gym timings
      else if (checkGymTimings(input)) {
        reply = `Our gym timings are:\n${gymDetails.timings}`;
      }
      // 4. Superset suggestion
      else if (checkSuperset(input)) {
        const muscle = parseMuscleGroup(input) || "chest";
        reply = supersetWorkouts[muscle]
          ? `Here's a ${muscle} superset workout:\n${supersetWorkouts[muscle]}`
          : "Please specify a muscle group for your superset workout!";
      }
      // 5. Dropset suggestion
      else if (checkDropset(input)) {
        const muscle = parseMuscleGroup(input) || "chest";
        reply = dropsetWorkouts[muscle]
          ? `Here's a ${muscle} dropset workout:\n${dropsetWorkouts[muscle]}`
          : "Please specify a muscle group for your dropset workout!";
      }
      // 6. Famous bodybuilder workouts
      else {
        const builder = checkBodybuilder(input);
        if (builder) {
          const muscle = parseMuscleGroup(input) || "";
          const workout = getBodybuilderWorkout(builder, muscle);
          if (workout) {
            reply = `Here's the workout for ${
              builder.charAt(0).toUpperCase() + builder.slice(1)
            }:\n${workout}`;
          } else {
            reply = `I found workouts for ${builder}, but not for the specific muscle group. Try asking for a different muscle or just their routine.`;
          }
        }
      }

      // 7. Greetings
      if (!reply && checkGreeting(input)) {
        reply =
          "Hello! 👋 How can I help you with your fitness journey today? If you have any queries, just ask! 💪";
      }

      // 8. If still no reply, give a unique invalid reply
      if (!reply) {
        let availableReplies = invalidReplies.filter(
          (r) => r !== state.lastInvalidReply
        );
        if (availableReplies.length === 0) availableReplies = invalidReplies;
        const invalid =
          availableReplies[Math.floor(Math.random() * availableReplies.length)];
        reply = invalid;
        setState({ lastInvalidReply: invalid });
      } else {
        setState({ lastInvalidReply: undefined });
      }

      setTimeout(() => {
        setChat((prev) => [...prev, { sender: "bot", text: reply }]);
        setIsBotTyping(false);
      }, 800);
    }, 600);

    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="chatbot-container"
      role="dialog"
      aria-label="Fitness Chatbot"
      aria-live="polite"
    >
      <div className="chatbot-header" tabIndex={0}>
        Fitness Coach
      </div>
      <div className="chatbot-messages" tabIndex={0} aria-label="Chat messages">
        {chat.map((m, i) => (
          <div
            key={i}
            className={`chatbot-msg chatbot-msg-${m.sender}`}
            aria-live="polite"
          >
            {m.text}
          </div>
        ))}
        {isBotTyping && (
          <div className="chatbot-msg chatbot-msg-bot chatbot-typing">
            <span className="typing-indicator">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>{" "}
            Bot is typing...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form
        className="chatbot-input-box"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        aria-label="Type your message"
      >
        <input
          type="text"
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          aria-label="Chat input"
          autoFocus
        />
        <button type="submit" aria-label="Send message">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
