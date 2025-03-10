"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
    const [url, setUrl] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [demoStep, setDemoStep] = useState(0);
    const router = useRouter();

    // Validate Wikipedia URL
    const validateUrl = (input: string) => {
        try {
            const urlObj = new URL(input);
            const isWikipedia = urlObj.hostname.includes("wikipedia.org");
            setIsValid(isWikipedia);
            return isWikipedia;
        } catch {
            setIsValid(input === "" ? null : false);
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        validateUrl(newUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid && url) {
            setIsSubmitting(true);
            router.push(`/${encodeURIComponent(url)}`);
        }
    };

    // Demo sequence
    const demoMessages = [
        { question: "What’s this page about? 🤔", answer: "A summary of Artificial Intelligence! 📝" },
        { question: "Key milestones? ⏳", answer: "AI’s big moments from the page! 🚀" },
        { question: "Explain neural networks. 🧠", answer: "Straight from Wikipedia, simplified! ✨" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setDemoStep((prev) => (prev + 1) % demoMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div
                style={{
                    height: "100vh",
                    width: "100vw",
                    background: "#1a1a1a",
                    color: "#e0e0e0",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    overflowY: "auto",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                {/* Globe Background Effect */}
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "100vw",
                        height: "100vw",
                        maxWidth: "1200px",
                        maxHeight: "1200px",
                        background: "radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, rgba(26, 26, 26, 0) 70%)",
                        transform: "translate(-50%, -50%)",
                        animation: "pulse 6s ease-in-out infinite",
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        width: "80vw",
                        height: "80vw",
                        maxWidth: "800px",
                        maxHeight: "800px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.05)",
                        transform: "translate(-50%, -50%)",
                        animation: "spin 20s linear infinite",
                        pointerEvents: "none",
                    }}
                />

                {/* Content Container */}
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        padding: "40px",
                        maxWidth: "800px",
                        margin: "0 auto",
                        textAlign: "center",
                    }}
                >
                    {/* Header with Fade-In and Rotating Icon */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "15px",
                            marginBottom: "30px",
                            animation: "fadeIn 1s ease-out",
                        }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#4caf50"
                            strokeWidth="2"
                            style={{ animation: "spin 4s linear infinite" }}
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        <h1 style={{ fontSize: "2.5rem", color: "#fff", fontWeight: "bold" }}>
                            Wikipedia Power Reader 🌟
                        </h1>
                    </div>
                    <p style={{ fontSize: "1.2rem", color: "#b0b0b0", marginBottom: "40px", animation: "fadeIn 1.2s ease-out" }}>
                        Turn any Wikipedia page into a smart Q&A buddy! Ask away and skip the scroll. 📚✨
                    </p>

                    {/* Demo Section with Slide-In */}
                    <div style={{ marginBottom: "40px", animation: "slideInLeft 1s ease-out" }}>
                        <p style={{ fontSize: "1.1rem", color: "#d0d0d0", marginBottom: "15px" }}>
                            Watch it work 👀:
                        </p>
                        <p style={{ fontStyle: "italic", color: "#888" }}>
                            URL:{" "}
                            <a href="/https://en.wikipedia.org/wiki/Artificial_intelligence" style={{ color: "#4caf50" }}>
                                en.wikipedia.org/wiki/Artificial_intelligence
                            </a>
                        </p>
                        <div style={{ marginTop: "20px", minHeight: "60px" }}>
                            <p style={{ fontSize: "1rem", color: "#4caf50", margin: "5px 0" }}>
                                {demoMessages[demoStep].question}
                            </p>
                            <p style={{ fontSize: "1rem", color: "#76ff03", margin: "5px 0" }}>
                                {demoMessages[demoStep].answer}
                            </p>
                        </div>
                    </div>

                    {/* Input Form with Bounce-In */}
                    <form onSubmit={handleSubmit} style={{ animation: "bounceInUp 1s ease-out" }}>
                        <input
                            type="text"
                            value={url}
                            onChange={handleChange}
                            placeholder="e.g., https://en.wikipedia.org/wiki/Space"
                            disabled={isSubmitting}
                            style={{
                                width: "100%",
                                maxWidth: "500px",
                                padding: "12px",
                                fontSize: "1rem",
                                border: `2px solid ${
                                    isValid === null ? "#555" : isValid ? "#4caf50" : "#ff5252"
                                }`,
                                borderRadius: "6px",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                                marginBottom: "15px",
                                background: "#2a2a2a",
                                color: "#e0e0e0",
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                            style={{
                                padding: "12px 30px",
                                fontSize: "1rem",
                                backgroundColor: isSubmitting ? "#555" : "#4caf50",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: isValid && !isSubmitting ? "pointer" : "not-allowed",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.transform = "scale(1)")}
                        >
                            {isSubmitting ? "Loading... ⏳" : "Chat Now 🚀"}
                        </button>
                    </form>
                    {isValid === false && (
                        <p style={{ color: "#ff5252", fontSize: "0.9rem", marginTop: "10px", animation: "fadeIn 0.5s ease-out" }}>
                            Oops! Please use a valid Wikipedia URL. 🙈
                        </p>
                    )}

                    {/* Why Section with Fade-In */}
                    <div style={{ marginTop: "40px", animation: "fadeIn 1.4s ease-out" }}>
                        <h2 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "20px" }}>
                            Why This Rocks 🎉
                        </h2>
                        <ul style={{ listStyle: "none", padding: 0, color: "#b0b0b0", fontSize: "1rem" }}>
                            <li>🎯 <strong>Spot-on Answers:</strong> Only from the page—no random guesses!</li>
                            <li>🧠 <strong>Remembers Context:</strong> Follow up without repeating yourself.</li>
                            <li>📖 <strong>Learner’s Dream:</strong> Perfect for study or curiosity!</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes bounceInUp {
                    0% { opacity: 0; transform: translateY(50px); }
                    60% { opacity: 1; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
                    50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.3; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
                }
            `}</style>
        </>
    );
}
