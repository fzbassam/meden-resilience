import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitDemoRequest() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      organization,
      message,
    }: {
      name: string;
      email: string;
      organization: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitDemoRequest(name, email, organization, message);
    },
  });
}
