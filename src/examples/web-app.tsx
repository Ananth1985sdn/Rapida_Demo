import React from "react";
import {
  AgentConfig,
  Channel,
  ConnectionConfig,
  InputOptions,
  StringToAny,
  useAgentMessages,
  useInputModeToggleAgent,
  VoiceAgent,
} from "@rapidaai/react";
import clsx from "clsx";
import { FC, useState } from "react";
import { MessagingAction } from "./messaging/messaging-action";
import { ThumbsUp, ThumbsDown } from "lucide-react";

export const WebAgent = () => {
  return (
    <VoiceAIAgent
      rapidaAgent={
        new VoiceAgent(
          ConnectionConfig.DefaultConnectionConfig(
            ConnectionConfig.WithSDK({
              ApiKey: "33da1e0aff069e1692983de58b5e28859d32c5b50db2516a1e5be623f4ba302b",
              UserId: "random-user / identified-user",
            }),
          ).withConnectionCallback({
            onDisconnect: () => {
              // do what you want when finished
              console.log("disconnect");
            },
            onConnect() {
              console.log("connected");
            },
            onError() {
              console.log("error");
            },
          }),
          new AgentConfig(
            // replace this with actual agent id from rapida console
            "2285087785998090240",
            // you can select only Audio/ Text
            new InputOptions([Channel.Audio, Channel.Text], Channel.Text),
          )
            .setUserIdentifier("Venugopal.Balakrishnan@rencata.com", "Venugopal@2026")
    .addKeywords(["Rapida"])
    .addMetadata("source", StringToAny("web"))
,
          {
            onAssistantMessage: (msg) => {
              console.log("onStart: ()");
            },
            onUserMessage: (args) => {
              console.log("onComplete:");
            },
            onConfiguration: (args) => {
              console.log("onTranscript");
            },
            onInterrupt: (args) => {
              console.log("onInterrupt");
            },
          },
        )
      }
    />
  );
};

export const VoiceAIAgent: FC<{ rapidaAgent: VoiceAgent }> = ({
  rapidaAgent,
}) => {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Chat Container - Centered */}
      <div className="flex-grow flex justify-center overflow-hidden">
        <div className="w-full max-w-2xl flex flex-col">
          {/* Header - Only in Center */}
          <div className="bg-green-600 text-white px-6 py-4 shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold">FAQ BOT</span>
            </div>
          </div>

          {/* Info text */}
          <div className="text-center text-xs text-gray-500 py-2">
            AI-generated, please verify
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto px-6 py-6">
            <Messages rapidaAgent={rapidaAgent} />
          </div>

          {/* Input Area */}
          <div className="px-6 py-6 border-t border-gray-200 bg-white">
            <MessagingAction
              assistant={null}
              placeholder="Ask a question"
              voiceAgent={rapidaAgent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Messages: FC<{ rapidaAgent: VoiceAgent }> = ({ rapidaAgent }) => {
  const { messages } = useAgentMessages(rapidaAgent);
  const [feedback, setFeedback] = useState<{ [key: string]: "like" | "dislike" | null }>({});

  return (
    <div className="flex flex-col gap-6">
      {/* Bot Greeting */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2 max-w-xs">
          <div className="flex-1">
            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
              <p className="text-gray-800 text-sm">
                <span className="font-semibold">Hi there </span> I'm <span className="font-semibold">FAQ Bot</span>. How can I help you today with your mortgage or loan-related queries?
              </p>
            </div>
            {/* Feedback buttons for greeting */}
            <div className="flex gap-2 mt-2 justify-end">
              <button
                onClick={() => setFeedback({ ...feedback, "greeting": feedback["greeting"] === "like" ? null : "like" })}
                className={clsx(
                  "p-2 rounded hover:bg-gray-100 transition",
                  feedback["greeting"] === "like" && "bg-green-100 text-green-600"
                )}
                title="Helpful"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => setFeedback({ ...feedback, "greeting": feedback["greeting"] === "dislike" ? null : "dislike" })}
                className={clsx(
                  "p-2 rounded hover:bg-gray-100 transition",
                  feedback["greeting"] === "dislike" && "bg-red-100 text-red-600"
                )}
                title="Not helpful"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="space-y-4">
          {messages.map((messageGroup, groupIdx) => {
            return (
              <div key={groupIdx} className="space-y-4">
                {messageGroup.messages.map((msg, msgIdx) => {
                  const messageKey = `${groupIdx}-${msgIdx}`;
                  // Determine if this is a bot or user message
                  const isUserMessage = messageGroup.type === "user" || messageGroup.role === "user";
                  
                  return (
                    <div key={messageKey}>
                      {/* User Message - Left aligned in Blue */}
                      {isUserMessage ? (
                        <div className="flex justify-start">
                          <div className="max-w-xs">
                            <div className="bg-blue-600 text-white rounded-lg p-4">
                              <p className="text-sm">{msg}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Bot Message - Right aligned in White/Gray */
                        <div className="flex justify-end">
                          <div className="max-w-xs">
                            <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                              <p className="text-gray-800 text-sm">{msg}</p>
                            </div>
                            {/* Feedback buttons for each bot message */}
                            <div className="flex gap-2 mt-2 justify-end">
                              <button
                                onClick={() => setFeedback({ ...feedback, [messageKey]: feedback[messageKey] === "like" ? null : "like" })}
                                className={clsx(
                                  "p-2 rounded hover:bg-gray-100 transition",
                                  feedback[messageKey] === "like" && "bg-green-100 text-green-600"
                                )}
                                title="Helpful"
                              >
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setFeedback({ ...feedback, [messageKey]: feedback[messageKey] === "dislike" ? null : "dislike" })}
                                className={clsx(
                                  "p-2 rounded hover:bg-gray-100 transition",
                                  feedback[messageKey] === "dislike" && "bg-red-100 text-red-600"
                                )}
                                title="Not helpful"
                              >
                                <ThumbsDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
