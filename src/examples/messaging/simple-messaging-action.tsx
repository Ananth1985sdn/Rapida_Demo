import {
  Assistant,
  useConnectAgent,
  useInputModeToggleAgent,
  VoiceAgent,
} from "@rapidaai/react";
import { Loader2, Send, Mic, Phone } from "lucide-react";
import React, { FC, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

interface SimpleMessagingAcitonProps extends HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  voiceAgent: VoiceAgent;
  assistant: Assistant | null;
}

export const SimpleMessagingAction: FC<SimpleMessagingAcitonProps> = ({
  className,
  voiceAgent,
  assistant,
  placeholder,
}) => {
  const { handleVoiceToggle } = useInputModeToggleAgent(voiceAgent);
  const {
    handleConnectAgent,
    handleDisconnectAgent,
    isConnected,
    isConnecting,
  } = useConnectAgent(voiceAgent);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitForm = (data: any) => {
    voiceAgent?.onSendText(data.message);
    reset();
  };

  return (
    <div>
      <form
        className={clsx(
          "relative flex items-center gap-3 border border-gray-300 rounded-lg bg-white px-4 py-3 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600",
        )}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <input
          type="text"
          className="flex-1 text-base border-none bg-transparent focus:outline-none placeholder-gray-400 text-gray-800"
          placeholder={placeholder}
          {...register("message", {
            required: "Please write your message.",
          })}
          required
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(onSubmitForm)(e);
            }
          }}
        />

        <div className="flex items-center gap-2">
          {isValid ? (
            <button
              aria-label="Send Message"
              type="submit"
              className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              <Send className="w-4 h-4" strokeWidth={2} />
            </button>
          ) : (
            <button
              aria-label="Start Voice"
              type="button"
              disabled={isConnecting}
              onClick={async () => {
                await handleVoiceToggle();
                !isConnected && (await handleConnectAgent());
              }}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
            >
              {isConnecting ? (
                <Loader2
                  className="w-4 h-4 animate-spin"
                  strokeWidth={2}
                />
              ) : (
                <Mic className="w-4 h-4" strokeWidth={2} />
              )}
            </button>
          )}
          
          {/* Phone Call Button */}
          <button
            aria-label="Make Phone Call"
            type="button"
            className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Phone className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </form>
    </div>
  );
};
