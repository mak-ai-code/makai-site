"use client";
import { ComponentPropsWithoutRef, MouseEvent } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export const CALENDLY_DISCOVERY_URL =
  "https://calendly.com/tigermelancon/free-discovery-call";
export const CALENDLY_CEO_BUILD_URL =
  "https://calendly.com/tigermelancon/ceo-build-call";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  url?: string;
};

export function CalendlyButton({
  url = CALENDLY_DISCOVERY_URL,
  children,
  ...rest
}: Props) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (typeof window !== "undefined" && window.Calendly) {
      e.preventDefault();
      window.Calendly.initPopupWidget({ url });
    }
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  );
}
