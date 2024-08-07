"use client";

import { useState } from "react";

// import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
// import { Button } from "@/registry/new-york/ui/button"
// import { Input } from "@/registry/new-york/ui/input"
// import { Label } from "@/registry/new-york/ui/label"

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <p className="sr-only">Email</p>
            <input
              className="border rounded-sm px-4 py-2"
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <input
              className="border rounded-sm px-4 py-2"
              id="password"
              placeholder="************"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
            <button>Login</button>
          </div>
          <button>
            {
              isLoading && "kk"
              //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            }
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button type="button" disabled={isLoading}>
        {
          isLoading
            ? "ggg"
            : //   <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ""
          //   <Icons.gitHub className="mr-2 h-4 w-4" />
        }{" "}
        GitHub
      </button>
    </div>
  );
}
