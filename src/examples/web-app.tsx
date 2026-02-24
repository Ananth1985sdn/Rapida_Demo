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
import { FC } from "react";
import { MessagingAction } from "./messaging/messaging-action";

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
    <div className="h-screen mx-auto text-slate-600 dark:text-white border-slate-200 border-x dark:border-slate-800">
      <div className="h-full flex flex-row flex-nowrap items-stretch">
        <div className="flex flex-col flex-grow min-w-0 flex-1">
          <Messages rapidaAgent={rapidaAgent} />
          <MessagingAction
            assistant={null}
            placeholder="How can I help you?"
            voiceAgent={rapidaAgent}
          />
        </div>
      </div>
    </div>
  );
};

const Messages: FC<{ rapidaAgent: VoiceAgent }> = ({ rapidaAgent }) => {
  const { messages } = useAgentMessages(rapidaAgent);
  return (
    <div className="flex flex-col justify-center flex-grow min-h-0  px-4">
      <div className={clsx("max-h-full flex gap-2 overflow-y-auto flex-col")}>
        <div className="flex flex-col items-center py-20 justify-center px-4">
          <div className="flex w-full flex-col items-start gap-1 ">
            <span className="text-3xl ">Hello,</span>
            <span className="text-xl opacity-80">
              How can I help you today?
            </span>
          </div>
        </div>
        <div className="divide-y divide-slate-400">
          {messages.map((x, idx) => {
            return (
              <div className="py-2" key={idx}>
                {x.messages.map((x) => {
                  return <p>{x}</p>;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
