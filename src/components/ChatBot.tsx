import React, { useState, useRef, useEffect } from "react";
import { MessageCircle } from "lucide-react"; // chat icon
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
  raul: {
    arms: `Raul Arm Workout:
- Barbell Curl: 4 sets x 12 reps
- Tricep Dips: 4 sets x 12 reps
- Hammer Curl: 3 sets x 15 reps
- Skullcrushers: 3 sets x 12 reps`,
  },
};

function getBodybuilderWorkout(name: string, muscle: string): string | undefined {
  const key = name.toLowerCase();
  if (famousBodybuilderWorkouts[key]) {
    const muscles = Object.keys(famousBodybuilderWorkouts[key]);
    const found = muscles.find((m) => muscle.includes(m));
    return famousBodybuilderWorkouts[key][found || muscles[0]];
  }
  return undefined;
}

const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "greetings"];

const invalidReplies = [
  "Sorry, I didn't understand that. Could you please rephrase? 🤔",
  "Hmm, I couldn't catch that. Try asking in a different way! 😊",
  "I'm not sure what you mean. Can you clarify your question?",
  "That doesn't seem like something I can help with. Maybe try a different query?",
  "I'm a fitness coach bot, please ask about workouts, diet, or fitness topics! 💪",
];

const MUSCLE_GROUPS = ["chest", "back", "legs", "shoulders", "biceps", "triceps", "abs", "full body", "arms"];

function parseMuscleGroup(input: string): string | undefined {
  return MUSCLE_GROUPS.find((mg) => input.toLowerCase().includes(mg));
}
function checkGreeting(input: string) { return greetings.some((greet) => input.toLowerCase().includes(greet)); }
function checkGymAddress(input: string) { return /address|where.*gym|location|how to reach|find.*gym/i.test(input); }
function checkMaster(input: string) { return /master|trainer|coach|bharani/i.test(input); }
function checkGymTimings(input: string) { return /timing|hours|open|close|time|when.*open|when.*close/i.test(input); }
function checkSuperset(input: string) { return /superset/i.test(input); }
function checkDropset(input: string) { return /dropset|drop set/i.test(input); }
function checkBodybuilder(input: string) { return Object.keys(famousBodybuilderWorkouts).find((name) => input.toLowerCase().includes(name)); }

const ChatBot: React.FC = () => {
  const [chat, setChat] = useState<Message[]>([
    { sender: "bot", text: "Hi! 😊 Ask me about workouts, diet, gym details, or famous bodybuilder routines!" },
  ]);
  const [input, setInput] = useState("");
  const [state, setState] = useState<{ lastInvalidReply?: string }>({});
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  
  const [isOpen, setIsOpen] = useState(false);

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

      if (checkGymAddress(input)) reply = `🏋️‍♂️ Gym Address:\n${gymDetails.address}`;
      else if (checkMaster(input)) reply = `Our master/trainer is ${gymDetails.master}.`;
      else if (checkGymTimings(input)) reply = `Our gym timings are:\n${gymDetails.timings}`;
      else if (checkSuperset(input)) {
        const muscle = parseMuscleGroup(input) || "chest";
        reply = supersetWorkouts[muscle] ? `Here's a ${muscle} superset workout:\n${supersetWorkouts[muscle]}` : "Please specify a muscle group for your superset workout!";
      }
      else if (checkDropset(input)) {
        const muscle = parseMuscleGroup(input) || "chest";
        reply = dropsetWorkouts[muscle] ? `Here's a ${muscle} dropset workout:\n${dropsetWorkouts[muscle]}` : "Please specify a muscle group for your dropset workout!";
      }
      else {
        const builder = checkBodybuilder(input);
        if (builder) {
          const muscle = parseMuscleGroup(input) || "";
          const workout = getBodybuilderWorkout(builder, muscle);
          reply = workout ? `Here's the workout for ${builder.charAt(0).toUpperCase() + builder.slice(1)}:\n${workout}` : `I found workouts for ${builder}, but not for that muscle group.`;
        }
      }

      if (!reply && checkGreeting(input)) reply = "Hello! 👋 How can I help you with your fitness journey today? 💪";

      if (!reply) {
        let availableReplies = invalidReplies.filter((r) => r !== state.lastInvalidReply);
        if (availableReplies.length === 0) availableReplies = invalidReplies;
        const invalid = availableReplies[Math.floor(Math.random() * availableReplies.length)];
        reply = invalid;
        setState({ lastInvalidReply: invalid });
      } else setState({ lastInvalidReply: undefined });

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
    <div className="fixed bottom-8 right-8 z-[2000]">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 flex items-center cursor-pointer justify-center rounded-full bg-[#fed600] text-[#0d1b3e] shadow-lg hover:scale-105 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chatbot Box */}
      {isOpen && (
        <div className="w-80 h-80 bg-[#0d1b3ee6] rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden font-sans animate-slide-up">
          <div className="bg-[#fed600] text-[#0d1b3e] font-extrabold text-center py-3 text-lg tracking-wide flex justify-between items-center px-3">
            Fitness Coach
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#0d1b3e] font-bold hover:text-red-600 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-transparent max-h-80">
            {chat.map((m, i) => (
              <div
                key={i}
                className={`mb-3 px-4 py-2 rounded-xl max-w-[85%] whitespace-pre-line break-words text-base ${
                  m.sender === "bot"
                    ? "bg-[#0d1b3e] text-[#fed600] self-start rounded-bl-none"
                    : "bg-[#fed600] text-[#0d1b3e] self-end rounded-br-none ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}

            {isBotTyping && (
              <div className="bg-[#0d1b3e] text-[#fed600] self-start px-4 py-2 rounded-xl rounded-bl-none mb-3 flex items-center gap-2">
                <span className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-200">.</span>
                  <span className="animate-bounce delay-400">.</span>
                </span>
                Bot is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form
            className="flex border-t border-[#fed600]/50 bg-white p-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 px-3 py-2 rounded-md text-black text-base outline-none mr-2"
            />
            <button
              type="submit"
              className="bg-[#fed600] text-[#0d1b3e] cursor-pointer font-bold rounded-md px-4 text-base hover:bg-[#ffe877] transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
