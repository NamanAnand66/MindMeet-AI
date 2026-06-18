import { Bot, Database, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { ErrorState } from "../components/ErrorState";
import { askArchive } from "../services/api";
import { getApiErrorMessage } from "../utils/apiError";

export const ChatPage = () => {
  const [question, setQuestion] = useState("");
  const [meetingId, setMeetingId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;
    const userQuestion = question;
    setQuestion("");
    setError("");
    setLoading(true);
    setMessages((current) => [...current, { role: "user", content: userQuestion }]);
    try {
      const result = await askArchive({ question: userQuestion, meetingId: meetingId || undefined });
      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.answer, sources: result.sources }
      ]);
    } catch (chatError) {
      setError(getApiErrorMessage(chatError, "Unable to query the meeting archive."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <header className="page-heading">
        <div>
          <span className="workspace-kicker">Grounded archive search</span>
          <h1 className="workspace-title">Ask meeting memory</h1>
          <p className="workspace-description">Query decisions, ownership, and speaker context across your archive.</p>
        </div>
        <Bot size={29} strokeWidth={1.3} />
      </header>

      <section className="workspace-panel chat-workspace">
        <div className="chat-toolbar">
          <Database size={18} />
          <label>
            <span>Meeting filter</span>
            <input
              value={meetingId}
              onChange={(event) => setMeetingId(event.target.value)}
              placeholder="All meetings"
            />
          </label>
        </div>

        {error ? <ErrorState message={error} /> : null}

        <div className="scrollbar-soft chat-thread">
          {messages.length === 0 ? (
            <div className="chat-empty">
              <Sparkles size={30} strokeWidth={1.2} />
              <h2>What would you like to know?</h2>
              <p>Ask what was decided, who owns the next step, or what a speaker said.</p>
            </div>
          ) : null}
          {messages.map((message, index) => (
            <article key={index} className={`chat-message ${message.role}`}>
              <span>{message.role === "user" ? "YOU" : "MIND MEET"}</span>
              <p>{message.content}</p>
            </article>
          ))}
          {loading ? (
            <article className="chat-message assistant is-loading">
              <span>MIND MEET</span>
              <div><i /><i /><i /></div>
            </article>
          ) : null}
        </div>

        <form onSubmit={submit} className="chat-composer">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask a question about your meetings..."
          />
          <button type="submit" disabled={loading || !question.trim()} aria-label="Send question">
            <Send size={19} />
          </button>
        </form>
        <div className="chat-security">
          <span>Answers use transcript context only</span>
          <span>Enter to send</span>
        </div>
      </section>
    </div>
  );
};
